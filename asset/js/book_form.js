import { config } from "./config.js";

let user_data = JSON.parse(window.sessionStorage.getItem("user-data"));
const userRole = user_data["role"];

const student_period_input = document.querySelector("#student-period");
const student_bed_input = document.querySelector("#student-bed");
const guest_period_input = document.querySelector("#guest-period");
const guest_bed_input = document.querySelector("#guest-bed");
const id_label = document.querySelector("#id-label");
const name = document.querySelector("#book-name");
const nim_nik = document.querySelector("#book-nim-nik");

// % Untuk mengubah input period dan id column sesuai ROLE yang ada
if (userRole === "student") {
  guest_period_input.classList.add("not-active");
  guest_bed_input.classList.add("not-active");
  id_label.innerHTML = "Student ID";
} else if (userRole === "guest") {
  student_period_input.classList.add("not-active");
  student_bed_input.classList.add("not-active");
  id_label.innerHTML = "NIK";
}

const endpoint = `${config.api}getUserById?id_user=${user_data["id_user"]}`;

fetch(endpoint)
  .then((result) => result.json())
  .then(({ data }) => {
    console.log(data);
    // if role student maka ambil nim sedangkan else if guest maka ambil nik
    // name.innerhtml = bla bla
    // nim_nik.innerhtml = bla bla
  });

const pick_room_button = document.querySelector("#pick-room-button");
pick_room_button.addEventListener("click", () => {
  let booking_data = {
    id_gedung: "",
    id_kamar: "",
  };

  // % Untuk memasukkan data ke local storage berdasarkan ROLE dari user
  if (userRole === "student") {
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
  } else if (userRole === "guest") {
    const check_in_warning = document.querySelector("#check-in-warning");
    const check_out_warning = document.querySelector("#check-out-warning");

    // % taking the date data
    const book_check_in = document.querySelector("#book-check-in");
    const book_check_out = document.querySelector("#book-check-out");
    const in_date = new Date(book_check_in.value);
    const out_date = new Date(book_check_out.value);
    const curr_date = new Date();
    const today = `${curr_date.getFullYear()}-${
      curr_date.getMonth() + 1
    }-${curr_date.getDate()}`;
    const formatted_today = new Date(today);

    // ! warning CHECK ON DATE INPUT START
    if (book_check_in.value === "") {
      check_in_warning.innerHTML = "Date must not be empty";
      return false;
    } else if (book_check_out.value === "") {
      check_in_warning.innerHTML = "";
      check_out_warning.innerHTML = "Date must not be empty";
      return false;
    } else if (in_date < formatted_today) {
      check_in_warning.innerHTML = "Date minimum is today";
      return false;
    } else if (out_date <= in_date) {
      check_in_warning.innerHTML = "";
      check_out_warning.innerHTML = "date must be later than check in date";
      return false;
    } else {
      check_in_warning.innerHTML = "";
      check_out_warning.innerHTML = "";
    }
    // ! warning CHECK ON DATE INPUT END

    booking_data["check_in"] = book_check_in.value;
    booking_data["check_out"] = book_check_out.value;
    const beds_guest = document.querySelector("#book-bed-guest");
    booking_data["beds"] = beds_guest.value;
  }

  booking_data["name"] = name.textContent; // ini nanti ambil dri api
  booking_data["nim_nik"] = nim_nik.textContent;
  booking_data["id_user"] = user_data["id_user"]; // DIAMBIL DARI SESSION

  // % lanjut ke next page jika input form sudah TIDAK ADA warning
  window.sessionStorage.setItem("booking-data", JSON.stringify(booking_data));
  console.log(JSON.parse(window.sessionStorage.getItem("booking-data")));
  window.location.href = "tower_page.html";
});
