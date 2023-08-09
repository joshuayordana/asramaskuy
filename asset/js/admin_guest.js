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
        document.getElementById("nama").value = "";
        document.getElementById("nik").value = "";
        document.getElementById("tgl_lahir").value = "";
        document.getElementById("gender").value = "";
        document.getElementById("alamat").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("no_telp").value = "";
        document.getElementById("id_user").value = "";
    } else {
        //Update Data
        document.getElementById("nama").value = dataUser[id]["name"];
        document.getElementById("nik").value = dataUser[id]["nik"];
        document.getElementById("tgl_lahir").value = dateFormatInput(dataUser[id]["tgl_lahir"]);
        document.getElementById("gender").value = dataUser[id]["jenis_kelamin"];
        document.getElementById("alamat").value = dataUser[id]["alamat"];
        document.getElementById("email").value = dataUser[id]["email"];
        document.getElementById("password").value = dataUser[id][""];
        document.getElementById("no_telp").value = dataUser[id]["no_telp"];
        document.getElementById("id_user").value = dataUser[id]["id_user"];
    }
    const dialogTitle = document.getElementById("d-title");
    const dialogButton = document.getElementById("d-button");
    //Ganti UI
    if (update) {
        dialogTitle.innerHTML = "Update Guest";
        dialogButton.innerHTML = "UPDATE";
    } else {
        dialogTitle.innerHTML = "New Guest";
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
    guestTable.innerHTML = "";
    if (search != "") {
        let temp = [];
        for (let i = 0; i < dataUser.length; i++) {
            var x = dataUser[i]["name"];
            x = x.toLowerCase();
            if (x.includes(search.toLowerCase())) {
                temp.push(dataUser[i]);
            }
        }
        for (let i = 0; i < temp.length; i++) {
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${temp[i]["name"]}</td>`;
            tr.innerHTML += `<td>${temp[i]["status"]}</td>`;
            tr.innerHTML += `<td>${temp[i]["nik"]}</td>`;
            tr.innerHTML += `<td>${temp[i]["email"]}</td>`;
            tr.innerHTML += `<td>${temp[i]["no_telp"]}</td>`;
            tr.innerHTML += `<td>${temp[i]["alamat"]}</td>`;
            tr.innerHTML += `<td>${dateFormat(temp[i]["tgl_lahir"])}</td>`;
            tr.innerHTML += `<td>
            <a id="editBtn"><iconify-icon icon="ic:baseline-edit" style="color: #ffc800;" width="26" height="26"></iconify-icon></a></td>`;
            guestTable.appendChild(tr);
            const editBtn = tr.querySelector("#editBtn");
            editBtn.addEventListener("click", () => {
                openDialog(true, i); //True untuk update
            });
        }
    } else {
        //Masukan dataUser ke tabel
        for (let i = 0; i < dataUser.length; i++) {
            const tr = document.createElement("tr");
            tr.setAttribute("id", `guest-${i}`);
            tr.innerHTML = `<td>${dataUser[i]["name"]}</td>`;
            tr.innerHTML += `<td>${dataUser[i]["status"]}</td>`;
            tr.innerHTML += `<td>${dataUser[i]["nik"]}</td>`;
            tr.innerHTML += `<td>${dataUser[i]["email"]}</td>`;
            tr.innerHTML += `<td>${dataUser[i]["no_telp"]}</td>`;
            tr.innerHTML += `<td>${dataUser[i]["alamat"]}</td>`;
            tr.innerHTML += `<td>${dateFormat(dataUser[i]["tgl_lahir"])}</td>`;
            tr.innerHTML += `<td>
            <a id="editBtn">
                <iconify-icon icon="ic:baseline-edit" style="color: #ffc800;" width="26" height="26"></iconify-icon>
            </a></td>`;

            guestTable.appendChild(tr);
            const editBtn = tr.querySelector("#editBtn");
            editBtn.addEventListener("click", () => {
                openDialog(true, i); //True untuk update
            });
        }
    }
}

const endpoint = `${config.api}getGuest`;
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
    formData.append("nama", document.getElementById("nama").value);
    formData.append("nik", document.getElementById("nik").value);
    formData.append("tgl_lahir", document.getElementById("tgl_lahir").value);
    formData.append("jenis_kelamin", document.getElementById("gender").value);
    formData.append("alamat", document.getElementById("alamat").value);

    formData.append("email", document.getElementById("email").value);
    formData.append("password", document.getElementById("password").value);
    formData.append("no_telp", document.getElementById("no_telp").value);

    if (!modalUpdate) {
        //CREATE
        var endpoint = `${config.api}createNewGuest`;
        var meth = "POST";
    } else {
        //UPDATE
        var endpoint = `${config.api}updateGuestProfile`;
        formData.append("id_user", document.getElementById("id_user").value);
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
                    const endpoint = `${config.api}getGuest`;
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
        nama: false,
        nik: false,
        tgl_lahir: false,
        alamat: false,
        email: false,
        pwd: false,
        phone: false,
    };

    const nama = document.getElementById("nama");
    if (nama.value.trim() === "") {
        setErrorMsg(nama, "Please insert name correctly");
        validate["nama"] = false;
    } else if (nama.value.trim().length < 3) {
        setErrorMsg(nama, "Please input minimum 3 character");
        validate["nama"] = false;
    } else {
        setSuccessMsg(nama);
        validate["nama"] = true;
    }

    const nik = document.getElementById("nik");
    if (nik.value.trim() === "") {
        setErrorMsg(nik, "Please insert NIK correctly");
        validate["nik"] = false;
    } else if (nik.value.trim().length < 3) {
        setErrorMsg(nik, "Please input minimum 3 character");
        validate["nik"] = false;
    } else {
        setSuccessMsg(nik);
        validate["nik"] = true;
    }

    const tgl_lahir = document.getElementById("tgl_lahir");
    if (tgl_lahir.value.trim() === "") {
        setErrorMsg(tgl_lahir, "Please insert birth date correctly");
        validate["tgl_lahir"] = false;
    } else {
        setSuccessMsg(tgl_lahir);
        validate["tgl_lahir"] = true;
    }

    const alamat = document.getElementById("alamat");
    if (alamat.value.trim() === "") {
        setErrorMsg(alamat, "Please insert adress correctly");
        validate["alamat"] = false;
    } else if (alamat.value.trim().length < 3) {
        setErrorMsg(alamat, "Please input minimum 3 character");
        validate["alamat"] = false;
    } else {
        setSuccessMsg(alamat);
        validate["alamat"] = true;
    }

    const email = document.getElementById("email");
    if (email.value.trim() === "") {
        setErrorMsg(email, "Please insert email correctly");
        validate["nama"] = false;
    } else if (email.value.trim().length < 3) {
        setErrorMsg(email, "Please input minimum 3 character");
        validate["email"] = false;
    } else {
        setSuccessMsg(email);
        validate["email"] = true;
    }

    const password = document.getElementById("password");
    if (password.value.trim() === "") {
        setErrorMsg(password, "Please insert password correctly");
        validate["pwd"] = false;
    } else if (password.value.trim().length < 5) {
        setErrorMsg(password, "Please input minimum 5 character");
        validate["pwd"] = false;
    } else {
        setSuccessMsg(password);
        validate["pwd"] = true;
    }

    const no_telp = document.getElementById("no_telp");
    if (no_telp.value.trim() === "") {
        setErrorMsg(no_telp, "Please insert phone number correctly");
        validate["phone"] = false;
    } else if (no_telp.value.trim().length < 8) {
        setErrorMsg(no_telp, "Please input minimum 8 character");
        validate["phone"] = false;
    } else {
        setSuccessMsg(no_telp);
        validate["phone"] = true;
    }

    if (inputValidation(validate, 7)) {
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
