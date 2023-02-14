#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

#[tauri::command]
fn get_files() -> String {
  "Files from rust".into()
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![get_files])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
