import { config } from "./config.js";

const urlParams = new URLSearchParams(window.location.search);
const idPengaduan = urlParams.get("id_pengaduan");

const backBtn = document.getElementById("back-button");
backBtn.addEventListener("click", () => {
  window.location.href = "complaint.html";
});

const endpoint = `${config.api}getPengaduanById?id_pengaduan=${idPengaduan}&tipe_sort=newest`;
fetch(endpoint)
  .then((result) => result.json())
  .then(({ data }) => {
    console.log(data.Data);
    const compDate = document.getElementById("complaint-date");
    const compTime = document.getElementById("complaint-time");
    const compName = document.getElementById("complaint-name");
    const type = document.getElementById("type");
    const name = document.getElementById("name-user");
    const emailUser = document.getElementById("email-user");
    const desc = document.getElementById("description");

    compDate.innerHTML = `<span class="detail-text-label-small">Date:</span> ${dateFormat(takeDate(data.Data[0].waktu_pengaduan))}`;
    compTime.innerHTML = `<span class="detail-text-label-small">Time:</span> ${takeTime(data.Data[0].waktu_pengaduan)}`;
    compName.innerHTML = `${data.Data[0].nama_pengaduan}`;
    type.innerHTML = `${data.Data[0].jenis_pengaduan}`;
    name.innerHTML = `${data.Data[0].namauser}`;
    emailUser.innerHTML = `${data.Data[0].email}`;
    desc.value = data.Data[0].deskripsi;
    const statusTrans = data.Data[0].status_pengaduan;

    changeViewByStatus(statusTrans);
  });

// @ untuk mengubah view sesuai status yang ada
function changeViewByStatus(status) {
  let user_data = {
    id_pengaduan: idPengaduan,
  };

  //kumpulan button yang bisa active dan non-active
  const doneBtn = document.getElementById("done-button");

  // % Mengubah tampilan detail transaksi sesuai status saat ini
  if (status === "InProgress") {
    inprogView();
  } else if (status === "Resolved") {
    completeView();
  }

  doneBtn.addEventListener("click", () => {
    console.log(user_data);
    const formData = new URLSearchParams();
    for (const [key, value] of Object.entries(user_data)) {
      formData.append(key, value.toString());
    }
    const ENDPOINT_COMPLETE = `${config.api}resolvedPengaduan`;
    fetch(ENDPOINT_COMPLETE, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(JSON.stringify(response));
        if (response.data === null) {
          console.log(JSON.stringify(response));
        } else {
          completeView();
        }
      });
  });

  function inprogView() {
    doneBtn.className = "status-complete active primary-button";
  }

  function completeView() {
    doneBtn.className = "status-complete primary-button";
    const detailStatusComplete = document.getElementById("detail-status-complete");
    detailStatusComplete.style.backgroundColor = "#0300ca";
    detailStatusComplete.textContent = "Resolved";
  }
}

// @ untuk mengubah tgl dari YYYY-MM-DD menjadi DD Month YYYY
function dateFormat(date) {
  let datearray = date.split("-");
  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  let newdate = datearray[2] + " " + monthNames[parseInt(datearray[1]) - 1] + " " + datearray[0];

  return newdate;
}

/**
 *
 * @param {*} date berupa date dengan format YYYY/MM/DDT00:00:00Z
 * @returns time = YYYY/MM/DD
 */
function takeDate(date) {
  return date.slice(0, 10);
}

/**
 *
 * @param {*} date berupa date dengan format YYYY/MM/DDT00:00:00Z
 * @returns time = 00:00:00
 */
function takeTime(date) {
  return date.slice(11, 19);
}
