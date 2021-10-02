import {getCalenderTemplate} from './calenderUtils';
import Calendar from 'tui-calendar';
// @ts-ignore
import moment from 'moment';
import $ from "jquery";
import * as axiosa from 'axios'

const axios = axiosa.default;
let lessons = [];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function loadSchedule(groupCode){
  axios.get("https://api.hoelangnog.xyz/groups/"+groupCode+"/schedule")
    .then(response => {
      let resObject: any = response.data;
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
    });
  let nextWeek = moment().add("+1week").format('w');
  axios.get("https://api.hoelangnog.xyz/groups/"+groupCode+"/schedule?week="+nextWeek)
    .then(response => {
      let resObject: any = response.data;
      resObject.forEach((item) => {
        let id = getRandomInt(300);
        let start = moment.unix(item.start_time).subtract(2, "h").format("YYYY-MM-DDTH:mm:ss");
        let end = moment.unix(item.end_time).subtract(2, "h").format("YYYY-MM-DDTH:mm:ss");

        lessons.push({
          id: id+'',
          calendarId: id+'',
          category: 'time',
          bgColor: "#0382b2",
          color: "#fff",
          borderColor: "#696969",
          title: item.name,
          start: start,
          end: end,
          isAllDay: false,
          location: "RN219", //TODO item.location
          attendees: ["TTB4-SSD2C", "TTB4-SSD3C"], //TODO item.attendees
          raw: {
            teachers: ["mg32"], //TODO item.teachers
          }
        });
      });
    });
}
loadSchedule("TTB4-SSD2C");

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
});

function setSchedules(lessons){
  if(lessons.length == 0){
    setTimeout(() => {
      setSchedules(lessons);
    }, 100);
  }else{
    calendar.createSchedules(lessons);
  }
}
setSchedules(lessons);

calendar.createSchedules([
  {
    id: '1',
    calendarId: '1',
    category: 'task',
    bgColor: "#137c00",
    color: "#fff",
    borderColor: "#696969",
    title: 'Huiswerk',
    start: '2021-10-01',
    end: '2021-10-01',
    raw: {
      vak: "NL",
      link: "https://example.com/",
    }
  }
]);

$('#calender-today').click(() => {
  calendar.today();
});
$('#calender-prev').click(() => {
  let today = new Date();
  let prevweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);

  if(prevweek.getTime() < calendar.getDateRangeEnd().toDate().getTime()){
    calendar.prev();
  }
});
$('#calender-next').click(() => {
  let today = new Date();
  let nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);

  if(nextweek.getTime() > calendar.getDateRangeEnd().toDate().getTime()){
    calendar.next();
  }
});
