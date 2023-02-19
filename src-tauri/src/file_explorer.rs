use std::fs::{DirEntry};
use std::{fs, str};
use std::path::{Path};
use crate::utils::{bytes_to_size, generate_project_path};

static AUTHORIZED_FILES: &[&str] = &["jpg","jpeg","png", "gif"];

#[tauri::command]
pub fn get_files(path: Option<String>) -> Vec<FileData> {
  let mut project_path = generate_project_path(); // Test

  if path.is_some() {
    let path = path.unwrap();
    let dirs = path.split('/');
    for dir in dirs {
      project_path.push(dir);
    }
  }

  let mut files = vec![];

  for entry in project_path.read_dir().expect("read_idr failed") {
    let file = entry.as_ref().unwrap();
    create_file_data(file, &mut files);
  }
  files
}

fn create_file_data(file: &DirEntry, files: &mut Vec<FileData>){
  // Add file only if it's an authorized file or a folder.
  let name = file.file_name().into_string().unwrap();
  if file.path().is_dir() {
    files.push(FileData {
      data: FileDataContent {
        name,
        file_type: String::from("FOLDER"),
        size: String::from("--")
      }
    });
  } else if name != ".DS_Store" { // Avoid MacOS hidden file.
    let extension = file.path().extension().unwrap().to_str().unwrap().to_string();
    if AUTHORIZED_FILES.contains(&extension.as_str()) {
      let bytes = file.metadata().unwrap().len();
      files.push(FileData {
        data: FileDataContent {
          name,
          file_type: extension.to_uppercase(),
          size: bytes_to_size(bytes)
        }
      });
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
  size: String
}


#[tauri::command]
pub fn add_file(file: String) -> Vec<FileData> {
  let file_name = Path::new(&file).file_name().unwrap().to_str().unwrap();
  println!("File added : {}", file);
  let file_destination = generate_project_path().join(file_name);
  fs::copy(file, file_destination).unwrap();
  // Return directory content.
  get_files(None)
}
