import { config } from "./config.js";

// ! INI PREVENT ORG UNTUK LANGSUNG BUKA HALAMAN INI HEHE START
let edit_data = JSON.parse(window.sessionStorage.getItem("edit-data"));
let user_data = JSON.parse(window.sessionStorage.getItem("user-data"));
console.log(edit_data);
if (edit_data === null) {
  window.location.href = "profile_page.html";
}
// ! INI PREVENT ORG UNTUK LANGSUNG BUKA HALAMAN INI HEHE END

const back_button = document.querySelector("#back-button");
back_button.addEventListener("click", () => {
  window.sessionStorage.removeItem("edit-data");
  window.location.href = "profile_page.html";
});

let validate = {
  nama: false,
  nik: false,
  tgl_lahir: false,
  alamat: false,
  email: false,
  pwd: false,
  phone: false,
  f_name: false,
  f_occ: false,
  f_phone: false,
  m_name: false,
  m_occ: false,
  m_phone: false,
};

const gender = document.querySelector("#gender");
const birth = document.querySelector("#birth");
const password = document.querySelector("#password");

// $ PERSONAL INFORMATION
const email = document.querySelector("#email");
email.value = edit_data["email"];
const nama = document.querySelector("#nama");
nama.value = edit_data["name"];
const nik = document.querySelector("#nik");
nik.value = edit_data["nik"];
const alamat = document.querySelector("#address");
alamat.value = edit_data["alamat"];
const no_telp = document.querySelector("#phone");
no_telp.value = edit_data["no_telp"];

// $ PARENT INFORMATION
const f_name = document.querySelector("#f-name");
f_name.value = edit_data["nama_ayah"];
const f_occ = document.querySelector("#f-occ");
f_occ.value = edit_data["pekerjaan_ayah"];
const f_phone = document.querySelector("#f-phone");
f_phone.value = edit_data["no_telp_ayah"];
const m_name = document.querySelector("#m-name");
m_name.value = edit_data["nama_ibu"];
const m_occ = document.querySelector("#m-occ");
m_occ.value = edit_data["pekerjaan_ibu"];
const m_phone = document.querySelector("#m-phone");
m_phone.value = edit_data["no_telp_ibu"];

