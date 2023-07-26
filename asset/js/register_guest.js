import { config } from "./config.js";
document.querySelector("form").action=`${config.api}/`;

var step = 1;
function nextStep(){
    const isi1 = document.getElementById(`isi${step}`);
    const isi2 = document.getElementById(`isi${step+1}`);
    isi1.style.display = "none";
    isi2.style.display = "block";
    step += 1;
}

function back(){
    step-=1;
    const isi1 = document.getElementById(`isi${step}`);
    const isi2 = document.getElementById(`isi${step+1}`);
    isi2.style.display = "none";
    isi1.style.display = "block";
}

const arrow_back = document.getElementById("arrow_back");
const next1 = document.getElementById("next1");
next1.addEventListener("click", nextStep);
arrow_back.addEventListener("click", back);