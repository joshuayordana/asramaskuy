import { config } from "./config.js";

showAllTransaction("newest");

const date_filter = document.querySelector("#filter-date");
date_filter.addEventListener("change", () => {
  if (date_filter.value === "newest") {
    showAllTransaction("newest");
  } else if (date_filter.value === "oldest") {
    showAllTransaction("oldest");
  }
});

function showAllTransaction(filter) {
  const transaction_list = document.querySelector("#transaction-list");
  // link fetch tinggal di if else

  if (filter === "newest") {
    const endpoint_trans = "blablabla";
  } else if (filter === "oldest") {
    const endpoint_trans = "blablabla";
  }
  // atau bisa juga langsung masukin variabel ke api-nya

  // ? FETCH API MULAI DARI SINI
  let data = "";
  for (let j = 0; j < 5; j++) {
    const trans_card = document.createElement("div");
    trans_card.setAttribute("class", `card-item padding-10 flex flex-direction-column gap-10`);
    trans_card.setAttribute("id", `transaction-item-${j}`);
    trans_card.innerHTML = `
                    <!-- $ bagian line-pertama START -->
                    <div class="flex gap-20 align-center">
                        <img class="card-logo" src="asset/image/book-check.png" alt="">
                        <h1 class="no-margin text-1">Booking</h1>
                        <p class="no-margin text-2" id="transaction-date">32 Jan 2023${data}</p>
                        <div class="card-status-box flex justify-center padding-10">
                            <p class="no-margin card-status-text" id="transaction-status-text">Alloted${data}</p>
                        </div>
                        <p class="no-margin text-2" id="transaction-id">ID-23412342145/BOO/XVII${data}</p>
                    </div>
                    <!-- $ bagian line-pertama END -->

                    <!-- $ bagian line-kedua START -->
                    <div class="flex gap-10 align-center">
                        <p class="no-margin text-1" id="transaction-room">A1-001 ${data} - [ <span id="transaction-bed">1 ${data}</span>beds ]</p>
                    </div>
                    <!-- $ bagian line-kedua END -->

                    <!-- $ bagian line-ketiga START -->
                    <div class="flex gap-10 align-center">
                        <p class="no-margin text-2">Date:
                        </p>
                        <p class="no-margin text-2">
                        <span class="text-1" id="transaction-check-in">1/7/2023 ${data}</span> - <span class="text-1" id="transaction-check-out">1/1/2024 ${data}</span>
                        </p>
                    </div>
                    <!-- $ bagian line-ketiga END -->

                    <!-- $ bagian line-keempat START -->
                    <div class="flex gap-10 align-center">
                        <p class="no-margin text-2">price:
                        </p>
                        <p class="no-margin text-1" id="transaction-price">2.121.000 ${data}</p>
                    </div>
                    <!-- $ bagian line-keempat END -->
                  
                    <div class="flex align-center justify-between">
                        <div class="text-1" id="transaction-method">BCA Virtual Account ${data}</div>
                        <div class="clickable-button" id="extend-button" onclick="">extend</div>
                        <div class="disabled-button" id="disabled-button" >extend</div>
                    </div>
                    `;

    let test = "on going"; //  ini untuk statusnya nanti
    if (test === "alloted" || test === "done") {
      const button = trans_card.querySelector("#clickable-button");
      button.classList.add("not-active");
    } else if (test === "on going") {
      const button = trans_card.querySelector("#disabled-button");
      button.classList.add("not-active");
    }

    transaction_list.appendChild(trans_card);

    trans_card.querySelector("#extend-button").addEventListener("click", () => {
      console.log(`masuk ke - ${j}`);
    });
  }
}
