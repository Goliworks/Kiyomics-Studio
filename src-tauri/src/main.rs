#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::process::Command;
use std::env;
use std::str;
use std::path::Path;

#[tauri::command]
fn get_files() -> Vec<String> {
  // Only for Linux and MacOS.
  let path_cmd = Command::new("sh")
    .arg("-c")
    .arg("echo $HOME")
    .output()
    .expect("failed to execute process");

  let path = str::from_utf8(&path_cmd.stdout).unwrap().trim();
  let path = Path::new(&path).join("Documents/ks-test"); // Test

  let mut files = vec![];

  for entry in path.read_dir().expect("read_idr failed") {
    let file_name = entry.unwrap().file_name().into_string().unwrap();
    files.push(file_name);
  }
  files
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![get_files])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
