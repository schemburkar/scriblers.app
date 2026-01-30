use std::sync::Mutex;
use tauri::{Emitter, Manager};
use tauri_plugin_fs::FsExt;

struct AppState {
    file_path: Mutex<Option<String>>,
}

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn get_cli_arg(app: tauri::AppHandle, state: tauri::State<AppState>) -> String {
    if let Some(path) = state.file_path.lock().unwrap().take() {
        let path_buf = std::path::PathBuf::from(&path);

        let _ = allow_new_path(app, path_buf);
        path
    } else {
        String::new()
    }
}

fn set_cli_file_path(state: tauri::State<AppState>, path: String) {
    *state.file_path.lock().unwrap() = Some(path);
}

#[tauri::command]
fn allow_new_path(app: tauri::AppHandle, path: std::path::PathBuf) -> Result<bool, String> {
    // This adds the new path to the runtime scope
    // The persisted-scope plugin will see this hange and save it
    app.fs_scope()
        .allow_file(path)
        .map(|_| true)
        .map_err(|e| e.to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        /* Single instance plugin runs for new windows via cmd only */
        .plugin(tauri_plugin_single_instance::init(|app, args, _| {
            if args.len() > 1 {
                let file_path = args[1].clone();
                let path_buf = std::path::PathBuf::from(&file_path);
                if let Some(state) = app.try_state::<AppState>() {
                    set_cli_file_path(state, file_path.clone());
                    let app_handle = app.app_handle().clone();
                    match allow_new_path(app_handle.clone(), path_buf) {
                        Ok(_) => {
                            let _ = app_handle.emit("new-file-open", file_path.clone());
                        }
                        Err(e) => {
                            //TODO trace event that this failed
                            println!("Failed to extend FS scope for {}: {}", file_path, e);
                        }
                    }
                }
            }
            // Focus the existing window
            if let Some(window) = app.get_webview_window("main") {
                let _ = window.set_focus();
                let _ = window.unminimize();
            }
        }))
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_persisted_scope::init())
        /* Setup runs for first window */
        .setup(|app| {
            let args: Vec<String> = std::env::args().collect();
            let cli_path = if args.len() > 1 {
                let path = args[1].clone();
                Some(path)
            } else {
                None
            };

            app.manage(AppState {
                file_path: Mutex::new(cli_path),
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![get_cli_arg, allow_new_path])
        .run(tauri::generate_context!())
        .expect("Error while running Scriblers application");
}
