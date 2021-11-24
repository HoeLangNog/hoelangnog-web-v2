const axios = require('axios');

let myStorage = window.localStorage || localStorage;
let linesList = document.getElementById("timer-lines");
let data;

function addLessonLines(startTime, endTime) {
  if (data == null)
    return;

  data.forEach((item) => {
    let diff1 = endTime.getTime() - new Date(item.start_time * 1000).getTime();
    if (diff1 < 0) {
      return;
    }

    let diff2 = endTime.getTime() - new Date(item.end_time * 1000).getTime();
    if (diff2 < 0) {
      return;
    }

    let totalTime = endTime.getTime() - startTime.getTime();

    let percent1 = 100 - (((totalTime - diff1) / totalTime) * 100);
    let rotation1 = 360 / 100 * percent1;
    let percent2 = 100 - (((totalTime - diff2) / totalTime) * 100);
    let rotation2 = 360 / 100 * percent2;

    addElement(rotation1, "#05ff00", "Begin "+item.name); //Start line
    addElement(rotation2 + 2, "#ff1100", "Einde "+item.name); //End line
  });
}

function addElement(rotation, color, title) {
  let lineNode = document.createElement("line");
  lineNode.setAttribute("x1", "153");
  lineNode.setAttribute("y1", "153");
  lineNode.setAttribute("x2", "153");
  lineNode.setAttribute("y2", "0");

  lineNode.setAttribute("stroke-width", "6");
  lineNode.setAttribute("stroke", color);
  lineNode.setAttribute("transform", "rotate("+rotation+" 153 153)");

  let titleNode = document.createElement("title");
  titleNode.text = title;
  lineNode.append(titleNode);

  linesList.append(lineNode);
  linesList.innerHTML += "";
}

export function loadToday(groupCode){
  data = null;
  linesList.innerHTML = "";

  axios.get("https://api.hoelangnog.xyz/groups/"+groupCode+"/schedule?today")
    .then(response => {
      data = response.data;

      axios.get("https://api.hoelangnog.xyz/groups/" + groupCode + "/unixoftoday")
        .then(response => {
          let resObject = response.data;
          let startDate = new Date(resObject.start * 1000);
          let endDate = new Date(resObject.last * 1000);

          addLessonLines(startDate, endDate);
        });
    });
}

if(myStorage.getItem("group") != null){
  loadToday(myStorage.getItem("group"));
}
