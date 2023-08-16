import { config } from "./config.js";

const guestTable = document.getElementById("guest");
const searchInput = document.getElementById("searchInput");
const addButton = document.getElementById("addButton");
const towerSelect = document.getElementById("tower");
const userSelect = document.getElementById("id_user");
let dataUser = [];
let dataTower = [];
let dataRoom = [];
let dataUserSelect = [];
let editDialog = document.getElementById("edit-dialog");
let formData = new FormData();
var modalUpdate = false; //Untuk nyimpen apakah modal untuk update atau untuk create
// openDialog();
getUser();

//Get Data
const endpoint = `${config.api}getTransaksi?tipe_sort=newest`;
fetch(endpoint)
  .then((result) => result.json())
  .then(({ data }) => {
    // console.log(data.Data);
    dataUser = data.Data;
    // console.log(dataUser);
    updateTable();
  });

updateTower();

function getUser() {
  //Add Guest
  let endpoint = `${config.api}getGuest`;
  fetch(endpoint)
    .then((result) => result.json())
    .then(({ data }) => {
      // console.log(data.Data);
      dataUserSelect = data.Data;
    })
    .finally(() => {
      //Add User
      endpoint = `${config.api}getUser`;
      fetch(endpoint)
        .then((result) => result.json())
        .then(({ data }) => {
          // console.log(data.Data);
          for (let i = 0; i < data.Data.length; i++) {
            dataUserSelect.push(data.Data[i]);
          }
        })
        .finally(() => {
          updateUserSelect();
        });
    });
}

function updateUserSelect() {
  for (let i = 0; i < dataUserSelect.length; i++) {
    const option = document.createElement("option");
    option.setAttribute("id", `guest-${i}`);
    option.value = `${dataUserSelect[i]["id_user"]}`;
    option.innerHTML = `${dataUserSelect[i]["name"]}`;
    userSelect.appendChild(option);
  }
}

addButton.addEventListener("click", () => {
  openDialog();
});

towerSelect.addEventListener("change", () => {
  let id_gedung = towerSelect.value;
  updateRoom(id_gedung);
});

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
  let towerList = document.getElementById("tower");
  for (let i = 0; i < dataTower.length; i++) {
    const option = document.createElement("option");
    option.setAttribute("id", `tower-${i}`);
    option.value = `${dataTower[i]["id_gedung"]}`;
    option.innerHTML = `${dataTower[i]["nama_gedung"]}`;
    towerList.appendChild(option);
  }
}

function updateRoom(id_gedung) {
  let jumlah_lantai = 0;
  //Cari Jumlah Lantai
  for (let i = 0; i < dataTower.length; i++) {
    if (dataTower[i]["id_gedung"] == id_gedung) {
      jumlah_lantai = dataTower[i]["jumlah_lantai"];
    }
  }

  //Update Room
  let roomList = document.getElementById("room");
  roomList.innerHTML = "";
  const endpoint = `${config.api}getKamarByGedungId?id_gedung=${id_gedung}`;
  fetch(endpoint)
    .then((result) => result.json())
    .then(({ data }) => {
      dataRoom = data.Data;
      if (dataRoom == null) {
        //Tidak ada kamar
        const option = document.createElement("option");
        option.setAttribute("id", `null`);
        option.setAttribute("disabled", true);
        option.setAttribute("selected", true);
        option.value = `notfound`;
        option.innerHTML = `--- No Room ---`;
        roomList.appendChild(option);
      } else {
        //SORT BY LANTAI
        let kamar = [];
        for (let i = 0; i < jumlah_lantai; i++) {
          kamar.push([]);
          for (let j = 0; j < dataRoom.length; j++) {
            if (dataRoom[j]["lantai"] == i) {
              kamar[i - 1].push(dataRoom[j]);
            }
          }
        }
        //PRINT KE LIST
        for (let i = 0; i < jumlah_lantai; i++) {
          addRoomList(kamar[i], i + 1);
        }
      }
    });
}

function addRoomList(dataRoom, lantai) {
  // console.log(dataRoom);
  //Update List
  let roomList = document.getElementById("room");
  let optgroup = document.createElement("optgroup");
  optgroup.label = `Lantai ${lantai}`;
  if (dataRoom.length === 0) {
    //Tidak ada kamar
    const option = document.createElement("option");
    option.setAttribute("id", `null`);
    option.setAttribute("disabled", true);
    option.value = `notfound`;
    option.innerHTML = `--- No Room ---`;
    optgroup.appendChild(option);
  } else {
    for (let i = 0; i < dataRoom.length; i++) {
      const option = document.createElement("option");
      option.setAttribute("id", `kamar-${dataRoom[i]["id_kamar"]}`);
      option.value = `${dataRoom[i]["id_kamar"]}`;
      option.innerHTML = `${dataRoom[i]["jumlah_customer"]}/${dataRoom[i]["kapasitas_kamar"]} - ${dataRoom[i]["nama_kamar"]} - ${dataRoom[i]["status_kamar"]}`;
      if (dataRoom[i]["kapasitas_kamar"] - dataRoom[i]["jumlah_customer"] === 0) {
        option.setAttribute("disabled", true);
      }
      optgroup.appendChild(option);
    }
  }
  roomList.appendChild(optgroup);
}

