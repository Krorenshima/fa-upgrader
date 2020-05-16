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
    return s;
  }
  body = window.document.body; head = window.document.head;

  if (href.includes('furaffinity')) { // to prevent unesscessary includes
    body.appendChild(azue('link', 'style'));
    body.appendChild(azue('script', 'pen'));
    setTimeout(() => {body.appendChild(azue('script', 'addons'))}, 500);
    setTimeout(() => {
      body.appendChild(azue('script', 'siteessent'));
      body.appendChild(azue('script', 'events.min'));
      switch (true) {
        // case href.includes('msg/others/'):
        //   body.appendChild(azue('script', 'notif-sorter'));
        // break;

        // case href.includes('search'):
        //   body.appendChild(azue('script', 'filter'));
        // break;

        // case href.includes('controls/journal'):
        //   body.appendChild(azue('script', 'journals'));
        // break;

        default:
          console.log('no scripts to inject');
          // a default
      }
    }, 1000)
  }
}());
