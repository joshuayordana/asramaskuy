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

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("addButton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
