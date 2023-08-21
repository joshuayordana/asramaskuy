import { config } from "../config.js";

let user_data = JSON.parse(window.sessionStorage.getItem("user-data"));
// let isActive = false;

let booking_data = {
  id_gedung: "",
  id_kamar: "",
};

// % Memasukkan data informasi student id dan nama
const name = document.querySelector("#book-name");
const nim_nik = document.querySelector("#book-nim-nik");
const endpoint = `${config.api}getUserById?id_user=${user_data["id_user"]}`;
fetch(endpoint)
  .then((result) => result.json())
  .then(({ data }) => {
    console.log(data.Data);
    booking_data["name"] = data.Data[0].name; // ini nanti ambil dri api
    booking_data["nim_nik"] = data.Data[0].nim;
    booking_data["jenis_kelamin"] = data.Data[0].jenis_kelamin;
    name.innerHTML = data.Data[0].name;
    nim_nik.innerHTML = data.Data[0].nim;

    // if (data.Data.status === "Active") {
    //   isActive = false;
    // } else {
    //   isActive = true;
    // }
  });

// % Jika button pilih tower ditekan
const pick_room_button = document.querySelector("#pick-room-button");
pick_room_button.addEventListener("click", () => {
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

  // % lanjut ke next page jika input form sudah TIDAK ADA warning
  booking_data["jenis_transaksi"] = "Booking";
  window.sessionStorage.setItem("booking-data", JSON.stringify(booking_data));
  console.log(JSON.parse(window.sessionStorage.getItem("booking-data")));
  window.location.href = "tower_page.html";
});
