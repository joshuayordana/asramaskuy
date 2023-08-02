import { config } from "./config.js";

const towerInput = document.getElementById("tower");
var dataGedung = [];

//Tambahkan Gedung ke Select
const endpoint = `${config.api}getGedung`;
fetch(endpoint)
  .then((result) => result.json())
  .then(({ data }) => {
    var respond = data.Data;
    dataGedung = respond;
    //Masukan dataGedung ke select
    for (var i = 0; i < dataGedung.length; i++) {
      var option = document.createElement("option");
      option.value = dataGedung[i]["id_gedung"];
      option.text = dataGedung[i]["nama_gedung"];
      option.text += ` (${dataGedung[i]["jenis_kelamin"]})`;
      towerInput.add(option);
    }
  });
