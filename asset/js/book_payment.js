import { config } from "./config.js";

let user_data = JSON.parse(window.sessionStorage.getItem("user-data"));
const userRole = user_data["role"];

console.log(JSON.parse(window.sessionStorage.getItem("booking-data")));

// ! INI PREVENT ORG UNTUK LANGSUNG BUKA HALAMAN INI HEHE START
let booking_data = JSON.parse(window.sessionStorage.getItem("booking-data"));
if (booking_data === null || booking_data["id_kamar"] === "") {
  window.location.href = "../booking/book_form.html";
}
// ! INI PREVENT ORG UNTUK LANGSUNG BUKA HALAMAN INI HEHE END

const id_label = document.querySelector("#id-label");
const type_of_date = document.querySelectorAll("#type-of-date");

// % Untuk mengubah label pada html sesuai ROLE yang ada
if (userRole === "student") {
  id_label.innerHTML = "Student ID";
  type_of_date.forEach((e) => {
    e.innerHTML = "Month";
  });
} else if (userRole === "guest") {
  id_label.innerHTML = "NIK";
  type_of_date.forEach((e) => {
    e.innerHTML = "Day";
  });
}

// % Take and assign value from Session Storage
const check_in = document.querySelector("#book-check-in");
const check_out = document.querySelector("#book-check-out");
const room = document.querySelectorAll("#book-room");
const bed = document.querySelectorAll("#book-bed");
const name = document.querySelector("#book-name");
const user_id = document.querySelector("#book-user-id");

const check_in_value = booking_data["check_in"];
const check_out_value = booking_data["check_out"];
const room_value = booking_data["nama_kamar"];
const beds_value = booking_data["beds"];
const name_value = booking_data["name"];
const user_id_value = booking_data["nim_nik"];

check_in.innerHTML = dateFormatOne(check_in_value);
check_out.innerHTML = dateFormatOne(check_out_value);
room.forEach((e) => {
  e.innerHTML = room_value;
});
bed.forEach((e) => {
  e.innerHTML = beds_value;
});
name.innerHTML = name_value;
user_id.innerHTML = user_id_value;

// % Menghitung periode tanggal check in dan check out
const date1 = new Date(check_in_value);
const date2 = new Date(check_out_value);
const difference_in_time = date2.getTime() - date1.getTime();
let difference_in_month = 0;
let difference_in_day = 0;

// % Assign data pada bagian kanan
const room_price = document.querySelector("#room-price");
const tax_price = document.querySelector("#tax-price");
const total_price = document.querySelector("#total-price");

// ! INI UNTUK STUDENT
if (userRole === "student") {
  difference_in_month = difference_in_time / (1000 * 3600 * 24 * 30); // ini hasil hitung selisih month
  difference_in_day = difference_in_time / (1000 * 3600 * 24); // ini hasil hitung selisih month
  const date_count = document.querySelector("#date-count");
  date_count.innerHTML = Math.floor(difference_in_month);

  // % Menghitung harga yang diperlukan
  let price = booking_data["harga_kamar"] * 30;
  const count_price = price * parseInt(difference_in_month);
  const tax_price_value = count_price * (10 / 100);
  const total_price_value = count_price + tax_price_value;

  room_price.innerHTML = price;
  tax_price.innerHTML = tax_price_value;
  total_price.innerHTML = total_price_value;
  booking_data["total_harga"] = total_price_value;

  // ! INI UNTUK GUEST
} else if (userRole === "guest") {
  difference_in_day = difference_in_time / (1000 * 3600 * 24);
  const date_count = document.querySelector("#date-count");
  date_count.innerHTML = Math.floor(difference_in_day);

  // % Menghitung harga yang diperlukan
  let price = booking_data["harga_kamar"] * 1;
  const count_price = price * parseInt(difference_in_day);
  const tax_price_value = count_price * (10 / 100);
  const total_price_value = count_price + tax_price_value;

  room_price.innerHTML = price;
  tax_price.innerHTML = tax_price_value;
  total_price.innerHTML = total_price_value;
  booking_data["total_harga"] = total_price_value;
}

// % jika payment button sudah di klik
const payment_button = document.querySelector("#payment-button");
payment_button.addEventListener("click", () => {
  const book_payment = document.querySelector("#book-payment");
  booking_data["payment_method"] = book_payment.value;
  booking_data["va"] = "123456789";

  console.log(booking_data);
  // ? disini tempat buat masukin ke database
  const endpoint = `${config.api}createNewTransaksi`;
  const formData = new URLSearchParams();
  for (const [key, value] of Object.entries(booking_data)) {
    formData.append(key, value.toString());
  }
  //Submit Data
  fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  })
    .then((response) => response.json())
    .then((response) => console.log(JSON.stringify(response)));

  // ? disini tempat buat masukin ke database
  window.sessionStorage.removeItem("booking-data");
  window.location.href = "../transaction_page.html";
});

// @ untuk mengubah tgl dari YYYY-MM-DD menjadi DD - Month - YYYY
function dateFormatOne(date) {
  let datearray = date.split("-");
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let newdate =
    datearray[2] +
    " - " +
    monthNames[parseInt(datearray[1]) - 1] +
    " - " +
    datearray[0];

  return newdate;
}
