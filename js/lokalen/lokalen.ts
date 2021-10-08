import {formatTime} from "../timer/timerutils.js";
import * as axiosa from "axios";
import {AxiosResponse} from "axios";
import DatePicker from 'tui-date-picker';

let searching = false;

function onSelect() {

}

let button: HTMLElement;
window.onload = () => {
  button = document.getElementById("submit-button");

  let today = new Date();
  let picker = DatePicker.createRangePicker({
    timePicker: true,
    format:'yyyy-MM-dd H:mm',
    startpicker: {
      date: today,
      input: '#start-time',
      container: '#start-time-container',
      weekStartDay: 'mon'
    },
    endpicker: {
      date: today,
      input: '#end-time',
      container: '#end-time-container',
      weekStartDay: 'mon'
    }
  });
  picker.setStartDate(today)
  picker.setEndDate(today.setMinutes(today.getMinutes() + 30));

  button.onclick = onSearchClick;
}

function onSearchClick() {
  if (searching)
    return;
  searching = true;

  button.setAttribute("value", "");

  button.classList.add("dot-flashing");


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
      searching = false;
      button.setAttribute("value", "Zoek");

      button.classList.remove("dot-flashing");

      response.data.forEach(a => {
        foundEl.innerHTML += `<hln-location name="${a.code}">`;
      })
    })
}
