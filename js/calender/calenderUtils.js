import moment from 'moment';

export function getCalenderTemplate(){
  return {
    time: function(schedule) {
      let start_time = moment(schedule.end.getTime());
      let duration = start_time.diff(schedule.start.getTime(), "minutes");

      let title = '<span style="font-size: 18px;">'+schedule.title+'</span>';
      let time = '<i class="fas fa-clock schedule-item-text"></i>' + moment(schedule.start.getTime()).format('HH:mm') + ' - ' +moment(schedule.end.getTime()).format('HH:mm');
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

      if(duration >= 120){
        return title+'<br>'+time+'<br>'+location+'<br>'+klas+'<br>'+docent;
      }else if(duration >= 100){
        return title+'<br>'+time+'&nbsp;&nbsp;'+location+'<br>'+klas+'<br>'+docent;
      }else if(duration >= 90){
        return title+'<br>'+time+'&nbsp;&nbsp;'+location+'&nbsp;&nbsp;'+docent+'<br>'+klas;
      }else if(duration >= 75){
        return title+'<br>'+time+'&nbsp;&nbsp;'+location+'&nbsp;&nbsp;'+docent+'<br>'+klas;
      }else if(duration >= 60){
        return title+'<br>'+time+'&nbsp;&nbsp;'+location+'&nbsp;&nbsp;'+docent;
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

      return dayDate+ ' ' +day;
    },
    dayGridTitle: function (type){
      let title = '';

      switch(type) {
        case 'milestone':
          title = '<span class="tui-full-calendar-left-content">Mijlpaal</span>';
          break;
        case 'task':
          title = '<span class="tui-full-calendar-left-content">Taken</span>';
          break;
        case 'allday':
          title = '<span class="tui-full-calendar-left-content">Hele Dag</span>';
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
