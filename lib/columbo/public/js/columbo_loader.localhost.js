// this is verbatim from selector gadget
// Copyright (c) 2008, 2009 Andrew Cantino
// Copyright (c) 2008, 2009 Kyle Maxwell
console.debug('loader!')
function importJS(src, look_for, onload) {
  var s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('src', src);
  if (onload) wait_for_script_load(look_for, onload);
  var head = document.getElementsByTagName('head')[0];
  if (head) {
    head.appendChild(s);
  } else {
    document.body.appendChild(s);
  }
}

function importCSS(href, look_for, onload) {
  var s = document.createElement('link');
  s.setAttribute('rel', 'stylesheet');
  s.setAttribute('type', 'text/css');
  s.setAttribute('media', 'screen');
  s.setAttribute('href', href);
  if (onload) wait_for_script_load(look_for, onload);
  var head = document.getElementsByTagName('head')[0];
  if (head) {
    head.appendChild(s);
  } else {
    document.body.appendChild(s);
  }
}

function wait_for_script_load(look_for, callback) {
  var interval = setInterval(function() {
    if (eval("typeof " + look_for) != 'undefined') {
      clearInterval(interval);
      callback();
    }
  }, 50);
}

(function(){
  importCSS('http://0.0.0.0:9292/css/columbo.css');
  importJS('http://0.0.0.0:9292/js/jquery-1.3.2.min.js', 'jQuery', function() { // Load everything else when it is done.
    jQuery.noConflict();
    importJS('http://0.0.0.0:9292/js/jquery.highlight.js')//, 'jQuery::Highlight', function() {
    importJS('http://0.0.0.0:9292/js/columbo.js');
  });
})();
