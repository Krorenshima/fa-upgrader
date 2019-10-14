// sorts the notifications found in that side panel
// known bug, trying to fix

(function () {
  let results, domain, msgs, stat, board, preview, overanything;
  results = pen.$$('div[id^="messages-"]', !0);
  domain = "https://www.furaffinity.net";
  msgs = new Map();
  images = new Map();
  overanything = !1;

  board = pen('<div class="faup-fave-board">');
  board.show = !1;
  board._title = board.span({class: 'title', returnEl: !0});
  board._list = board.ul({class: 'list', returnEl: !0});
  board._list.on('mouseover', (e) => {
    let trg = e.target.nodeName.toLowerCase();
    if (trg === 'ul') {return}
    trg = pen(e.target);
    if (trg.tag === 'li') {trg = trg.children[0]}
    if (!images.has(pen.cc(trg.text))) {
      pen.ajax({
        url: domain+trg.attrs.href,
        type: 'GET',
        load (ef, e) {
          let m = pen((new DOMParser()).parseFromString(ef, 'text/html')).$('a.button.download-logged-in[href]', !0).attrs.href;
          images.set(pen.cc(trg.text), m);
        },
        progress () {}
      });
    }
    preview._img.attr('src', images.get(pen.cc(trg.text)));
    overanything = !0;
    if (overanything && !preview.hasClass('faup-show')) {preview.toggle('faup-show')}
  }).on('mouseout', (e) => {
    overanything = !1
    if (!overanything && preview.hasClass('faup-show')) {preview.toggle('faup-show')}
  });
  board.appendTo(pBody);
  board._x = board.span({class: 'close', returnEl: !0});
  board._x.html('X').on('mouseup', () => {
    if (board.show) {
      board.show = !1;
      board.toggle('faup-show');
    }
  });
  board._selal = board.button({class: 'faup-select-all', returnEl: !0});
  board._selal.html('Select all').on('mouseup', (e) => {
    board._list.children.forEach(child => child.el.click())
  });

  preview = pen('<div class="faup-preview-source" align="center">');
  preview._img = preview.create('<img class="faup-preview">', 'child');
  preview.appendTo(pBody);
  for (let i = 0, len = results.length, res; i < len; i++) {
    res = results[i];
    let contact, results2, msid;
    contact = res.$('.message-stream', !0);
    contact.$$('input[type="checkbox"]', !0).forEach(el => {el.css('display', 'none')});
    results2 = contact.children;
    for (let j = 0, len2 = results2.length, res2; j < len2; j++) {
      res2 = results2[j];
      msid = res.attrs.id;
      if (msid.includes('watches')) {continue}
      let user, ar, entity = res.attrs.id;
      if (res2.$('a', !0) != null) {
        ar = res2.$('a', !0);
        user = ar.text;
        if (msid.includes('favorites')) {ar.toggle('faup-profile')}
      }
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

      wok = msid.includes('favorites') ? 'count' : msid.includes('shouts') ? 'shoutCount' : msid.includes('comments') ? 'commentCount' : '';
      muser[wok]++;
      if (msid.includes('favorites')) {
        let elms = [];
        elms[3] = res2.children[2].children[0].remove(!0);
        res2.children[2].remove(!0);
        elms[2] = pen('<span class="ffavorites">').html(' favorited ').append(elms[3].attr('class', 'faup-fav'));
        elms[2].on('mouseover', (e) => {
          pen.ajax({
            url: domain+elms[2].children[0].attrs.href,
            type: 'GET',
            load (ef, e) {
              let m = pen((new DOMParser()).parseFromString(ef, 'text/html')).$('a.button.download-logged-in[href]', !0).attrs.href;
              images.set(pen.cc(elms[2].children[0].text), m);
            },
            progress () {},
          });
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
            if (oi === 0) {
              oi++;
              return
            }
            pen(v.parent).parent.click();
            oi++;
          });
        }
      });
      if (muser[wok] === 1) {
        muser.first = res2;
        stat = pen.ajax({
          type: 'GET',
          url: domain+ar.attrs.href,
          load(ef, e) {
            muser.pfp = 'https:'+pen((new DOMParser()).parseFromString(ef, 'text/html')).$('img.user-nav-avatar', !0).attrs.src;
            switch (true) {
              case msid.includes('favorites'):
                let weh, e;
                weh = res2.$('a[href^="/view/', !0);
                e = ar.children[0].remove(!0);
                res2.toggle('showing');
                ar.create('<img>', 'child').attr({
                  src: muser.pfp,
                  title: muser.name
                });
                ar.append(e);
              break;

              case msid.includes('shouts'):
                if (res2.text.includes('left a shout')) {muser.onProfile++; return}
                // ar.create('<img>', 'child').attr('src', muser.pfp);
              break;

              case msid.includes('comments'):
                // ar.create('<img>', 'child').attr('src', muser.pfp);
              break;
            }
          },
          progress () {},
          staerr (ef, e) {muser.pfp = pen("<span>").html(user)}
        });
      } else {res2.css('display', 'none')}
    }
  }
  msgs.forEach(user => {
    if (user.faves.size > 1) {
      let $el = user.first.$('span > a', !0);
      $el.html(`${user.faves.size} pics`);
      user.first.on('contextmenu', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!pen.empty(board._list.children)) {board._list.remove('all')}
        board._title.html('faves from '+user.name);
        user.faves.forEach((v, k) => {
          let li, parent;
          li = board._list.create('<li class="faup-item">', 'child');
          parent = pen(pen(v.parent).parent);
          if (parent.hasClass('selected')) {
            li.toggle('faup-selected');
          }
          // li.attr('data-selector', v.selector);
          li.on('click', (e) => {
            li.toggle('faup-selected');
            pen(pen(v.parent).parent).el.click();
          });
          li.create('<a>', 'child').attr({href: v.attrs.href, title: k}).html(k);
        });
        board.show = !0;
        if (board.show) {board.toggle('faup-show')}
      });
    }
  });
}())
