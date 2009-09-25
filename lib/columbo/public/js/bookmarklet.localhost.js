javascript:(function(){var%20s=document.createElement('div');

s.innerHTML='<span class=\'_columbo_loading\' style=\'height: 50px; width:305px; padding:20px; background: #000\'><img src=\'http://0.0.0.0:9292/images/loader.gif\'/> loading...</span>';

document.body.appendChild(s);

s.setAttribute('id','_columbo_wrapper');

s=document.createElement('script');

s.setAttribute('type','text/javascript');

s.setAttribute('src','http://0.0.0.0:9292/js/columbo_loader.localhost.js');

document.body.appendChild(s);

})()