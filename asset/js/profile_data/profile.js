import { config } from "../config.js";

let user_data = JSON.parse(window.sessionStorage.getItem("user-data"));
console.log(user_data);

// ? FETCH data pengguna by id START
const endpoint = `${config.api}getUserById?id_user=${user_data["id_user"]}`;
fetch(endpoint)
  .then((result) => result.json())
  .then(({ data }) => {
    const api_image_src = `${config.api}getfiles?path_gambar=${data.Data[0].user_profile}`;
    const profile_img = document.querySelector("#profile-img");
    profile_img.src = api_image_src;

    // % EMAIL
    const email = document.querySelector("#email");
    email.innerHTML = data.Data[0].email;
    const info_email = document.querySelector("#info-email");
    info_email.value = data.Data[0].email;

    // % STUDENT ID
    const sid = document.querySelector("#sid");
    sid.innerHTML = data.Data[0].nim;
    const info_sid = document.querySelector("#info-sid");
    info_sid.value = data.Data[0].nim;

    // % NAME
    const name = document.querySelector("#nama");
    name.innerHTML = data.Data[0].name;
    const info_name = document.querySelector("#info-nama");
    info_name.value = data.Data[0].name;

    // % NIK
    const nik = document.querySelector("#nik");
    nik.innerHTML = data.Data[0].nik;
    const info_nik = document.querySelector("#info-nik");
    info_nik.value = data.Data[0].nik;

    // % BIRTH
    const birth = document.querySelector("#birth");
    birth.innerHTML = dateFormatOne(data.Data[0].tgl_lahir.slice(0, 10));

    // % ADDRESS
    const address = document.querySelector("#address");
    address.innerHTML = data.Data[0].alamat;
    const info_address = document.querySelector("#info-address");
    info_address.value = data.Data[0].alamat;

    // % GENDER
    const gender = document.querySelector("#gender");
    gender.innerHTML = data.Data[0].jenis_kelamin;

    // % PHONE
    const phone = document.querySelector("#phone");
    phone.innerHTML = data.Data[0].no_telp;
    const info_phone = document.querySelector("#info-phone");
    info_phone.value = data.Data[0].no_telp;

    // % FATHER NAME
    const f_name = document.querySelector("#f-name");
    f_name.innerHTML = data.Data[0].nama_ayah;
    const info_f_name = document.querySelector("#info-f-name");
    info_f_name.value = data.Data[0].nama_ayah;

    // % FATHER OCCUPATION
    const f_occ = document.querySelector("#f-occ");
    f_occ.innerHTML = data.Data[0].pekerjaan_ayah;
    const info_f_occ = document.querySelector("#info-f-occ");
    info_f_occ.value = data.Data[0].pekerjaan_ayah;

    // % FATHER PHONE
    const f_phone = document.querySelector("#f-phone");
    f_phone.innerHTML = data.Data[0].no_telp_ayah;
    const info_f_phone = document.querySelector("#info-f-phone");
    info_f_phone.value = data.Data[0].no_telp_ayah;

    // % MOTHER NAME
    const m_name = document.querySelector("#m-name");
    m_name.innerHTML = data.Data[0].nama_ibu;
    const info_m_name = document.querySelector("#info-m-name");
    info_m_name.value = data.Data[0].nama_ibu;

    // % MOTHER OCCUPATION
    const m_occ = document.querySelector("#m-occ");
    m_occ.innerHTML = data.Data[0].pekerjaan_ibu;
    const info_m_occ = document.querySelector("#info-m-occ");
    info_m_occ.value = data.Data[0].pekerjaan_ibu;

    // % MOTHER PHONE
    const m_phone = document.querySelector("#m-phone");
    m_phone.innerHTML = data.Data[0].no_telp_ibu;
    const info_m_phone = document.querySelector("#info-m-phone");
    info_m_phone.value = data.Data[0].no_telp_ibu;
  });
// ? FETCH data pengguna by id END

// % untuk mengubah foto profil pengguna
const profile_img_input = document.querySelector("#profile-img-input");
profile_img_input.addEventListener("change", () => {
  let formData = new FormData();
  const img = profile_img_input.files[0];
  formData.append("photo", img);
  formData.append("id_user", user_data["id_user"]);
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  const endpoint = `${config.api}updateProfilePicture`;
  fetch(endpoint, {
    method: "PUT",
    body: formData,
  })
    .then((response) => response.json())
    .then((response) => console.log(JSON.stringify(response)))
    .finally(() => {
      window.location.href = "profile_page.html";
    });
});

// @ untuk mengubah tgl dari YYYY-MM-DD menjadi DD Month YYYY
function dateFormatOne(date) {
  let datearray = date.split("-");
  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  let newdate = datearray[2] + " " + monthNames[parseInt(datearray[1]) - 1] + " " + datearray[0];

  return newdate;
}
