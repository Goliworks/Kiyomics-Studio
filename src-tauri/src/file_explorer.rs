use std::fs::File;
use std::process::Command;
use std::str;
use std::path::Path;

#[tauri::command]
pub fn get_files() -> Vec<FileData> {
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
    files.push(create_file_data(file_name));
  }
  files
}

fn create_file_data(file_name: String) -> FileData{
  FileData {
    data: FileDataContent {
      name: file_name,
      file_type: "Image".into(),
      dimensions: "800x600".into()
    }
  }
}

#[derive(serde::Serialize)]
pub struct FileData {
  data: FileDataContent,
}

#[derive(serde::Serialize)]
struct FileDataContent {
  name: String,
  file_type: String,
  dimensions: String
}
