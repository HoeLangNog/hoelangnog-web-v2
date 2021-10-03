let hiddenOnMouse = document.getElementsByClassName("hide-on-mouse");

(function() {
  var mouseTimer = null, cursorVisible = true;

  function disappearCursor() {
    mouseTimer = null;
    document.body.style.cursor = "none";
    for (let i = 0; i < hiddenOnMouse.length; i++) {
      let hiddenElement = hiddenOnMouse.item(i);
      hiddenElement.classList.add("hidden-by-mouse");
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
      cursorVisible = true;
    }
    mouseTimer = window.setTimeout(disappearCursor, 1500);
  };
})();