function openDialog(update = false, id = -1) {
  modalUpdate = update;
  if (id == -1) {
    //Clean Data
    // document.getElementById("id_user").value = "";
    document.getElementById("checkin").value = "";
    document.getElementById("checkout").value = "";
    document.getElementById("tower").value = "notfound";
    document.getElementById("room").value = "notfound";
    document.getElementById("total").value = "";
  }
  const dialogTitle = document.getElementById("d-title");
  const dialogButton = document.getElementById("d-button");
  //Ganti UI
  dialogTitle.innerHTML = "New Transaction";
  dialogButton.innerHTML = "CREATE";
  editDialog.showModal();
}

function closeDialog() {
  editDialog.close();
}

// @ untuk mengubah tgl dari YYYY-MM-DD menjadi DD Month YYYY
function dateFormat(date) {
  let datearray = date.split("-");
  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  let newdate = datearray[2] + " " + monthNames[parseInt(datearray[1]) - 1] + " " + datearray[0];

  return newdate;
}

function dateFormatInput(tanggal) {
  let fullDate = new Date(tanggal);
  let twoDigitMonth = fullDate.getMonth() + 1 + "";
  if (twoDigitMonth.length == 1) twoDigitMonth = "0" + twoDigitMonth;
  let twoDigitDate = fullDate.getDate() + "";
  if (twoDigitDate.length == 1) twoDigitDate = "0" + twoDigitDate;
  let currentDate = fullDate.getFullYear() + "-" + twoDigitMonth + "-" + twoDigitDate;
  return currentDate;
}

function updateTable(search = "") {
  const rupiahFormatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  });

  guestTable.innerHTML = "";
  if (search != "") {
    let temp = [];
    for (let i = 0; i < dataUser.length; i++) {
      let x = dataUser[i]["nama_user"];
      x = x.toLowerCase();
      if (x.includes(search.toLowerCase())) {
        temp.push(dataUser[i]);
      }
    }
    console.log(temp);
    for (let i = 0; i < temp.length; i++) {
      const tr = document.createElement("tr");
      tr.setAttribute("id", `guest-${i}`);
      tr.innerHTML = `<td>${temp[i]["nama_transaksi"]}</td>`;
      tr.innerHTML += `<td>${temp[i]["jenis_transaksi"]}</td>`;
      tr.innerHTML += `<td>${temp[i]["nama_user"]}</td>`;
      tr.innerHTML += `<td>${temp[i]["nama_gedung"]}</td>`;
      tr.innerHTML += `<td>${temp[i]["nama_kamar"]}</td>`;
      tr.innerHTML += `<td>${dateFormat(temp[i]["check_in"].slice(0, 10))}</td>`;
      tr.innerHTML += `<td>${dateFormat(temp[i]["check_out"].slice(0, 10))}</td>`;
      tr.innerHTML += `<td>${temp[i]["status_transaksi"]}</td>`;
      tr.innerHTML += `<td>${temp[i]["total_pembayaran"]}</td>`;
      tr.innerHTML += `<td>
                          <button class="primary-button" id="detail-btn">
                              Detail
                          </button>
                      </td>`;

      guestTable.appendChild(tr);
      const detailBtn = tr.querySelector("#detail-btn");
      detailBtn.addEventListener("click", () => {
        window.location.href = `transaction_detail.html?id_trans=${temp[i]["id_transaksi"]}`;
      });
    }
  } else {
    //Masukan dataUser ke tabel
    for (let i = 0; i < dataUser.length; i++) {
      const tr = document.createElement("tr");
      tr.setAttribute("id", `guest-${i}`);
      tr.innerHTML = `<td>${dataUser[i]["nama_transaksi"]}</td>`;
      tr.innerHTML += `<td>${dataUser[i]["jenis_transaksi"]}</td>`;
      tr.innerHTML += `<td>${dataUser[i]["nama_user"]}</td>`;
      tr.innerHTML += `<td>${dataUser[i]["nama_gedung"]}</td>`;
      tr.innerHTML += `<td>${dataUser[i]["nama_kamar"]}</td>`;
      tr.innerHTML += `<td>${dateFormat(dataUser[i]["check_in"].slice(0, 10))}</td>`;
      tr.innerHTML += `<td>${dateFormat(dataUser[i]["check_out"].slice(0, 10))}</td>`;
      tr.innerHTML += `<td>${dataUser[i]["status_transaksi"]}</td>`;
      tr.innerHTML += `<td>${rupiahFormatter.format(dataUser[i]["total_pembayaran"])}</td>`;
      tr.innerHTML += `<td>
                        <button class="primary-button" id="detail-btn">
                            Detail
                        </button>
                    </td>`;

      guestTable.appendChild(tr);
      const detailBtn = tr.querySelector("#detail-btn");
      detailBtn.addEventListener("click", () => {
        window.location.href = `transaction_detail.html?id_trans=${dataUser[i]["id_transaksi"]}`;
      });
    }
  }
}

