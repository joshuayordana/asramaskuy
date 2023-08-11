import { config } from "../config.js";

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

// % Untuk pada show visible or not pada bagian password
const pass_visible = document.getElementById("pass-visibility");
pass_visible.addEventListener("click", () => {
  const pass_type = document.getElementById("password").type;
  if (pass_type === "password") {
    document.getElementById("password").type = "text";
    pass_visible.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5Z"/></svg>
    `;
  } else if (pass_type === "text") {
    document.getElementById("password").type = "password";
    pass_visible.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="-2 -2 24 24">
                              <path fill="currentColor" 
                              d="M9.329 11.885L2.12 19.092a1 1 0 1 1-1.414-1.414l7.324-7.324a2 2 0 0 1 2.322-2.322L17.679.706a1 1 0 0 1 1.414 1.414l-7.208 7.21a2 2 0 0 1-2.556 2.556zm7.54-6.127C18.75 6.842 20 8.34 20 10c0 3.314-4.958 5.993-10 6a14.734 14.734 0 0 1-3.053-.32l1.861-1.86a4 4 0 0 0 5.011-5.011l3.05-3.051zm-4.16-1.496l-1.834 1.834a4 4 0 0 0-4.779 4.779L2.869 14.1C1.134 13.028 0 11.585 0 10c0-3.314 4.984-6.017 10-6c.914.003 1.827.094 2.709.262z"/></svg>
    `;
  }
});

validation_step_1();
validation_step_2();
validation_step_3();

function validation_step_1() {
  let validate = {
    nama: false,
    stid: false,
    img: false,
    nik: false,
    tgl_lahir: false,
    alamat: false,
  };

  // % error checking nama pada saat diketik
  const nama = document.getElementById("nama");
  nama.addEventListener("change", () => {
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
  });

  // % error checking nim pada saat diketik
  const student_id = document.getElementById("student_id");
  student_id.addEventListener("change", () => {
    if (student_id.value.trim() === "") {
      setErrorMsg(student_id, "Please insert student ID correctly");
      validate["stid"] = false;
    } else if (student_id.value.trim().length < 5) {
      setErrorMsg(student_id, "Please input minimum 5 character");
      validate["stid"] = false;
    } else {
      setSuccessMsg(student_id);
      validate["stid"] = true;
    }
  });

  // % error checking nik pada saat diketik
  const nik = document.getElementById("nik");
  nik.addEventListener("change", () => {
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
  });

  // % error checking img yang diperlukan pada saat diupload
  const photo_name = document.getElementById("photo-name");
  photo.addEventListener("change", () => {
    if (!formData.has("photo")) {
      setErrorMsg(photo_name, "Please insert your image");
      validate["img"] = false;
    } else {
      setSuccessMsg(photo_name);
      validate["img"] = true;
    }
  });

  const tgl_lahir = document.getElementById("tgl_lahir");
  tgl_lahir.addEventListener("change", () => {
    if (tgl_lahir.value.trim() === "") {
      setErrorMsg(tgl_lahir, "Please insert birth date correctly");
      validate["tgl_lahir"] = false;
    } else {
      setSuccessMsg(tgl_lahir);
      validate["tgl_lahir"] = true;
    }
  });

  // % error checking alamat pada saat diketik
  const alamat = document.getElementById("alamat");
  alamat.addEventListener("change", () => {
    if (alamat.value.trim() === "") {
      setErrorMsg(alamat, "Please insert adress correctly");
      validate["alamat"] = false;
    } else if (alamat.value.trim().length < 5) {
      setErrorMsg(alamat, "Please input minimum 5 character");
      validate["alamat"] = false;
    } else {
      setSuccessMsg(alamat);
      validate["alamat"] = true;
    }
  });

  // % Arah balik dan maju
  const next1 = document.getElementById("next1");
  next1.addEventListener("click", () => {
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

    if (student_id.value.trim() === "") {
      setErrorMsg(student_id, "Please insert student ID correctly");
      validate["stid"] = false;
    } else if (student_id.value.trim().length < 3) {
      setErrorMsg(student_id, "Please input minimum 3 character");
      validate["stid"] = false;
    } else {
      setSuccessMsg(student_id);
      validate["stid"] = true;
    }

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

    if (!formData.has("photo")) {
      setErrorMsg(photo_name, "Please insert your image");
      validate["img"] = false;
    } else {
      setSuccessMsg(photo_name);
      validate["img"] = true;
    }

    if (tgl_lahir.value.trim() === "") {
      setErrorMsg(tgl_lahir, "Please insert birth date correctly");
      validate["tgl_lahir"] = false;
    } else {
      setSuccessMsg(tgl_lahir);
      validate["tgl_lahir"] = true;
    }

    if (alamat.value.trim() === "") {
      setErrorMsg(alamat, "Please insert adress correctly");
      validate["alamat"] = false;
    } else if (alamat.value.trim().length < 5) {
      setErrorMsg(alamat, "Please input minimum 5 character");
      validate["alamat"] = false;
    } else {
      setSuccessMsg(alamat);
      validate["alamat"] = true;
    }

    if (inputValidation(validate, 6)) {
      nextStep();
    }
  });
}

