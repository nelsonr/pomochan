use tauri_plugin_notification::NotificationExt;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn notify(app: tauri::AppHandle) {
    app.notification()
        .builder()
        .title("Pomochan")
        .body("Time is up! Take a break!")
        .show()
        .unwrap()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![notify])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
