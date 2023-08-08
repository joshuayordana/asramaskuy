import { config } from "./config.js";

let user_data = JSON.parse(window.sessionStorage.getItem("user-data"));

const notif_list = document.querySelector("#notif-list");

const endpoint = `${config.api}getNotifikasiByIdUser?id_user=${user_data["id_user"]}&tipe_sort=newest`;
fetch(endpoint)
  .then((result) => result.json())
  .then(({ data }) => {
    console.log(data.Data);
    // % Remove skeleton
    const ALL_SKELETON = document.querySelectorAll("#dummy-skeleton");
    ALL_SKELETON.forEach((element) => {
      element.parentNode.removeChild(element);
    });

    // % MENAMPILKAN SEMUA DATA NOTIFIKASI
    if (data === null) {
      notif_list.className = "card-list padding-20 flex justify-center align-center";
      notif_list.innerHTML = "There is no notification yet";
    } else {
      for (let i = 0; i < data.Data.length; i++) {
        const new_box = document.createElement("div");
        new_box.setAttribute("class", "card-item padding-10 flex flex-direction-column gap-10");
        new_box.setAttribute("id", `notif-item-${i}`);
        new_box.innerHTML = `
                            <!-- $ bagian line-pertama START -->
                            <div class="flex justify-between align-center">
                                <div class="flex gap-10 align-center">
                                    <img class="card-logo" src="asset/image/notif-logo.png" alt="">
                                    <h1 class="no-margin text-1">Notification</h1>
                                </div>
                                <div class="flex gap-10 align-center">
                                    <p class="no-margin text-2">${dateTransConverter(takeDate(data.Data[i].waktu_notifikasi))}</p>
                                    <p class="no-margin text-1">${takeTime(data.Data[i].waktu_notifikasi)}</p>
                                </div>
                            </div>
                            <!-- $ bagian line-kedua END -->
                                <p class="no-margin text-2" id="notification-detail">${data.Data[i].deskripsi_notifikasi}</p>`;
        notif_list.appendChild(new_box);
      }
    }
  });

/**
 *
 * @param {*} date_input dengan format YYYY/MM/DD
 * @returns format date DD Month YYY
 */
function dateTransConverter(date_input) {
  let date = new Date(date_input);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
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
