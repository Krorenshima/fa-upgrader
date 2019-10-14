// sorts the notifications found in that side panel
// known bug, trying to fix

switch (true) {
  case location.href.includes('/msg/others'):
    let results, domain = "https://www.furaffinity.net", msgs = new Map(),
    muser, stat;
    results = pen.$$('div[id^="messages-"]', !0);
    for (let i = 0, len = results.length, res; i < len; i++) {
      res = results[i];
      let contact, results2, msid;
      contact = res.$('.message-stream', !0);
      contact.$$('input[type="checkbox"]', !0).forEach(el => {el.css('display', 'none')});
      results2 = contact.children;
      for (let j = 0, len2 = results2.length, res2; j < len2; j++) {
        res2 = results2[j];
        res2.on('mouseup', function (e) {res2.toggle('checked')});
        msid = res.attrs.id;
        if (msid.includes('watches')) {continue}
        let user, ar, entity = res.attrs.id;
        if (res2.$('a', !0) != null) {
          ar = res2.$('a', !0);
          user = ar.text;
          if (msid.includes('favorites')) {
            ar.toggle('p-profile');
          }
        }
        if (!msgs.has(user)) {
          msgs.set(user, {
            name: user, count: 0, shoutCount: 0,
            commentCount: 0, faves: new Map(),
            shouts: new Map(), comments: new Map(),
            onProfile: 0
          });
        }
        muser = msgs[user];
        let wok = msid.includes('favorites') ? 'count' : msid.includes('shouts') ? 'shoutCount' : msid.includes('comments') ? 'commentCount' : '';
        muser[wok]++;
        if (muser[wok] === 1) {
          stat = pen.ajax({
            type: 'GET',
            url: domain+ar.attrs.href,
            load(ef, e) {
              muser.pfp = pen((new DOMParser()).parseFromString(ef, 'text/html')).$('img.user-nav-avatar', !0).attr('title', user);
            },
            progress () {},
            staerr (ef, e) {muser.pfp = pen("<span>").html(user)}
          });
        }
      }
    }
    if (stat.readyState === 4) {
      // switch (true) {
      //   case msid.includes('favorites'):
      //     let weh = res2.$('a[href^="/view/', !0);
      //     res2.toggle('showing')
      //     if (muser.count <= 1) {ar.append(muser.pfp.clone(!0))}
      //     muser.faves.set(+weh.attrs.href.split(/\//).slice(-2,-1)[0], {name: weh.text, date: res2.$('span.popup_date', !0).text})
      //     break;

      //   case msid.includes('shouts'):
      //     if (res2.text.includes('left a shout')) {muser.onProfile++; continue}
      //     if (muser.shoutCount <= 1) {ar.append(muser.pfp.clone(!0))}
      //     break;

      //   case msid.includes('comments'):
      //     if (muser.commentCount <= 1) {ar.append(muser.pfp.clone(!0))}
      //     break;
      // }
    }
    break;
}
