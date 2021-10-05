import {formatTime} from "../timer/timerutils.js";
import * as axiosa from "axios";
import {AxiosResponse} from "axios";


function onSelect() {

}

window.onload = () => {
  let prefixEl = document.getElementById("prefix");
  let startTimeEl = document.getElementById("start-time");
  let endTimeEl = document.getElementById("end-time");
  let foundEl = document.getElementById("found");
  startTimeEl.setAttribute("value", formatTime(new Date(Date.now()), "yyyy-MM-ddTHH:mm"))
  endTimeEl.setAttribute("value", formatTime(new Date(Date.now() + 3600000), "yyyy-MM-ddTHH:mm"))


  let button = document.getElementById("submit-button");

  button.onclick = () => {
    let startTimeEl2 = document.getElementById("start-time");
    let endTimeEl2 = document.getElementById("end-time");


    foundEl.innerHTML = "";
    let prefix = prefixEl.getAttribute("value");
    axiosa.default.get("https://api.hoelangnog.xyz/locations/available/" + prefix + "/?starttime=" + new Date(startTimeEl2.value).getTime() / 1000 + "&endtime=" + new Date(endTimeEl2.value).getTime() / 1000)
      .then((response: AxiosResponse<Array<object>>) => {
        response.data.forEach(a => {
          foundEl.innerHTML += `<hln-location name="${a.code}">`;
        })
      })
  }
}
