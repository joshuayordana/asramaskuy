import { config } from "./config.js";

const guestTable = document.getElementById("guest");
const searchInput = document.getElementById("searchInput");
let dataUser = [];

//Get Data
const endpoint = `${config.api}getPengaduan?tipe_sort=newest`;
fetch(endpoint)
  .then((result) => result.json())
  .then(({ data }) => {
    dataUser = data.Data;
    console.log(dataUser);
    updateTable();
  });

// @ untuk mengubah tgl dari YYYY-MM-DD menjadi DD Month YYYY
function dateFormat(date) {
  let datearray = date.split("-");
  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  let newdate = datearray[2] + " " + monthNames[parseInt(datearray[1]) - 1] + " " + datearray[0];

  return newdate;
}

function updateTable(search = "") {
  guestTable.innerHTML = "";
  if (search != "") {
    let temp = [];
    for (let i = 0; i < dataUser.length; i++) {
      let x = dataUser[i]["namauser"];
      x = x.toLowerCase();
      if (x.includes(search.toLowerCase())) {
        temp.push(dataUser[i]);
      }
    }
    console.log(temp);
    for (let i = 0; i < temp.length; i++) {
      const tr = document.createElement("tr");
      tr.setAttribute("id", `guest-${i}`);
      tr.innerHTML = `<td>${temp[i]["nama_pengaduan"]}</td>`;
      tr.innerHTML += `<td>${temp[i]["jenis_pengaduan"]}</td>`;
      tr.innerHTML += `<td>${temp[i]["status_pengaduan"]}</td>`;
      tr.innerHTML += `<td>${temp[i]["namauser"]}</td>`;
      tr.innerHTML += `<td>${dateFormat(temp[i]["waktu_pengaduan"].slice(0, 10))}</td>`;
      tr.innerHTML += `<td>
                          <button class="primary-button" id="detail-btn">
                              Detail
                          </button>
                      </td>`;

      guestTable.appendChild(tr);
      const detailBtn = tr.querySelector("#detail-btn");
      detailBtn.addEventListener("click", () => {
        window.location.href = `complaint_detail.html?id_pengaduan=${temp[i]["id_pengaduan"]}`;
      });
    }
  } else {
    //Masukan dataUser ke tabel
    for (let i = 0; i < dataUser.length; i++) {
      const tr = document.createElement("tr");
      tr.setAttribute("id", `guest-${i}`);
      tr.innerHTML = `<td>${dataUser[i]["nama_pengaduan"]}</td>`;
      tr.innerHTML += `<td>${dataUser[i]["jenis_pengaduan"]}</td>`;
      tr.innerHTML += `<td>${dataUser[i]["status_pengaduan"]}</td>`;
      tr.innerHTML += `<td>${dataUser[i]["namauser"]}</td>`;
      tr.innerHTML += `<td>${dateFormat(dataUser[i]["waktu_pengaduan"].slice(0, 10))}</td>`;
      tr.innerHTML += `<td>
                        <button class="primary-button" id="detail-btn">
                            Detail
                        </button>
                    </td>`;

      guestTable.appendChild(tr);
      const detailBtn = tr.querySelector("#detail-btn");
      detailBtn.addEventListener("click", () => {
        window.location.href = `complaint_detail.html?id_pengaduan=${dataUser[i]["id_pengaduan"]}`;
      });
    }
  }
}

searchInput.addEventListener("keyup", () => {
  let search = searchInput.value;
  updateTable(search);
});
