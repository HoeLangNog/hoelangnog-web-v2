import {loadSchedules} from "./calender";

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
    loadSchedules(value);
  });
  $("select").on("select2:open", function(event) {
    $('input.select2-search__field').attr('placeholder', 'Zoek naar een groep');
  });

  setTimeout(function() {
    $(".tui-view-7").height( $(window).height() - 200 );
  }, 1000);
  $( window ).resize(function() {
    $(".tui-view-7").height( $(window).height() - 200 );
  });
});
