console.log(sessionStorage);
const userRole = "guest"; // ? ini harusnya ngambil rolenya dri local storage atau gtau dah

function takeBookingData() {
  const student_period_input = document.querySelector("#student-period");
  const student_bed_input = document.querySelector("#student-bed");
  const guest_period_input = document.querySelector("#guest-period");
  const guest_bed_input = document.querySelector("#guest-bed");
  const id_label = document.querySelector("#id-label");

  // Untuk mengubah input period dan id column sesuai ROLE yang ada
  if (userRole === "student") {
    guest_period_input.classList.add("not-active");
    guest_bed_input.classList.add("not-active");
    id_label.innerHTML = "Student ID";
  } else if (userRole === "guest") {
    student_period_input.classList.add("not-active");
    student_bed_input.classList.add("not-active");
    id_label.innerHTML = "NIK";
  }

  const pick_room_button = document.querySelector("#pick-room-button");
  pick_room_button.addEventListener("click", () => {
    let booking_data = {
      "check-in": "",
      "check-out": "",
      beds: "",
      name: "",
      "user-id": "",
      tower: "",
      room: "",
      "payment-method": "",
    };

    let input_problem = false;

    // Untuk memasukkan data ke local storage berdasarkan ROLE dari user
    if (userRole === "student") {
      // $ NOTE: ini awalnya harus format MM/DD/YY baru format DD/MM/YY nantinya
      const period = document.querySelector("#book-period");
      if (period.value === "date-1") {
        booking_data["check-in"] = "2023-07-01";
        booking_data["check-out"] = "2024-07-01";
      } else if (period.value === "date-2") {
        booking_data["check-in"] = "2023-07-01";
        booking_data["check-out"] = "2024-07-01";
      }
      const beds_student = document.querySelector("#book-bed-student");
      booking_data["beds"] = beds_student.value;
    } else if (userRole === "guest") {
      const check_in_warning = document.querySelector("#check-in-warning");
      const check_out_warning = document.querySelector("#check-out-warning");

      // taking the date data
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
        input_problem = true;
      } else if (book_check_out.value === "") {
        check_in_warning.innerHTML = "";
        check_out_warning.innerHTML = "Date must not be empty";
        input_problem = true;
      } else if (in_date < formatted_today) {
        check_in_warning.innerHTML = "Date minimum is today";
        input_problem = true;
      } else if (out_date <= in_date) {
        check_in_warning.innerHTML = "";
        check_out_warning.innerHTML = "date must be later than check in date";
        input_problem = true;
      } else {
        check_in_warning.innerHTML = "";
        check_out_warning.innerHTML = "";
        input_problem = false;
      }
      // ! warning CHECK ON DATE INPUT END

      booking_data["check-in"] = book_check_in.value;
      booking_data["check-out"] = book_check_out.value;
      const beds_guest = document.querySelector("#book-bed-guest");
      booking_data["beds"] = beds_guest.value;
    }

    // lanjut ke next page jika inputform sudah tidak ada warning
    if (!input_problem) {
      const name = document.querySelector("#book-name");
      const user_id = document.querySelector("#book-user-id");

      booking_data["name"] = name.textContent;
      booking_data["user-id"] = user_id.textContent;

      window.sessionStorage.setItem(
        "booking-data",
        JSON.stringify(booking_data)
      );
      console.log(JSON.parse(window.sessionStorage.getItem("booking-data")));
      window.location.href = "tower_page.html";
    }
  });
}

//=================================================

function pickTower() {
  let booking_data = JSON.parse(window.sessionStorage.getItem("booking-data"));
  if (booking_data === null || booking_data["user-id"] === "") {
    window.location.href = "booking_student.html";
  }
  // ? disini tempat nampilin room dan lantainya

  // CODE HERE

  console.log(JSON.parse(window.sessionStorage.getItem("booking-data")));
  const tower_box = document.querySelector("#tower-men-1");
  tower_box.addEventListener("click", (e) => {
    const tower_name = document.querySelector("#tower-name");
    booking_data["tower"] = tower_name.textContent;
    window.sessionStorage.setItem("booking-data", JSON.stringify(booking_data));
    window.location.href = "room_page.html";
  });

  // ? disini tempat nampilin room dan lantainya
}

//=================================================

