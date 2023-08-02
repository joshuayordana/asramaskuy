import { config } from "./config.js";

let user_data = JSON.parse(window.sessionStorage.getItem("user-data"));

console.log(JSON.parse(window.sessionStorage.getItem("booking-data")));

// ! INI PREVENT ORG UNTUK LANGSUNG BUKA HALAMAN INI HEHE START
let booking_data = JSON.parse(window.sessionStorage.getItem("booking-data"));
if (booking_data === null || booking_data["id_kamar"] === "") {
  window.location.href = "../booking/book_form.html";
}
// ! INI PREVENT ORG UNTUK LANGSUNG BUKA HALAMAN INI HEHE END

const receipt_title = document.querySelector("#receipt-title");
receipt_title.innerHTML = `${booking_data["jenis_transaksi"]}`;

// % TAKE value from Session Storage
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

// % ASSIGN value from Session Storage
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
let difference_in_month = difference_in_time / (1000 * 3600 * 24 * 30);

// % AMBIL ID data pada bagian kanan
const room_price = document.querySelector("#room-price");
const tax_price = document.querySelector("#tax-price");
const total_price = document.querySelector("#total-price");
const bill_price = document.querySelector("#bill-price");
const date_count = document.querySelector("#date-count");
date_count.innerHTML = Math.floor(difference_in_month);

const betterPriceFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 2,
});

// % MENGHITUNG HARGA PADA BAGIAN RECEIPT BAGIAN KANAN
const total_month_price = booking_data["harga_kamar"] * parseInt(difference_in_month);
let current_price_value;
if (booking_data["jenis_transaksi"] === "extend") {
  current_price_value = total_month_price - booking_data["pembayaran_sebelumnya"];
  document.querySelector("#label-old-payment").innerHTML = "Prepaid transaction";
  document.querySelector("#old-payment").innerHTML = `( - ) ${betterPriceFormatter.format(booking_data["pembayaran_sebelumnya"])}`;
} else {
  current_price_value = total_month_price;
}
const tax_price_value = current_price_value * (10 / 100);
const total_price_value = current_price_value + tax_price_value;

// % ASSIGN value room_price, bill price, tax_price, total_price
room_price.innerHTML = betterPriceFormatter.format(booking_data["harga_kamar"]);
bill_price.innerHTML = betterPriceFormatter.format(total_month_price);
tax_price.innerHTML = betterPriceFormatter.format(tax_price_value);
total_price.innerHTML = betterPriceFormatter.format(total_price_value);
booking_data["total_harga"] = total_price_value;

// % jika payment button sudah di klik
const payment_button = document.querySelector("#payment-button");
payment_button.addEventListener("click", () => {
  // % Menambahkan variable baru pada assoc array untuk post sesuai parameter
  const book_payment = document.querySelector("#book-payment");
  booking_data["id_user"] = user_data["id_user"];
  booking_data["payment_method"] = book_payment.value;
  booking_data["va"] = "123456789";

  /**
   * DATA PENTING
   *
   * check in
   * check out
   * id user
   * payment method
   * total pembayaran
   * va
   * id kamar
   *
   * id transaksi (untuk extend)
   * catatan (untuk extend)
   */

  // % Menyesuaikan endpoint berdasarkan tipe transaksi
  let endpoint;
  if (booking_data["jenis_transaksi"] === "booking") {
    endpoint = `${config.api}createNewTransaksi`;
  } else if (booking_data["jenis_transaksi"] === "extend") {
    booking_data["catatan"] = `extend dari transaksi yang memiliki id ${booking_data["id_transaksi"]}`;
    endpoint = `${config.api}extendTransaksi`; // ? BELUM YANG INI UNTUK EXTEND
  }

  console.log(booking_data);
  console.log(endpoint);
  // ? disini tempat buat masukin ke database
  const formData = new URLSearchParams();
  for (const [key, value] of Object.entries(booking_data)) {
    formData.append(key, value.toString());
  }

  // % Submit Data
  fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  })
    .then((response) => response.json())
    .then((response) => console.log(JSON.stringify(response)))
    .finally(() => {
      // % Melanjutkan ke halaman transaksi
      window.sessionStorage.removeItem("booking-data");
      window.location.href = "../transaction_page.html";
    });
  // ? disini tempat buat masukin ke database
});

// @ untuk mengubah tgl dari YYYY-MM-DD menjadi DD - Month - YYYY
function dateFormatOne(date) {
  let datearray = date.split("-");
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let newdate = datearray[2] + " - " + monthNames[parseInt(datearray[1]) - 1] + " - " + datearray[0];

  return newdate;
}
