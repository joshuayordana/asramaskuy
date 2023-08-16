import { config } from "./config.js";

const urlParams = new URLSearchParams(window.location.search);
const idTrans = urlParams.get("id_trans");

const backBtn = document.getElementById("back-button");
backBtn.addEventListener("click", () => {
  window.location.href = "transaction.html";
});

const endpoint = `${config.api}getTransaksiById?id_transaksi=${idTrans}`;
fetch(endpoint)
  .then((result) => result.json())
  .then(({ data }) => {
    console.log(data.Data);
    const transDate = document.getElementById("transaction-date");
    const transTime = document.getElementById("transaction-time");
    const transName = document.getElementById("transaction-name");
    const type = document.getElementById("type");
    const name = document.getElementById("name-user");
    const tower = document.getElementById("tower");
    const towerAdr = document.getElementById("tower-adr");
    const room = document.getElementById("room");
    const checkDate = document.getElementById("check-date");
    const paymentMethod = document.getElementById("payment-method");
    const va = document.getElementById("va");
    const totalPayment = document.getElementById("total-payment");
    const penalti = document.getElementById("penalti");
    const desc = document.getElementById("descryption");

    transDate.innerHTML = `<span class="detail-text-label-small">Date:</span> ${dateFormat(takeDate(data.Data[0].tanggal_transaksi))}`;
    transTime.innerHTML = `<span class="detail-text-label-small">Time:</span> ${takeTime(data.Data[0].tanggal_transaksi)}`;
    transName.innerHTML = `${data.Data[0].nama_transaksi}`;
    type.innerHTML = `${data.Data[0].jenis_transaksi}`;
    name.innerHTML = `${data.Data[0].nama_user}`;
    tower.innerHTML = `${data.Data[0].nama_gedung}`;
    towerAdr.innerHTML = `${data.Data[0].alamat_gedung}`;
    room.innerHTML = `${data.Data[0].nama_kamar}`;
    checkDate.innerHTML = `${dateFormat(takeDate(data.Data[0].check_in))} s/d ${dateFormat(takeDate(data.Data[0].check_out))}`;
    paymentMethod.innerHTML = `${data.Data[0].payment_method}`;
    va.innerHTML = `${data.Data[0].va}`;
    totalPayment.innerHTML = `${betterPriceFormat(data.Data[0].total_pembayaran)}`;
    penalti.innerHTML = `${betterPriceFormat(data.Data[0].penalti)}`;
    desc.value = data.Data[0].catatan;
    const statusTrans = data.Data[0].status_transaksi;

    changeViewByStatus(statusTrans);

    // Data pada modal
    const oldRoom = document.getElementById("old-room");
    oldRoom.innerHTML = `${data.Data[0].nama_kamar}`;
    modalChangeRoom(data.Data[0].id_gedung, data.Data[0].id_kamar);
  });

// @ membuka modal untuk change room
function modalChangeRoom(id_gedung, id_kamar_lama) {
  const modal = document.getElementById("modal-change-room");

  const closeModal = document.getElementById("close-modal-change-button");
  closeModal.addEventListener("click", () => {
    modal.close();
  });

  const openModal = document.getElementById("open-modal-change-button");
  openModal.addEventListener("click", () => {
    modal.showModal();
  });

  const endpoint = `${config.api}getKamarDataByGedungId?id_gedung=${id_gedung}`;
  fetch(endpoint)
    .then((result) => result.json())
    .then(({ data }) => {
      console.log(data.Data);
      //SORT BY LANTAI
      let kamar = [];
      for (let i = 0; i < data.Data[0].jumlah_lantai; i++) {
        kamar.push([]);
        for (let j = 0; j < data.Data.length; j++) {
          if (data.Data[j]["lantai"] == i) {
            kamar[i - 1].push(data.Data[j]);
          }
        }
      }
      //PRINT KE LIST
      for (let i = 0; i < data.Data[0].jumlah_lantai; i++) {
        addRoomList(kamar[i], i + 1, id_kamar_lama);
      }
    });
  const submitModal = document.getElementById("submit-modal-change-button");
  submitModal.addEventListener("click", () => {
    const ENDPOINT_SUBMIT = `${config.api}moveRoom`;

    const newRoomValue = document.getElementById("new-room");
    let new_room_transaction = {};
    new_room_transaction["id_transaksi"] = idTrans;
    new_room_transaction["id_kamar"] = newRoomValue.value;
    new_room_transaction["catatan"] = `Moved room with id ${id_kamar_lama} to room with id ${newRoomValue.value}`;

    const formData = new URLSearchParams();
    for (const [key, value] of Object.entries(user_data)) {
      formData.append(key, value.toString());
    }

    fetch(ENDPOINT_SUBMIT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.data === null) {
          console.log(JSON.stringify(response));
        } else {
          // window.location.href = `transaction.html`;
        }
      });
  });
}

