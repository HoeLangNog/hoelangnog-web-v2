import {formatTime, setProgress} from "./timerutils";
const axios = require('axios');
// @ts-ignore
import $ from "jquery";
import {random} from './particles';

let gElement = document.getElementsByClassName("time-lines").item(0);
gElement.innerHTML = "";
let textElement = document.getElementById("timetext");
let myStorage = window.localStorage || localStorage;

let speedModeSpeed = 0;
let speedMode = Math.random() > 0.99;
let timer;

let startTime;
let endDate;

export function loadTimer(groupCode){
  clearTimeout(timer);
  startTime = null;
  endDate = null;
  $('.loading-spinner').removeClass("hidden");

  axios.get("https://api.hoelangnog.xyz/groups/"+groupCode+"/unixoftoday")
    .then(response => {
      let resObject = response.data;
      startTime = new Date(resObject.start * 1000);
      endDate = new Date(resObject.last * 1000);

      $('.loading-spinner').addClass("hidden");
      //addLessonLines(startTime, eDate)
      tickTimer();
    });
}

function tickTimer() {
  let currentDate = Date.now();
  let diff = (endDate.getTime() - speedModeSpeed) - (new Date(currentDate).getTime() -
    new Date(currentDate).getTimezoneOffset() * 60 * 1000);

  if (diff < 9999999999) {
    textElement.innerText = "Geen les";
    random();
    return;
  }

  let now = new Date()
  now.setTime(diff)
  writeTime(now);
  let totalTime = (endDate.getTime() - speedModeSpeed) - startTime.getTime();
  let percent = 100 - (((totalTime - diff) / totalTime) * 100);
  setProgress(percent);

  if (speedMode)
    speedModeSpeed += 1000;

  timer = setTimeout(() => {
    //recheck();
    tickTimer();
  }, speedMode ? 1 : 100);
}

function writeTime(date: Date) {
  textElement.innerText = formatTime(date, "HH:mm:ss", true)
}

if(myStorage.getItem("group") != null){
  loadTimer(myStorage.getItem("group"));
}
