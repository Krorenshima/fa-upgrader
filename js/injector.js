

(function () {
  window.addEventListener('DOMContentLoaded', () => {
    // this stuff at the top just makes it easier on me-
    // cause I hate raw js but its essential sometimes if you don't want to take up resources
    // and why I'm doing "window" everytime, is because I want it to be specific and not conflict

    let href = window.location.href,
    gurl = (x) => chrome.runtime.getURL(x),
    cel = (x) => window.document.createElement(x),
    body = window.document.body,
    head = window.document.head,
    p; // general insertion variable or GIV

    (function () {
      if (href.includes('furaffinity')) { // to prevent unesscessary includes
        p = cel('script');
        p.setAttribute('src', gurl('js/pen.js'));
        body.appendChild(p);

        p = cel('script');
        p.setAttribute('src', gurl('js/addons.js'));
        body.appendChild(p);

        p = cel('link');
        p.setAttribute('rel', 'stylesheet'); p.setAttribute('href', gurl('style.css'))
        head.appendChild(p);
      }
    }());

    switch (true) {
      case href.includes('msg/others/'):
        p = cel('script');
        p.setAttribute('src', gurl('js/notif-sorter.js'));
        body.appendChild(p);
      break;

      case href.includes('search'):
        p = cel('script');
        p.setAttribute('src', gurl('js/filter.js'));
        body.append(p);
      break;

      default:
        console.log('no scripts to inject');
        // a default
    }
  });
}());