function validation_step_2() {
  let validate = {
    email: false,
    pwd: false,
    phone: false,
  };
  // % error checking email pada saat diketik
  const email = document.getElementById("email");
  email.addEventListener("change", () => {
    if (email.value.trim() === "") {
      setErrorMsg(email, "Please insert email correctly");
      validate["nama"] = false;
    } else if (email.value.trim().length < 5) {
      setErrorMsg(email, "Please input minimum 5 character");
      validate["email"] = false;
    } else {
      setSuccessMsg(email);
      validate["email"] = true;
    }
  });

  // % error checking password pada saat diketik
  const password = document.getElementById("password");
  password.addEventListener("change", () => {
    if (password.value === "") {
      setErrorMsg(password.parentElement, "Please insert password correctly");
      validate["pwd"] = false;
    } else if (password.value.length < 5) {
      setErrorMsg(password.parentElement, "Please input minimum 5 character");
      validate["pwd"] = false;
    } else {
      setSuccessMsg(password.parentElement);
      validate["pwd"] = true;
    }
  });

  // % error checking no_telp pada saat diketik
  const no_telp = document.getElementById("no_telp");
  no_telp.addEventListener("change", () => {
    if (no_telp.value.trim() === "") {
      setErrorMsg(no_telp, "Please insert phone number correctly");
      validate["phone"] = false;
    } else if (no_telp.value.trim().length < 12) {
      setErrorMsg(no_telp, "Please input minimum 12 character");
      validate["phone"] = false;
    } else {
      setSuccessMsg(no_telp);
      validate["phone"] = true;
    }
  });

  const next2 = document.getElementById("next2");
  next2.addEventListener("click", () => {
    if (email.value.trim() === "") {
      setErrorMsg(email, "Please insert email correctly");
      validate["nama"] = false;
    } else if (email.value.trim().length < 5) {
      setErrorMsg(email, "Please input minimum 5 character");
      validate["email"] = false;
    } else {
      setSuccessMsg(email);
      validate["email"] = true;
    }

    if (password.value === "") {
      setErrorMsg(password.parentElement, "Please insert password correctly");
      validate["pwd"] = false;
    } else if (password.value.length < 5) {
      setErrorMsg(password.parentElement, "Please input minimum 5 character");
      validate["pwd"] = false;
    } else {
      setSuccessMsg(password.parentElement);
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
      validate["phone"] = true;
    }

    if (inputValidation(validate, 3)) {
      nextStep();
    }
  });
}

function validation_step_3() {
  let validate = {
    f_name: false,
    f_occ: false,
    f_phone: false,
    m_name: false,
    m_occ: false,
    m_phone: false,
  };

  // % error checking f_name pada saat diketik
  const f_name = document.getElementById("f_name");
  f_name.addEventListener("change", () => {
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
  });

  // % error checking f_occ pada saat diketik
  const f_occ = document.getElementById("f_occ");
  f_occ.addEventListener("change", () => {
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
  });

  // % error checking f_phone pada saat diketik
  const f_phone = document.getElementById("f_phone");
  f_phone.addEventListener("change", () => {
    if (f_phone.value.trim() === "") {
      setErrorMsg(f_phone, "Please insert Father's phone number correctly");
      validate["f_phone"] = false;
    } else if (f_phone.value.trim().length < 12) {
      setErrorMsg(f_phone, "Please input minimum 12 character");
      validate["f_phone"] = false;
    } else {
      setSuccessMsg(f_phone);
      validate["f_phone"] = true;
    }
  });

  // % error checking m_name pada saat diketik
  const m_name = document.getElementById("m_name");
  m_name.addEventListener("change", () => {
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
  });

  // % error checking m_occ pada saat diketik
  const m_occ = document.getElementById("m_occ");
  m_occ.addEventListener("change", () => {
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
  });

  // % error checking m_phone pada saat diketik
  const m_phone = document.getElementById("m_phone");
  m_phone.addEventListener("change", () => {
    if (m_phone.value.trim() === "") {
      setErrorMsg(m_phone, "Please insert Mother's phone number correctly");
      validate["m_phone"] = false;
    } else if (m_phone.value.trim().length < 12) {
      setErrorMsg(m_phone, "Please input minimum 12 character");
      validate["m_phone"] = false;
    } else {
      setSuccessMsg(m_phone);
      validate["m_phone"] = true;
    }
  });

  const submitButton = document.getElementById("submit");
  submitButton.addEventListener("click", () => {
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

    if (f_phone.value.trim() === "") {
      setErrorMsg(f_phone, "Please insert Father's phone number correctly");
      validate["f_phone"] = false;
    } else if (f_phone.value.trim().length < 12) {
      setErrorMsg(f_phone, "Please input minimum 8 character");
      validate["f_phone"] = false;
    } else {
      setSuccessMsg(f_phone);
      validate["f_phone"] = true;
    }

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
      let hash_code = new Hashes.MD5();
      //Get Data
      formData.append("nama", document.getElementById("nama").value);
      formData.append("nim", document.getElementById("student_id").value);
      formData.append("nik", document.getElementById("nik").value);
      formData.append("tgl_lahir", document.getElementById("tgl_lahir").value);
      formData.append("jenis_kelamin", document.getElementById("gender").value);
      formData.append("alamat", document.getElementById("alamat").value);
      formData.append("email", document.getElementById("email").value);
      formData.append("password", hash_code.hex(document.getElementById("password").value));
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
}

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
