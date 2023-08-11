import { config } from "../config.js";

// % mengambil parameter pada link
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idTransaksi = urlParams.get("id_transaksi");
if (idTransaksi === null) {
  window.location.href = "../transaction_page.html";
}

const back_button = document.querySelector("#back-button");
back_button.addEventListener("click", () => {
  window.location.href = "../transaction_page.html";
});

// ? disini tempat nampilin room dan lantainya GIRL
const endpoint = `${config.api}getBatasBayarById?id_transaksi=${idTransaksi}`;

fetch(endpoint)
  .then((result) => result.json())
  .then(({ data }) => {
    console.log(data);
    const curr_time = new Date();
    const due_time = new Date("2023-08-10T00:00:00");
    timeCountdown(curr_time, due_time);
  });

/**
 *
 * @param {*} curr_time Waktu yang sekarang
 * @param {*} due_time waktu jatuh tempo
 */
function timeCountdown(curr_time, due_time) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  let total_time = due_time.getTime() - curr_time.getTime();

  // // % Assign pas page baru reload
  // document.querySelector("#due-hour").innerHTML = `${Math.floor(total_time / hour)}`;
  // document.querySelector("#due-minute").innerHTML = `${Math.floor((total_time % hour) / minute)}`;
  // document.querySelector("#due-second").innerHTML = `${Math.floor((total_time % minute) / second)}`;

  // % Assign pas page page udah reload
  let interval = setInterval(() => {
    document.querySelector("#due-hour").innerHTML = `${Math.floor(total_time / hour)}`;
    document.querySelector("#due-minute").innerHTML = `${Math.floor((total_time % hour) / minute)}`;
    document.querySelector("#due-second").innerHTML = `${Math.floor((total_time % minute) / second)}`;
    total_time -= 1000;

    if (total_time < 1000) {
      clearInterval(interval);
    }
  }, 1000);
}
