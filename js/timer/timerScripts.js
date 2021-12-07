import {loadTimer} from "./timer";
import {loadToday} from "./lessons";

$(document).ready(function () {
  let myStorage = window.localStorage || localStorage;
  let calenderSelect = $("#calender-group-select");
  calenderSelect.select2({
    dropdownAutoWidth: true,
    closeOnSelect: true
  });
  calenderSelect.on('change', function() {
    let value = $('#calender-group-select').val();
    myStorage.setItem('group', value);
    console.log(myStorage.getItem("group"))
    loadTimer(value);
    loadToday(value);
  });
  $("select").on("select2:open", function(event) {
    $('input.select2-search__field').attr('placeholder', 'Zoek naar een groep');
  });

  let timerDiv = document.getElementById("timer-div");
  $(window).on('resize', function(){
    let scaleX = Math.max(Math.min(window.innerWidth / 400, 1.8), 0.68);
    let scaleY = Math.max(Math.min(window.innerHeight / 450, 20), 0);

    if (scaleY > scaleX){
      timerDiv.style.transform='scale('+scaleX+')';
    }else{
      timerDiv.style.transform='scale('+scaleY+')';
    }
  });

});

