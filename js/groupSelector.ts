import $ from "jquery";
import * as axiosa from 'axios'

const axios = axiosa.default;

const selectors = $('.group-selector');
function loadGroups(){
  axios.get("https://api.hoelangnog.xyz/groups/")
    .then(response => {
      let resObject: any = response.data;
      selectors.empty();
      resObject.forEach((group) => {
        selectors.append('<option value="'+group.code+'">'+group.code+'</option>');
      });
      selectors.chosen({disable_search_threshold: 10});
    });
}
loadGroups();
