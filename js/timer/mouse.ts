let hiddenOnMouse = document.getElementsByClassName("hide-on-mouse");
let hiddenNavOnMouse = document.getElementsByClassName("hidenav-on-mouse");

(function() {
  var mouseTimer = null, cursorVisible = true;

  function disappearCursor() {
    mouseTimer = null;
    document.body.style.cursor = "none";
    for (let i = 0; i < hiddenOnMouse.length; i++) {
      let hiddenElement = hiddenOnMouse.item(i);
      hiddenElement.classList.add("hidden-by-mouse");
    }
    for (let i = 0; i < hiddenNavOnMouse.length; i++) {
      let hiddenElement = hiddenNavOnMouse.item(i);
      hiddenElement.classList.add("hiddennav-by-mouse");
    }
    cursorVisible = false;
  }

  document.onmousemove = function() {
    if (mouseTimer) {
      window.clearTimeout(mouseTimer);
    }
    if (!cursorVisible) {
      document.body.style.cursor = "default";
      for (let i = 0; i < hiddenOnMouse.length; i++) {
        let hiddenElement = hiddenOnMouse.item(i);
        hiddenElement.classList.remove("hidden-by-mouse");
      }
      for (let i = 0; i < hiddenNavOnMouse.length; i++) {
        let hiddenElement = hiddenNavOnMouse.item(i);
        hiddenElement.classList.remove("hiddennav-by-mouse");
      }
      cursorVisible = true;
    }
    mouseTimer = window.setTimeout(disappearCursor, 1500);
  };
})();
