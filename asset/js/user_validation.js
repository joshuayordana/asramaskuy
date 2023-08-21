// ? ini harusnya ngambil rolenya dri local storage atau gtau dah
let user_data = JSON.parse(window.sessionStorage.getItem("user-data"));
if (user_data === null || user_data["id_user"] === "") {
  window.location.href = "../landing_page.html";
}
// ? ini temapt untuk cek nanti sudah login atau belum
