import {getCalenderTemplate, WEEKLY_CUSTOM_THEME, generateStringColor} from './calenderUtils';
// @ts-ignore
import Calendar from 'tui-calendar';
// @ts-ignore
import moment from 'moment';
// @ts-ignore
import $ from "jquery";
// @ts-ignore
import * as axiosa from 'axios'

const axios = axiosa.default;
let lessons = [];
let loadedWeeks = [];
let dateText = document.getElementById("date-text");
let myStorage = window.localStorage || localStorage;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function loadSchedule(groupCode, week, year){
  if(loadedWeeks.includes(parseInt(week)))return;
  $('.loading-spinner').removeClass("hidden");
  axios.get(`https://api.hoelangnog.xyz/groups/${groupCode}/schedule?week=${week}&year=${year}`)
    .then(response => {
      if(response == null) return;
      if(response.data == null) return;
      let resObject: any = response.data;

      if(loadedWeeks.includes(parseInt(week)))return;
      if(!loadedWeeks.includes(parseInt(week))){
        loadedWeeks.push(parseInt(week));
      }

      resObject.forEach((item) => {
        let id = getRandomInt(300);
        let start = moment.unix(item.start_time).subtract(2, "h").format("YYYY-MM-DDTHH:mm:ss");
        let end = moment.unix(item.end_time).subtract(2, "h").format("YYYY-MM-DDTHH:mm:ss");

        let itemLocation;
        if (item.location == null || item.location == "") {
          itemLocation = 'Onbekend';
        }else{
          itemLocation = item.location;
        }

        let itemGroups;
        if (item.group == null) {
          itemGroups = ['Onbekend'];
        }else{
          itemGroups = [item.group];
        }

        let teacherName;
        if (item.teacher == null) {
          teacherName = ['Onbekend'];
        }else{
          if (item.teacher.firstName == null) {
            teacherName = [item.teacher.code];
          } else {
            teacherName = [`${item.teacher.firstName} ${item.teacher.lastName} <span class="teacher-code">${item.teacher.code}</span>`];
          }
        }
        let itemColor = generateStringColor(item.name);

        lessons.push({
          id: id+'',
          calendarId: id+'',
          category: 'time',
          bgColor: itemColor,
          color: "#fff",
          borderColor: "#696969",
          title: item.name,
          body: 'none',
          start: start,
          end: end,
          isAllDay: false,
          raw: {
            location: itemLocation,
            attendees: itemGroups,
            teachers: teacherName,
          }
        });
      });
      updateCalender();
      $('.loading-spinner').addClass("hidden");
    });
}

export function loadSchedules(groupCode){
  lessons = null;
  lessons = [];
  loadedWeeks = null;
  loadedWeeks = [];

  updateCalender();
  let year = moment().format('YYYY')
  let curWeek = moment().format('w') - 1;
  let nextWeek = moment().format('w');
  let prevWeek = moment().format('w') - 2;

  loadSchedule(groupCode, prevWeek, year);
  loadSchedule(groupCode, curWeek, year);
  loadSchedule(groupCode, nextWeek, year);
}

let defaultView = 'week';
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  defaultView = 'day';
}

export let calendar = new Calendar('#calendar', {
  defaultView: defaultView,
  template: getCalenderTemplate(),
  week:{
    startDayOfWeek: 1,
    narrowWeekend: true,
  },
  taskView: false,
  scheduleView: ["time"],
  isReadOnly: true,
  useCreationPopup: false,
  useDetailPopup: true,
  usageStatistics: false,
  theme: WEEKLY_CUSTOM_THEME,
});

function updateCalender(){
  calendar.clear(true);
  calendar.createSchedules(lessons);

  let monthDate = moment(calendar.getDate().toDate().getTime()).format('yyyy-MM');
  let weekNr = moment(calendar.getDate().toDate().getTime()).format('w') - 1;
  dateText.innerHTML = monthDate + " - Week " + weekNr;
}
updateCalender();

if(myStorage.getItem("group") != null){
  loadSchedules(myStorage.getItem("group"));
}

// TASK template
// calendar.createSchedules([
//   {
//     id: '1',
//     calendarId: '1',
//     category: 'task',
//     bgColor: "#137c00",
//     color: "#fff",
//     borderColor: "#696969",
//     title: 'Huiswerk',
//     start: '2021-10-01',
//     end: '2021-10-01',
//     raw: {
//       vak: "NL",
//       link: "https://example.com/",
//     }
//   }
// ]);

let prevBtn = document.getElementById("calender-prev");
let nextBtn = document.getElementById("calender-next");
function goBack(execute){
  if (!execute) return;
  calendar.prev();

  let monthDate = moment(calendar.getDate().toDate().getTime()).format('yyyy-MM');
  let weekNr = moment(calendar.getDate().toDate().getTime()).format('w') - 1;
  dateText.innerHTML = monthDate + " - Week " + weekNr;

  let year = moment().format('YYYY')
  let prevWeek = weekNr - 1;
  loadSchedule(myStorage.getItem("group"), prevWeek, year);

}
goBack(false);
function goForward(execute){
  if (!execute) return;
  calendar.next();

  let monthDate = moment(calendar.getDate().toDate().getTime()).format('yyyy-MM');
  let weekNr = moment(calendar.getDate().toDate().getTime()).format('w') - 1;
  dateText.innerHTML = monthDate + " - Week " + weekNr;

  let year = moment().format('YYYY')
  let prevWeek = weekNr + 1;
  loadSchedule(myStorage.getItem("group"), prevWeek, year);
}
goForward(false);

$('#calender-today').click(() => {
  calendar.today();
  nextBtn.classList.remove("disabled");
  prevBtn.classList.remove("disabled");

  let monthDate = moment(calendar.getDate().toDate().getTime()).format('yyyy-MM');
  let weekNr = moment(calendar.getDate().toDate().getTime()).format('w') - 1;
  let weekDate = monthDate + " - Week " + weekNr;
  dateText.innerHTML = weekDate;
});

$('#calender-prev').click(() => {
  goBack(true);
});

$('#calender-next').click(() => {
  goForward(true);
});
