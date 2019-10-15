let counters, update, updater;
update = localStorage['update'] || 5000;
counters = {
  update (time) {
    localStorage['update'] = time;
    // pen.ajax({
    //   url: 'https://www.furaffinity.net/controls/messages/',
    //   load (ef, e) {
    //     let msgs, fina = 0;
    //     msgs = pen((new DOMParser()).parseFromString(ef, 'text/html')).$$('a[href*="/msg"]', !0);
    //     msgs = msgs.filter(msg => {if ((/[0-9] /gi).test(msg.text)) {return msg}});
    //     msgs.map((msg) => {return +msg.text.replace(/[a-zA-Z ]/gi, '')})
    //     .forEach(msg => {fina += msg});
    //     chrome.browserAction.setBadgeText({'text': ""+fina});
    //   },
    //   progress () {}
    // })
  },
  set (count) {
    chrome.browserAction.setBadgeText({'text':count});
    clearInterval(updater);
    updater = setInterval(counter.update, +update);
  }
}

chrome.extension.onRequest.addListener((request, sender, sendResponse) => {
  switch (request.message) {
    case 'setCount':
      console.log('request recieved');
      counters.set(request.count);
    break;
    case 'setbadge':
      console.log('request recieved');
      chrome.browserAction.setBadgeText({'text': request.count});
    break;
    case 'settingChanged':
      clearInterval(updater);
      updater = setInterval(counters.update, request.update);
    break;
  }
});

counters.update();
updater = setInterval(counters.update, update);
