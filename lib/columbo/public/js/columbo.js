function Columbo() {
  this.columbo_div = null;
  this.search_input = null;
  this.highlights = [0,1,2,3,4,5,6]
  this.delimeter = ":~:"
  this.domain = "columbo.heroku.com"
}
Columbo.prototype = new Object();


//**********************  mmm... cookies... **********************// 
//TODO need to setup cookie option so it works in several windows...
// -- doesn't seem possible to set cookies across domains... might need to use db solution

Columbo.prototype.save_search = function(search_terms){
  var searches = this.saved_searches()
  if(searches){
    if(searches.indexOf(search_terms)==-1){
      searches.push(search_terms)
    }
  }
  else {
    searches = [search_terms]
  }
  jQuery.cookie('_columbo_', searches.join(this.delimeter))
};

Columbo.prototype.saved_searches = function() {
    cookie = jQuery.cookie('_columbo_') || "";
    return cookie.split(this.delimeter)
}

Columbo.prototype.clear_cookie = function() {
  jQuery('#_columbo_recent').remove()
  jQuery.cookie('_columbo_', null)
}


//**********************  result divs **********************// 

Columbo.prototype.build_results_div = function(search_hash){
  self = this
  jQuery('#_columbo_results').remove()
  self.results_div = jQuery('<div id=\"_columbo_results\">')
  self.results_div.html('<h3>Results</h3>')
  if(search_hash.keys.length > 0){
    jQuery(search_hash.keys, function(index, term){
      self.results_div.append('<span class=\"'+search_hash[term]+'\">'+term+'</span></br>')
    });
  };
  self.columbo_div.append(self.results_div)
  
  //get count of each term
  
}

Columbo.prototype.build_recent_search_div = function(){
  self = this
  jQuery('#_columbo_recent').remove()
  searches = self.saved_searches() || []
  self.recent_div = jQuery('<div id=\"_columbo_recent\">')  
  self.recent_div.html('<h3>Recent Searches</h3>')  
  if(searches.length > 0){
    self.recent_div.append('<a class=\"_columbo_right _columbo_small\" onclick=\"self.clear_cookie()\">clear searches</a>')
    search_input = jQuery('input#_columbo_search')
    jQuery.each(searches.reverse(), function(index, string){
      var redo_search_link = '<a onclick=\"jQuery(\'input#_columbo_search\').val(\''+string+'\')\">'+ string + '</a>';
      self.recent_div.append(redo_search_link+'<br/>');
      return (index < 10)
    });
  }
  else{
     self.recent_div.append("no recent searches")
  }
  // self.columbo_div.append(self.recent_div)
  
}

//**********************  highlighting **********************// 
Columbo.prototype.search_highlight = function(){
  this.unhighlight();
  self=this;
  var search_text = jQuery('input#_columbo_search').val()
  // save search to cookie
  self.save_search(search_text)
  var search_hash = {}
  var search_terms = search_text.split(',');
  if (search_terms.length > 0){
    jQuery.each(search_terms, function(index, value){
      var string = jQuery.trim(value); //striping leading and trailing whitespace
      //rotate through defined colors
      search_hash[string] = '_columbo_highlight' + index%self.highlights.length + ''
      if(string.length > 0 ){jQuery('body').highlight(string,{className: '_columbo_highlight' + index%self.highlights.length + ''})}
    }); 
  };
  // don't highlight text in columbo_div
  self.dont_highlight_columbo()
 //TODO display recent searches 
 self.build_recent_search_div(search_terms)
 self.build_results_div(search_hash)
 
 //TODO disply word counts

};

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
