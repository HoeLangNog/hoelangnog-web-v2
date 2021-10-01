import {setProgress, formatTime} from './timerutils'
import * as axiosa from 'axios'

const axios = axiosa.default;

let textElement = document.getElementById("timer-text");
let gElement = document.getElementsByClassName("time-lines").item(0);

//So gelement is actually compiled
gElement.innerHTML = "";

//Variables used by timers globally
let startTime;
let endDate;

axios.get("https://api.hoelangnog.xyz/unixoftoday")
  .then(response => {
    let resObject: any = response.data;
    startTime = new Date(resObject.start * 1000);
    endDate = new Date(resObject.last * 1000);

    //This starts the timer
    tickTimer();
  });


function tickTimer() {
  let currentTime = Date.now()
  let currentDate = new Date(currentTime);

  let difference = (endDate.getTime()) - (currentTime - currentDate.getTimezoneOffset() * 60000);

  if (difference < 0) {
    textElement.innerText = "Geen les!";
    return;
  }

  let timeToDisplay = new Date(difference);

  writeNumber(timeToDisplay);

  let totalTime = endDate.getTime() - startTime.getTime();
  let percent = 100 - (((totalTime - difference) / totalTime) * 100);

  setProgress(percent);

  setTimeout(() => {
    tickTimer();
  }, 100);
}

function writeNumber(date: Date) {
  textElement.innerText = formatTime(date, "HH:mm:ss", true)
}
