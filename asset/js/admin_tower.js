import { config } from "./config.js";

const guestTable = document.getElementById("guest");
const searchInput = document.getElementById("searchInput");
const addButton = document.getElementById("addButton");
let dataUser = [];
let editDialog = document.getElementById("edit-dialog");
let formData = new FormData();
var modalUpdate = false; //Untuk nyimpen apakah modal untuk update atau untuk create
//openDialog();

addButton.addEventListener("click", () => {
    openDialog();
});

function openDialog(update = false, id = -1) {
    modalUpdate = update;
    if (id == -1) {
        //Clean Data
        document.getElementById("nama_gedung").value = "";
        document.getElementById("jumlah_lantai").value = "";
        document.getElementById("jenis_kelamin").value = "Male";
        document.getElementById("alamat_gedung").value = "";
        document.getElementById("no_telp_gedung").value = "";
        document.getElementById("id_gedung").value = "";
    } else {
        //Update Data
        document.getElementById("nama_gedung").value = dataUser[id]["nama_gedung"];
        document.getElementById("jumlah_lantai").value = dataUser[id]["jumlah_lantai"];
        document.getElementById("jenis_kelamin").value = dataUser[id]["jenis_kelamin"];
        document.getElementById("alamat_gedung").value = dataUser[id]["alamat_gedung"];
        document.getElementById("no_telp_gedung").value = dataUser[id]["no_telp_gedung"];
        document.getElementById("id_gedung").value = dataUser[id]["id_gedung"];
    }
    const dialogTitle = document.getElementById("d-title");
    const dialogButton = document.getElementById("d-button");
    //Ganti UI
    if (update) {
        dialogTitle.innerHTML = "Update Student";
        dialogButton.innerHTML = "UPDATE";
    } else {
        dialogTitle.innerHTML = "New Student";
        dialogButton.innerHTML = "CREATE";
    }
    editDialog.showModal();
}

function closeDialog() {
    editDialog.close();
}

function dateFormat(tanggal) {
    let date = new Date(tanggal);
    //Ambil Value
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    //Gabungkan
    let hasil = `${day}-${month}-${year}`;
    return hasil;
}

function dateFormatInput(tanggal) {
    var fullDate = new Date(tanggal);
    var twoDigitMonth = fullDate.getMonth() + 1 + "";
    if (twoDigitMonth.length == 1) twoDigitMonth = "0" + twoDigitMonth;
    var twoDigitDate = fullDate.getDate() + "";
    if (twoDigitDate.length == 1) twoDigitDate = "0" + twoDigitDate;
    var currentDate = fullDate.getFullYear() + "-" + twoDigitMonth + "-" + twoDigitDate;
    return currentDate;
}

