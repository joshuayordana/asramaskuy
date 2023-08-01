import { config } from "./config.js";

// let user_data = JSON.parse(window.sessionStorage.getItem("user-data"));

// console.log(JSON.parse(window.sessionStorage.getItem("booking-data")));
// ! INI PREVENT ORG UNTUK LANGSUNG BUKA HALAMAN INI HEHE START
let booking_data = JSON.parse(window.sessionStorage.getItem("booking-data"));
if (booking_data === null || booking_data["id_user"] === "") {
  window.location.href = "../booking/book_form.html";
}
// ! INI PREVENT ORG UNTUK LANGSUNG BUKA HALAMAN INI HEHE END

// ? disini tempat nampilin room dan lantainya MEN
const endpoint_men = `${config.api}getGedungByJenisKelamin?jenis_kelamin=Laki-Laki`;

// % Fetch Data Tower
fetch(endpoint_men)
  .then((result) => result.json())
  .then(({ data }) => {
    const tower_men_list = document.querySelector("#tower-men-list");

    // % Iterasi per Data
    for (let i = 0; i < data.Data.length; i++) {
      if (data.Data[i].status_gedung === "Active") {
        // % Fetch Img
        const api_image_src = `${config.api}getfiles?path_gambar=${data.Data[i].gambar_gedung}`;
        fetch(api_image_src)
          .then((response) => response.blob())
          .then((blob) => {
            let img_src = URL.createObjectURL(blob);

            // % Membuat Kotak baru untuk simadukkan ke dalam Tower-Men-List
            const new_box = document.createElement("div");
            new_box.setAttribute("class", "tower-card flex padding-20 gap-20");
            new_box.setAttribute("id", `tower-men-${i}`);
            new_box.innerHTML = `
              <div>
                <img class="tower-img" id="tower-image" src="${img_src}">
              </div>
              <div class="flex flex-direction-column justify-between" style="width: 100%;">
                <div class="flex flex-direction-column gap-10">
                  <p class="tower-label-1 no-margin" id="tower-name">${data.Data[i].nama_gedung}</p>
                  <div class="flex gap-10 align-center">
                    <img src="../asset/image/call_icon.png" alt="" width="24px" height="24px">
                    <p class="tower-label-2 no-margin" id="tower-phone">${data.Data[i].no_telp_gedung}</p>
                  </div>
                  <div class="flex gap-10">
                    <img src="../asset/image/loc_icon.png" alt="" width="24px" height="24px">
                    <p class="tower-label-2 no-margin" id="tower-loc">${data.Data[i].alamat_gedung}</p>
                  </div>
                </div>
                <button class="pick-tower-button" id="pick-tower-button">
                  Pick Tower
                </button>
              </div>`;
            tower_men_list.appendChild(new_box);

            // % JIKA KLIK BUTTON
            const tower_box_men = document.querySelector(`#tower-men-${i}`); // ini nanti indexnya ganti2 / atau di loop per tower
            const pick_tower_button_men =
              tower_box_men.querySelector("#pick-tower-button");
            pick_tower_button_men.addEventListener("click", () => {
              booking_data["nama_gedung"] = data.Data[i].nama_gedung;
              booking_data["id_gedung"] = data.Data[i].id_gedung;
              booking_data["tower-max-floor"] = data.Data[i].jumlah_lantai;
              window.sessionStorage.setItem(
                "booking-data",
                JSON.stringify(booking_data)
              );
              console.log(
                JSON.parse(window.sessionStorage.getItem("booking-data"))
              );
              window.location.href = "room_page.html";
            });
          });
      }
    }
  });

// ? disini tempat nampilin room dan lantainya MEN

// ========================

// ? disini tempat nampilin room dan lantainya GIRL
const endpoint_girl = `${config.api}getGedungByJenisKelamin?jenis_kelamin=Perempuan`;

// % Fetch Data Tower
fetch(endpoint_girl)
  .then((result) => result.json())
  .then(({ data }) => {
    const tower_girl_list = document.querySelector("#tower-girl-list");
    console.log(data.Data);
    // % Iterasi per Data
    for (let i = 0; i < data.Data.length; i++) {
      if (data.Data[i].status_gedung === "Active") {
        // % Fetch Img
        const api_image_src = `${config.api}getfiles?path_gambar=${data.Data[i].gambar_gedung}`;
        fetch(api_image_src)
          .then((response) => response.blob())
          .then((blob) => {
            let img_src = URL.createObjectURL(blob);

            // % Membuat Kotak baru untuk simadukkan ke dalam Tower-Girl-List
            const new_box = document.createElement("div");
            new_box.setAttribute("class", "tower-card flex padding-20 gap-20");
            new_box.setAttribute("id", `tower-girl-${i}`);
            new_box.innerHTML = `
              <div>
                <img class="tower-img" id="tower-image" src="${img_src}">
              </div>
              <div class="flex flex-direction-column justify-between" style="width: 100%;">
                <div class="flex flex-direction-column gap-10">
                  <p class="tower-label-1 no-margin" id="tower-name">${data.Data[i].nama_gedung}</p>
                  <div class="flex gap-10 align-center">
                    <img src="../asset/image/call_icon.png" alt="" width="24px" height="24px">
                    <p class="tower-label-2 no-margin" id="tower-phone">${data.Data[i].no_telp_gedung}</p>
                  </div>
                  <div class="flex gap-10">
                    <img src="../asset/image/loc_icon.png" alt="" width="24px" height="24px">
                    <p class="tower-label-2 no-margin" id="tower-loc">${data.Data[i].alamat_gedung}</p>
                  </div>
                </div>
                <button class="pick-tower-button" id="pick-tower-button">
                  Pick Tower
                </button>
              </div>`;
            tower_girl_list.appendChild(new_box);

            // % JIKA KLIK BUTTON
            const tower_box_girl = document.querySelector(`#tower-girl-${i}`); // ini nanti indexnya ganti2 / atau di loop per tower
            const pick_tower_button_girl =
              tower_box_girl.querySelector("#pick-tower-button");
            pick_tower_button_girl.addEventListener("click", () => {
              booking_data["nama_gedung"] = data.Data[i].nama_gedung;
              booking_data["id_gedung"] = data.Data[i].id_gedung;
              booking_data["tower-max-floor"] = data.Data[i].jumlah_lantai;
              window.sessionStorage.setItem(
                "booking-data",
                JSON.stringify(booking_data)
              );
              console.log(
                JSON.parse(window.sessionStorage.getItem("booking-data"))
              );
              window.location.href = "room_page.html";
            });
          });
      }
    }
  });

// ? disini tempat nampilin room dan lantainya GIRL
