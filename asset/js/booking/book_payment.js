import { config } from "../config.js";

// % Mengambil semua data dari session
let user_data = JSON.parse(window.sessionStorage.getItem("user-data"));
let booking_data = JSON.parse(window.sessionStorage.getItem("booking-data"));

console.log(JSON.parse(window.sessionStorage.getItem("booking-data")));

// ! INI PREVENT ORG UNTUK LANGSUNG BUKA HALAMAN INI HEHE START
if (booking_data === null || booking_data["id_kamar"] === "") {
  window.sessionStorage.removeItem("booking-data");
  window.location.href = "../booking/book_form.html";
}
// ! INI PREVENT ORG UNTUK LANGSUNG BUKA HALAMAN INI HEHE END

// % ASSIGN period
const check_in = document.querySelector("#book-check-in");
check_in.innerHTML = dateFormatOne(booking_data["check_in"]);
const check_out = document.querySelector("#book-check-out");
check_out.innerHTML = dateFormatOne(booking_data["check_out"]);

// % ASSIGN room and bed
const room = document.querySelectorAll("#book-room");
room.forEach((e) => {
  e.innerHTML = booking_data["nama_kamar"];
});
const bed = document.querySelectorAll("#book-bed");
bed.forEach((e) => {
  e.innerHTML = booking_data["beds"];
});

// % ASSIGN information name and student_id
const name = document.querySelector("#book-name");
name.innerHTML = booking_data["name"];
const nim_nik = document.querySelector("#book-user-id");
nim_nik.innerHTML = booking_data["nim_nik"];

// =====================================================

// % Untuk mengubah judul title pada receipt sesuai tipe transaksinya
const receipt_title = document.querySelector("#receipt-title");
receipt_title.innerHTML = `${booking_data["jenis_transaksi"]}`;

// % ASSIGN harga kamar per month
const room_price = document.querySelector("#room-price");
room_price.innerHTML = `${betterPriceFormat(booking_data["harga_kamar"])} / Month`;

// % ASSIGN selisih bulan
const SELISIH_BULAN_NEW = monthDiff(booking_data["check_in"], booking_data["check_out"]);
const date_count = document.querySelector("#date-count");
date_count.innerHTML = `${SELISIH_BULAN_NEW} Month`;

// % ASSIGN harga sesuai selisih bulan
let bill_price_value = SELISIH_BULAN_NEW * booking_data["harga_kamar"];
document.querySelector("#bill-price").innerHTML = `${betterPriceFormat(bill_price_value)}`;

// ! UNTUK TIPE TRANSAKSI YANG EXTEND
if (booking_data["jenis_transaksi"] === "Extend") {
  //% Assign label paid month
  const label_paid_date_count = document.querySelector("#label-paid-date-count");
  label_paid_date_count.innerHTML = `Paid month`;

  //% Assign selisih paid month
  const SELISIH_BULAN_OLD = monthDiff(booking_data["check_in"], booking_data["old_check_out"]);
  const paid_date_count = document.querySelector("#paid-date-count");
  paid_date_count.innerHTML = `${SELISIH_BULAN_OLD} Month`;

  //% Assign harga sesuai selisih paid month
  document.querySelector("#label-old-payment").innerHTML = "Paid bill";
  let paid_bill_price_value = SELISIH_BULAN_OLD * booking_data["harga_kamar"];
  document.querySelector("#old-payment").innerHTML = `( - ) ${betterPriceFormat(paid_bill_price_value)}`;

  bill_price_value -= paid_bill_price_value;
}

// % Menghitung harga tax
const tax_price_value = bill_price_value * (10 / 100);
const tax_price = document.querySelector("#tax-price");
tax_price.innerHTML = `${betterPriceFormat(tax_price_value)}`;

// % Menghitung harga total setelah ditambahkan tax
const total_price_value = bill_price_value + tax_price_value;
const total_price = document.querySelector("#total-price");
total_price.innerHTML = `${betterPriceFormat(total_price_value)}`;

booking_data["total_harga"] = total_price_value;

//=========================================

// % jika payment button sudah di klik
const payment_button = document.querySelector("#payment-button");
payment_button.addEventListener("click", () => {
  // % Menambahkan variable baru pada assoc array untuk post sesuai parameter
  const book_payment = document.querySelector("#book-payment");
  booking_data["payment_method"] = book_payment.value;
  booking_data["id_user"] = user_data["id_user"];
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
  if (booking_data["jenis_transaksi"] === "Booking") {
    endpoint = `${config.api}createNewTransaksi`;
  } else if (booking_data["jenis_transaksi"] === "Extend") {
    booking_data["catatan"] = `extend dari transaksi yang memiliki id ${booking_data["id_transaksi"]}`;
    endpoint = `${config.api}extendTransaksi`;
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

function betterPriceFormat(price) {
  const betterPriceFormatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  });

  return betterPriceFormatter.format(price);
}

function monthDiff(date_one, date_two) {
  const date1 = new Date(date_one);
  const date2 = new Date(date_two);
  const difference_in_time = date2.getTime() - date1.getTime();
  const month_count = Math.floor(difference_in_time / (1000 * 3600 * 24 * 30));

  return month_count;
}

// @ untuk mengubah tgl dari YYYY-MM-DD menjadi DD - Month - YYYY
function dateFormatOne(date) {
  let datearray = date.split("-");
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let newdate = datearray[2] + " - " + monthNames[parseInt(datearray[1]) - 1] + " - " + datearray[0];

  return newdate;
}
