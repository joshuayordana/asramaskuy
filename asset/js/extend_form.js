let booking_data = JSON.parse(window.sessionStorage.getItem("booking-data"));
console.log(booking_data);

const book_room = document.querySelector("#book-room");
book_room.innerHTML = booking_data["nama_kamar"];

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
  old_date_out.setMonth(old_date_out.getMonth() + selected_month_value.value);
  const formatted_normal_date = old_date_out.toISOString().slice(0, 10);
  booking_data["check_out"] = formatted_normal_date; // ! VALUE BARU CHECK OUT MASUK KE SESSION YYYY-MM-DD
  console.log(booking_data);
  window.sessionStorage.setItem("booking-data", JSON.stringify(booking_data));
  window.location.href = "book_payment.html";
});

// @ untuk mengubah tgl dari YYYY-MM-DD menjadi MM/DD/YYYY
function dateFormatOne(date) {
  let datearray = date.split("-");
  let newdate = datearray[1] + "/" + datearray[2] + "/" + datearray[0];

  return newdate;
}
