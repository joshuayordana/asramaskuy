import { config } from "./config.js";

var step = 1;

// % Jika ingin Balik
const arrow_back = document.getElementById("arrow_back");
arrow_back.addEventListener("click", back);

let formData = new FormData();
const photo = document.getElementById("photo");
photo.addEventListener("change", () => {
  const img = photo.files[0];
  if (formData.has("photo")) {
    formData.set("photo", img);
  } else {
    formData.append("photo", img);
  }
  const photo_name = document.getElementById("photo-name");
  photo_name.textContent = img.name;
});

// % Arah balik dan maju
const next1 = document.getElementById("next1");
next1.addEventListener("click", () => {
  let validate = {
    nama: false,
    stid: false,
    nik: false,
    tgl_lahir: false,
    alamat: false,
  };

  const nama = document.getElementById("nama");
  if (nama.value.trim() === "") {
    setErrorMsg(nama, "Please insert name correctly");
    validate["nama"] = false;
  } else if (nama.value.trim().length < 3) {
    setErrorMsg(nama, "Please input minimum 3 character");
    validate["nama"] = false;
  } else {
    setSuccessMsg(nama);
    validate["nama"] = true;
  }

  const student_id = document.getElementById("student_id");
  if (student_id.value.trim() === "") {
    setErrorMsg(student_id, "Please insert student ID correctly");
    validate["stid"] = false;
  } else if (nama.value.trim().length < 3) {
    setErrorMsg(student_id, "Please input minimum 3 character");
    validate["stid"] = false;
  } else {
    setSuccessMsg(student_id);
    validate["stid"] = true;
  }

  const nik = document.getElementById("nik");
  if (nik.value.trim() === "") {
    setErrorMsg(nik, "Please insert NIK correctly");
    validate["nik"] = false;
  } else if (nik.value.trim().length < 3) {
    setErrorMsg(nik, "Please input minimum 3 character");
    validate["nik"] = false;
  } else {
    setSuccessMsg(nik);
    validate["nik"] = true;
  }

  const tgl_lahir = document.getElementById("tgl_lahir");
  if (tgl_lahir.value.trim() === "") {
    setErrorMsg(tgl_lahir, "Please insert NIK correctly");
    validate["tgl_lahir"] = false;
  } else {
    setSuccessMsg(tgl_lahir);
    validate["tgl_lahir"] = true;
  }

  const alamat = document.getElementById("alamat");
  if (alamat.value.trim() === "") {
    setErrorMsg(alamat, "Please insert NIK correctly");
    validate["alamat"] = false;
  } else if (alamat.value.trim().length < 3) {
    setErrorMsg(alamat, "Please input minimum 3 character");
    validate["alamat"] = false;
  } else {
    setSuccessMsg(alamat);
    validate["alamat"] = true;
  }

  if (inputValidation(validate, 5)) {
    nextStep();
  }
});

const next2 = document.getElementById("next2");
next2.addEventListener("click", () => {
  let validate = {
    email: false,
    pwd: false,
    phone: false,
  };

  const email = document.getElementById("email");
  if (email.value.trim() === "") {
    setErrorMsg(email, "Please insert email correctly");
    validate["nama"] = false;
  } else if (email.value.trim().length < 3) {
    setErrorMsg(email, "Please input minimum 3 character");
    validate["email"] = false;
  } else {
    setSuccessMsg(email);
    validate["email"] = true;
  }

  const password = document.getElementById("password");
  if (password.value.trim() === "") {
    setErrorMsg(password, "Please insert password correctly");
    validate["pwd"] = false;
  } else if (password.value.trim().length < 5) {
    setErrorMsg(password, "Please input minimum 5 character");
    validate["pwd"] = false;
  } else {
    setSuccessMsg(password);
    validate["pwd"] = true;
  }

  const no_telp = document.getElementById("no_telp");
  if (no_telp.value.trim() === "") {
    setErrorMsg(no_telp, "Please insert phone number correctly");
    validate["phone"] = false;
  } else if (no_telp.value.trim().length < 8) {
    setErrorMsg(no_telp, "Please input minimum 8 character");
    validate["phone"] = false;
  } else {
    setSuccessMsg(no_telp);
    validate["phone"] = true;
  }

  if (inputValidation(validate, 3)) {
    nextStep();
  }
});

