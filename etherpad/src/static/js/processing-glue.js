var start_reload_timer = function() {
  if (self.timeout) {
    clearTimeout(self.timeout); 
  }

  if (!document.getElementById('procLock').checked) {
    self.timeout = setTimeout(reload_processing, 1000);
  }
}

var reload_processing = function() {
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
}

setTimeout(function() {padeditor.ace.setNotifyDirty(start_reload_timer);}, 0);

reload_processing();
