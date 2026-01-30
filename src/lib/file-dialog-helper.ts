import { basename } from "@tauri-apps/api/path";
import { DialogFilter, open, save } from "@tauri-apps/plugin-dialog";
import { readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";
const filters: DialogFilter[] = [
  {
    name: "All Supported Files",
    extensions: [
      // Text & Documentation
      "txt", "md", "mdown", "markdown", "rtf",
      // Data Formats
      "json", "xml", "xaml", "csv", "tsv",
      // Web
      "htm", "html", "svg",
      // Programming Languages
      "cs", "tsx", "jsx", "js", "mjs", "ts", "c", "cpp", "h", "hpp", "java", "py", "php", "rb", "go", "rs",
      // Stylesheets
      "css", "scss", "sass", "less",
      // Configuration
      "local", "env", "config", "conf", "ini", "yml", "yaml", "toml", "cfg", "properties",
      // Scripts
      "ps1", "sh", "bat", "cmd", "bash", "zsh",
      // Logs & Others
      "log", "nfo", "srt", "vtt", "vcf", "asc", "reg", "sql"
    ]
  },
  { name: "Text & Markdown", extensions: ["txt", "md", "mdown", "markdown", "rtf"] },
  { name: "Data Files", extensions: ["json", "xml", "xaml", "csv", "tsv"] },
  { name: "Web Files", extensions: ["htm", "html", "svg", "css", "scss", "sass", "less"] },
  {
    name: "Source Code",
    extensions: ["cs", "tsx", "jsx", "js", "mjs", "ts", "c", "cpp", "h", "hpp", "java", "py", "php", "rb", "go", "rs", "sql"]
  },
  { name: "Configuration", extensions: ["local", "env", "config", "conf", "ini", "yml", "yaml", "toml", "cfg", "properties"] },
  { name: "Scripts", extensions: ["ps1", "sh", "bat", "cmd", "bash", "zsh"] },
  { name: "Logs & Subtitles", extensions: ["log", "nfo", "srt", "vtt"] },
  { name: "Any File", extensions: ["*"] },
];

export const onOpenFileDialog = async (
  callback: (name: string, content: string, path: string) => void,
) => {
  try {
    const file = await open({
      multiple: false,
      directory: false,
      filters: filters
    });

    if (!file) return;
    const data = await readTextFile(file);
    callback(await basename(file), data, file);
  } catch (err) {
    console.error(err);
  }
};
export const onSaveFileDialog = async (
  content: string,
  callback: (name: string, path: string) => void,
) => {
  try {
    const filePath = await save({
      filters: filters,
    });
    if (filePath) {
      await writeTextFile(filePath, content);
      callback(await basename(filePath), filePath);
    }

    // You can use the file object to read its content
  } catch (err) {
    console.error(err);
  }
};
