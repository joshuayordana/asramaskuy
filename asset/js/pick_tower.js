import { config } from "./config";
const userRole = "student";
console.log(JSON.parse(window.sessionStorage.getItem("booking-data")));
// ! INI PREVENT ORG UNTUK LANGSUNG BUKA HALAMAN INI HEHE START
let booking_data = JSON.parse(window.sessionStorage.getItem("booking-data"));
if (booking_data === null || booking_data["user-id"] === "") {
  window.location.href = "../booking/book_form.html";
}
// ! INI PREVENT ORG UNTUK LANGSUNG BUKA HALAMAN INI HEHE END

// ? disini tempat nampilin room dan lantainya MEN
const endpoint =
  `${config.api}getGedungByJenisKelamin?jenis_kelamin=Laki-Laki`;

// fetch(endpoint)
//   .then((result) => result.json())
//   .then(({ data }) => console.log(data));
// CODE HERE

const tower_box_men = document.querySelector("#tower-men-1"); // ini nanti indexnya ganti2 / atau di loop per tower
const pick_tower_button_men = tower_box_men.querySelector("#pick-tower-button");
pick_tower_button_men.addEventListener("click", () => {
  const tower_name = tower_box_men.querySelector("#tower-name");
  booking_data["tower"] = tower_name.textContent;
  window.sessionStorage.setItem("booking-data", JSON.stringify(booking_data));
  console.log(JSON.parse(window.sessionStorage.getItem("booking-data")));
  window.location.href = "room_page.html";
});

// ? disini tempat nampilin room dan lantainya MEN

// ========================

// ? disini tempat nampilin room dan lantainya GIRL

// CODE HERE

const tower_box_girl = document.querySelector("#tower-girl-1"); // ini nanti indexnya ganti2 / atau di loop per tower
const pick_tower_button_girl =
  tower_box_girl.querySelector("#pick-tower-button");
pick_tower_button_girl.addEventListener("click", () => {
  const tower_name = tower_box_girl.querySelector("#tower-name");
  booking_data["tower"] = tower_name.textContent;
  window.sessionStorage.setItem("booking-data", JSON.stringify(booking_data));
  console.log(JSON.parse(window.sessionStorage.getItem("booking-data")));
  window.location.href = "room_page.html";
});

// ? disini tempat nampilin room dan lantainya GIRL
