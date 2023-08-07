import { config } from "./config.js";

const pwd_modal = document.querySelector("#edit-pwd-modal");

// % MEMBUKA modal edit profile pada halaman profile
const open_pwd = document.querySelector("#open-pwd-modal");
open_pwd.addEventListener("click", () => {
  pwd_modal.showModal();
});

// % MENUTUP modal edit profile pada halaman profile
const close_pwd = document.querySelector("#back-pwd-modal");
close_pwd.addEventListener("click", () => {
  pwd_modal.close();
});

// % MENGIRIMKAN data input ke API pada modal edit profile
const submit_pwd = document.querySelector("#submit-pwd-modal");
submit_pwd.addEventListener("click", () => {
  let validate = {
    pwd_old: false,
    pwd_new: false,
  };
  const pwd_old = document.querySelector("#pwd-old");
  if (pwd_old.value === "") {
    setErrorMsg(pwd_old, "Please insert password correctly");
    validate["pwd_old"] = false;
  } else if (pwd_old.value.length < 5) {
    setErrorMsg(pwd_old, "Please input minimum 5 character");
    validate["pwd_old"] = false;
  } else {
    setSuccessMsg(pwd_old);
    validate["pwd_old"] = true;
  }

  const pwd_new = document.querySelector("#pwd-new");
  if (pwd_new.value === "") {
    setErrorMsg(pwd_new, "Please insert password correctly");
    validate["pwd_new"] = false;
  } else if (pwd_new.value.length < 5) {
    setErrorMsg(pwd_new, "Please input minimum 5 character");
    validate["pwd_new"] = false;
  } else {
    setSuccessMsg(pwd_new);
    validate["pwd_new"] = true;
  }

  if (inputValidation(validate, 2)) {
    let pwd_data = {};
    pwd_data["password"] = pwd_old.value;
    pwd_data["new_password"] = pwd_new.value;

    const formData = new URLSearchParams();
    for (const [key, value] of Object.entries(pwd_data)) {
      formData.append(key, value.toString());
    }
    //? belum SELESAI HARUS FETCH API PASSWORD
    // const endpoint = `${config.api}createNewTransaksi`;

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
    pwd_modal.close();
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
