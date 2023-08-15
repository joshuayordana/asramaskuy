import { config } from "./config.js";

const urlParams = new URLSearchParams(window.location.search);
const idTrans = urlParams.get("id_trans");

const backBtn = document.getElementById("back-button");
backBtn.addEventListener("click", () => {
  window.location.href = "transaction.html";
});

// ? ini yg bawah nanti nya bikinnya bukan gini tapi active sesuai statusnya yang sekarang
// ? tapi bisa sih keknya
const statusUnpaid = document.getElementById("status-unpaid");
const statusPaid = document.getElementById("status-paid");
const statusComplete = document.getElementById("status-complete");

//kumpulan button yang bisa active dan non-active
const payBtn = document.getElementById("pay-button");
const doneBtn = document.getElementById("done-button");
const cancelBtn = document.getElementById("cancel-button");
const changeRoomBtn = document.getElementById("change-room-button");

payBtn.addEventListener("click", () => {
  // hrus fetch dlu
  statusUnpaid.className = "status-unpaid";
  statusPaid.className = "status-paid active";
  statusComplete.className = "status-complete";
  cancelBtn.className = "cancel-trans active warning-button";
  changeRoomBtn.classList = "change-room active primary-button";
});

doneBtn.addEventListener("click", () => {
  // hrus fetch dlu
  statusUnpaid.className = "status-unpaid";
  statusPaid.className = "status-paid";
  statusComplete.className = "status-complete active";
  cancelBtn.className = "cancel-trans warning-button";
  changeRoomBtn.classList = "change-room primary-button";
});

cancelBtn.addEventListener("click", () => {});

changeRoomBtn.addEventListener("click", () => {});

const endpoint = `${config.api}getTransaksiById?id_transaksi=${idTrans}`;
// fetch(endpoint)
//   .then((result) => result.json())
//   .then(({ data }) => {
//     console.log(data.Data);
//   });

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
