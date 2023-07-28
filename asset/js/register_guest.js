import { config } from "./config.js";
const endpoint = `${config.api}createNewDummy`;

document.querySelector("form").action = endpoint;

var step = 1;
function nextStep() {
  const isi1 = document.getElementById(`isi${step}`);
  const isi2 = document.getElementById(`isi${step + 1}`);
  isi1.style.display = "none";
  isi2.style.display = "block";
  step += 1;
}

function back() {
  step -= 1;
  if (step <= 0) {
    window.location.href = "./login_guest.html";
  }
  const isi1 = document.getElementById(`isi${step}`);
  const isi2 = document.getElementById(`isi${step + 1}`);
  isi2.style.display = "none";
  isi1.style.display = "block";
}

const arrow_back = document.getElementById("arrow_back");
const next1 = document.getElementById("next1");
const submitButton = document.getElementById("submit");
const form = document.getElementById("register_form");
next1.addEventListener("click", nextStep);
arrow_back.addEventListener("click", back);
submitButton.addEventListener("click", () => {
  //Get Data
  var register_data = {};
  register_data["nama"] = document.getElementById("nama").value;
  register_data["nik"] = document.getElementById("nik_input").value;
  register_data["tgl_lahir"] = document.getElementById("tgl_lahir").value;
  register_data["gender"] = document.getElementById("gender").value;
  register_data["alamat"] = document.getElementById("alamat").value;
  register_data["email"] = document.getElementById("email").value;
  register_data["password"] = document.getElementById("password").value;
  register_data["no_telp"] = document.getElementById("no_telp").value;
  const formData = new URLSearchParams();
  for (const [key, value] of Object.entries(register_data)) {
    formData.append(key, value.toString());
  }
  //Submit Data
  fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  })
    .then((response) => response.json())
    .then((response) => console.log(JSON.stringify(response)));
});