const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", () => {
  let validate = {
    f_name: false,
    f_occ: false,
    f_phone: false,
    m_name: false,
    m_occ: false,
    m_phone: false,
  };

  const f_name = document.getElementById("f_name");
  if (f_name.value.trim() === "") {
    setErrorMsg(f_name, "Please insert Father's name correctly");
    validate["f_name"] = false;
  } else if (f_name.value.trim().length < 3) {
    setErrorMsg(f_name, "Please input minimum 3 character");
    validate["f_name"] = false;
  } else {
    setSuccessMsg(f_name);
    validate["f_name"] = true;
  }

  const f_occ = document.getElementById("f_occ");
  if (f_occ.value.trim() === "") {
    setErrorMsg(f_occ, "Please insert Father's occupation correctly");
    validate["f_occ"] = false;
  } else if (f_occ.value.trim().length < 5) {
    setErrorMsg(f_occ, "Please input minimum 5 character");
    validate["f_occ"] = false;
  } else {
    setSuccessMsg(f_occ);
    validate["f_occ"] = true;
  }

  const f_phone = document.getElementById("f_phone");
  if (f_phone.value.trim() === "") {
    setErrorMsg(f_phone, "Please insert Father's phone number correctly");
    validate["f_phone"] = false;
  } else if (f_phone.value.trim().length < 8) {
    setErrorMsg(f_phone, "Please input minimum 8 character");
    validate["f_phone"] = false;
  } else {
    setSuccessMsg(f_phone);
    validate["f_phone"] = true;
  }

  const m_name = document.getElementById("m_name");
  if (m_name.value.trim() === "") {
    setErrorMsg(m_name, "Please insert Mother's name correctly");
    validate["m_name"] = false;
  } else if (m_name.value.trim().length < 3) {
    setErrorMsg(m_name, "Please input minimum 3 character");
    validate["m_name"] = false;
  } else {
    setSuccessMsg(m_name);
    validate["m_name"] = true;
  }

  const m_occ = document.getElementById("m_occ");
  if (m_occ.value.trim() === "") {
    setErrorMsg(m_occ, "Please insert Mother's occupation correctly");
    validate["m_occ"] = false;
  } else if (m_occ.value.trim().length < 5) {
    setErrorMsg(m_occ, "Please input minimum 5 character");
    validate["m_occ"] = false;
  } else {
    setSuccessMsg(m_occ);
    validate["m_occ"] = true;
  }

  const m_phone = document.getElementById("m_phone");
  if (m_phone.value.trim() === "") {
    setErrorMsg(m_phone, "Please insert Mother's phone number correctly");
    validate["m_phone"] = false;
  } else if (m_phone.value.trim().length < 8) {
    setErrorMsg(m_phone, "Please input minimum 8 character");
    validate["m_phone"] = false;
  } else {
    setSuccessMsg(m_phone);
    validate["m_phone"] = true;
  }

  if (inputValidation(validate, 6)) {
    //Get Data
    formData.append("nama", document.getElementById("nama").value);
    formData.append("nim", document.getElementById("student_id").value);
    formData.append("nik", document.getElementById("nik").value);
    formData.append("tgl_lahir", document.getElementById("tgl_lahir").value);
    formData.append("jenis_kelamin", document.getElementById("gender").value);
    formData.append("alamat", document.getElementById("alamat").value);

    formData.append("email", document.getElementById("email").value);
    formData.append("password", document.getElementById("password").value);
    formData.append("no_telp", document.getElementById("no_telp").value);

    formData.append("nama_ayah", document.getElementById("f_name").value);
    formData.append("pekerjaan_ayah", document.getElementById("f_occ").value);
    formData.append("no_telp_ayah", document.getElementById("f_phone").value);
    formData.append("nama_ibu", document.getElementById("m_name").value);
    formData.append("pekerjaan_ibu", document.getElementById("m_occ").value);
    formData.append("no_telp_ibu", document.getElementById("m_phone").value);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    //Submit Data
    const endpoint = `${config.api}createNewUser`;
    fetch(endpoint, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => console.log(JSON.stringify(response)))
      .finally(() => {
        window.location.href = "login.html";
      });
  }
});

// % Untuk maju ke halaman berikutnya
function nextStep() {
  const isi1 = document.getElementById(`isi${step}`);
  const isi2 = document.getElementById(`isi${step + 1}`);
  isi1.style.display = "none";
  isi2.style.display = "block";
  step += 1;
}

// % Untuk maju ke halaman sebelumnya
function back() {
  step -= 1;
  if (step <= 0) {
    window.location.href = "./login.html";
  }
  const isi1 = document.getElementById(`isi${step}`);
  const isi2 = document.getElementById(`isi${step + 1}`);
  isi2.style.display = "none";
  isi1.style.display = "block";
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
