function Columbo() {
  this.columbo_div = null;
}
Columbo.prototype = new Object();

Columbo.prototype.unhighlight = function(){
  jQuery('body').unhighlight({className: '_columbo_highlight'});
};


Columbo.prototype.search_highlight = function(){
  this.unhighlight();
  var search_term = jQuery('input#_columbo_search').val();
  if (search_term.length > 0){
    jQuery('body').highlight(search_term.split(', '),{className: '_columbo_highlight'});
  };
  // TODO don't highlight text in columbo
  this.columbo_div.children().removeClass("_columbo_highlight");
};

Columbo.prototype.make_interface = function(){
  //clear loading...
  jQuery('._columbo_loading').remove();
  //define main div
  this.columbo_div = jQuery('#_columbo_div')
  this.columbo_div.append(jQuery('<a id="_columbo_close">close</a>').click(function () {self.clear_interface();}))
  // bind escape key 
  document.onkeyup = (function(e) {
    if (e.keyCode == 27) {
      self.clear_interface();
    };
  });
  self = this
  //search input
  this.columbo_div.append(jQuery("<label>enter search terms, comma, separated</label><br/>"));
  this.search_input = jQuery('<input type="text" id="_columbo_search"/>').keyup(function(e) {
    if (e.keyCode == 13) {
      self.search_highlight();
    };
  })
  this.columbo_div.append(this.search_input);
  //submit button
  this.submit_button = jQuery('<input id="_columbo_submit" type="submit" value="hightlight terms"/>');
  this.submit_button.click(function(){self.search_highlight();});
  this.columbo_div.append(this.submit_button);
  
  //clear link
  this.columbo_div.append(jQuery('<a id="_columbo_clear">clear</a>').click(function () { self.unhighlight(); }))
  
  //put it on the page
  jQuery('body').append(this.columbo_div);
  //focus after div exists in dom
  this.search_input.focus();
};

Columbo.prototype.clear_interface = function(){
  this.unhighlight();    
  jQuery('#_columbo_div').html('')
  if(this.columbo_div){     
    jQuery('#_columbo_div').remove();
    this.columbo_div = null;
   };
};





columbo = new Columbo();
columbo.clear_interface();
columbo.make_interface();
