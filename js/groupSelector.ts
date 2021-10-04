// @ts-ignore
import $ from "jquery";
// @ts-ignore
import * as axiosa from 'axios'

const axios = axiosa.default;

const selector = $("#calender-group-select");

function loadGroups(){
  axios.get("https://api.hoelangnog.xyz/groups/")
    .then(response => {
      let resObject: any = response.data;
      let storedGroup = "";
      if(localStorage.getItem("group") != null){
        storedGroup = localStorage.getItem("group");
      }
      selector.empty();
      resObject.forEach((group) => {
        if(group.visible == false)return;
        if(storedGroup == group.code){
          selector.append('<option value="'+group.code+'" selected>'+group.code+'</option>');
        }else{
          selector.append('<option value="'+group.code+'">'+group.code+'</option>');
        }
      });
      if(localStorage.getItem("group") == null){
        selector.append('<option value="none" disabled selected>Selecteer een group</option>');
      }
    });
}
loadGroups();
