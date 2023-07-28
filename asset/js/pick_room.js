import { config } from "./config.js";

const userRole = "student";
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

showAllFloorRoom(booking_data["tower-floor"], false);

// % Jika filter Dipakai
filter_lantai.addEventListener("change", () => {
  if (filter_lantai.value === "all") {
    showAllFloorRoom(booking_data["tower-floor"], false);
  } else {
    showAllFloorRoom(filter_lantai.value, true);
  }
});

// @ Menampilkan kamar sesuai lantai yang dipilih
function showAllFloorRoom(floors, isFiltered) {
  const list_lantai_kamar = document.querySelector("#list-lantai-kamar");

  // $ JIKA PAKAI FILTER
  if (isFiltered) {
    list_lantai_kamar.innerHTML = "";

    // % Buat Div Per lantai
    const room_floor = document.createElement("div");
    room_floor.setAttribute("id", `room-lantai-${floors}`);
    room_floor.innerHTML = `<p class="room-floor-title" id="room-floor-title">${betterNumberRank(
      floors
    )} Floor</p>
    <div class="grid-col-4 gap-20 grid-center" id="room-list"></div>`;
    list_lantai_kamar.appendChild(room_floor);

    // % Memilih Floor yang sekarang
    const selected_floor = list_lantai_kamar.querySelector(
      `#room-lantai-${floors}`
    );
    const room_list = selected_floor.querySelector("#room-list");

    const endpoint_room = `${config.api}getKamarByLantai?id_gedung=${booking_data["tower-id"]}&lantai=${floors}`;

    console.log(endpoint_room);

    // % Menampilkan semua room berdasarkan FLOOR nya
    fetch(endpoint_room)
      .then((result) => result.json())
      .then(({ data }) => {
        // console.log(data.Data);
        for (let j = 0; j < data.Data.length; j++) {
          const room = document.createElement("div");
          room.setAttribute("id", `room-${j}`);
          room.setAttribute(
            "class",
            `room padding-10 flex align-center justify-between`
          );
          room.innerHTML = `
          <div class="room-desc1">
            <p class="room-name" id="room-name">${data.Data[j].nama_kamar}</p>
            <p id="room-lantai">${betterNumberRank(floors)} Floor</p>
          </div>
          <div class="room-desc2 flex gap-10 align-center">
            <p class="room-capacity"><span id="room-current">${
              data.Data[j].jumlah_customer
            }</span> / <span id="room-max">${
            data.Data[j].kapasitas_kamar
          }</span>
            </p>
            <div class="room-capacity-color" id="room-capacity-color"></div>
          </div>`;
          room_list.appendChild(room);
          const room_box = room_list.querySelector(`#room-${j}`);

          room_box.addEventListener("click", (e) => {
            const room_name = room_box.querySelector("#room-name");
            booking_data["room"] = room_name.textContent;
            window.sessionStorage.setItem(
              "booking-data",
              JSON.stringify(booking_data)
            );
            console.log(
              JSON.parse(window.sessionStorage.getItem("booking-data"))
            );
            window.location.href = "book_payment.html";
          });
        }
      });

    // $ JIKA TIDAK PAKAI FILTER
  } else {
    list_lantai_kamar.innerHTML = "";

    // % Loop per Lantai
    for (let i = 0; i < floors; i++) {
      // % Buat Div Per lantai
      const room_floor = document.createElement("div");
      room_floor.setAttribute("id", `room-lantai-${i}`);
      room_floor.innerHTML = `<p class="room-floor-title" id="room-floor-title">${betterNumberRank(
        i + 1
      )} Floor</p>
      <div class="grid-col-4 gap-20 grid-center" id="room-list"></div>`;
      list_lantai_kamar.appendChild(room_floor);

      // % Memilih Floor yang sekarang
      const selected_floor = list_lantai_kamar.querySelector(
        `#room-lantai-${i}`
      );
      const room_list = selected_floor.querySelector("#room-list");

      const endpoint_room = `${config.api}getKamarByLantai?id_gedung=${
        booking_data["tower-id"]
      }&lantai=${i + 1}`;

      console.log(endpoint_room);

      // % Menampilkan semua room berdasarkan FLOOR nya
      fetch(endpoint_room)
        .then((result) => result.json())
        .then(({ data }) => {
          console.log(data.Data);
          // if (data.Data === null) {
          //   console.log("ini null jing");
          // } else {
          //   console.log(data.Data);
          // }
          for (let j = 0; j < data.Data.length; j++) {
            const room = document.createElement("div");
            room.setAttribute("id", `room-${j}`);
            room.setAttribute(
              "class",
              `room padding-10 flex align-center justify-between`
            );
            room.innerHTML = `
            <div class="room-desc1">
              <p class="room-name" id="room-name">${data.Data[j].nama_kamar}</p>
              <p id="room-lantai">${betterNumberRank(i + 1)} Floor</p>
            </div>
            <div class="room-desc2 flex gap-10 align-center">
              <p class="room-capacity"><span id="room-current">${
                data.Data[j].jumlah_customer
              }</span> / <span id="room-max">${
              data.Data[j].kapasitas_kamar
            }</span>
              </p>
              <div class="room-capacity-color" id="room-capacity-color"></div>
            </div>`;
            room_list.appendChild(room);
            const room_box = room_list.querySelector(`#room-${j}`);
            room_box.addEventListener("click", (e) => {
              booking_data["room"] = data.Data[j].nama_kamar;
              booking_data["room-id"] = data.Data[j].nama_kamar;
              window.sessionStorage.setItem(
                "booking-data",
                JSON.stringify(booking_data)
              );
              console.log(
                JSON.parse(window.sessionStorage.getItem("booking-data"))
              );
              window.location.href = "book_payment.html";
            });
          }
        });
    }
  }
}

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
