import { config } from "../config.js";

let user_data = JSON.parse(window.sessionStorage.getItem("user-data"));
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

// % Untuk pada show visible or not pada bagian password
const old_pass_visible = document.getElementById("old-pass-visibility");
old_pass_visible.addEventListener("click", () => {
  const pass_type = document.getElementById("pwd-old");
  if (pass_type.type === "password") {
    pass_type.type = "text";
    old_pass_visible.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5Z"/></svg>
    `;
  } else if (pass_type.type === "text") {
    pass_type.type = "password";
    old_pass_visible.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="-2 -2 24 24">
                              <path fill="currentColor" 
                              d="M9.329 11.885L2.12 19.092a1 1 0 1 1-1.414-1.414l7.324-7.324a2 2 0 0 1 2.322-2.322L17.679.706a1 1 0 0 1 1.414 1.414l-7.208 7.21a2 2 0 0 1-2.556 2.556zm7.54-6.127C18.75 6.842 20 8.34 20 10c0 3.314-4.958 5.993-10 6a14.734 14.734 0 0 1-3.053-.32l1.861-1.86a4 4 0 0 0 5.011-5.011l3.05-3.051zm-4.16-1.496l-1.834 1.834a4 4 0 0 0-4.779 4.779L2.869 14.1C1.134 13.028 0 11.585 0 10c0-3.314 4.984-6.017 10-6c.914.003 1.827.094 2.709.262z"/></svg>
    `;
  }
});

// % Untuk pada show visible or not pada bagian password
const new_pass_visible = document.getElementById("new-pass-visibility");
new_pass_visible.addEventListener("click", () => {
  const pass_type = document.getElementById("pwd-new");
  if (pass_type.type === "password") {
    pass_type.type = "text";
    new_pass_visible.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5Z"/></svg>
    `;
  } else if (pass_type.type === "text") {
    pass_type.type = "password";
    new_pass_visible.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="-2 -2 24 24">
                              <path fill="currentColor" 
                              d="M9.329 11.885L2.12 19.092a1 1 0 1 1-1.414-1.414l7.324-7.324a2 2 0 0 1 2.322-2.322L17.679.706a1 1 0 0 1 1.414 1.414l-7.208 7.21a2 2 0 0 1-2.556 2.556zm7.54-6.127C18.75 6.842 20 8.34 20 10c0 3.314-4.958 5.993-10 6a14.734 14.734 0 0 1-3.053-.32l1.861-1.86a4 4 0 0 0 5.011-5.011l3.05-3.051zm-4.16-1.496l-1.834 1.834a4 4 0 0 0-4.779 4.779L2.869 14.1C1.134 13.028 0 11.585 0 10c0-3.314 4.984-6.017 10-6c.914.003 1.827.094 2.709.262z"/></svg>
    `;
  }
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
    setErrorMsg(pwd_old.parentElement, "Please insert password correctly");
    validate["pwd_old"] = false;
  } else if (pwd_old.value.length < 5) {
    setErrorMsg(pwd_old.parentElement, "Please input minimum 5 character");
    validate["pwd_old"] = false;
  } else {
    setSuccessMsg(pwd_old.parentElement);
    validate["pwd_old"] = true;
  }

  const pwd_new = document.querySelector("#pwd-new");
  if (pwd_new.value === "") {
    setErrorMsg(pwd_new.parentElement, "Please insert password correctly");
    validate["pwd_new"] = false;
  } else if (pwd_new.value.length < 5) {
    setErrorMsg(pwd_new.parentElement, "Please input minimum 5 character");
    validate["pwd_new"] = false;
  } else {
    setSuccessMsg(pwd_new.parentElement);
    validate["pwd_new"] = true;
  }

  if (inputValidation(validate, 2)) {
    let pwd_data = {};
    pwd_data["id_user"] = user_data["id_user"];
    pwd_data["old_password"] = pwd_old.value;
    pwd_data["new_password"] = pwd_new.value;
    console.log(pwd_data);

    const formData = new URLSearchParams();
    for (const [key, value] of Object.entries(pwd_data)) {
      formData.append(key, value.toString());
    }
    //? belum SELESAI HARUS FETCH API PASSWORD
    const endpoint = `${config.api}updateUser`;

    fetch(endpoint, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.data === null) {
          setErrorMsg(pwd_old.parentElement, response.message);
        } else {
          window.location.href = "profile_page.html";
        }
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
