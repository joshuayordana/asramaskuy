import { config } from "./config.js";

const towerInput = document.getElementById("tower");
var dataGedung = [];
var dataKamar = [];
//Untuk data room dan tower
const userSelect = document.getElementById("id_user");
const addButton = document.getElementById("addButton");
let editDialog = document.getElementById("edit-dialog");
let dataTower = [];
let dataRoom = [];
let formData = new FormData();
var modalUpdate = false; //Untuk nyimpen apakah modal untuk update atau untuk create
const towerSelect = document.getElementById("towerModal");
towerSelect.addEventListener("change", () => {
    let id_gedung = towerSelect.value;
    let lantai = 0;
    //Get Lantai
    for (var i = 0; i < dataGedung.length; i++) {
        if (dataGedung[i]["id_gedung"] == id_gedung) {
            lantai = dataGedung[i]["jumlah_lantai"];
            updateFloorList(lantai);
        }
    }
});

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
            option.text += ` (${dataGedung[i]["jenis_kelamin"]})`;
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
        room_floor.innerHTML = `<p class="room-floor-title" id="room-floor-title">${betterNumberRank(i + 1)} Floor</p>
      <div class="grid-col-4 gap-20 grid-center" id="room-list"></div>`;
        list_lantai_kamar.appendChild(room_floor);

        // % Memilih Floor yang sekarang
        const selected_floor = list_lantai_kamar.querySelector(`#room-lantai-${i}`);

        // % Menampilkan semua room berdasarkan FLOOR nya
        const room_list = selected_floor.querySelector("#room-list");
        const endpoint_room = `${config.api}getKamarByLantai?id_gedung=${id_gedung}&lantai=${i + 1}`;
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
                        room.setAttribute("class", `room padding-10 flex align-center justify-between`);
                        room.innerHTML = `
                              <div class="room-desc1">
                                <p class="room-name" id="room-name">${data.Data[j].nama_kamar}</p>
                                <p id="room-lantai">${betterNumberRank(floor)} Floor</p>
                              </div>
                              <div class="room-desc2 flex gap-10 align-center">
                                <p class="room-capacity"><span id="room-current">${data.Data[j].jumlah_customer}</span> / <span id="room-max">${
                            data.Data[j].kapasitas_kamar
                        }</span>
                                </p>
                                <div class="room-capacity-color" id="room-capacity-color"></div>
                              </div>
                              <div>
                                <label class="switch">
                                    <input type="checkbox" id="roomSwitch" checked>
                                    <span class="slider round"></span>
                                </label>
                              </div>`;
                        room_list.appendChild(room);

                        // % Mengubah warna kapasitas pada kamar yang dibuat
                        const capacity_color = room.querySelector("#room-capacity-color");
                        const roomSwitch = room.querySelector("#roomSwitch");
                        if (data.Data[j].kapasitas_kamar - data.Data[j].jumlah_customer == 0) {
                            capacity_color.style.backgroundColor = "#EE0202";
                        } else if (data.Data[j].kapasitas_kamar - data.Data[j].jumlah_customer <= data.Data[j].kapasitas_kamar / 2) {
                            capacity_color.style.backgroundColor = "#EED202";
                        }

                        //Data Kamar
                        var x = data.Data[j]["id_kamar"];
                        dataKamar[x] = data.Data[j];

                        //Matiin switch
                        var roomStatus = data.Data[j]["status_kamar"];
                        if (roomStatus == "Full") {
                            roomSwitch.checked = false;
                        }

                        //Ganti Status
                        roomSwitch.addEventListener("change", () => {
                            var id = data.Data[j]["id_kamar"];
                            var stat = data.Data[j]["status_kamar"];
                            if (stat == "Full") {
                                //Enable
                                fetch(`${config.api}enableKamar?id_kamar=${id}`, {
                                    method: "PUT",
                                })
                                    .then((result) => result.json())
                                    .then((result) => {
                                        dataKamar[id]["status_kamar"] = "Available";
                                        console.log(result);
                                    });
                            } else {
                                //Disable
                                fetch(`${config.api}disableKamar?id_kamar=${id}`, {
                                    method: "PUT",
                                })
                                    .then((result) => result.json())
                                    .then((result) => {
                                        dataKamar[id]["status_kamar"] = "Full";
                                        console.log(result);
                                    });
                            }
                        });
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

