function Columbo() {
  this.columbo_div = null;
}
Columbo.prototype = new Object();

Columbo.prototype.makeInterface = function() {
  var loading_div = jQuery('.columbo_loading');
  loading_div.innerHTML='';
  this.columbo_div = loading_div.removeClass('columbo_loading').attr('id', '_columbo_div').css({'width' : '650px'})
  this.search_input = jQuery('<input type="text" value="search" id="_columbo_search"/>')
  this.columbo_div.append(this.search_input);
  this.columbo_div.append(jQuery('<input id="_columbo_submit" type="submit" value="submit_search"/>').click(function () {  
      jQuery('body').unhighlight()   ; 
      var search_term = jQuery('input#_columbo_search').val();
      console.debug(search_term)
      jQuery('body').highlight(search_term.split(', '));
    })
  );
  this.columbo_div.append(jQuery('<a id="_columbo_clear">clear</a>').click(function () {$j('body').unhighlight()}))
  jQuery('body').append(this.columbo_div);
};

columbo = new Columbo();
columbo.makeInterface();