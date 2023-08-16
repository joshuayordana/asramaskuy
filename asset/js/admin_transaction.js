import { config } from "./config.js";

const guestTable = document.getElementById("guest");
const searchInput = document.getElementById("searchInput");
const addButton = document.getElementById("addButton");
const towerSelect = document.getElementById("tower");
let dataUser = [];
let dataTower = [];
let dataRoom = [];
let editDialog = document.getElementById("edit-dialog");
// let formData = new FormData();
var modalUpdate = false; //Untuk nyimpen apakah modal untuk update atau untuk create
openDialog();

// addButton.addEventListener("click", () => {
//   openDialog();
// });

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
        option.innerHTML = `<td>${dataTower[i]["nama_gedung"]}</td>`;
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
            // console.log(dataRoom);
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
        });
}

function addRoomList(dataRoom, lantai) {
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
            option.innerHTML = `${dataRoom[i]["nama_kamar"]}`;
            optgroup.appendChild(option);
        }
    }
    roomList.appendChild(optgroup);
}

function openDialog(update = false, id = -1) {
    modalUpdate = update;
    if (id == -1) {
        //Clean Data
        document.getElementById("id_user").value = "";
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

// function submit() {
//     //Get Data
//     formData.append("nama", document.getElementById("nama").value);
//     formData.append("nik", document.getElementById("nik").value);
//     formData.append("tgl_lahir", document.getElementById("tgl_lahir").value);
//     formData.append("jenis_kelamin", document.getElementById("gender").value);
//     formData.append("alamat", document.getElementById("alamat").value);

//     formData.append("email", document.getElementById("email").value);
//     formData.append("password", document.getElementById("password").value);
//     formData.append("no_telp", document.getElementById("no_telp").value);

//     if (!modalUpdate) {
//         //CREATE
//         var endpoint = `${config.api}createNewGuest`;
//         var meth = "POST";
//     } else {
//         //UPDATE
//         var endpoint = `${config.api}updateGuestProfile`;
//         formData.append("id_user", document.getElementById("id_user").value);
//         var meth = "PUT";
//     }

//     //Submit Data
//     //Bukan update, submit biasa
//     for (let [key, value] of formData.entries()) {
//         console.log(`${key}: ${value}`);
//     }
//     //Submit Data
//     fetch(endpoint, {
//         method: meth,
//         body: formData,
//     })
//         .then((response) => response.json())
//         .then((response) => {
//             closeDialog();
//             console.log(response);
//             Swal.fire({
//                 title: `${response["message"]}`,
//                 text: "please wait...",
//                 icon: "success",
//                 showConfirmButton: false,
//                 timerProgressBar: true,
//                 timer: 2000,
//             }).then((result) => {
//                 /* Read more about handling dismissals below */
//                 if (result.dismiss === Swal.DismissReason.timer) {
//                     const endpoint = `${config.api}getGuest`;
//                     fetch(endpoint)
//                         .then((result) => result.json())
//                         .then(({ data }) => {
//                             let respond = data.Data;
//                             dataUser = respond;
//                             updateTable();
//                         });
//                 }
//             });
//         });
// }

// const form = document.getElementById("d-button");
// form.addEventListener("click", () => {
//     let validate = {
//         nama: false,
//         nik: false,
//         tgl_lahir: false,
//         alamat: false,
//         email: false,
//         pwd: false,
//         phone: false,
//     };

//     const nama = document.getElementById("nama");
//     if (nama.value.trim() === "") {
//         setErrorMsg(nama, "Please insert name correctly");
//         validate["nama"] = false;
//     } else if (nama.value.trim().length < 3) {
//         setErrorMsg(nama, "Please input minimum 3 character");
//         validate["nama"] = false;
//     } else {
//         setSuccessMsg(nama);
//         validate["nama"] = true;
//     }

//     const nik = document.getElementById("nik");
//     if (nik.value.trim() === "") {
//         setErrorMsg(nik, "Please insert NIK correctly");
//         validate["nik"] = false;
//     } else if (nik.value.trim().length < 3) {
//         setErrorMsg(nik, "Please input minimum 3 character");
//         validate["nik"] = false;
//     } else {
//         setSuccessMsg(nik);
//         validate["nik"] = true;
//     }

//     const tgl_lahir = document.getElementById("tgl_lahir");
//     if (tgl_lahir.value.trim() === "") {
//         setErrorMsg(tgl_lahir, "Please insert birth date correctly");
//         validate["tgl_lahir"] = false;
//     } else {
//         setSuccessMsg(tgl_lahir);
//         validate["tgl_lahir"] = true;
//     }

//     const alamat = document.getElementById("alamat");
//     if (alamat.value.trim() === "") {
//         setErrorMsg(alamat, "Please insert adress correctly");
//         validate["alamat"] = false;
//     } else if (alamat.value.trim().length < 3) {
//         setErrorMsg(alamat, "Please input minimum 3 character");
//         validate["alamat"] = false;
//     } else {
//         setSuccessMsg(alamat);
//         validate["alamat"] = true;
//     }

//     const email = document.getElementById("email");
//     if (email.value.trim() === "") {
//         setErrorMsg(email, "Please insert email correctly");
//         validate["nama"] = false;
//     } else if (email.value.trim().length < 3) {
//         setErrorMsg(email, "Please input minimum 3 character");
//         validate["email"] = false;
//     } else {
//         setSuccessMsg(email);
//         validate["email"] = true;
//     }

//     const password = document.getElementById("password");
//     if (password.value.trim() === "") {
//         setErrorMsg(password, "Please insert password correctly");
//         validate["pwd"] = false;
//     } else if (password.value.trim().length < 5) {
//         setErrorMsg(password, "Please input minimum 5 character");
//         validate["pwd"] = false;
//     } else {
//         setSuccessMsg(password);
//         validate["pwd"] = true;
//     }

//     const no_telp = document.getElementById("no_telp");
//     if (no_telp.value.trim() === "") {
//         setErrorMsg(no_telp, "Please insert phone number correctly");
//         validate["phone"] = false;
//     } else if (no_telp.value.trim().length < 8) {
//         setErrorMsg(no_telp, "Please input minimum 8 character");
//         validate["phone"] = false;
//     } else {
//         setSuccessMsg(no_telp);
//         validate["phone"] = true;
//     }

//     if (inputValidation(validate, 7)) {
//         submit();
//     }
// });

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