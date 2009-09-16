javascript:(function(){var%20s=document.createElement('div');

s.innerHTML='<span class=\'_columbo_loading\'>loading...</span>';

s.style.color='#aaaaaa';

s.style.padding='20px';

s.style.position='fixed';

s.style.zIndex='9999';

s.style.fontSize='12pt';

s.style.fontFamily='font-family:georgia,serif;';

s.style.textAlign='left';

s.style.right='0px';

s.style.top='50px';

s.style.background='#000000';

document.body.appendChild(s);

s.setAttribute('id','_columbo_div');

s=document.createElement('script');

s.setAttribute('type','text/javascript');

s.setAttribute('src','http://columbo.heroku.com/js/columbo_loader.js');

document.body.appendChild(s);

})()