(function () {
  // if (window === window.top) {chrome.extension.sendRequest({})}
  // this stuff at the top just makes it easier on me-
  // cause I hate raw js but its essential sometimes if you don't want to take up resources
  // and why I'm doing "window" everytime, is because I want it to be specific and not conflict
  let href, body, head, azue;
  href = window.location.href;
  azue = (x, y) => {
    let s;
    s = window.document.createElement(x);
    if (x === 'script') {
      s.setAttribute('src', window.chrome.runtime.getURL(`js/${y}.js`));
    }
    if (x === 'link') {
      s.setAttribute('rel', 'stylesheet');
      s.setAttribute('href', window.chrome.runtime.getURL(`styles/${y}.css`));
    }
    body.appendChild(s);
    return azue;
  }
  body = window.document.body; head = window.document.head;

  if (href.includes('furaffinity')) { // to prevent unesscessary includes
    azue('link','style')('script', '/includes/pen-md');
    setTimeout(() => {azue('script', '/includes/addon-md')}, 500);
    setTimeout(() => {
      azue('script', '/includes/events.min')('script', '/includes/Enum')('script', 'siteessent');
      switch (true) {
        case href.includes('msg/others/'):
          azue('script', 'notif-sorter');
        break;

        // case href.includes('search'):
        //   body.appendChild(azue('script', 'filter'));
        // break;

        case href.includes('controls/journal'):
          // azue('script', 'journals');
        break;

        default:
          console.log('no scripts to inject');
          // a default
      }
    }, 1000)
  }
}());
