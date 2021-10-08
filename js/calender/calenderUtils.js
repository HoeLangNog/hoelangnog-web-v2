import moment from 'moment';

export function getCalenderTemplate(){
  return {
    time: function(schedule) {
      let start_time = moment(schedule.end.getTime());
      let duration = start_time.diff(schedule.start.getTime(), "minutes");

      let title = '<span style="font-size: 18px;">'+schedule.title+'</span>';
      let time = '<i class="fas fa-clock schedule-item-text"></i>' + moment(schedule.start.getTime()).format('HH:mm') + ' - ' +moment(schedule.end.getTime()).format('HH:mm');
      let location = '<i class="fas fa-map-marker-alt schedule-item-text"></i>' + schedule.raw.location;
      let klas;
      if(schedule.attendees > 1){
        klas = '<i class="fas fa-user schedule-item-text"></i>' + schedule.raw.attendees.join(", ");
      }else{
        klas = '<i class="fas fa-user schedule-item-text"></i>' + schedule.raw.attendees.join(", ");
      }

      let docent;
      if (schedule.raw.teachers > 1) {
        docent = '<i class="fas fa-users schedule-item-text"></i>' + schedule.raw.teachers.join(", ");
      } else {
        docent = '<i class="fas fa-user-tie schedule-item-text"></i>' + schedule.raw.teachers.join(", ");
      }

      if(duration >= 120){
        return title+'<br>'+time+'<br>'+location+'<br>'+klas+'<br>'+docent;
      }else if(duration >= 100){
        return title+'<br>'+time+'&nbsp;&nbsp;'+location+'<br>'+klas+'<br>'+docent;
      }else if(duration >= 90){
        return title+'<br>'+time+'&nbsp;&nbsp;'+location+'<br>'+docent;
      }else if(duration >= 75){
        return title+'<br>'+time+'&nbsp;&nbsp;'+location+'<br>'+docent;
      }else if(duration >= 60){
        return title+'<br>'+time+'&nbsp;&nbsp;'+location;
      }else{
        return title+'&nbsp;&nbsp;'+time+'&nbsp;&nbsp;'+location;
      }
    },
    task: function(schedule) {
      let title = schedule.title+'&nbsp;';
      let vak = schedule.raw.vak+'&nbsp;';
      let link = '<a href="'+schedule.raw.link+'" target="_blank" style="color: white;"><i class="fas fa-link"></i></a>';

      return title+' '+vak+' '+link;
    },
    popupDetailDate: function(isAllDay, start, end) {
      let start_time = moment.unix(start / 1000).format("YYYY-MM-DD HH:mm:ss");
      let end_time = moment.unix(end / 1000).format("YYYY-MM-DD HH:mm:ss");
      return start_time+' - '+end_time;
    },
    popupDetailBody: function(schedule) {
      let location = '<i class="fas fa-map-marker-alt schedule-item-text"></i>' + schedule.raw.location;
      let klas = '';
      if(schedule.attendees > 1){
        klas = '<i class="fas fa-user schedule-item-text"></i>' + schedule.raw.attendees.join(", ");
      }else{
        klas = '<i class="fas fa-user schedule-item-text"></i>' + schedule.raw.attendees.join(", ");
      }

      let docent = '';
      if(schedule.raw.teachers > 1){
        docent = '<i class="fas fa-users schedule-item-text"></i>' + schedule.raw.teachers.join(", ");
      }else{
        docent = '<i class="fas fa-user-tie schedule-item-text"></i>' + schedule.raw.teachers.join(", ");
      }

      return location+'<br>'+klas+'<br>'+docent;
    },
    weekDayname: function(schedule) {
      let dayDate = '<span style="font-size: 20px;">'+schedule.date+'</span>';

      let day = schedule.dayName;
      if(day == "Mon"){
        day = "Ma";
      }
      if(day == "Tue"){
        day = "Di";
      }
      if(day == "Wed"){
        day = "Woe";
      }
      if(day == "Thu"){
        day = "Do";
      }
      if(day == "Fri"){
        day = "Vrij";
      }
      if(day == "Sat"){
        day = "Zat";
      }
      if(day == "Sun"){
        day = "Zon";
      }

      return '<span style="color: white;">' +dayDate+ '</span>'+' <span style="color: white;">' +day+ '</span>';
    },
    dayGridTitle: function (type){
      let title = '';

      switch(type) {
        case 'milestone':
          title = '<span class="tui-full-calendar-left-content" style="color: white;">Mijlpaal</span>';
          break;
        case 'task':
          title = '<span class="tui-full-calendar-left-content" style="color: white;">Taken</span>';
          break;
        case 'allday':
          title = '<span class="tui-full-calendar-left-content" style="color: white;">Hele Dag</span>';
          break;
      }

      return title;
    },
    timegridDisplayPrimayTime: function(time) {
      let timeText = '00';
      if(String(time.hour).length == 1){
        timeText = '0'+time.hour;
      }else{
        timeText = time.hour;
      }

      return timeText+':00';
    }
  };
}