searchInput.addEventListener("keyup", () => {
  let search = searchInput.value;
  updateTable(search);
});

//MODAL
const closeModal = document.getElementById("closeModal");
closeModal.addEventListener("click", () => {
  closeDialog();
});

function submit() {
  //Get Data
  formData.append("id_user", document.getElementById("id_user").value);
  formData.append("check_in", document.getElementById("checkin").value);
  formData.append("check_out", document.getElementById("checkout").value);
  formData.append("id_gedung", document.getElementById("tower").value);
  formData.append("id_kamar", document.getElementById("room").value);
  formData.append("total_harga", document.getElementById("total").value);
  //CREATE
  var endpoint = `${config.api}createNewTransaksi`;
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
          const endpoint = `${config.api}getGuest`;
          fetch(endpoint)
            .then((result) => result.json())
            .then(({ data }) => {
              let respond = data.Data;
              dataUser = respond;
              window.location.href = "transaction.html";
            });
        }
      });
    });
}

function convertDate(element) {
  const elementValue = element.value;

  // Split the date string into year, month, and day
  const [year, month, day] = elementValue.split("-");

  // Create a Date object with the extracted values
  const dateObject = new Date(year, month - 1, day);
  return dateObject;
}

const form = document.getElementById("d-button");
form.addEventListener("click", () => {
  let validate = {
    checkin: false,
    checkout: false,
    tower: false,
    room: false,
    total: false,
  };
  let formatted_today = new Date();
  formatted_today.setHours(0, 0, 0, 0);

  let checkin = document.getElementById("checkin");
  let checkin_val = convertDate(checkin);
  if (checkin.value.trim() == "") {
    setErrorMsg(checkin, "Please insert date");
    validate["checkin"] = false;
  } else if (checkin_val < formatted_today) {
    setErrorMsg(checkin, "Date minimum is today");
    validate["checkin"] = false;
  } else {
    setSuccessMsg(checkin);
    validate["checkin"] = true;
  }

  let checkout = document.getElementById("checkout");
  let checkout_val = convertDate(checkout);
  if (checkout.value.trim() == "") {
    setErrorMsg(checkout, "Please insert date");
    validate["checkout"] = false;
  } else if (checkout_val < formatted_today) {
    setErrorMsg(checkout, "Date minimum is today");
    validate["checkout"] = false;
  } else if (checkout_val <= checkin_val) {
    setErrorMsg(checkout, "Checkout date must be later then checkin date");
    validate["checkout"] = false;
  } else {
    setSuccessMsg(checkout);
    validate["checkout"] = true;
  }

  const tower = document.getElementById("tower");
  if (tower.value.trim() === "" || tower.value.trim() === "notfound") {
    setErrorMsg(tower, "Please select tower");
    validate["tower"] = false;
  } else {
    setSuccessMsg(tower);
    validate["tower"] = true;
  }

  const room = document.getElementById("room");
  if (room.value.trim() === "" || room.value.trim() === "notfound") {
    setErrorMsg(room, "Please select room");
    validate["room"] = false;
  } else {
    setSuccessMsg(room);
    validate["room"] = true;
  }

  const total = document.getElementById("total");
  if (total.value.trim() === "") {
    setErrorMsg(total, "Please insert total");
    validate["total"] = false;
  } else {
    setSuccessMsg(total);
    validate["total"] = true;
  }

  if (inputValidation(validate, 5)) {
    submit();
  }
});

// % Jika ada error pada input
function setErrorMsg(element, message) {
  const data = element.parentElement;
  const small = data.querySelector("small");
  small.innerText = message;
}

// % Jika tidak ada error pada input
function setSuccessMsg(element) {
  const data = element.parentElement;
  const small = data.querySelector("small");
  small.innerText = "";
}

// % Validasi input-input pada setiap halaman
function inputValidation(assoc_array, true_count) {
  let count = 0;
  Object.values(assoc_array).forEach((value) => {
    if (value === true) {
      count++;
    }
  });
  if (count === true_count) {
    return true;
  } else {
    return false;
  }
}
