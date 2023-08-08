import { config } from "../config.js";

let user_data = JSON.parse(window.sessionStorage.getItem("user-data"));

const submit_compl = document.querySelector("#submit-compl-button");
submit_compl.addEventListener("click", () => {
  const complaint_type = document.querySelector("#complaint-type");
  const complaint_desc = document.querySelector("#compl-desc");

  let validate = {
    deskripsi: false,
  };

  // % Description
  if (complaint_desc.value === "") {
    setErrorMsg(complaint_desc, "Please insert description correctly");
    validate["deskripsi"] = false;
  } else {
    setSuccessMsg(complaint_desc);
    validate["deskripsi"] = true;
  }

  if (inputValidation(validate, 1)) {
    let compl_data = {};
    compl_data["id_user"] = user_data["id_user"];
    compl_data["jenis_pengaduan"] = complaint_type.value;
    compl_data["deskripsi"] = complaint_desc.value;

    const formData = new URLSearchParams();
    for (const [key, value] of Object.entries(compl_data)) {
      formData.append(key, value.toString());
    }
    const endpoint = `${config.api}createNewPengaduan`; //? belum ada updatenya
    fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    })
      .then((response) => response.json())
      .then((response) => console.log(JSON.stringify(response)))
      .finally(() => {
        // % Melanjutkan ke halaman complaint
        window.location.href = "complaint_page.html";
      });
  }
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
