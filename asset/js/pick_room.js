const userRole = "guest";
console.log(JSON.parse(window.sessionStorage.getItem("booking-data")));

// ! INI PREVENT ORG UNTUK LANGSUNG BUKA HALAMAN INI HEHE START
let booking_data = JSON.parse(window.sessionStorage.getItem("booking-data"));
if (
  booking_data === null ||
  booking_data["user-id"] === "" ||
  booking_data["tower"] === ""
) {
  window.location.href = "../booking/book_form.html";
}
// ! INI PREVENT ORG UNTUK LANGSUNG BUKA HALAMAN INI HEHE END

const tower_name = document.querySelector("#tower-name");
tower_name.innerHTML = booking_data["tower"];

// ? disini tempat nampilin room dan lantainya
const room_floor = document.querySelector("#room-lantai-1"); // ini nanti indexnya ganti2 / di loop per lantai

// CODE HERE

const room_list = room_floor.querySelector("#room-list");
const room_box = room_list.querySelector("#room-1"); // ini nanti indexnya ganti2 / di loop per room

room_box.addEventListener("click", (e) => {
  const room_name = room_box.querySelector("#room-name");
  booking_data["room"] = room_name.textContent;
  window.sessionStorage.setItem("booking-data", JSON.stringify(booking_data));
  console.log(JSON.parse(window.sessionStorage.getItem("booking-data")));
  window.location.href = "book_payment.html";
});
// ? disini tempat nampilin room dan lantainya