function updateTable(search = "") {
    //console.log(dataUser);
    guestTable.innerHTML = "";
    if (search != "") {
        let temp = [];
        for (let i = 0; i < dataUser.length; i++) {
            var x = dataUser[i]["nama_gedung"];
            x = x.toLowerCase();
            if (x.includes(search.toLowerCase())) {
                temp.push(dataUser[i]);
            }
        }
        for (let i = 0; i < temp.length; i++) {
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${temp[i]["nama_gedung"]}</td>`;
            //tr.innerHTML += `<td>${temp[i]["status_gedung"]}</td>`;
            tr.innerHTML += `<label class="switch">
            <input type="checkbox" id="roomSwitch" checked>
            <span class="slider round"></span>
          </label>`;
            tr.innerHTML += `<td>${temp[i]["jumlah_lantai"]}</td>`;
            tr.innerHTML += `<td>${temp[i]["jenis_kelamin"]}</td>`;
            tr.innerHTML += `<td>${temp[i]["alamat_gedung"]}</td>`;
            tr.innerHTML += `<td>${temp[i]["no_telp_gedung"]}</td>`;
            tr.innerHTML += `<td>
            <a id="editBtn"><iconify-icon icon="ic:baseline-edit" style="color: #ffc800;" width="26" height="26"></iconify-icon></a>
            </td>`;
            guestTable.appendChild(tr);

            //Edit Button
            const editBtn = tr.querySelector("#editBtn");
            editBtn.addEventListener("click", () => {
                openDialog(true, i);
            });

            //Switch
            const roomSwitch = tr.querySelector("#roomSwitch");
            //Matiin switch
            var roomStatus = temp[i]["status_gedung"];
            if (roomStatus == "InActive") {
                roomSwitch.checked = false;
            }
            //Ganti Status
            roomSwitch.addEventListener("change", () => {
                var id = temp[i]["id_gedung"];
                var stat = temp[i]["status_gedung"];
                if (stat == "InActive") {
                    //Enable
                    fetch(`${config.api}enableGedung?id_gedung=${id}`, {
                        method: "PUT",
                    })
                        .then((result) => result.json())
                        .then((result) => {
                            temp[id]["status_gedung"] = "Active";
                            console.log(result);
                        });
                } else {
                    //Disable
                    fetch(`${config.api}disableGedung?id_gedung=${id}`, {
                        method: "PUT",
                    })
                        .then((result) => result.json())
                        .then((result) => {
                            temp[id]["status_gedung"] = "InActive";
                            console.log(result);
                        });
                }
            });
        }
    } else {
        //Masukan dataUser ke tabel
        for (let i = 0; i < dataUser.length; i++) {
            const tr = document.createElement("tr");
            tr.setAttribute("id", `guest-${i}`);
            tr.innerHTML = `<td>${dataUser[i]["nama_gedung"]}</td>`;
            //tr.innerHTML += `<td>${dataUser[i]["status_gedung"]}</td>`;
            tr.innerHTML += `<label class="switch">
            <input type="checkbox" id="roomSwitch" checked>
            <span class="slider round"></span>
          </label>`;
            tr.innerHTML += `<td>${dataUser[i]["jumlah_lantai"]}</td>`;
            tr.innerHTML += `<td>${dataUser[i]["jenis_kelamin"]}</td>`;
            tr.innerHTML += `<td>${dataUser[i]["alamat_gedung"]}</td>`;
            tr.innerHTML += `<td>${dataUser[i]["no_telp_gedung"]}</td>`;
            tr.innerHTML += `<td>
            <a id="editBtn">
                <iconify-icon icon="ic:baseline-edit" style="color: #ffc800;" width="26" height="26"></iconify-icon>
            </a>
            </td>`;

            guestTable.appendChild(tr);

            //Edit Button
            const editBtn = tr.querySelector("#editBtn");
            editBtn.addEventListener("click", () => {
                openDialog(true, i);
            });

            //Switch
            const roomSwitch = tr.querySelector("#roomSwitch");
            //Matiin switch
            var roomStatus = dataUser[i]["status_gedung"];
            if (roomStatus == "InActive") {
                roomSwitch.checked = false;
            }
            //Ganti Status
            roomSwitch.addEventListener("change", () => {
                var id = dataUser[i]["id_gedung"];
                var stat = dataUser[i]["status_gedung"];
                if (stat == "InActive") {
                    //Enable
                    fetch(`${config.api}enableGedung?id_gedung=${id}`, {
                        method: "PUT",
                    })
                        .then((result) => result.json())
                        .then((result) => {
                            dataUser[i]["status_gedung"] = "Active";
                            console.log(result);
                        });
                } else {
                    //Disable
                    fetch(`${config.api}disableGedung?id_gedung=${id}`, {
                        method: "PUT",
                    })
                        .then((result) => result.json())
                        .then((result) => {
                            dataUser[i]["status_gedung"] = "InActive";
                            console.log(result);
                        });
                }
            });
        }
    }
}

const endpoint = `${config.api}getGedung`;
fetch(endpoint)
    .then((result) => result.json())
    .then(({ data }) => {
        let respond = data.Data;
        dataUser = respond;
        updateTable();
    });

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
    formData.append("nama_gedung", document.getElementById("nama_gedung").value);
    formData.append("jumlah_lantai", document.getElementById("jumlah_lantai").value);
    formData.append("jenis_kelamin", document.getElementById("jenis_kelamin").value);
    formData.append("alamat_gedung", document.getElementById("alamat_gedung").value);
    formData.append("no_telp_gedung", document.getElementById("no_telp_gedung").value);

    if (!modalUpdate) {
        //CREATE
        var endpoint = `${config.api}createNewGedung`;
        var meth = "POST";
    } else {
        //UPDATE
        var endpoint = `${config.api}updateGedungData`;
        formData.append("id_gedung", document.getElementById("id_gedung").value);
        var meth = "PUT";
    }

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
                    const endpoint = `${config.api}getGedung`;
                    fetch(endpoint)
                        .then((result) => result.json())
                        .then(({ data }) => {
                            let respond = data.Data;
                            dataUser = respond;
                            updateTable();
                        });
                }
            });
        });
}

const form = document.getElementById("d-button");
form.addEventListener("click", () => {
    let validate = {
        nama_gedung: false,
        jumlah_lantai: false,
        alamat_gedung: false,
        no_telp_gedung: false,
    };

    const nama_gedung = document.getElementById("nama_gedung");
    if (nama_gedung.value.trim() === "") {
        setErrorMsg(nama_gedung, "Please insert name correctly");
        validate["nama_gedung"] = false;
    } else if (nama_gedung.value.trim().length < 3) {
        setErrorMsg(nama_gedung, "Please input minimum 3 character");
        validate["nama_gedung"] = false;
    } else {
        setSuccessMsg(nama_gedung);
        validate["nama_gedung"] = true;
    }

    const jumlah_lantai = document.getElementById("jumlah_lantai");
    if (jumlah_lantai.value.trim() <= 0) {
        setErrorMsg(jumlah_lantai, "Please insert jumlah lantai correctly");
        validate["jumlah_lantai"] = false;
    } else {
        setSuccessMsg(jumlah_lantai);
        validate["jumlah_lantai"] = true;
    }

    const alamat_gedung = document.getElementById("alamat_gedung");
    if (alamat_gedung.value.trim() === "") {
        setErrorMsg(alamat_gedung, "Please insert adress correctly");
        validate["alamat_gedung"] = false;
    } else if (alamat_gedung.value.trim().length < 3) {
        setErrorMsg(alamat_gedung, "Please input minimum 3 character");
        validate["alamat_gedung"] = false;
    } else {
        setSuccessMsg(alamat_gedung);
        validate["alamat_gedung"] = true;
    }

    const no_telp_gedung = document.getElementById("no_telp_gedung");
    if (no_telp_gedung.value.trim() === "") {
        setErrorMsg(no_telp_gedung, "Please insert phone number correctly");
        validate["no_telp_gedung"] = false;
    } else if (no_telp_gedung.value.trim().length < 8) {
        setErrorMsg(no_telp_gedung, "Please input minimum 8 character");
        validate["no_telp_gedung"] = false;
    } else {
        setSuccessMsg(no_telp_gedung);
        validate["no_telp_gedung"] = true;
    }

    if (inputValidation(validate, 4)) {
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
