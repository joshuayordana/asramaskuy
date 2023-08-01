import { config } from "./config.js";

let user_data = JSON.parse(window.sessionStorage.getItem("user-data"));

// ? FETCH dari data pengguna by id start

const endpoint = `${config.api}getUserById?id_user=${user_data["id_user"]}`;
fetch(endpoint)
  .then((result) => result.json())
  .then(({ data }) => {
    console.log(data.Data);
    const email = document.querySelector("#email");
    const sid = document.querySelector("#sid");
    const name = document.querySelector("#name");
    const nik = document.querySelector("#nik");
    const address = document.querySelector("#address");
    const gender = document.querySelector("#gender");
    const phone = document.querySelector("#phone");
    const f_name = document.querySelector("#f_name");
    const f_occ = document.querySelector("#f_occ");
    const f_phone = document.querySelector("#f_phone");
    const m_name = document.querySelector("#m_name");
    const m_occ = document.querySelector("#m_occ");
    const m_phone = document.querySelector("#m_phone");
    name.innerHTML = data.Data[0].name;
  });

// ? FETCH dari data pengguna by id END
