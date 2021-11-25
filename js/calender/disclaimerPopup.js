import Swal from 'sweetalert2'
let myStorage = window.localStorage || localStorage;

let accepted;
if(myStorage.getItem("disclaimerAccepted") != null){
  accepted = myStorage.getItem("disclaimerAccepted");
}else{
  myStorage.setItem("disclaimerAccepted", false);
  accepted = false;
}

if (!accepted){
  Swal.fire({
    icon: 'warning',
      title: 'Disclaimer!',
      text: 'HoeLangNog is niet verantwoordelijk voor eventuele fouten in de calender!',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false
  }).then((result) => {
    myStorage.setItem("disclaimerAccepted", true);
  });
}
