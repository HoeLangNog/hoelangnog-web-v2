let rainbowEnabled = false;
rainbow = function() {
  rainbowEnabled = true;
  return "Rainbow Mode Enabled";
}

let time = 1;
let interval = setInterval(function() {
  if (rainbowEnabled){
    updateColor();
  }
  time++;
}, 15);

let circle = document.getElementById("circle");
let count = 356;
let i = 0;
function updateColor(){
  circle.setAttribute("stroke", "hsl("+i+", 100%, 50%)");
  if (i === count + 1){
    i = 0;
  }
  i++;
}
