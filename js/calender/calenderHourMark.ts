// @ts-ignore
import $ from "jquery";
// @ts-ignore
import moment from 'moment-timezone';
// @ts-ignore
import Calendar from 'tui-calendar';

let hourMarks = document.getElementsByClassName("tui-full-calendar-timegrid-hourmarker");
var startTime = moment().startOf('day');
var endTime = moment().endOf('day');

function setMark(height){
  for (let i = 0; i < hourMarks.length; i++) {
    let hourMark = hourMarks.item(i);
    hourMark.style.top = height+"%";
  }
}

export function initCustomHourMark(calendar){
  (function loop() {
    setTimeout(function () {
      var currentTime = moment();

      let progressHeight = (((currentTime.unix() - startTime.unix())/(endTime.unix() - startTime.unix())) * 100).toFixed(4);
      setMark(progressHeight);

      calendar.render();

      loop()
    }, 1000);
  }());
}
