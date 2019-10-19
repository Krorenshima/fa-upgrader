// notifies the user about their notifications on fa in real time
let out = pen('<ul class="out">');
wrapper.append(out);
wrapper.create('<p>', 'child').html('warning: buggy, may not display notifs correctly')

setInterval(() => {
  pen.ajax({
    url: 'https://www.furaffinity.net/controls/messages/',
    load (ef, e) {
      let msgs, fina;
      fina = 0;
      msgs = pen((new DOMParser()).parseFromString(ef, 'text/html')).$$('a[href*="/msg"]', !0);
      msgs = msgs.filter(msg => {
        if ((/[0-9] /gi).test(msg.text)) {
          return msg;
        }
      });

      msgs.map((msg) => {return +msg.text.replace(/[a-zA-Z ]/gi, '')})
      .forEach(msg => {fina += msg});
      chrome.browserAction.setBadgeText({'text': ""+fina})
      if (!pen.empty(out.children)) {out.remove('all')}
      msgs.forEach(msg => {
        out.create('<li>', 'child').append(msg)
      });
    },
    progress () {}
  })
}, +localStorage['update'] || 5000);
