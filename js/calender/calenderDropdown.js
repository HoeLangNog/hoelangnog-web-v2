import {loadSchedule} from "./calender";

$(document).ready(function () {
  let myStorage = window.localStorage || localStorage;
  $("#calender-group-select").select2({
    dropdownAutoWidth: true,
    closeOnSelect: true
  });
  $("select").on("select2:open", function(event) {
    $('input.select2-search__field').attr('placeholder', 'Zoek naar een groep');
  });
  $("#calender-group-select").on('change', function() {
    console.log("change");
    let value = $('#calender-group-select').val();
    myStorage.setItem('group', value);
    loadSchedule(value);
  });
});
