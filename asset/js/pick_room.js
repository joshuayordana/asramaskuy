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

// % Untuk menampilkan Nama Tower yang di pilih sebelumnya
const tower_name = document.querySelector("#tower-name");
tower_name.innerHTML = booking_data["tower"];

// % Untuk membuat filter dalam page room
const filter_lantai = document.querySelector("#filter-lantai");
for (let i = 0; i < booking_data["tower-floor"]; i++) {
  const filter_option = document.createElement("option");
  filter_option.setAttribute("value", `${i + 1}`);
  filter_option.innerHTML = `${betterNumberRank(i + 1)} Floor`;
  filter_lantai.appendChild(filter_option);
}

// ? disini tempat nampilin room dan lantainya

filter_lantai.addEventListener("change", () => {
  let filter_result =
    filter_lantai.value === "all"
      ? booking_data["tower-floor"]
      : filter_lantai.value;
  for (let i = 0; i < filter_result; i++) {
    console.log("test");
    // const filter_option = document.createElement("option");
    // filter_option.setAttribute("value", `${i + 1}`);
    // filter_option.innerHTML = `${betterNumberRank(i + 1)} Floor`;
    // filter_lantai.appendChild(filter_option);
  }
});
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

function betterNumberRank(num) {
  if (num === 1) {
    return `${num}<sup>st</sup>`;
  } else if (num === 2) {
    return `${num}<sup>nd</sup>`;
  } else if (num === 3) {
    return `${num}<sup>rd</sup>`;
  } else {
    return `${num}<sup>th</sup>`;
  }
}
