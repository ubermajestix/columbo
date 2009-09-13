javascript:(function(){var%20s=document.createElement('div');

s.innerHTML='<span class=\'_columbo_loading\'>loading...</span>';

s.style.color='#ff600a';

s.style.padding='20px';

s.style.position='fixed';

s.style.zIndex='9999';

s.style.fontSize='1.0em';

s.style.border='5px%20solid%20#a1a1a1';

s.style.right='40px';

s.style.top='40px';

s.style.background='#e3e3e3';

document.body.appendChild(s);

s.setAttribute('id','_columbo_div');

s=document.createElement('script');

s.setAttribute('type','text/javascript');

s.setAttribute('src','http://columbo.heroku.com/js/columbo_loader.js');

document.body.appendChild(s);

})()