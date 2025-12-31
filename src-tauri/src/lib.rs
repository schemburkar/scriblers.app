use tauri_plugin_fs::FsExt;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
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
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_persisted_scope::init())
        .invoke_handler(tauri::generate_handler![greet, allow_new_path])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
