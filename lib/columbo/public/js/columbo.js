function Columbo() {
  this.columbo_div = null;
  this.highlights = [0,1,2,3,4,5,6]
}
Columbo.prototype = new Object();

Columbo.prototype.unhighlight = function(){
  
  jQuery.each(this.highlights, function(index, value){
    jQuery('body').unhighlight({className: '_columbo_highlight'+value+''});
  });
};

Columbo.prototype.dont_highlight_columbo = function(){
  self = this
  jQuery.each(self.highlights, function(index, value){
    var highlight = '_columbo_highlight'+value+''
    jQuery.each(jQuery('.'+highlight), function(index, element){ 
      if(jQuery(element).parents('div#_columbo_div').length > 0){
        jQuery(element).removeClass(highlight);
      };
    });
  });
};


Columbo.prototype.build_results_div = function(search_terms){
  self = this
  self.results_div.html('<h3>Results</h3>')
  //get count of each term
  jQuery.each(search_terms, function(){self.results_div.append(this+'<br/>');})
}

Columbo.prototype.search_highlight = function(){
  this.unhighlight();
  self=this;
  
  var search_terms = jQuery('input#_columbo_search').val().split(',');
  if (search_terms.length > 0){
    jQuery.each(search_terms, function(index, value){
      var string = value.replace(/^\s*|\s*$/g,''); //striping leading and trailing whitespace
      //rotate through defined colors
      if(string.length > 0 ){jQuery('body').highlight(string,{className: '_columbo_highlight' + index%self.highlights.length + ''})}
    }); 
  };
  // don't highlight text in columbo_div
  self.dont_highlight_columbo()

};

Columbo.prototype.make_interface = function(){
 
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
  
  this.results_div = jQuery('<div id="_columbo_results"></div>');
  this.columbo_div.append(this.results_div);
  
  //put it on the page
  jQuery('body').append(this.columbo_div);
  //clear loading...
   jQuery('._columbo_loading').fadeOut(500);
  // this.columbo_div.fadeIn(500)
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