function pickRoom() {
  let booking_data = JSON.parse(window.sessionStorage.getItem("booking-data"));
  if (
    booking_data === null ||
    booking_data["user-id"] === "" ||
    booking_data["tower"] === ""
  ) {
    window.location.href = "booking_student.html";
  }

  // ? disini tempat nampilin room dan lantainya

  // code here

  const room_box = document.querySelector("#room-1-1");
  room_box.addEventListener("click", (e) => {
    const room_name = document.querySelector("#room-name");
    booking_data["room"] = room_name.textContent;
    window.sessionStorage.setItem("booking-data", JSON.stringify(booking_data));
    console.log(JSON.parse(window.sessionStorage.getItem("booking-data")));
    window.location.href = "room_payment.html";
  });
  // ? disini tempat nampilin room dan lantainya
}

function paymentDataFill() {
  // Mengisi data form transaksi dri local storage
  let booking_data = JSON.parse(window.sessionStorage.getItem("booking-data"));
  console.log(booking_data);

  // ! INI PREVENT ORG UNTUK LANGSUNG BUKA HALAMAN INI HEHE START
  if (
    booking_data === null ||
    booking_data["user-id"] === "" ||
    booking_data["room"] === ""
  ) {
    window.location.href = "booking_student.html";
  }
  // ! INI PREVENT ORG UNTUK LANGSUNG BUKA HALAMAN INI HEHE END

  const id_label = document.querySelector("#id-label");
  const type_of_date = document.querySelectorAll("#type-of-date");

  // Untuk mengubah input period dan id column sesuai ROLE yang ada
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

  const room_price_value = parseInt("500");
  const check_in = document.querySelector("#book-check-in");
  const check_out = document.querySelector("#book-check-out");
  const room = document.querySelectorAll("#book-room");
  const bed = document.querySelectorAll("#book-bed");
  const name = document.querySelector("#book-name");
  const user_id = document.querySelector("#book-user-id");

  const check_in_value = booking_data["check-in"];
  const check_out_value = booking_data["check-out"];
  const room_value = booking_data["room"];
  const beds_value = booking_data["beds"];
  const name_value = booking_data["name"];
  const user_id_value = booking_data["user-id"];

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

  // Menghitung tanggal untuk dihitung bulannya
  const date1 = new Date(check_in_value);
  const date2 = new Date(check_out_value);
  const difference_in_time = date2.getTime() - date1.getTime();
  let difference_in_date = 0;

  if (userRole === "student") {
    difference_in_date = difference_in_time / (1000 * 3600 * 24 * 30);
  } else if (userRole === "guest") {
    difference_in_date = difference_in_time / (1000 * 3600 * 24);
  }

  const date_count = document.querySelector("#date-count");
  date_count.innerHTML = Math.floor(difference_in_date);

  // mengisi bagian kanan
  const room_price = document.querySelector("#room-price");
  const tax_price = document.querySelector("#tax-price");
  const total_price = document.querySelector("#total-price");

  const count_price = room_price_value * parseInt(difference_in_date);
  const tax_price_value = count_price * (10 / 100);
  const total_price_value = count_price + tax_price_value;

  room_price.innerHTML = room_price_value;
  tax_price.innerHTML = tax_price_value;
  total_price.innerHTML = total_price_value;

  // jika payment button sudah di klik
  const payment_button = document.querySelector("#payment-button");
  payment_button.addEventListener("click", () => {
    const book_payment = document.querySelector("#book-payment");
    booking_data["payment-method"] = book_payment.value;

    // ? disini tempat buat masukin ke database

    // code here

    // ? disini tempat buat masukin ke database
    window.sessionStorage.removeItem("booking-data");
    // console.log(booking_data);
    // console.log(sessionStorage);
    window.location.href = "transaction_page.html";
  });
}

//=================================================

// * Balik ke Form
function backToForm() {
  window.sessionStorage.removeItem("booking-data");
  window.location.href = "booking_student.html";
}

//=================================================

// * untuk mengubah tgl dari MM/DD/YYYY menjadi DD - Month - YYYY
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
    monthNames[parseInt(datearray[1])] +
    " - " +
    datearray[0];

  return newdate;
}

//=================================================

// * untuk mengubah tgl dari MM/DD/YYYY menjadi DD/MM/YYYY
function dateFormatTwo(date) {
  let datearray = date.split("/");
  let newdate = datearray[1] + "/" + datearray[0] + "/" + datearray[2];

  return newdate;
}
