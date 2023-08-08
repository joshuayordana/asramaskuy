import { config } from "../config.js";

let user_data = JSON.parse(window.sessionStorage.getItem("user-data"));

const complaint_list = document.querySelector("#complaint-list");
const detail_modal = document.querySelector("#detail-complaint-modal");

// % Untuk menutup modal
const close_detail_modal = document.querySelector("#close-detail-modal");
close_detail_modal.addEventListener("click", () => {
  detail_modal.close();
});

// ? FETCH data pengguna by id START
const endpoint = `${config.api}getPengaduanByIdUser?id_user=${user_data["id_user"]}&tipe_sort=newest`;
fetch(endpoint)
  .then((result) => result.json())
  .then(({ data }) => {
    console.log(data.Data);

    // % Remove skeleton
    const ALL_SKELETON = document.querySelectorAll("#dummy-skeleton");
    ALL_SKELETON.forEach((element) => {
      element.parentNode.removeChild(element);
    });

    if (data === null) {
      // % Jika pelanggan belum ada complaint sama sekali
      complaint_list.className = "card-list padding-20 flex justify-center align-center";
      complaint_list.innerHTML = "There is no complaint yet";
    } else {
      for (let i = 0; i < data.Data.length; i++) {
        // % membuat tiap complaint
        const new_box = document.createElement("div");
        new_box.setAttribute("class", "card-item padding-10 flex flex-direction-column gap-10");
        new_box.setAttribute("id", `complaint-item-${i}`);
        new_box.innerHTML = `
                                  <!-- $ bagian line-pertama START -->
                                  <div class="flex justify-between align-center">
                                      <div class="flex gap-20 align-center">
                                          <img class="card-logo" src="../asset/image/book-check.png" alt="">
                                          <h1 class="no-margin text-1">Complaint</h1>
                                          <div class="card-status-box flex justify-center padding-10">
                                              <p class="no-margin card-status-text" id="complaint-status-text">${data.Data[i].status_pengaduan}</p>
                                          </div>
                                          <p class="no-margin text-2" id="complaint-id">${data.Data[i].nama_pengaduan}</p>
                                      </div>
                                      <div class="text-2" id="complaint-email">
                                      ${data.Data[i].email}
                                      </div>
                                  </div>
                                  <!-- $ bagian line-pertama END -->
      
                                  <!-- $ bagian line-kedua START -->
                                  <h1 class="no-margin text-1">Complaint Type</h1>
                                  <p class="no-margin text-2" id="complaint-type">${data.Data[i].jenis_pengaduan}</p>
                                  <!-- $ bagian line-kedua END -->
      
                                  <div class="flex align-center justify-between">
                                      <p class="no-margin text-1" id="complaint-date">${dateTransConverter(takeDate(data.Data[i].waktu_pengaduan))}</p>
                                      <div class="clickable-button" id="detail-complaint-button">detail</div>
                                  </div>`;
        complaint_list.appendChild(new_box);

        // % Untuk mengubah warna apda status box tiap complaint
        const jenis_pengaduan_color = new_box.querySelector("#complaint-status-text");
        if (data.Data[i].status_pengaduan != "InProgress") {
          jenis_pengaduan_color.parentElement.style.backgroundColor = "#0C35D8";
        }

        // % Jika detail complaint di klik maka data dari tiap complaint akan di assign dalam modal
        const detail_button = new_box.querySelector("#detail-complaint-button");
        detail_button.addEventListener("click", () => {
          const detail_complaint_status = document.querySelector("#detail-complaint-status");
          detail_complaint_status.innerHTML = `${data.Data[i].status_pengaduan}`;

          const detail_complaint_email = document.querySelector("#detail-complaint-email");
          detail_complaint_email.innerHTML = `${data.Data[i].email}`;

          const detail_complaint_type = document.querySelector("#detail-complaint-type");
          detail_complaint_type.innerHTML = `${data.Data[i].jenis_pengaduan}`;

          const detail_desc = document.querySelector("#detail-desc");
          detail_desc.innerHTML = `${data.Data[i].deskripsi}`;

          // % Untuk mengubah warna apda status box tiap complaint
          const detail_jenis_pengaduan_color = document.querySelector("#detail-complaint-status");
          if (data.Data[i].status_pengaduan != "InProgress") {
            detail_jenis_pengaduan_color.parentElement.style.backgroundColor = "#0C35D8";
          }

          detail_modal.showModal();
        });
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
