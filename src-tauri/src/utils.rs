use std::path::{Path, PathBuf};
use std::process::Command;
use std::str;

pub fn bytes_to_size(bytes: u64) -> String {
  let size = (bytes as f64 ) / 1000.0;
  format!("{} KB", size.round())
}

// Temporary. Only for tests.
pub fn generate_project_path() -> PathBuf {
  // Only for Linux and MacOS.
  let path_cmd = Command::new("sh")
    .arg("-c")
    .arg("echo $HOME")
    .output()
    .expect("failed to execute process");

  let path = str::from_utf8(&path_cmd.stdout).unwrap().trim();
  Path::new(&path).join("Documents/ks-test") // Test
}

#[tauri::command]
pub fn get_documents_path() -> String {
  // Only for Linux and MacOS.
  let path_cmd = Command::new("sh")
    .arg("-c")
    .arg("echo $HOME/Documents")
    .output()
    .expect("failed to execute process");

    String::from_utf8(path_cmd.stdout).unwrap()
}
