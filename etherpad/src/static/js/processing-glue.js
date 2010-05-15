var glue_func = function() {
  if (self.timeout) {
    clearTimeout(self.timeout);
  }
  self.timeout = setTimeout(function() {
    jswrapper = document.getElementById('jswrapper');
    padid = jswrapper.getAttribute("padid");
    var url = '/ep/pad/export/' + padid + '/latest';
    AJAX = new window.XMLHttpRequest();
    if (AJAX) {
      AJAX.open('GET', url + '?t=' + new Date().getTime(), false);
      AJAX.send(null);
      code = AJAX.responseText;
      if (self.processing) {
        self.processing.exit();
      }
      jswrapper.innerHTML = '<canvas id=procjs></canvas>';
      try {
        self.processing = Processing(document.getElementById('procjs'), code);
      }
      catch (e) {
        jswrapper.innerHTML = '<div style="color: red;">' + e + '</div>';
      }
    }
    return false;
  }, 1000);
}

setTimeout(function() {padeditor.ace.setNotifyDirty(glue_func);},
           2000);
glue_func();
