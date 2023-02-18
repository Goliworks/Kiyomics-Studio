use std::fs::{DirEntry, File};
use std::process::Command;
use std::{fs, str};
use std::path::{Path, PathBuf};

#[tauri::command]
pub fn get_files() -> Vec<FileData> {
  let path = generateProjectPath(); // Test

  let mut files = vec![];

  for entry in path.read_dir().expect("read_idr failed") {
    let file = entry.as_ref().unwrap();
    files.push(create_file_data(file));
  }
  files
}

fn create_file_data(file: &DirEntry) -> FileData{
  let name = file.file_name().into_string().unwrap();
  let bytes = file.metadata().unwrap().len();
  let extension = file.path().extension().unwrap().to_str().unwrap().to_uppercase();
  FileData {
    data: FileDataContent {
      name,
      file_type: extension,
      size: bytesToSize(bytes)
    }
  }
}

fn bytesToSize(bytes: u64) -> String {
  let size = (bytes as f64 ) / 1000.0;
  format!("{} KB", size.round())
}

#[derive(serde::Serialize)]
pub struct FileData {
  data: FileDataContent,
}

#[derive(serde::Serialize)]
struct FileDataContent {
  name: String,
  file_type: String,
  size: String
}

// Temporary. Only for tests.
pub fn generateProjectPath() -> PathBuf {
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
pub fn add_file(file: String) -> Vec<FileData> {
  let file_name = Path::new(&file).file_name().unwrap().to_str().unwrap();
  println!("File added : {}", file);
  let a = generateProjectPath().join(file_name);
  fs::copy(file, a).unwrap();
  // Return directory content.
  get_files()
}
