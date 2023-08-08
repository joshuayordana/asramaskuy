let booking_data = JSON.parse(window.sessionStorage.getItem("booking-data"));
console.log(booking_data);

// ! INI PREVENT ORG UNTUK LANGSUNG BUKA HALAMAN INI HEHE START
if (booking_data === null || booking_data["id_kamar"] === "") {
  window.location.href = "../transaction_page.html";
}
// ! INI PREVENT ORG UNTUK LANGSUNG BUKA HALAMAN INI HEHE END

// % ASSIGN Kamar yang sama seperti sebelumnya
const book_room = document.querySelector("#book-room");
book_room.innerHTML = booking_data["nama_kamar"];

// % ASSIGN information NAMA dan Student ID
const nama_user = document.querySelector("#book-name");
nama_user.innerHTML = booking_data["name"];
const nim_nik = document.querySelector("#book-nim-nik");
nim_nik.innerHTML = booking_data["nim_nik"];

// % Jika tombol extend ready untuk di klik
const extend_button = document.querySelector("#extend-button");
extend_button.addEventListener("click", () => {
  const selected_month_value = document.querySelector("#book-period");

  // % mengubah data check-in dan check-out yang awalnya string menjadi date
  let old_date_out = new Date(booking_data["old_check_out"]);
  old_date_out.setMonth(old_date_out.getMonth() + parseInt(selected_month_value.value));

  // ! VALUE BARU CHECK OUT MASUK KE SESSION YYYY-MM-DD
  booking_data["check_out"] = old_date_out.toISOString().slice(0, 10);
  console.log(booking_data);

  // % lanjut ke halaman payment
  window.sessionStorage.setItem("booking-data", JSON.stringify(booking_data));
  window.location.href = "book_payment.html";
});
