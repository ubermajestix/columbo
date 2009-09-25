// Object.prototype.keys = function(){keys = []; for(key in this){keys.push(key);}; keys.delete("keys"); return keys}
// Object.prototype.values = function(){values = []; for(key in this){values.push(this[key]); }; return values;}

function Columbo() {
  this.columbo_div = null;
  this.wrapper = null;
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

Columbo.prototype.build_results_div = function(search_hash, show){
  self = this
  jQuery('#_columbo_results, #_columbo_view_searches').remove()
  self.results_div = jQuery('<div id=\"_columbo_results\">')
  self.results_div.html('<h3>Results</h3>')
  keys = []; for(key in search_hash){keys.push(key);}
  if(keys.length > 0){
    jQuery.each(keys, function(index, term){    
      self.results_div.append('<div style=\"height:25px\"><div class=\"'+search_hash[term]+'\ _columbo_color_box"></div>'+term+'</div>')
    });
  };

  toggle_link = jQuery('<a class="_columbo_right" id="_columbo_view_searches">view searches</a>')
  toggle_link.click(function(){jQuery('#_columbo_results, #_columbo_recent, #_columbo_view_searches, #_columbo_view_results').toggle(); })  
  if(show==true){self.results_div.hide(); } 
  self.clear.append(toggle_link)  
  self.internal_wrapper.append(self.results_div)
  //TODO get count of each term
  //TODO make spans that wrap term have anchor tags... then we can click through to terms
  
}

Columbo.prototype.build_recent_search_div = function(show){
  self = this
  jQuery('#_columbo_recent, #_columbo_view_results').remove()
  searches = self.saved_searches() || []
  self.recent_div = jQuery('<div id=\"_columbo_recent\">')
  self.recent_div.html('<h3>Recent Searches</h3>')  
  if(searches.length > 0){
    self.recent_div.append('<a class=\"_columbo_right _columbo_small\" onclick=\"self.clear_cookie()\">clear searches</a>')
    search_input = jQuery('input#_columbo_search')
    jQuery.each(searches.reverse(), function(index, string){
      var redo_search_link = '<a onclick=\"jQuery(\'input#_columbo_search\').val(\''+string+'\'); self.search_highlight(true);\">'+ string + '</a>';
      self.recent_div.append(redo_search_link+'<br/>');
      return (index < 10)
    });
  }
  else{
     self.recent_div.append("no recent searches")
  }

  toggle_link = jQuery('<a class="_columbo_right" id="_columbo_view_results" style=\"display: none;\">view terms</a>')
  toggle_link.click(function(){jQuery('#_columbo_results, #_columbo_recent, #_columbo_view_searches, #_columbo_view_results').toggle(); })  
  if(show==false){self.recent_div.hide(); toggle_link.hide()}  
  self.internal_wrapper.append(self.recent_div)
  self.clear.append(toggle_link)
  
  // self.close
  
}

//**********************  highlighting **********************// 
Columbo.prototype.search_highlight = function(show_search_div){
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
 self.build_recent_search_div(show_search_div)
 self.build_results_div(search_hash, show_search_div)
 
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
  self = this
 this.wrapper = jQuery('#_columbo_wrapper')
  //define main div
  this.columbo_div = jQuery('<div id="_columbo_div"></div>')
  // bind escape key 
  document.onkeyup = (function(e) {
    if (e.keyCode == 27) {
      self.clear_interface();
    };
  });
  
  //search input
  this.search_div = jQuery('<div class="_columbo_search"></div>')
  this.search_input = jQuery('<input type="text" value="search, terms, go, here" id="_columbo_search"/>').keyup(function(e) {
    if (e.keyCode == 13) {
      self.search_highlight(false);
    };
  })
  this.search_div.append(this.search_input)
  this.columbo_div.append(this.search_div);
  
  // //submit button
  // this.submit_button = jQuery('<input id="_columbo_submit" type="submit" value="hightlight terms"/>');
  // this.submit_button.click(function(){self.search_highlight();});
  // this.columbo_div.append(this.submit_button);
  
  //build internal_wrapper to put results/recent_search into
  this.internal_wrapper = jQuery('<div id="_columbo_inner_wrapper"></div>')
  this.columbo_div.append(this.internal_wrapper)
  
  //clear link and space to add toggle results/recent_search link
  this.clear = jQuery('<div class="_columbo_clear_search"></div>')
  this.clear.append(jQuery('<a class="" id="_columbo_clear_search">clear</a>').click(function () { self.unhighlight(); }))
  // this.clear.append(jQuery('<div class="_columbo_clear"></div>'))
  this.columbo_div.append(this.clear)
  
  // this.results_div = jQuery('<div id="_columbo_results"></div>');
  // this.columbo_div.append(this.results_div);
  
  //clear loading...
  jQuery('._columbo_loading').fadeOut(500).animate({opacity: 1.0}, 3000);
  
  //put it on the page
  this.wrapper.append(this.columbo_div)
  
  //focus after div exists in dom
  this.search_input.focus();
  
  //setup close button
  this.close_div = jQuery('<div id="_columbo_close"></div>')
  this.click_close = jQuery('<div id="_columbo_click_close"></div>')
  this.click_close.click(function(){self.clear_interface();})
  this.close_div.html(this.click_close)
  this.wrapper.append(this.close_div)
};

Columbo.prototype.clear_interface = function(){
  this.unhighlight();    
  jQuery('#_columbo_wrapper').html('')
  if(this.wrapper){     
    jQuery('#_columbo_wrapper').remove();
    this.wrapper = null;
   };
};





columbo = new Columbo();
columbo.clear_interface();
columbo.make_interface();
