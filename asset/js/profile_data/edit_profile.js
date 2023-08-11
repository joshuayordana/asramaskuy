import { config } from "../config.js";

let user_data = JSON.parse(window.sessionStorage.getItem("user-data"));
const edit_modal = document.querySelector("#edit-info-modal");

// % MEMBUKA modal edit profile pada halaman profile
const open_info = document.querySelector("#open-info-modal");
open_info.addEventListener("click", () => {
  edit_modal.showModal();
});

// % MENUTUP modal edit profile pada halaman profile
const close_info = document.querySelector("#back-info-modal");
close_info.addEventListener("click", () => {
  edit_modal.close();
});

// % MENGIRIMKAN data input ke API pada modal edit profile
const submit_info = document.querySelector("#submit-info-modal");
submit_info.addEventListener("click", () => {
  inputData();
});

function inputData() {
  const info_email = document.querySelector("#info-email");
  const info_sid = document.querySelector("#info-sid");
  const info_name = document.querySelector("#info-nama");
  const info_nik = document.querySelector("#info-nik");
  const info_birth = document.querySelector("#info-birth");
  const info_address = document.querySelector("#info-address");
  const info_gender = document.querySelector("#info-gender");
  const info_phone = document.querySelector("#info-phone");
  const info_f_name = document.querySelector("#info-f-name");
  const info_f_occ = document.querySelector("#info-f-occ");
  const info_f_phone = document.querySelector("#info-f-phone");
  const info_m_name = document.querySelector("#info-m-name");
  const info_m_occ = document.querySelector("#info-m-occ");
  const info_m_phone = document.querySelector("#info-m-phone");

  let validate = {
    nama: false,
    nim: false,
    nik: false,
    tgl_lahir: false,
    alamat: false,
    email: false,
    phone: false,
    f_name: false,
    f_occ: false,
    f_phone: false,
    m_name: false,
    m_occ: false,
    m_phone: false,
  };

  // % NAME
  if (info_name.value.trim() === "") {
    setErrorMsg(info_name, "Please insert name correctly");
    validate["nama"] = false;
  } else if (info_name.value.trim().length < 3) {
    setErrorMsg(info_name, "Please input minimum 3 character");
    validate["nama"] = false;
  } else {
    setSuccessMsg(info_name);
    validate["nama"] = true;
  }

  // % SID
  if (info_sid.value.trim() === "") {
    setErrorMsg(info_sid, "Please insert Student ID correctly");
    validate["nim"] = false;
  } else if (info_sid.value.trim().length < 5) {
    setErrorMsg(info_sid, "Please input minimum 5 character");
    validate["nim"] = false;
  } else {
    setSuccessMsg(info_sid);
    validate["nim"] = true;
  }

  // % NIK
  if (info_nik.value.trim() === "") {
    setErrorMsg(info_nik, "Please insert NIK correctly");
    validate["nik"] = false;
  } else if (info_nik.value.trim().length < 3) {
    setErrorMsg(info_nik, "Please input minimum 3 character");
    validate["nik"] = false;
  } else {
    setSuccessMsg(info_nik);
    validate["nik"] = true;
  }

  // % BIRTH
  if (info_birth.value.trim() === "") {
    setErrorMsg(info_birth, "Please insert birth date correctly");
    validate["tgl_lahir"] = false;
  } else {
    setSuccessMsg(info_birth);
    validate["tgl_lahir"] = true;
  }

  // % ALAMAT
  if (info_address.value.trim() === "") {
    setErrorMsg(info_address, "Please insert adress correctly");
    validate["alamat"] = false;
  } else if (info_address.value.trim().length < 5) {
    setErrorMsg(info_address, "Please input minimum 5 character");
    validate["alamat"] = false;
  } else {
    setSuccessMsg(info_address);
    validate["alamat"] = true;
  }

  // % EMAIL
  if (info_email.value.trim() === "") {
    setErrorMsg(info_email, "Please insert email correctly");
    validate["nama"] = false;
  } else if (info_email.value.trim().length < 5) {
    setErrorMsg(info_email, "Please input minimum 5 character");
    validate["email"] = false;
  } else {
    setSuccessMsg(info_email);
    validate["email"] = true;
  }

  // % PHONE
  if (info_phone.value.trim() === "") {
    setErrorMsg(info_phone, "Please insert phone number correctly");
    validate["phone"] = false;
  } else if (info_phone.value.trim().length < 12) {
    setErrorMsg(info_phone, "Please input minimum 12 character");
    validate["phone"] = false;
  } else {
    setSuccessMsg(info_phone);
    validate["phone"] = true;
  }

  // $ FATHER INFORMATION
  //% FATHER NAME
  if (info_f_name.value.trim() === "") {
    setErrorMsg(info_f_name, "Please insert Father's name correctly");
    validate["f_name"] = false;
  } else if (info_f_name.value.trim().length < 3) {
    setErrorMsg(info_f_name, "Please input minimum 3 character");
    validate["f_name"] = false;
  } else {
    setSuccessMsg(info_f_name);
    validate["f_name"] = true;
  }

  //% FATHER OCCUPATION
  if (info_f_occ.value.trim() === "") {
    setErrorMsg(info_f_occ, "Please insert Father's occupation correctly");
    validate["f_occ"] = false;
  } else if (info_f_occ.value.trim().length < 5) {
    setErrorMsg(info_f_occ, "Please input minimum 5 character");
    validate["f_occ"] = false;
  } else {
    setSuccessMsg(info_f_occ);
    validate["f_occ"] = true;
  }

  //% FATHER PHONE
  if (info_f_phone.value.trim() === "") {
    setErrorMsg(info_f_phone, "Please insert Father's phone number correctly");
    validate["f_phone"] = false;
  } else if (info_f_phone.value.trim().length < 12) {
    setErrorMsg(info_f_phone, "Please input minimum 12 character");
    validate["f_phone"] = false;
  } else {
    setSuccessMsg(info_f_phone);
    validate["f_phone"] = true;
  }

  // $ MOTHER INFORMATION
  //% MOTHER NAME
  if (info_m_name.value.trim() === "") {
    setErrorMsg(info_m_name, "Please insert Mother's name correctly");
    validate["m_name"] = false;
  } else if (info_m_name.value.trim().length < 3) {
    setErrorMsg(info_m_name, "Please input minimum 3 character");
    validate["m_name"] = false;
  } else {
    setSuccessMsg(info_m_name);
    validate["m_name"] = true;
  }

  // % MOTHER OCCUPATION
  if (info_m_occ.value.trim() === "") {
    setErrorMsg(info_m_occ, "Please insert Mother's occupation correctly");
    validate["m_occ"] = false;
  } else if (info_m_occ.value.trim().length < 5) {
    setErrorMsg(info_m_occ, "Please input minimum 5 character");
    validate["m_occ"] = false;
  } else {
    setSuccessMsg(info_m_occ);
    validate["m_occ"] = true;
  }

  //% MOTHER PHONE
  if (info_m_phone.value.trim() === "") {
    setErrorMsg(info_m_phone, "Please insert Mother's phone number correctly");
    validate["m_phone"] = false;
  } else if (info_m_phone.value.trim().length < 12) {
    setErrorMsg(info_m_phone, "Please input minimum 12 character");
    validate["m_phone"] = false;
  } else {
    setSuccessMsg(info_m_phone);
    validate["m_phone"] = true;
  }

  // ? disini tempat buat masukin ke database
  if (inputValidation(validate, 13)) {
    let edit_data = {};
    edit_data["jenis_kelamin"] = info_gender.value;
    edit_data["id_user"] = user_data["id_user"];
    edit_data["nama"] = info_name.value;
    edit_data["nim"] = info_sid.value;
    edit_data["nik"] = info_nik.value;
    edit_data["tgl_lahir"] = info_birth.value;
    edit_data["alamat"] = info_address.value;
    edit_data["email"] = info_email.value;
    edit_data["no_telp"] = info_phone.value;
    edit_data["nama_ayah"] = info_f_name.value;
    edit_data["pekerjaan_ayah"] = info_f_occ.value;
    edit_data["no_telp_ayah"] = info_f_phone.value;
    edit_data["nama_ibu"] = info_m_name.value;
    edit_data["pekerjaan_ibu"] = info_m_occ.value;
    edit_data["no_telp_ibu"] = info_m_phone.value;

    const formData = new URLSearchParams();
    for (const [key, value] of Object.entries(edit_data)) {
      formData.append(key, value.toString());
    }
    const endpoint = `${config.api}updateUserProfile`; //? belum ada updatenya

    console.log(edit_data);
    fetch(endpoint, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    })
      .then((response) => response.json())
      .then((response) => console.log(JSON.stringify(response)))
      .finally(() => {
        // % Melanjutkan ke halaman transaksi
        edit_modal.close();
        window.location.href = "profile_page.html";
      });
  }
}

// % Jika ada error pada input
function setErrorMsg(element, message) {
  const data = element.parentElement;
  const small = data.querySelector("small");
  small.innerText = message;
}

// % Jika tidak ada error pada input
function setSuccessMsg(element) {
  const data = element.parentElement;
  const small = data.querySelector("small");
  small.innerText = "";
}

// % Validasi input-input pada setiap halaman
function inputValidation(assoc_array, true_count) {
  let count = 0;
  Object.values(assoc_array).forEach((value) => {
    if (value === true) {
      count++;
    }
  });
  if (count === true_count) {
    return true;
  } else {
    return false;
  }
}
