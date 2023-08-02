import { config } from "./config.js";

const towerInput = document.getElementById("tower");
var dataGedung = [];

function getDetailByGedung(id_gedung) {
  var jumlahLantai = 0;
  for (var i = 0; i < dataGedung.length; i++) {
    if (dataGedung[i]["id_gedung"] == id_gedung) {
      jumlahLantai = dataGedung[i]["jumlah_lantai"];
      showAllFloorRoom(id_gedung, jumlahLantai);
    }
  }
}

//Tambahkan Gedung ke Select
const endpoint = `${config.api}getGedung`;
fetch(endpoint)
  .then((result) => result.json())
  .then(({ data }) => {
    var respond = data.Data;
    dataGedung = respond;
    //Masukan dataGedung ke select
    for (var i = 0; i < dataGedung.length; i++) {
      var option = document.createElement("option");
      option.value = dataGedung[i]["id_gedung"];
      option.text = dataGedung[i]["nama_gedung"];
      towerInput.add(option);
    }
    //Tampilkan detail
    getDetailByGedung(dataGedung[0]["id_gedung"]);
  });

// % Jika Gedung Diganti
towerInput.addEventListener("change", () => {
  var id_gedung = towerInput.value;
  getDetailByGedung(id_gedung);
});

/**
 * Untuk Menampilkan semua lantai
 * @param {*} floors = Sebuah total_lantai atau lantai sekaran (jika menggunakan filter) pada sebuah gedung
 * @param {*} isFiltered = jika filer dipakai maka true dan sebaliknya false
 */
function showAllFloorRoom(id_gedung, floors) {
  const list_lantai_kamar = document.querySelector("#list-lantai-kamar");

  // $ JIKA PAKAI FILTER

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
    const selected_floor = list_lantai_kamar.querySelector(`#room-lantai-${i}`);

    // % Menampilkan semua room berdasarkan FLOOR nya
    const room_list = selected_floor.querySelector("#room-list");
    const endpoint_room = `${
      config.api
    }getKamarByLantai?id_gedung=${id_gedung}&lantai=${i + 1}`;
    showRoom(endpoint_room, i + 1, room_list);
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
            room.setAttribute(
              "class",
              `room padding-10 flex align-center justify-between`
            );
            room.innerHTML = `
                              <div class="room-desc1">
                                <p class="room-name" id="room-name">${
                                  data.Data[j].nama_kamar
                                }</p>
                                <p id="room-lantai">${betterNumberRank(
                                  floor
                                )} Floor</p>
                              </div>
                              <div class="room-desc2 flex gap-10 align-center">
                                <p class="room-capacity"><span id="room-current">${
                                  data.Data[j].jumlah_customer
                                }</span> / <span id="room-max">${
              data.Data[j].kapasitas_kamar
            }</span>
                                </p>
                                <div class="room-capacity-color" id="room-capacity-color"></div>
                              </div>
                              <div>
                                <label class="switch">
                                    <input type="checkbox" id="roomSwitch" onchange="changeRoomStatus(${
                                      data.Data[j].id_kamar
                                    });" checked>
                                    <span class="slider round"></span>
                                </label>
                              </div>`;
            room_list.appendChild(room);

            // % Mengubah warna kapasitas pada kamar yang dibuat
            const capacity_color = room.querySelector("#room-capacity-color");
            const roomSwitch = room.querySelector("#roomSwitch");
            if (
              data.Data[j].kapasitas_kamar - data.Data[j].jumlah_customer ==
              0
            ) {
              capacity_color.style.backgroundColor = "#EE0202";
              roomSwitch.checked = false;
            } else if (
              data.Data[j].kapasitas_kamar - data.Data[j].jumlah_customer <=
              data.Data[j].kapasitas_kamar / 2
            ) {
              capacity_color.style.backgroundColor = "#EED202";
              roomSwitch.checked = false;
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
