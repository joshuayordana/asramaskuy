import { config } from "./config.js";

console.log(JSON.parse(window.sessionStorage.getItem("booking-data")));

// ! INI PREVENT ORG UNTUK LANGSUNG BUKA HALAMAN INI HEHE START
let booking_data = JSON.parse(window.sessionStorage.getItem("booking-data"));
if (booking_data === null || booking_data["id_gedung"] === "") {
  window.location.href = "../booking/book_form.html";
}
// ! INI PREVENT ORG UNTUK LANGSUNG BUKA HALAMAN INI HEHE END

// % Untuk menampilkan Nama Tower yang di pilih sebelumnya
const tower_name = document.querySelector("#tower-name");
tower_name.innerHTML = booking_data["nama_gedung"];

// % Untuk membuat filter dalam page room
const filter_lantai = document.querySelector("#filter-lantai");
for (let i = 0; i < booking_data["tower-max-floor"]; i++) {
  const filter_option = document.createElement("option");
  filter_option.setAttribute("value", `${i + 1}`);
  filter_option.innerHTML = `${betterNumberRank(i + 1)} Floor`;
  filter_lantai.appendChild(filter_option);
}

// % Menampilkan lantai dan kamar
showAllFloorRoom(booking_data["tower-max-floor"], false);

// % Jika filter Dipakai
filter_lantai.addEventListener("change", () => {
  if (filter_lantai.value === "all") {
    showAllFloorRoom(booking_data["tower-max-floor"], false);
  } else {
    showAllFloorRoom(filter_lantai.value, true);
  }
});

/**
 * Untuk Menampilkan semua lantai
 * @param {*} floors = Sebuah total_lantai atau lantai sekaran (jika menggunakan filter) pada sebuah gedung
 * @param {*} isFiltered = jika filer dipakai maka true dan sebaliknya false
 */
function showAllFloorRoom(floors, isFiltered) {
  const list_lantai_kamar = document.querySelector("#list-lantai-kamar");

  // $ JIKA PAKAI FILTER
  if (isFiltered) {
    list_lantai_kamar.innerHTML = "";
    // % Buat Div Per lantai
    const room_floor = document.createElement("div");
    room_floor.setAttribute("id", `room-lantai-${floors}`);
    room_floor.innerHTML = `<p class="room-floor-title" id="room-floor-title">${betterNumberRank(floors)} Floor</p>
                            <div class="grid-col-4 gap-20 grid-center" id="room-list"></div>`;
    list_lantai_kamar.appendChild(room_floor);

    // % Memilih Floor yang sekarang
    const selected_floor = list_lantai_kamar.querySelector(`#room-lantai-${floors}`);

    // % Menampilkan semua room berdasarkan FLOOR nya
    const room_list = selected_floor.querySelector("#room-list");
    const endpoint_room = `${config.api}getKamarByLantai?id_gedung=${booking_data["id_gedung"]}&lantai=${floors}`;
    showRoom(endpoint_room, floors, room_list);

    // $ JIKA TIDAK PAKAI FILTER
  } else {
    list_lantai_kamar.innerHTML = "";

    // % Loop per Lantai
    for (let i = 0; i < floors; i++) {
      // % Buat Div Per lantai
      const room_floor = document.createElement("div");
      room_floor.setAttribute("id", `room-lantai-${i}`);
      room_floor.innerHTML = `<p class="room-floor-title" id="room-floor-title">${betterNumberRank(i + 1)} Floor</p>
      <div class="grid-col-4 gap-20 grid-center" id="room-list"></div>`;
      list_lantai_kamar.appendChild(room_floor);

      // % Memilih Floor yang sekarang
      const selected_floor = list_lantai_kamar.querySelector(`#room-lantai-${i}`);

      // % Menampilkan semua room berdasarkan FLOOR nya
      const room_list = selected_floor.querySelector("#room-list");
      const endpoint_room = `${config.api}getKamarByLantai?id_gedung=${booking_data["id_gedung"]}&lantai=${i + 1}`;
      showRoom(endpoint_room, i + 1, room_list);
    }
  }

  /**
   * Untuk Menampilkan semua room
   * @param {*} endpoint = sebuah endpoint untuk fetch api
   * @param {*} floor = Sebuah lantai untuk menulis lantai pada card room
   * @param {*} room_list = sebuah tempat (div) untuk menampung semua room yang ada
   */
  function showRoom(endpoint, floor, room_list) {
    fetch(endpoint)
      .then((result) => result.json())
      .then(({ data }) => {
        if (data.Data === null) {
          room_list.className = "flex justify-center align-center";
          room_list.innerHTML = "There is no room available in this floor";
        } else {
          for (let j = 0; j < data.Data.length; j++) {
            const room = document.createElement("div");
            room.setAttribute("id", `room-${j}`);
            room.setAttribute("class", `room padding-10 flex align-center justify-between`);
            room.innerHTML = `
                              <div class="room-desc1">
                                <p class="room-name" id="room-name">${data.Data[j].nama_kamar}</p>
                                <p id="room-lantai">${betterNumberRank(floor)} Floor</p>
                              </div>
                              <div class="room-desc2 flex gap-10 align-center">
                                <p class="room-capacity"><span id="room-current">${data.Data[j].jumlah_customer}</span> / <span id="room-max">${data.Data[j].kapasitas_kamar}</span>
                                </p>
                                <div class="room-capacity-color" id="room-capacity-color"></div>
                              </div>`;
            room_list.appendChild(room);

            // % Mengubah warna kapasitas pada kamar yang dibuat
            const capacity_color = room.querySelector("#room-capacity-color");
            if (data.Data[j].kapasitas_kamar - data.Data[j].jumlah_customer == 0) {
              capacity_color.style.backgroundColor = "#EE0202";
            } else if (data.Data[j].kapasitas_kamar - data.Data[j].jumlah_customer <= data.Data[j].kapasitas_kamar / 2) {
              capacity_color.style.backgroundColor = "#EED202";
            }

            // % Mengubah pointer atau akses kamar jika kamar sudah penuh
            if (data.Data[j].kapasitas_kamar - data.Data[j].jumlah_customer == 0) {
              room.style.cursor = "not-allowed";
            } else {
              // % Melakukan input ke FORM PAYMENT!!!
              const room_box = room_list.querySelector(`#room-${j}`);
              room_box.addEventListener("click", (e) => {
                booking_data["nama_kamar"] = data.Data[j].nama_kamar;
                booking_data["id_kamar"] = data.Data[j].id_kamar;
                booking_data["harga_kamar"] = data.Data[j].harga_kamar;
                window.sessionStorage.setItem("booking-data", JSON.stringify(booking_data));
                console.log(JSON.parse(window.sessionStorage.getItem("booking-data")));
                window.location.href = "book_payment.html";
              });
            }
          }
        }
      });
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
