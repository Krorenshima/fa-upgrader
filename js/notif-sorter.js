// sorts the notifications found in that side panel
// known bug, trying to fix

(function () {
  if (!pen.define.isDefined('ul')) {pen.define({}, 'ul')}
  if (!pen.define.isDefined('img')) {pen.define({}, 'img')}

  let results, domain, msgs, stat, board,
      preview, overanything, powsen, sbou;
  results = pen.$$('div[id^="messages-"]', !0);
  domain = "https://www.furaffinity.net";

  msgs = new Map(); images = new Map(); overanything = !1;

  powsen = (data) => pen((new DOMParser()).parseFromString(data, 'text/html'));
  sbou = function (m, r2, ar, mu) {
    let e;
    switch (true) {
      case m.includes('favorites'):
        let weh = r2.$('a[href^="/view/', !0),
        e = ar.children[0].remove(!0);
        r2.toggle('showing');
        ar.create('<img>', 'child').attr({src: mu.pfp, title: mu.name});
        ar.append(e);
      break;

      case m.includes('shouts'):
        if (r2.text.includes('left a shout')) {mu.onProfile++; return}
        // dunno the proper html layout to do anything here yet
      break;

      case m.includes('comments'):
        // dunno the proper html layout to do anything here yet
      break;
    }
  }
  board = pen('<div class="faup-fave-board">');
  board.show = !1;
  board.span({
    class: 'title', name: 'listTitle'
  }).ul({
    name: 'faveList',
    init () {
      this.attr({class: 'list'})
      .on('mouseover', (e) => {
        if (e.target.nodeName.toLowerCase() === 'ul') {return}
        let trg = pen(e.target);
        if (trg.tag === 'li') {trg = trg.children[0]}

        if (!images.has(pen.cc(trg.text))) {pen.ajax({url: domain+trg.attrs.href, type: 'GET', load (ef, e) {let m = powsen(ef).$('a.button.download-logged-in[href]', !0).attrs.href; images.set(pen.cc(trg.text), m)}, progress () {}})}

        preview._img.attr('src', images.get(pen.cc(trg.text)));
        overanything = !0;
        if (overanything && !preview.hasClass('faup-show')) {preview.toggle('faup-show')}
      }).on('mouseout', (e) => {
        overanything = !1
        if (!overanything && preview.hasClass('faup-show')) {preview.toggle('faup-show')}
      });
      return this;
    }
  }).span({
    name: 'closeBtn',
    init () {
      this.toggle('faup-close', 'faup-btn').html('X').on('mouseup', () => {if (board.show) {board.show = !1; board.toggle('faup-show')}})
      return this;
    }
  }).button({
    class: 'faup-select-all',
    name: 'selAll',
    init () {
      this.html('Select all').on('mouseup', (e) => {board.faveList.children.forEach(child => child.el.click())})
      return this;
    }
  });

  preview = pen('<div class="faup-preview-source" align="center">');
  preview.img({class: 'faup-preview', name: 'prev'});
  pBody.append(board, preview);
  // console.log(board, preview);
  for (let i = 0, len = results.length, res, contact, results2, msid; i < len; i++) {
    res = results[i];
    contact = res.$('.message-stream', !0);
    contact.$$('input[type="checkbox"]', !0).forEach(el => {el.css('display', 'none')});
    results2 = contact.children;
    for (let j = 0, len2 = results2.length, res2, user, ar, entity; j < len2; j++) {
      res2 = results2[j];
      msid = res.attrs.id;
      if (msid.includes('watches')) {continue}
      entity = res.attrs.id;
      if (res2.$('a', !0) != null) {ar = res2.$('a', !0); user = ar.text; if (msid.includes('favorites')) {ar.toggle('faup-profile')}}
      if (!msgs.has(user)) {
        msgs.set(user, {
          name: user, count: 0, shoutCount: 0,
          commentCount: 0, faves: new Map(),
          shouts: new Map(), comments: new Map(),
          onProfile: 0
        });
      }
      let muser, wok;
      muser = msgs.get(user);
      switch (true) {
        case msid.includes('favorites'): wok = 'count'; break;
        case msid.includes('shouts'): wok = 'shoutCount'; break;
        case msid.includes('comments'): wok = "commentCount"; break;
        default: wok = '';
      }
      muser[wok]++;
      if (msid.includes('favorites')) {
        let elms = [];
        elms[3] = res2.children[2].children[0].remove(!0);
        res2.children[2].remove(!0);
        elms[2] = pen('<span class="ffavorites">').html(' favorited ').append(elms[3].attr('class', 'faup-fav'));
        elms[2].on('mouseover', (e) => {
          pen.ajax({url: domain+elms[2].children[0].attrs.href, type: 'GET', load (ef, e) {let m = powsen(ef).$('a.button.download-logged-in[href]', !0).attrs.href; images.set(pen.cc(elms[2].children[0].text), m)}, progress () {}});

          preview._img.attr('src', images.get(pen.cc(elms[2].children[0].text)));
          overanything = !0;
          if (overanything && !preview.hasClass('faup-show')) {preview.toggle('faup-show')}
        }).on('mouseout', (e) => {
          overanything = !1;
          if (!overanything && preview.hasClass('faup-show')) {preview.toggle('faup-show')}
        });
        elms[3] = pen('<span class="faup-date">').html('on ').append(res2.children[2].remove(!0));
        elms[1] = res2.children[1].remove(!0);
        elms[0] = res2.children[0].remove(!0);
        res2.html('').append(...elms);
        delete elms;
        muser.faves.set(res2.$('span > a', !0).text, res2.$('span > a', !0));
      }
      res2.on('mouseup', (e) => {
        let oi = 0;
        if (muser.faves.size > 1) {
          muser.faves.forEach((v) => {
            if (oi === 0) {oi++; return}
            pen(v.parent).parent.click();
            oi++;
          });
        }
      });
      if (muser[wok] === 1) {
        muser.first = res2;
        stat = pen.ajax({type: 'GET', url: domain+ar.attrs.href, load(ef, e) {muser.pfp = 'https:'+powsen(ef).$('img.user-nav-avatar', !0).attrs.src; sbou(msid, res2, ar, muser)}, progress () {}});
      } else {res2.css('display', 'none')}
    }
  }
  msgs.forEach(user => {
    if (user.faves.size > 1) {
      let $el = user.first.$('span > a', !0);
      $el.html(`${user.faves.size} pics`);
      user.first.on('contextmenu', (e) => {
        e.preventDefault(); e.stopPropagation();
        if (!pen.empty(board.listTitle.children)) {board.listTitle.remove('all')}
        board.listTitle.html('faves from '+user.name);
        user.faves.forEach((v, k) => {
          let li, parent;
          li = board.listTitle.create('<li class="faup-item">', 'child');
          parent = pen(pen(v.parent).parent);
          if (parent.hasClass('selected')) {li.toggle('faup-selected')}
          li.on('click', (e) => {li.toggle('faup-selected'); pen(pen(v.parent).parent).el.click()});
          li.create(`<a href="${v.attrs.href}" title="${k}">`, 'child').html(k);
        });
        board.show = !0;
        if (board.show) {board.toggle('faup-show')}
      });
    }
  });
}())
