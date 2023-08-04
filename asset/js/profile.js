import { config } from "./config.js";

let user_data = JSON.parse(window.sessionStorage.getItem("user-data"));

// ? FETCH dari data pengguna by id START
const endpoint = `${config.api}getUserById?id_user=${user_data["id_user"]}`;
fetch(endpoint)
  .then((result) => result.json())
  .then(({ data }) => {
    const api_image_src = `${config.api}getfiles?path_gambar=${data.Data[0].user_profile}`;
    const profile_img = document.querySelector("#profile-img");
    profile_img.src = api_image_src;

    const email = document.querySelector("#email");
    email.innerHTML = data.Data[0].email;

    const sid = document.querySelector("#sid");
    sid.innerHTML = data.Data[0].nim;

    const name = document.querySelector("#name");
    name.innerHTML = data.Data[0].name;

    const nik = document.querySelector("#nik");
    nik.innerHTML = data.Data[0].nik;

    const birth = document.querySelector("#birth");
    birth.innerHTML = dateFormatOne(data.Data[0].tgl_lahir.slice(0, 10));

    const address = document.querySelector("#address");
    address.innerHTML = data.Data[0].alamat;

    const gender = document.querySelector("#gender");
    gender.innerHTML = data.Data[0].jenis_kelamin;

    const phone = document.querySelector("#phone");
    phone.innerHTML = data.Data[0].no_telp;

    const f_name = document.querySelector("#f-name");
    f_name.innerHTML = data.Data[0].nama_ayah;

    const f_occ = document.querySelector("#f-occ");
    f_occ.innerHTML = data.Data[0].pekerjaan_ayah;

    const f_phone = document.querySelector("#f-phone");
    f_phone.innerHTML = data.Data[0].no_telp_ayah;

    const m_name = document.querySelector("#m-name");
    m_name.innerHTML = data.Data[0].nama_ibu;

    const m_occ = document.querySelector("#m-occ");
    m_occ.innerHTML = data.Data[0].pekerjaan_ibu;

    const m_phone = document.querySelector("#m-phone");
    m_phone.innerHTML = data.Data[0].no_telp_ibu;

    const edit_button = document.querySelector("#edit-button");
    edit_button.addEventListener("click", () => {
      let edit_data = {};
      edit_data["email"] = data.Data[0].email;
      edit_data["nim"] = data.Data[0].nim;
      edit_data["name"] = data.Data[0].name;
      edit_data["nik"] = data.Data[0].nik;
      edit_data["tgl_lahir"] = data.Data[0].tgl_lahir.slice(0, 10);
      edit_data["alamat"] = data.Data[0].alamat;
      edit_data["jenis_kelamin"] = data.Data[0].jenis_kelamin;
      edit_data["no_telp"] = data.Data[0].no_telp;
      edit_data["nama_ayah"] = data.Data[0].nama_ayah;
      edit_data["pekerjaan_ayah"] = data.Data[0].pekerjaan_ayah;
      edit_data["no_telp_ayah"] = data.Data[0].no_telp_ayah;
      edit_data["nama_ibu"] = data.Data[0].nama_ibu;
      edit_data["pekerjaan_ibu"] = data.Data[0].pekerjaan_ibu;
      edit_data["no_telp_ibu"] = data.Data[0].no_telp_ibu;

      window.sessionStorage.setItem("edit-data", JSON.stringify(edit_data));
      window.location.href = "edit_profile.html";
    });
  });

// ? FETCH dari data pengguna by id END

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
