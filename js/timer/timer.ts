import {setProgress, formatTime} from './timerutils'
import * as axiosa from 'axios';

const axios = axiosa.default;


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

  let timers = document.getElementsByTagName("hln-timer");
  if (difference < 0) {
    for (let i = 0; i < timers.length; i++) {
      let element = timers.item(i);
      element.setAttribute("time", "Geen les!");
      element.setAttribute("progress", "100")
    }
    waitForNextTick();
    return;

  }

  let timeToDisplay = new Date(difference);

  let timeText = formatTime(timeToDisplay, "HH:mm:ss", true)

  let totalTime = endDate.getTime() - startTime.getTime();
  let percent = 100 - (((totalTime - difference) / totalTime) * 100);
  for (let i = 0; i < timers.length; i++) {
    let element = timers.item(i);
    element.setAttribute("time", timeText);
    element.setAttribute("progress", `${percent}`);
  }


  waitForNextTick();
}

function waitForNextTick() {
  setTimeout(() => {
    tickTimer();
  }, 100);
}

function writeNumber(date: Date) {
  // textElement.innerText = formatTime(date, "HH:mm:ss", true)
}
