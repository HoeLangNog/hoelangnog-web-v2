import {getCalenderTemplate, WEEKLY_CUSTOM_THEME} from './calenderUtils';
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
let dateText = document.getElementById("date-text");
let myStorage = window.localStorage || localStorage;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function loadSchedule(groupCode){
  lessons = null;
  lessons = [];
  let year = moment().format('YYYY')
  let curWeek = moment().format('w') - 1;
  let nextWeek = moment().format('w');
  let prevWeek = moment().format('w') - 2;
  axios.get(`https://api.hoelangnog.xyz/groups/${groupCode}/schedule?week=${curWeek}&year=${year}`)
    .catch(function (error) {
      calendar.clear(true);
      lessons = [];
    })
    .then(response => {
      let resObject: any = response.data;
      if(resObject == null) return;

      resObject.forEach((item) => {
        let id = getRandomInt(300);
        let start = moment.unix(item.start_time).subtract(2, "h").format("YYYY-MM-DDTHH:mm:ss");
        let end = moment.unix(item.end_time).subtract(2, "h").format("YYYY-MM-DDTHH:mm:ss");

        let teacherName = "";

        if (item.teacher.firstName == null) {
          teacherName = item.teacher.code;
        } else {
          teacherName = `${item.teacher.firstName} ${item.teacher.lastName} <span class="teacher-code">${item.teacher.code}</span>`;
        }


        lessons.push({
          id: id+'',
          calendarId: id+'',
          category: 'time',
          bgColor: "#0382b2",
          color: "#fff",
          borderColor: "#696969",
          title: item.name,
          body: 'none',
          start: start,
          end: end,
          isAllDay: false,
          raw: {
            location: item.location, //TODO item.location
            attendees: [item.group], //TODO item.attendees
            teachers: [teacherName], //TODO item.teachers
          }
        });
      });
      updateCalender();
    });
  axios.get("https://api.hoelangnog.xyz/groups/"+groupCode+"/schedule?week="+nextWeek)
    .catch(function (error) {
      calendar.clear(true);
      lessons = [];
    }).then(response => {
      let resObject: any = response.data;
      if(resObject == null) return;

      resObject.forEach((item) => {
        let id = getRandomInt(300);
        let start = moment.unix(item.start_time).subtract(2, "h").format("YYYY-MM-DDTHH:mm:ss");
        let end = moment.unix(item.end_time).subtract(2, "h").format("YYYY-MM-DDTHH:mm:ss");

        let teacherName = "";

        if (item.teacher.firstName == null) {
          teacherName = item.teacher.code;
        } else {
          teacherName = `${item.teacher.firstName} ${item.teacher.lastName} <span class="teacher-code">${item.teacher.code}</span>`;
        }

        lessons.push({
          id: id+'',
          calendarId: id+'',
          category: 'time',
          bgColor: "#0382b2",
          color: "#fff",
          borderColor: "#696969",
          title: item.name,
          body: 'none',
          start: start,
          end: end,
          isAllDay: false,
          raw: {
            location: item.location, //TODO item.location
            attendees: [item.group], //TODO item.attendees
            teachers: [teacherName], //TODO item.teachers
          }
        });
      });
      updateCalender();
    });
  axios.get(`https://api.hoelangnog.xyz/groups/${groupCode}/schedule?week=${prevWeek}&year=${year}`)
    .catch(function (error) {
      calendar.clear(true);
      lessons = [];
    }).then(response => {
      let resObject: any = response.data;
      if(resObject == null) return;

      resObject.forEach((item) => {
        let id = getRandomInt(300);
        let start = moment.unix(item.start_time).subtract(2, "h").format("YYYY-MM-DDTHH:mm:ss");
        let end = moment.unix(item.end_time).subtract(2, "h").format("YYYY-MM-DDTHH:mm:ss");

        let teacherName = "";

        if (item.teacher.firstName == null) {
          teacherName = item.teacher.code;
        } else {
          teacherName = `${item.teacher.firstName} ${item.teacher.lastName} <span class="teacher-code">${item.teacher.code}</span>`;
        }

        lessons.push({
          id: id+'',
          calendarId: id+'',
          category: 'time',
          bgColor: "#0382b2",
          color: "#fff",
          borderColor: "#696969",
          title: item.name,
          body: 'none',
          start: start,
          end: end,
          isAllDay: false,
          raw: {
            location: item.location, //TODO item.location
            attendees: [item.group], //TODO item.attendees
            teachers: [teacherName], //TODO item.teachers
          }
        });
      });
      updateCalender();
    });
}

let defaultView = 'week';
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  defaultView = 'day';
}

let calendar = new Calendar('#calendar', {
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
  loadSchedule(myStorage.getItem("group"));
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
  let today = new Date();
  let prevweek = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  prevweek.setTime(prevweek.getTime() - 604800000);

  if(prevweek.getTime() < calendar.getDate().toDate().getTime()){
    if (!execute) return;
    calendar.prev();
    nextBtn.classList.remove("disabled");
    if(prevweek.getTime() == calendar.getDate().toDate().getTime()){
      prevBtn.classList.add("disabled");
    }

    let monthDate = moment(calendar.getDate().toDate().getTime()).format('yyyy-MM');
    let weekNr = moment(calendar.getDate().toDate().getTime()).format('w') - 1;
    let weekDate = monthDate + " - Week " + weekNr;
    dateText.innerHTML = weekDate;
  }

}
goBack(false);
function goForward(execute){
  let today = new Date();
  let nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);

  if(nextweek.getTime() > calendar.getDate().toDate().getTime()){
    if (!execute) return;
    calendar.next();
    prevBtn.classList.remove("disabled");
    if(nextweek.getTime() == calendar.getDate().toDate().getTime()){
      nextBtn.classList.add("disabled");
    }

    let monthDate = moment(calendar.getDate().toDate().getTime()).format('yyyy-MM');
    let weekNr = moment(calendar.getDate().toDate().getTime()).format('w') - 1;
    let weekDate = monthDate + " - Week " + weekNr;
    dateText.innerHTML = weekDate;
  }
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
