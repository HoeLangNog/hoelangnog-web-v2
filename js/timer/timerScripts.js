import {loadTimerTime} from "./timer";

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
    loadTimerTime(value);
  });
  $("select").on("select2:open", function(event) {
    $('input.select2-search__field').attr('placeholder', 'Zoek naar een groep');
  });
});
