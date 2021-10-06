// @ts-ignore
import $ from "jquery";
// @ts-ignore
import * as axiosa from 'axios'

const axios = axiosa.default;

const selector = $("#calender-group-select");
let myStorage = window.localStorage || localStorage;

function loadGroups(){
  axios.get("https://api.hoelangnog.xyz/groups?visible")
    .then(response => {
      let resObject: any = response.data;
      let storedGroup = "";
      if(myStorage.getItem("group") != null){
        storedGroup = myStorage.getItem("group");
      }
      selector.empty();
      resObject.forEach((group) => {
        if(storedGroup == group.code){
          selector.append('<option value="'+group.code+'" selected>'+group.code+'</option>');
        }else{
          selector.append('<option value="'+group.code+'">'+group.code+'</option>');
        }
      });
      if(myStorage.getItem("group") == null){
        selector.append('<option value="none" disabled selected>Selecteer een group</option>');
      }
    });
}
loadGroups();
