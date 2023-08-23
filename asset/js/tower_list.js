import { config } from "./config.js";

// ? disini tempat nampilin room dan lantainya MEN
const endpoint_men = `${config.api}getGedungByJenisKelamin?jenis_kelamin=Male`;

// % Fetch Data Tower
fetch(endpoint_men)
  .then((result) => result.json())
  .then(({ data }) => {
    console.log(data);
    const tower_men_list = document.querySelector("#tower-men-list");

    const ALL_SKELETON = document.querySelectorAll("#dummy-skeleton-man");
    ALL_SKELETON.forEach((element) => {
      element.parentNode.removeChild(element);
    });
    // % Iterasi per Data
    for (let i = 0; i < data.Data.length; i++) {
      if (data.Data[i].status_gedung === "Active") {
        // % Fetch Img
        const api_image_src = `${config.api}getfiles?path_gambar=${data.Data[i].gambar_gedung}`;

        // % Membuat Kotak baru untuk simadukkan ke dalam Tower-Men-List
        const new_box = document.createElement("div");
        new_box.setAttribute("class", "tower-card flex padding-20 gap-20");
        new_box.setAttribute("id", `tower-men-${i}`);
        new_box.innerHTML = `
              <div>
                <img class="tower-img" id="tower-image" src="${api_image_src}">
              </div>
              <div class="flex flex-direction-column justify-between" style="width: 100%;">
                <div class="flex flex-direction-column gap-10">
                  <p class="tower-label-1 no-margin" id="tower-name">${data.Data[i].nama_gedung}</p>
                  <div class="flex gap-10 align-center">
                    <img src="asset/image/call_icon.png" alt="" width="24px" height="24px">
                    <p class="tower-label-2 no-margin" id="tower-phone">${data.Data[i].no_telp_gedung}</p>
                  </div>
                  <div class="flex gap-10">
                    <img src="asset/image/loc_icon.png" alt="" width="24px" height="24px">
                    <p class="tower-label-2 no-margin" id="tower-loc">${data.Data[i].alamat_gedung}</p>
                  </div>
                </div>
              </div>`;
        tower_men_list.appendChild(new_box);
      }
    }
  });

// ? disini tempat nampilin room dan lantainya MEN

// ========================

// ? disini tempat nampilin room dan lantainya GIRL
const endpoint_girl = `${config.api}getGedungByJenisKelamin?jenis_kelamin=Female`;

// % Fetch Data Tower
fetch(endpoint_girl)
  .then((result) => result.json())
  .then(({ data }) => {
    console.log(data);
    const tower_girl_list = document.querySelector("#tower-girl-list");

    const ALL_SKELETON = document.querySelectorAll("#dummy-skeleton-girl");
    ALL_SKELETON.forEach((element) => {
      element.parentNode.removeChild(element);
    });
    // % Iterasi per Data
    for (let i = 0; i < data.Data.length; i++) {
      if (data.Data[i].status_gedung === "Active") {
        // % Fetch Img
        const api_image_src = `${config.api}getfiles?path_gambar=${data.Data[i].gambar_gedung}`;

        // % Membuat Kotak baru untuk simadukkan ke dalam Tower-Girl-List
        const new_box = document.createElement("div");
        new_box.setAttribute("class", "tower-card flex padding-20 gap-20");
        new_box.setAttribute("id", `tower-girl-${i}`);
        new_box.innerHTML = `
              <div>
                <img class="tower-img" id="tower-image" src="${api_image_src}">
              </div>
              <div class="flex flex-direction-column justify-between" style="width: 100%;">
                <div class="flex flex-direction-column gap-10">
                  <p class="tower-label-1 no-margin" id="tower-name">${data.Data[i].nama_gedung}</p>
                  <div class="flex gap-10 align-center">
                    <img src="./asset/image/call_icon.png" alt="" width="24px" height="24px">
                    <p class="tower-label-2 no-margin" id="tower-phone">${data.Data[i].no_telp_gedung}</p>
                  </div>
                  <div class="flex gap-10">
                    <img src="./asset/image/loc_icon.png" alt="" width="24px" height="24px">
                    <p class="tower-label-2 no-margin" id="tower-loc">${data.Data[i].alamat_gedung}</p>
                  </div>
                </div>
              </div>`;
        tower_girl_list.appendChild(new_box);
      }
    }
  });

// ? disini tempat nampilin room dan lantainya GIRL
