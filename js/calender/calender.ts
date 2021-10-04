import {getCalenderTemplate, WEEKLY_CUSTOM_THEME} from './calenderUtils';
// @ts-ignore
import Calendar from 'tui-calendar';
// @ts-ignore
import moment from 'moment';
// @ts-ignore
import * as axiosa from 'axios'

const axios = axiosa.default;
let lessons = [];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function loadSchedule(groupCode){
  lessons = [];
  let curWeek = moment().format('w') - 1;
  let nextWeek = moment().format('w');
  let prevWeek = moment().format('w') - 2;
  axios.get("https://api.hoelangnog.xyz/groups/"+groupCode+"/schedule?week="+curWeek)
    .catch(function (error) {
      calendar.clear(true);
      lessons = [];
    }).then(response => {
      if(response == null) return;
      let resObject: any = response.data;
      if(resObject == null) return;

      resObject.forEach((item) => {
        let id = getRandomInt(300);
        let start = moment.unix(item.start_time).subtract(2, "h").format("YYYY-MM-DDTHH:mm:ss");
        let end = moment.unix(item.end_time).subtract(2, "h").format("YYYY-MM-DDTHH:mm:ss");

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
            location: "RN219", //TODO item.location
            attendees: ["TTB4-SSD2C", "TTB4-SSD3C"], //TODO item.attendees
            teachers: ["mg32"], //TODO item.teachers
          }
        });
      });

      calendar.clear(true);
      calendar.createSchedules(lessons);
    });
  axios.get("https://api.hoelangnog.xyz/groups/"+groupCode+"/schedule?week="+nextWeek)
    .catch(function (error) {
      calendar.clear(true);
      lessons = [];
    }).then(response => {
      if(response == null) return;
      let resObject: any = response.data;
      if(resObject == null) return;

      resObject.forEach((item) => {
        let id = getRandomInt(300);
        let start = moment.unix(item.start_time).subtract(2, "h").format("YYYY-MM-DDTHH:mm:ss");
        let end = moment.unix(item.end_time).subtract(2, "h").format("YYYY-MM-DDTHH:mm:ss");

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
            location: "RN219", //TODO item.location
            attendees: ["TTB4-SSD2C", "TTB4-SSD3C"], //TODO item.attendees
            teachers: ["mg32"], //TODO item.teachers
          }
        });
      });

      calendar.clear(true);
      calendar.createSchedules(lessons);
    });
  axios.get("https://api.hoelangnog.xyz/groups/"+groupCode+"/schedule?week=" + prevWeek)
    .catch(function (error) {
      calendar.clear(true);
      lessons = [];
    }).then(response => {
      if(response == null) return;
      let resObject: any = response.data;
      if(resObject == null) return;

      resObject.forEach((item) => {
        let id = getRandomInt(300);
        let start = moment.unix(item.start_time).subtract(2, "h").format("YYYY-MM-DDTHH:mm:ss");
        let end = moment.unix(item.end_time).subtract(2, "h").format("YYYY-MM-DDTHH:mm:ss");

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
            location: "RN219", //TODO item.location
            attendees: ["TTB4-SSD2C", "TTB4-SSD3C"], //TODO item.attendees
            teachers: ["mg32"], //TODO item.teachers
          }
        });
      });

      calendar.clear(true);
      calendar.createSchedules(lessons);
    });
}

let calendar = new Calendar('#calendar', {
  defaultView: 'week',
  template: getCalenderTemplate(),
  week:{
    startDayOfWeek: 1,
    narrowWeekend: true,
  },
  taskView: ['task'],
  isReadOnly: true,
  useCreationPopup: false,
  useDetailPopup: true,
  usageStatistics: false,
  theme: WEEKLY_CUSTOM_THEME,
});

if(localStorage.getItem("group") != null){
  loadSchedule(localStorage.getItem("group"));
}

$('#calender-group-select').on('change', function (e) {
  let value = $('#calender-group-select').val();
  localStorage.setItem('group', value);
  loadSchedule(value);
});

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
  prevweek.setTime(prevweek.getTime() - 604800000)

  if(prevweek.getTime() < calendar.getDateRangeStart().toDate().getTime()){
    if (!execute) return;
    calendar.prev();
    prevBtn.classList.add("disabled");
    nextBtn.classList.remove("disabled");
  }

}
goBack(false);
function goForward(execute){
  let today = new Date();
  let nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);

  if(nextweek.getTime() > calendar.getDateRangeEnd().toDate().getTime()){
    if (!execute) return;
    calendar.next();
    nextBtn.classList.add("disabled");
    prevBtn.classList.remove("disabled");
  }

}
goForward(false);

$('#calender-today').click(() => {
  calendar.today();
  nextBtn.classList.remove("disabled");
  prevBtn.classList.add("disabled");
});

$('#calender-prev').click(() => {
  goBack(true);
});

$('#calender-next').click(() => {
  goForward(true);
});
