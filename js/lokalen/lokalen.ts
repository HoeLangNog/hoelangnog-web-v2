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

  button.onclick = onSearchClick;
}

function onSearchClick() {
  let startTimeEl2 = document.getElementById("start-time");
  let endTimeEl2 = document.getElementById("end-time");
  let prefixEl = document.getElementById("prefix");
  let foundEl = document.getElementById("found");

  foundEl.innerHTML = "";
  // @ts-ignore
  let prefix = prefixEl.value;

  let startDate = new Date(startTimeEl2.value);
  let endDate = new Date(endTimeEl2.value);
  console.log(startDate.getTimezoneOffset());

  startDate.setTime(startDate.getTime() - startDate.getTimezoneOffset() * 60000)
  endDate.setTime(endDate.getTime() - endDate.getTimezoneOffset() * 60000)

  // @ts-ignore
  axiosa.default.get("https://api.hoelangnog.xyz/locations/available/" + prefix + "/?starttime=" + startDate.getTime() / 1000 + "&endtime=" + endDate.getTime() / 1000)
    .then((response: AxiosResponse<Array<object>>) => {
      response.data.forEach(a => {
        foundEl.innerHTML += `<hln-location name="${a.code}">`;
      })
    })
}
