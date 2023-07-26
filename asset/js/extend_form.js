const userRole = "guest";

const check_out_student = document.querySelector("#check-out-student");
const check_out_guest = document.querySelector("#check-out-guest");
const id_label = document.querySelector("#id-label");

//Data dummy
let booking_data = {
  "check-in": "2023-07-23",
  "check-out": "2023-07-23",
  beds: "1",
  name: "susanto",
  "user-id": "c14200200",
  tower: "A",
  room: "A-104",
  "payment-method": "",
};

// ! ingat nanti dibagian transaksi pas mau masukin session extend tlong ubah formatnya jadi YYYY-MM-DD
// ? passing data dri transaksi

// Code Here

// ? passing data dri transaksi

// % memasukkan data check out lama ke kolom check in pada form extend
const book_check_in = document.querySelector("#book-check-in");
book_check_in.innerHTML = dateFormatOne(booking_data["check-out"]);

// % mengubah data check-in dan check-out yang awalnya string menjadi date
let old_date_in = new Date(booking_data["check-in"]); // check in NOTE: Format harus YYYY-MM-DD
let old_date_out = new Date(booking_data["check-out"]); // check out

booking_data["check-in"] = booking_data["check-out"]; // ! VALUE BARU CHECK IN MASUK KE SESSION

// % Untuk mengubah input period dan id column sesuai ROLE yang ada
if (userRole === "student") {
  check_out_guest.classList.add("not-active");
  id_label.innerHTML = "Student ID";

  // % mehitung perbedaan bulan pada check in lama - dan baru
  const difference_in_time = old_date_out.getTime() - old_date_in.getTime();
  let difference_in_date = Math.floor(
    difference_in_time / (1000 * 3600 * 24 * 30)
  );
  console.log(difference_in_date);

  // % menambahkan perbedaan waktu ke checkout lama
  old_date_out.setMonth(old_date_out.getMonth() + difference_in_date);

  let formattedDate_student = old_date_out.toISOString().slice(0, 10);

  // % memasukkannya ke dalam kolom checkout pada form
  const book_check_out = check_out_student.querySelector("#book-check-out");
  book_check_out.innerHTML = dateFormatOne(formattedDate_student);

  booking_data["check-out"] = formattedDate_student; // ! VALUE BARU CHECK OUT MASUK KE SESSION
} else if (userRole === "guest") {
  check_out_student.classList.add("not-active");
  id_label.innerHTML = "NIK";
}

// % Jika tombol extend ready untuk di klik
const extend_button = document.querySelector("#extend-button");
extend_button.addEventListener("click", () => {
  if (userRole === "guest") {
    const book_check_out = check_out_guest.querySelector("#book-check-out");
    const check_out_warning =
      check_out_guest.querySelector("#check-out-warning");
    let new_date_out = new Date(book_check_out.value);

    // ! warning CHECK ON DATE INPUT START
    if (book_check_out.value === "") {
      check_out_warning.innerHTML = "Date must not be empty";
      return false;
    } else if (new_date_out <= old_date_out) {
      check_out_warning.innerHTML = "date must be later than check in date";
      return false;
    } else {
      check_out_warning.innerHTML = "";
      let formattedDate_guest = new_date_out.toISOString().slice(0, 10);
      booking_data["check-out"] = formattedDate_guest; // ! VALUE BARU CHECK OUT MASUK KE SESSION
    }
    // ! warning CHECK ON DATE INPUT END
  }

  window.sessionStorage.setItem("booking-data", JSON.stringify(booking_data));
  window.location.href = "book_payment.html";
});

// @ untuk mengubah tgl dari YYYY-MM-DD menjadi MM/DD/YYYY
function dateFormatOne(date) {
  let datearray = date.split("-");
  let newdate = datearray[1] + "/" + datearray[2] + "/" + datearray[0];

  return newdate;
}
