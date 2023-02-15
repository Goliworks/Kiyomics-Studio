#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod file_explorer;

use file_explorer::get_files;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![get_files])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