// @ memasukkan liat kamar pada gedung ke option list
function addRoomList(dataRoom, lantai, id_room_sekarang) {
  //Update List
  let roomList = document.getElementById("new-room");
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
      option.innerHTML = `${dataRoom[i]["nama_kamar"]}, kapasitas:${dataRoom[i]["jumlah_customer"]}/${dataRoom[i]["kapasitas_kamar"]}, status: ${dataRoom[i]["status_kamar"]}`;
      if (dataRoom[i]["kapasitas_kamar"] - dataRoom[i]["jumlah_customer"] === 0) {
        option.setAttribute("disabled", true);
      }

      if (dataRoom[i]["id_kamar"] === id_room_sekarang) {
        option.setAttribute("disabled", true);
      }
      optgroup.appendChild(option);
    }
  }
  roomList.appendChild(optgroup);
}

// @ untuk mengubah view sesuai status yang ada
function changeViewByStatus(status) {
  let user_data = {
    id_transaksi: idTrans,
  };

  const statusUnpaid = document.getElementById("status-unpaid");
  const statusPaid = document.getElementById("status-paid");
  const statusComplete = document.getElementById("status-complete");
  const statusChangerOption = document.getElementById("status-changer");

  //kumpulan button yang bisa active dan non-active
  const payBtn = document.getElementById("pay-button");
  const doneBtn = document.getElementById("done-button");
  const cancelBtn = document.getElementById("cancel-button");
  const changeRoomBtn = document.getElementById("open-modal-change-button");

  // % Mengubah tampilan detail transaksi sesuai status saat ini
  if (status === "Unpaid") {
    unpaidView();
  } else if (status === "Done") {
    completeView(status);
  } else if (status === "Canceled") {
    completeView(status);
  } else if (status === "Alloted") {
    paidView(status);
  } else if (status === "OnGoing") {
    paidView(status);
  }

  payBtn.addEventListener("click", () => {
    const formData = new URLSearchParams();
    for (const [key, value] of Object.entries(user_data)) {
      formData.append(key, value.toString());
    }
    const ENDPOINT_PAID = `${config.api}allotedTransaksi`;
    fetch(ENDPOINT_PAID, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.data === null) {
          console.log(JSON.stringify(response));
        } else {
          paidView("Alloted");
        }
      });
  });

  statusChangerOption.addEventListener("change", () => {
    let endpointChange = "";
    if (statusChangerOption.value === "Alloted") {
      endpointChange = `${config.api}allotedTransaksi`;
    } else if (statusChangerOption.value === "OnGoing") {
      endpointChange = `${config.api}ongoingTransaksi`;
    }
    const formData = new URLSearchParams();
    for (const [key, value] of Object.entries(user_data)) {
      formData.append(key, value.toString());
    }
    fetch(endpointChange, {
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
      });
  });

  doneBtn.addEventListener("click", () => {
    const formData = new URLSearchParams();
    for (const [key, value] of Object.entries(user_data)) {
      formData.append(key, value.toString());
    }
    const ENDPOINT_COMPLETE = `${config.api}doneTransaksi?id_transaksi=${idTrans}`;
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
        if (response.data === null) {
          console.log(JSON.stringify(response));
        } else {
          completeView("Done");
        }
      });
  });

  cancelBtn.addEventListener("click", () => {
    const formData = new URLSearchParams();
    for (const [key, value] of Object.entries(user_data)) {
      formData.append(key, value.toString());
    }
    const ENDPOINT_COMPLETE = `${config.api}cancelTransaksi?id_transaksi=${idTrans}`;
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
        if (response.data === null) {
          console.log(JSON.stringify(response));
        } else {
          completeView("Canceled");
        }
      });
  });

  function unpaidView() {
    statusUnpaid.className = "status-unpaid active";
    statusPaid.className = "status-paid";
    statusComplete.className = "status-complete";
    cancelBtn.className = "cancel-trans active warning-button";
    changeRoomBtn.classList = "change-room primary-button";
  }

  function completeView(status_now) {
    if (status_now === "Canceled") {
      const detailStatusComplete = document.getElementById("detail-status-complete");
      detailStatusComplete.style.backgroundColor = "#c30e0e";
      detailStatusComplete.textContent = "Canceled";
    }
    statusUnpaid.className = "status-unpaid";
    statusPaid.className = "status-paid";
    statusComplete.className = "status-complete active";
    cancelBtn.className = "cancel-trans warning-button";
    changeRoomBtn.classList = "change-room primary-button";
  }

  function paidView(status_now) {
    if (status_now === "Alloted") {
      const statusChanger = document.getElementById("status-changer");
      statusChanger.innerHTML = `<option value="Alloted">Alloted</option>
                                  <option value="OnGoing">OnGoing</option>`;
    } else if (status_now === "OnGoing") {
      const statusChanger = document.getElementById("status-changer");
      statusChanger.innerHTML = `<option value="OnGoing">OnGoing</option>
      <option value="Alloted">Alloted</option>`;
    }

    statusUnpaid.className = "status-unpaid";
    statusPaid.className = "status-paid active";
    statusComplete.className = "status-complete";
    cancelBtn.className = "cancel-trans active warning-button";
    changeRoomBtn.classList = "change-room active primary-button";
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

// @ untuk mengubah harga menjadi ada RP nya
function betterPriceFormat(price) {
  const betterPriceFormatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  });

  return betterPriceFormatter.format(price);
}
