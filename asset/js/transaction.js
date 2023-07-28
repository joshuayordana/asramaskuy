import { config } from "./config.js";

showAllTransaction("newest");

const date_filter = document.querySelector("#filter");
date_filter.addEventListener("change", () => {
  if (date_filter.value === "newest") {
    showAllTransaction("newest");
  } else if (date_filter.value === "oldest") {
    showAllTransaction("oldest");
  }
});

function showAllTransaction(filter) {
  // link fetch tinggal di if else

  if (filter === "newest") {
    const endpoint_trans = "blablabla";
  } else if (filter === "oldest") {
    const endpoint_trans = "blablabla";
  }
  // atau bisa juga langsung masukin variabel ke api-nya

  // ? FETCH API MULAI DARI SINI
  const transaction_list = document.querySelector("#transaction-list");
  const trans_card = document.createElement("div");
  trans_card.setAttribute(
    "class",
    `card-item padding-10 flex flex-direction-column gap-10`
  );
  trans_card.setAttribute("id", `transaction-item-n`);
  trans_card.innerHTML = `
                    <!-- $ bagian line-pertama START -->
                    <div class="flex gap-20 align-center">
                        <img class="card-logo" src="asset/image/book-check.png" alt="">
                        <h1 class="no-margin text-1">Booking</h1>
                        <p class="no-margin text-2" id="transaction-date">32 Jan 2023</p>
                        <div class="card-status-box flex justify-center padding-10">
                            <p class="no-margin card-status-text" id="transaction-status-text">Alloted</p>
                        </div>
                        <p class="no-margin text-2" id="transaction-id">ID-23412342145/BOO/XVII</p>
                    </div>
                    <!-- $ bagian line-pertama END -->

                    <!-- $ bagian line-kedua START -->
                    <div class="flex gap-10 align-center">
                        <h1 class="no-margin text-1" id="transaction-room">A1-001</h1>
                        <p class="no-margin text-2" id="transaction-bed">
                            [
                            <span id="transaction-bed">1</span>
                            beds ]
                        </p>
                    </div>
                    <!-- $ bagian line-kedua END -->

                    <!-- $ bagian line-ketiga START -->
                    <div class="flex gap-10 align-center">
                        <h1 class="no-margin text-1">Date:</h1>
                        <p class="no-margin text-2">
                            <span id="transaction-check-in">1/7/2023</span>
                            -
                            <span id="transaction-check-out">1/1/2024</span>
                        </p>
                    </div>
                    <!-- $ bagian line-ketiga END -->

                    <h1 class="no-margin text-1">Price: <span class="text-2">IDR <span
                                id="transaction-price">2.121.000</span></span>
                    </h1>
                    <div class="flex align-center justify-between">
                        <div class="text-1" id="transaction-method">BCA Virtual Account</div>
                        <div class="clickable-button" id="clickable-button" onclick="">extend</div>
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
}