export let WEEKLY_CUSTOM_THEME = {
  // week header 'dayname'
  'week.dayname.height': '41px',
  'week.dayname.borderTop': '1px solid #ddd',
  'week.dayname.borderBottom': '1px solid #ddd',
  'week.dayname.borderLeft': '1px solid #ddd',
  'week.dayname.paddingLeft': '5px',
  'week.dayname.backgroundColor': 'inherit',
  'week.dayname.textAlign': 'left',
  'week.today.color': '#b857d8',
  'week.pastDay.color': '#999',

  // week vertical panel 'vpanel'
  'week.vpanelSplitter.border': '1px solid #ddd',
  'week.vpanelSplitter.height': '3px',

  // week daygrid 'daygrid'
  'week.daygrid.borderRight': '1px solid #ddd',
  'week.daygrid.backgroundColor': 'inherit',

  'week.daygridLeft.width': '77px',
  'week.daygridLeft.backgroundColor': '#a8def74d',
  'week.daygridLeft.paddingRight': '5px',
  'week.daygridLeft.borderRight': '1px solid #ddd',

  'week.today.backgroundColor': '#b857d81f',
  'week.weekend.backgroundColor': 'inherit',

  // week timegrid 'timegrid'
  'week.timegridLeft.width': '77px',
  'week.timegridLeft.backgroundColor': '#03a9f44d',
  'week.timegridLeft.borderRight': '1px solid #ddd',
  'week.timegridLeft.fontSize': '12px',
  'week.timegridLeftTimezoneLabel.height': '51px',
  'week.timegridLeftAdditionalTimezone.backgroundColor': '#fdfdfd',

  'week.timegridOneHour.height': '48px',
  'week.timegridHalfHour.height': '24px',
  'week.timegridHalfHour.borderBottom': '1px dotted #f9f9f9',
  'week.timegridHorizontalLine.borderBottom': '1px solid #eee',

  'week.timegrid.paddingRight': '10px',
  'week.timegrid.borderRight': '1px solid #ddd',
  'week.timegridSchedule.borderRadius': '0',
  'week.timegridSchedule.paddingLeft': '0',

  'week.currentTime.color': '#135de6',
  'week.currentTime.fontSize': '12px',
  'week.currentTime.fontWeight': 'bold',

  'week.pastTime.color': '#a3a3a3',
  'week.pastTime.fontWeight': 'normal',

  'week.futureTime.color': '#ffffff',
  'week.futureTime.fontWeight': 'normal',

  'week.currentTimeLinePast.border': '2px solid rgba(19, 93, 230, 0.3)',
  'week.currentTimeLineBullet.backgroundColor': '#135de6',
  'week.currentTimeLineToday.border': '2px solid #135de6',
  'week.currentTimeLineFuture.border': '2px solid #135de6',

  // week daygrid schedule style
  'week.dayGridSchedule.borderRadius': '0',
  'week.dayGridSchedule.height': '18px',
  'week.dayGridSchedule.marginTop': '2px',
  'week.dayGridSchedule.marginLeft': '10px',
  'week.dayGridSchedule.marginRight': '10px'
};

export function generateStringColor(str){
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xFF;
    colour += ('00' + value.toString(12)).substr(-2);
  }
  return colour;
}
