import { config } from "./config.js";

const guestTable = document.getElementById("guest");
const searchInput = document.getElementById("searchInput");
var dataUser = [];

function dateFormat(tanggal) {
    let date = new Date(tanggal);
    //Ambil Value
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    //Gabungkan
    var hasil = `${day}-${month}-${year}`;
    return hasil;
}

function updateTable(search = "") {
    guestTable.innerHTML = "";
    if (search != "") {
        var temp = [];
        for (var i = 0; i < dataUser.length; i++) {
            if (dataUser[i]["name"].includes(search)) {
                temp.push(dataUser[i]);
            }
        }
        for (var i = 0; i < temp.length; i++) {
            var tr = document.createElement("tr");
            tr.innerHTML = `<td>${temp[i]["name"]}</td>`;
            tr.innerHTML += `<td>${temp[i]["status"]}</td>`;
            tr.innerHTML += `<td>${temp[i]["nim"]}</td>`;
            tr.innerHTML += `<td>${temp[i]["email"]}</td>`;
            tr.innerHTML += `<td>${temp[i]["no_telp"]}</td>`;
            tr.innerHTML += `<td>${temp[i]["alamat"]}</td>`;
            tr.innerHTML += `<td>${dateFormat(temp[i]["tgl_lahir"])}</td>`;
            tr.innerHTML += `<td>
            <a><iconify-icon icon="ic:baseline-edit" style="color: #ffc800;" width="26" height="26"></iconify-icon></a>
            <a><iconify-icon icon="ic:baseline-delete" style="color: #ee0202;" width="26" height="26"></iconify-icon></a>
            </td>`;
            guestTable.appendChild(tr);
        }
    } else {
        //Masukan dataUser ke tabel
        for (var i = 0; i < dataUser.length; i++) {
            var tr = document.createElement("tr");
            tr.innerHTML = `<td>${dataUser[i]["name"]}</td>`;
            tr.innerHTML += `<td>${dataUser[i]["status"]}</td>`;
            tr.innerHTML += `<td>${dataUser[i]["nim"]}</td>`;
            tr.innerHTML += `<td>${dataUser[i]["email"]}</td>`;
            tr.innerHTML += `<td>${dataUser[i]["no_telp"]}</td>`;
            tr.innerHTML += `<td>${dataUser[i]["alamat"]}</td>`;
            tr.innerHTML += `<td>${dateFormat(dataUser[i]["tgl_lahir"])}</td>`;
            tr.innerHTML += `<td>
            <a class="edit" data-id="${i}">
                <iconify-icon icon="ic:baseline-edit" style="color: #ffc800;" width="26" height="26"></iconify-icon>
            </a>
            <a><iconify-icon icon="ic:baseline-delete" style="color: #ee0202;" width="26" height="26"></iconify-icon></a>
            </td>`;
            guestTable.appendChild(tr);
        }
    }
}

const endpoint = `${config.api}getUser`;
fetch(endpoint)
    .then((result) => result.json())
    .then(({ data }) => {
        var respond = data.Data;
        dataUser = respond;
        updateTable();
    });

searchInput.addEventListener("keyup", () => {
    var search = searchInput.value;
    updateTable(search);
});

