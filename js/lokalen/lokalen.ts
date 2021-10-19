// @ts-ignore
import * as axiosa from "axios";
// @ts-ignore
import {AxiosResponse} from "axios";
// @ts-ignore
import DatePicker from 'tui-date-picker';
// @ts-ignore
import moment from 'moment';

let searching = false;

let button: HTMLElement;
window.onload = () => {
  button = document.getElementById("submit-button");

  $('#start-time').val(moment().format('MM/DD/YYYY HH:mm'));
  $('#start-time').daterangepicker({
    "timePicker": true,
    "timePicker24Hour": true,
    "singleDatePicker": true,
    "autoUpdateInput": false,
    "drops": "auto",
    "minDate": moment().format('MM/DD/YYYY HH:mm'),
    "maxDate": moment().add("2", "week").format('MM/DD/YYYY HH:mm')
  }, function(start, end, label) {
    $('#start-time').val(start.format('MM/DD/YYYY HH:mm'));
    $('#end-time').val(start.add("1", "hour").format('MM/DD/YYYY HH:mm'));
    $('#end-time').daterangepicker({
      "timePicker": true,
      "timePicker24Hour": true,
      "singleDatePicker": true,
      "autoUpdateInput": false,
      "drops": "auto",
      "minDate": start.format('MM/DD/YYYY HH:mm'),
      "maxDate": moment().add("2", "week").format('MM/DD/YYYY HH:mm')
    }, function(start, end, label) {
      $('#end-time').val(start.format('MM/DD/YYYY HH:mm'));
    });
  });

  $('#end-time').val(moment().add("1", "hour").format('MM/DD/YYYY HH:mm'));
  $('#end-time').daterangepicker({
    "timePicker": true,
    "timePicker24Hour": true,
    "singleDatePicker": true,
    "autoUpdateInput": false,
    "drops": "auto",
    "minDate": moment().format('MM/DD/YYYY HH:mm'),
    "maxDate": moment().add("2", "week").format('MM/DD/YYYY HH:mm')
  }, function(start, end, label) {
    $('#end-time').val(start.format('MM/DD/YYYY HH:mm'));
  });

  button.onclick = onSearchClick;
}

function onSearchClick() {
  if (searching)
    return;
  searching = true;

  let startTimeEl2 = document.getElementById("start-time");
  let endTimeEl2 = document.getElementById("end-time");
  let prefixEl = document.getElementById("prefix");
  let foundEl = document.getElementById("found");

  button.innerHTML = "<i class=\"fas fa-spinner fa-spin\"></i>";
  foundEl.innerHTML = "";
  foundEl.classList.add("hidden");
  // @ts-ignore
  let prefix = prefixEl.value;
// @ts-ignore
  let startDate = new Date(startTimeEl2.value);
  // @ts-ignore
  let endDate = new Date(endTimeEl2.value);
  console.log(startDate.getTimezoneOffset());

  startDate.setTime(startDate.getTime() - -120 * 60000)
  endDate.setTime(endDate.getTime() - -120 * 60000)

  // @ts-ignore
  axiosa.default.get("https://api.hoelangnog.xyz/locations/available/" + prefix + "/?starttime=" + startDate.getTime() / 1000 + "&endtime=" + endDate.getTime() / 1000)
    .then((response: AxiosResponse<Array<object>>) => {
      searching = false;

      foundEl.classList.remove("hidden");
      button.innerHTML = "Zoek";

      response.data.forEach(a => {
        foundEl.innerHTML += `<hln-location name="${a.code}">`;
      })
    })
}
