#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod file_explorer;
mod utils;

use std::error::Error;
use std::fs::read;
use tauri::http::{Request, Response, ResponseBuilder};
use file_explorer::{get_files, add_file};
use crate::utils::generate_project_path;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![get_files, add_file])
    // Get project directory file from custom URL.
    .register_uri_scheme_protocol("directory", move |_, request| {
      get_file(request)
    })
    // end
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

fn get_file(request: &Request) -> Result<Response, Box<dyn Error>> {
  let mut path = request.uri().replace("directory://", "");
  // Remove the last "/" of the url.
  path.pop();
  let path = generate_project_path().as_path().join(path);
  let extension = path.extension().unwrap().to_str().unwrap().to_string();
  let res_not_img = ResponseBuilder::new()
    .status(404)
    .body(Vec::new());
  println!("Project Directory");
  let local_img = if let Ok(data) = read(path) {
    ResponseBuilder::new()
      .mimetype(format!("image/{}", extension).as_str())
      .body(data)
  } else {
    res_not_img
  };

  local_img
}
