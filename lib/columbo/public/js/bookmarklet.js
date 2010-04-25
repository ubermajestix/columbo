javascript:(function(){var%20s=document.createElement('div');

s.innerHTML='<span class=\'_columbo_loading\' style=\'height: 50px; width:305px; padding:20px; background: #000\'><img src=\'http://getcolumbo.com/images/loader.gif\'/> loading...</span>';

s.style.color='#aaaaaa';

s.style.position='fixed';

s.style.zIndex='9999';

s.style.fontSize='12pt';

s.style.fontFamily='font-family:georgia,serif;';

s.style.textAlign='left';

s.style.right='0px';

s.style.top='50px';

document.body.appendChild(s);

s.setAttribute('id','_columbo_wrapper');

s=document.createElement('script');

s.setAttribute('type','text/javascript');

s.setAttribute('src','http://s3.amazonaws.com/getcolumbo/js/columbo_loader.js');

document.body.appendChild(s);

})()