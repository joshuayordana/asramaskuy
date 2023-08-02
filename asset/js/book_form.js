import { config } from "./config.js";

let user_data = JSON.parse(window.sessionStorage.getItem("user-data"));

const endpoint = `${config.api}getUserById?id_user=${user_data["id_user"]}`;

const name = document.querySelector("#book-name");
const nim_nik = document.querySelector("#book-nim-nik");

fetch(endpoint)
  .then((result) => result.json())
  .then(({ data }) => {
    name.innerHTML = data.Data[0].name;
    nim_nik.innerHTML = data.Data[0].nim;
  });

const pick_room_button = document.querySelector("#pick-room-button");
pick_room_button.addEventListener("click", () => {
  let booking_data = {
    id_gedung: "",
    id_kamar: "",
  };

  // $ NOTE: ini awalnya harus format input = (MM/DD/YY) dgn value (YY-MM-DD) akan dijadikan format DD/MM/YY nantinya
  const period = document.querySelector("#book-period");
  if (period.value === "date-1") {
    booking_data["check_in"] = "2023-07-01";
    booking_data["check_out"] = "2024-01-01";
  } else if (period.value === "date-2") {
    booking_data["check_in"] = "2023-07-01";
    booking_data["check_out"] = "2024-07-01";
  }
  const beds_student = document.querySelector("#book-bed-student");
  booking_data["beds"] = beds_student.value;

  booking_data["name"] = name.textContent; // ini nanti ambil dri api
  booking_data["nim_nik"] = nim_nik.textContent; // ini nanti ambil dri api

  // % lanjut ke next page jika input form sudah TIDAK ADA warning
  booking_data["jenis_transaksi"] = "booking";
  window.sessionStorage.setItem("booking-data", JSON.stringify(booking_data));
  console.log(JSON.parse(window.sessionStorage.getItem("booking-data")));
  window.location.href = "tower_page.html";
});
