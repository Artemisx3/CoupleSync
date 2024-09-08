#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::fs::OpenOptions;
use std::io::Write;
use tauri::Manager;

#[tauri::command]
fn save_api_key(key: String) -> Result<(), String> {
    let mut file = OpenOptions::new()
        .write(true)
        .create(true)
        .truncate(true)
        .open(".env")
        .map_err(|e| e.to_string())?;

    writeln!(file, "VITE_WEATHER_API_KEY={}", key)
        .map_err(|e| e.to_string())?;

    Ok(())
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            // Removed the open_devtools call to prevent console from showing up
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![save_api_key])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