function openDialog(update = false, id = -1) {
    modalUpdate = update;
    if (id == -1) {
        //Clean Data
        document.getElementById("tower").value = "notfound";
        document.getElementById("nama").value = "";
        document.getElementById("kapasitas").value = "";
        document.getElementById("price").value = "";
    } else {
        //Update Data
        document.getElementById("tower").value = "notfound";
        document.getElementById("nama").value = "";
        document.getElementById("kapasitas").value = "";
        document.getElementById("price").value = "";
        // document.getElementById("nama_gedung").value = dataUser[id]["nama_gedung"];
        // document.getElementById("jumlah_lantai").value = dataUser[id]["jumlah_lantai"];
        // document.getElementById("jenis_kelamin").value = dataUser[id]["jenis_kelamin"];
        // document.getElementById("alamat_gedung").value = dataUser[id]["alamat_gedung"];
        // document.getElementById("no_telp_gedung").value = dataUser[id]["no_telp_gedung"];
        // document.getElementById("id_gedung").value = dataUser[id]["id_gedung"];
    }
    const dialogTitle = document.getElementById("d-title");
    const dialogButton = document.getElementById("d-button");
    //Ganti UI
    if (update) {
        dialogTitle.innerHTML = "Update Room";
        dialogButton.innerHTML = "UPDATE";
    } else {
        dialogTitle.innerHTML = "New Room";
        dialogButton.innerHTML = "CREATE";
    }
    editDialog.showModal();
}

const closeModal = document.getElementById("closeModal");
closeModal.addEventListener("click", () => {
    closeDialog();
});

function closeDialog() {
    editDialog.close();
}

addButton.addEventListener("click", () => {
    openDialog();
});

//DEFAULT
// openDialog();
updateTower();

function updateTower() {
    //Towerlist
    const endpoint = `${config.api}getGedung`;
    fetch(endpoint)
        .then((result) => result.json())
        .then(({ data }) => {
            dataTower = data.Data;
            // console.log(dataTower);
            updateTowerList();
        });
}

function updateTowerList() {
    //Update List
    let towerList = document.getElementById("towerModal");
    for (let i = 0; i < dataTower.length; i++) {
        const option = document.createElement("option");
        option.setAttribute("id", `tower-${i}`);
        option.value = `${dataTower[i]["id_gedung"]}`;
        option.innerHTML = `${dataTower[i]["nama_gedung"]} - ${dataTower[i]["jenis_kelamin"]}`;
        towerList.appendChild(option);
    }
}

function updateFloorList(lantai) {
    //Update List
    let floorList = document.getElementById("lantai");
    floorList.innerHTML = "";
    // console.log(floorList);
    for (let i = 1; i <= lantai; i++) {
        const option = document.createElement("option");
        option.setAttribute("id", `tower-${i}`);
        option.value = i;
        option.innerHTML = `Lantai ${i}`;
        floorList.appendChild(option);
    }
}

const form = document.getElementById("d-button");
form.addEventListener("click", () => {
    submit();
});

function submit() {
    //Get Data
    formData.append("id_gedung", document.getElementById("towerModal").value);
    formData.append("lantai", document.getElementById("lantai").value);
    formData.append("nama_kamar", document.getElementById("nama").value);
    formData.append("kapasitas_kamar", document.getElementById("kapasitas").value);
    formData.append("harga_kamar", document.getElementById("price").value);
    // formData.append("id_kamar", document.getElementById("room").value);
    // formData.append("total_harga", document.getElementById("total").value);
    //CREATE
    var endpoint = `${config.api}createNewKamar`;
    var meth = "POST";

    //Submit Data
    //Bukan update, submit biasa
    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }
    //Submit Data
    fetch(endpoint, {
        method: meth,
        body: formData,
    })
        .then((response) => response.json())
        .then((response) => {
            closeDialog();
            console.log(response);
            Swal.fire({
                title: `${response["message"]}`,
                text: "please wait...",
                icon: "success",
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 2000,
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    window.location.href = "rooms.html";
                }
            });
        });
}
