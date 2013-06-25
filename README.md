# Columbo: word detective

Bookmarklet to search text on a page.

## Features 
* Highlight several search terms on any html document. 
* Highlights text similar to google's page cache (different color per word)
* Returns a count of each search terms occurrence -- feature not yet available
* Saves sets of search terms for later use -- feature being developed 
* 100% jQuery, lightweight, object-oriented javascript, boom.

## Bookmarklet:
 
 drag this link: [columbo](javascript:(function(){var%20s=document.createElement('div');s.innerHTML='<span%20class=\'_columbo_loading\'%20style=\'height:%2050px;%20width:305px;%20padding:20px;%20background:%20#000\'><img%20src=\'http://getcolumbo.com/images/loader.gif\'/>%20loading...</span>';s.style.color='#aaaaaa';s.style.position='fixed';s.style.zIndex='9999';s.style.fontSize='12pt';s.style.fontFamily='font-family:georgia,serif;';s.style.textAlign='left';s.style.right='0px';s.style.top='50px';document.body.appendChild(s);s.setAttribute('id','_columbo_wrapper');s=document.createElement('script');s.setAttribute('type','text/javascript');s.setAttribute('src','http://columbo.heroku.com/js/columbo_loader.js');document.body.appendChild(s);})()) to your bookmarks

## Development

    bundle install
    rackup # fires up the webserver on 0.0.0.0:9292 

The bookmarklet served up in the html in development will load css and javascript
from 0.0.0.0:9292. Once you install the local bookmarklet to your bookmarks, you 
can make edits to the js and css and just reopen the local bookmarklet and see
the changes. 

Bookmarklets are typically a pain to develop, but `bookmarklet.js` and `columbo_loader.js`
will load the css and js from either a production server or 0.0.0.0:9292. This allows us to
upgrade functionality without requiring users to install a new bookmarklet.

However, this is basically cross-site scripting (XSS) and browsers are moving towards
shutting this behavior down. Making this code into a browser extension would be ideal,
but I'm not sure if using `columbo_loader.js` to load css and js from 3rd parties 
is allowed.

## TODO
* redesigned bookmarklet does not drag to FF bookmarks toolbar
* test on ie(doesn't work) and chrome(works!)
