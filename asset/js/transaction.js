import { config } from "./config.js";

let user_data = JSON.parse(window.sessionStorage.getItem("user-data"));

showAllTransaction("newest");

const date_filter = document.querySelector("#filter-date");
date_filter.addEventListener("change", () => {
  if (date_filter.value === "newest") {
    showAllTransaction("newest");
  } else if (date_filter.value === "oldest") {
    showAllTransaction("oldest");
  }
});

function showAllTransaction(filter_sort) {
  const transaction_list = document.querySelector("#transaction-list");
  transaction_list.innerHTML = "";
  const endpoint = `${config.api}getTransaksiByIdUser?id_user=${user_data["id_user"]}&tipe_sort=${filter_sort}`;
  console.log(endpoint);

  const betterPriceFormatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  });
  fetch(endpoint)
    .then((result) => result.json())
    .then(({ data }) => {
      console.log(data);

      // ? FETCH API MULAI DARI SINI
      for (let j = 0; j < data.Data.length; j++) {
        const trans_card = document.createElement("div");
        trans_card.setAttribute("class", `card-item padding-10 flex flex-direction-column gap-10`);
        trans_card.setAttribute("id", `transaction-item-${j}`);
        trans_card.innerHTML = `
                    <!-- $ bagian line-pertama START -->
                    <div class="flex gap-20 align-center">
                        <img class="card-logo" src="asset/image/book-check.png" alt="">
                        <h1 class="no-margin text-1">${data.Data[j].jenis_transaksi}</h1>
                        <p class="no-margin text-2" id="transaction-date">${dateTransConverter(data.Data[j].tanggal_transaksi)}</p>
                        <div class="card-status-box flex justify-center padding-10" id="card-status-box">
                            <p class="no-margin card-status-text" id="transaction-status-text">${data.Data[j].status_transaksi}</p>
                        </div>
                        <p class="no-margin text-2" id="transaction-id">${data.Data[j].nama_transaksi}</p>
                    </div>
                    <!-- $ bagian line-pertama END -->

                    <!-- $ bagian line-kedua START -->
                    <div class="flex gap-10 align-center">
                        <p class="no-margin text-1" id="transaction-room">${data.Data[j].nama_kamar} - [ 1 beds ]</p>
                    </div>
                    <!-- $ bagian line-kedua END -->

                    <!-- $ bagian line-ketiga START -->
                    <div class="flex gap-10 align-center">
                        <p class="no-margin text-2">Date:
                        </p>
                        <p class="no-margin text-2">
                          <span class="text-1" id="transaction-check-in">${dateTransConverter(data.Data[j].check_in)}</span>
                          - 
                          <span class="text-1" id="transaction-check-out">${dateTransConverter(data.Data[j].check_out)}</span>
                        </p>
                    </div>
                    <!-- $ bagian line-ketiga END -->

                    <!-- $ bagian line-keempat START -->
                    <div class="flex gap-10 align-center">
                        <p class="no-margin text-2">price:
                        </p>
                        <p class="no-margin text-1" id="transaction-price">${betterPriceFormatter.format(data.Data[j].total_pembayaran)}</p>
                    </div>
                    <!-- $ bagian line-keempat END -->
                  
                    <div class="flex align-center justify-between">
                        <div class="text-1" id="transaction-method">${data.Data[j].payment_method}</div>
                        <div class="clickable-button" id="extend-button" onclick="">extend</div>
                        <div class="disabled-button" id="disabled-button" >extend</div>
                    </div>
                    `;

        // % Mengubah warna pada status box
        const status_box = trans_card.querySelector("#card-status-box");
        if (data.Data[j].status_transaksi === "Done") {
          status_box.style.backgroundColor = "#0C35D8";
        } else if (data.Data[j].status_transaksi === "OnGoing") {
          status_box.style.backgroundColor = "#0F841B";
        }

        // % Mengubah tombol bisa extend atau tidak
        if (data.Data[j].status_transaksi === "Alloted" || data.Data[j].status_transaksi === "Done") {
          const button = trans_card.querySelector("#extend-button");
          button.classList.add("not-active");
        } else if (data.Data[j].status_transaksi === "OnGoing") {
          const button = trans_card.querySelector("#disabled-button");
          button.classList.add("not-active");
        }

        transaction_list.appendChild(trans_card);

        trans_card.querySelector("#extend-button").addEventListener("click", () => {
          let booking_data = {};
          booking_data["jenis_transaksi"] = "extend";
          booking_data["beds"] = "1";
          booking_data["id_transaksi"] = data.Data[j].id_transaksi;
          booking_data["check_in"] = data.Data[j].check_in.slice(0, 10);
          booking_data["old_check_out"] = data.Data[j].check_out.slice(0, 10);
          booking_data["pembayaran_sebelumnya"] = data.Data[j].total_pembayaran;
          booking_data["id_kamar"] = data.Data[j].id_kamar;
          booking_data["nama_kamar"] = data.Data[j].nama_kamar;
          booking_data["harga_kamar"] = data.Data[j].harga_kamar;
          booking_data["id_user"] = data.Data[j].id_user;
          booking_data["name"] = data.Data[j].nama_user;
          booking_data["nim_nik"] = data.Data[j].nim;
          console.log(booking_data);

          window.sessionStorage.setItem("booking-data", JSON.stringify(booking_data));
          window.location.href = "/booking/extend_form.html";
        });
      }
    });
}

function dateTransConverter(date_input) {
  let date = new Date(date_input);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}
