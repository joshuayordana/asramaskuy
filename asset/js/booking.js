function takeBookingData() {
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
  const userRole = "student";

  if (userRole === "student") {
    // $ NOTE: ini awalnya harus format MM/DD/YY baru format DD/MM/YY nantinya
    const period = document.querySelector("#book-period");
    if (period.value === "date-1") {
      booking_data["check-in"] = "07/01/2023";
      booking_data["check-out"] = "01/01/2024";
    } else if (period.value === "date-2") {
      booking_data["check-in"] = "07/01/2023";
      booking_data["check-out"] = "07/01/2024";
    }
  } else if (userRole === "guest") {
    console.log("as guest");
  }

  const beds = document.querySelector("#book-bed");
  const name = document.querySelector("#book-name");
  const user_id = document.querySelector("#book-user-id");

  booking_data["beds"] = beds.value;
  booking_data["name"] = name.textContent;
  booking_data["user-id"] = user_id.textContent;

  window.localStorage.setItem("booking-data", JSON.stringify(booking_data));
  console.log(JSON.parse(window.localStorage.getItem("booking-data")));
  window.location.href = "tower_page.html";
}

function pickTower() {
  let booking_data = JSON.parse(window.localStorage.getItem("booking-data"));
  if (booking_data === null || booking_data["user-id"] === "") {
    window.location.href = "booking_student.html";
  }
  // ? disini tempat nampilin room dan lantainya

  // CODE HERE

  const tower_box = document.querySelector("#tower-men-1");
  tower_box.addEventListener("click", (e) => {
    const tower_name = document.querySelector("#tower-name");
    booking_data["tower"] = tower_name.textContent;
    window.localStorage.setItem("booking-data", JSON.stringify(booking_data));
    window.location.href = "room_page.html";
  });

  // ? disini tempat nampilin room dan lantainya
}

function pickRoom() {
  let booking_data = JSON.parse(window.localStorage.getItem("booking-data"));
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
    window.localStorage.setItem("booking-data", JSON.stringify(booking_data));
    console.log(JSON.parse(window.localStorage.getItem("booking-data")));
    window.location.href = "room_payment.html";
  });
  // ? disini tempat nampilin room dan lantainya
}

function paymentDataFill() {
  // $ Mengisi data form transaksi dri local storage
  let booking_data = JSON.parse(window.localStorage.getItem("booking-data"));
  console.log(booking_data);
  if (
    booking_data === null ||
    booking_data["user-id"] === "" ||
    booking_data["room"] === ""
  ) {
    window.location.href = "booking_student.html";
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

  // $ Menghitung tanggal untuk dihitung bulannya
  const date1 = new Date(check_in_value);
  const date2 = new Date(check_out_value);
  const difference_in_time = date2.getTime() - date1.getTime();
  const difference_in_months = difference_in_time / (1000 * 3600 * 24 * 30);
  const date_count = document.querySelector("#date-count");
  date_count.innerHTML = Math.floor(difference_in_months);

  // $ mengisi bagian kanan
  const room_price = document.querySelector("#room-price");
  const tax_price = document.querySelector("#tax-price");
  const total_price = document.querySelector("#total-price");

  const count_price = room_price_value * parseInt(difference_in_months);
  const tax_price_value = count_price * (10 / 100);
  const total_price_value = count_price + tax_price_value;

  room_price.innerHTML = room_price_value;
  tax_price.innerHTML = tax_price_value;
  total_price.innerHTML = total_price_value;

  // $ jika payment button sudah di klik
  const payment_button = document.querySelector("#payment-button");
  payment_button.addEventListener("click", () => {
    const book_payment = document.querySelector("#book-payment");
    booking_data["payment-method"] = book_payment.value;

    // ? disini tempat buat masukin ke database

    // code here

    // ? disini tempat buat masukin ke database
    window.localStorage.removeItem("booking-data");
    // console.log(booking_data);
    // console.log(localStorage);
    window.location.href = "transaction_page.html";
  });
}

// $ Balik ke Form
function backToForm() {
  window.localStorage.removeItem("booking-data");
  window.location.href = "booking_student.html";
}

function dateFormatOne(date) {
  let datearray = date.split("/");
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
    datearray[1] +
    " - " +
    monthNames[parseInt(datearray[0])] +
    " - " +
    datearray[2];

  return newdate;
}

// $ untuk di database nantinya
function dateFormatTwo(date) {
  let datearray = date.split("/");
  let newdate = datearray[1] + "/" + datearray[0] + "/" + datearray[2];

  return newdate;
}