const simpan_button = document.querySelector("#simpan-button");
simpan_button.addEventListener("click", () => {
  // $ PERSONAL INFORMATION
  edit_data["jenis_kelamin"] = gender.value;
  edit_data["id_user"] = user_data["id_user"];

  if (nama.value.trim() === "") {
    setErrorMsg(nama, "Please insert name correctly");
    validate["nama"] = false;
  } else if (nama.value.trim().length < 3) {
    setErrorMsg(nama, "Please input minimum 3 character");
    validate["nama"] = false;
  } else {
    setSuccessMsg(nama);
    edit_data["name"] = nama.value;
    validate["nama"] = true;
  }

  if (nik.value.trim() === "") {
    setErrorMsg(nik, "Please insert NIK correctly");
    validate["nik"] = false;
  } else if (nik.value.trim().length < 3) {
    setErrorMsg(nik, "Please input minimum 3 character");
    validate["nik"] = false;
  } else {
    setSuccessMsg(nik);
    edit_data["nik"] = nik.value;
    validate["nik"] = true;
  }

  if (birth.value.trim() === "") {
    setErrorMsg(birth, "Please insert birth date correctly");
    validate["tgl_lahir"] = false;
  } else {
    setSuccessMsg(birth);
    edit_data["tgl_lahir"] = birth.value;
    validate["tgl_lahir"] = true;
  }

  if (alamat.value.trim() === "") {
    setErrorMsg(alamat, "Please insert adress correctly");
    validate["alamat"] = false;
  } else if (alamat.value.trim().length < 3) {
    setErrorMsg(alamat, "Please input minimum 3 character");
    validate["alamat"] = false;
  } else {
    setSuccessMsg(alamat);
    edit_data["alamat"] = alamat.value;
    validate["alamat"] = true;
  }

  if (email.value.trim() === "") {
    setErrorMsg(email, "Please insert email correctly");
    validate["nama"] = false;
  } else if (email.value.trim().length < 3) {
    setErrorMsg(email, "Please input minimum 3 character");
    validate["email"] = false;
  } else {
    setSuccessMsg(email);
    email.value = edit_data["email"];
    validate["email"] = true;
  }

  if (password.value.trim() === "") {
    setErrorMsg(password, "Please insert password correctly");
    validate["pwd"] = false;
  } else if (password.value.trim().length < 5) {
    setErrorMsg(password, "Please input minimum 5 character");
    validate["pwd"] = false;
  } else {
    setSuccessMsg(password);
    edit_data["password"] = password.value;
    validate["pwd"] = true;
  }

  if (no_telp.value.trim() === "") {
    setErrorMsg(no_telp, "Please insert phone number correctly");
    validate["phone"] = false;
  } else if (no_telp.value.trim().length < 8) {
    setErrorMsg(no_telp, "Please input minimum 8 character");
    validate["phone"] = false;
  } else {
    setSuccessMsg(no_telp);
    edit_data["no_telp"] = no_telp.value;
    validate["phone"] = true;
  }

  // $ FATHER INFORMATION
  if (f_name.value.trim() === "") {
    setErrorMsg(f_name, "Please insert Father's name correctly");
    validate["f_name"] = false;
  } else if (f_name.value.trim().length < 3) {
    setErrorMsg(f_name, "Please input minimum 3 character");
    validate["f_name"] = false;
  } else {
    setSuccessMsg(f_name);
    edit_data["nama_ayah"] = f_name.value;
    validate["f_name"] = true;
  }

  if (f_occ.value.trim() === "") {
    setErrorMsg(f_occ, "Please insert Father's occupation correctly");
    validate["f_occ"] = false;
  } else if (f_occ.value.trim().length < 5) {
    setErrorMsg(f_occ, "Please input minimum 5 character");
    validate["f_occ"] = false;
  } else {
    setSuccessMsg(f_occ);
    edit_data["pekerjaan_ayah"] = f_occ.value;
    validate["f_occ"] = true;
  }

  if (f_phone.value.trim() === "") {
    setErrorMsg(f_phone, "Please insert Father's phone number correctly");
    validate["f_phone"] = false;
  } else if (f_phone.value.trim().length < 8) {
    setErrorMsg(f_phone, "Please input minimum 8 character");
    validate["f_phone"] = false;
  } else {
    setSuccessMsg(f_phone);
    edit_data["no_telp_ayah"] = f_phone.value;
    validate["f_phone"] = true;
  }

  // $ MOTHER INFORMATION
  if (m_name.value.trim() === "") {
    setErrorMsg(m_name, "Please insert Mother's name correctly");
    validate["m_name"] = false;
  } else if (m_name.value.trim().length < 3) {
    setErrorMsg(m_name, "Please input minimum 3 character");
    validate["m_name"] = false;
  } else {
    setSuccessMsg(m_name);
    edit_data["nama_ibu"] = m_name.value;
    validate["m_name"] = true;
  }

  if (m_occ.value.trim() === "") {
    setErrorMsg(m_occ, "Please insert Mother's occupation correctly");
    validate["m_occ"] = false;
  } else if (m_occ.value.trim().length < 5) {
    setErrorMsg(m_occ, "Please input minimum 5 character");
    validate["m_occ"] = false;
  } else {
    setSuccessMsg(m_occ);
    edit_data["pekerjaan_ibu"] = m_occ.value;
    validate["m_occ"] = true;
  }

  if (m_phone.value.trim() === "") {
    setErrorMsg(m_phone, "Please insert Mother's phone number correctly");
    validate["m_phone"] = false;
  } else if (m_phone.value.trim().length < 8) {
    setErrorMsg(m_phone, "Please input minimum 8 character");
    validate["m_phone"] = false;
  } else {
    setSuccessMsg(m_phone);
    edit_data["no_telp_ibu"] = m_phone.value;
    validate["m_phone"] = true;
  }

  // ? disini tempat buat masukin ke database
  if (inputValidation(validate, 14)) {
    const formData = new URLSearchParams();
    for (const [key, value] of Object.entries(edit_data)) {
      formData.append(key, value.toString());
    }

    // % Submit Data
    // const endpoint = `${config.api}createNewTransaksi`; //? belum ada updatenya

    // fetch(endpoint, {
    //   method: "PUT",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    //   body: formData.toString(),
    // })
    //   .then((response) => response.json())
    //   .then((response) => console.log(JSON.stringify(response)))
    //   .finally(() => {
    //     // % Melanjutkan ke halaman transaksi
    //     window.sessionStorage.removeItem("edit-data");
    //     window.location.href = "profile_page.html";
    //   });
  }
  // ? disini tempat buat masukin ke database
});

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
