(function () {
  if (this['p'] == null) {location.reload(); return}
  if (!p.define.isDefined('ul')) {p.define({}, 'ul')}
  if (!p.define.isDefined('img')) {p.define({}, 'img')}
  let evr, scs, idom, t, su, se, wh;

  wh = 'https://www.furaffinity.net';
  evr = new window.events(); idom = new Map(); t = new window.Enum();
  t([['cs', 'submission-comments'], ['cj', 'journal-comments'], ['f', 'favorite'], ['s', 'shout'], ['w', 'watch']]);
  scs = p.$$('.section_container', !0);
  su = new Map();
  scs.forEach(sc => {
    sc.css('display', 'none')
    let m, ch;
    m = sc.id().split('-').slice(-2);
    if (m[0] === 'messages') {m.splice(0, 1)}
    m = m.map(s => s[0]).join('');
    ch = sc.children[1].children[1].children;
    ch.forEach(sc1 => {
      let info, sp, nxt;
      sp = sc1.$('span', !0);
      info = {
        username: sc1.children[1].text,
        proflink: wh+sc1.children[1].attr('href'),
        id: sc1.children[0].text,
      }
      if (info.type !== 's') {
        nxt = sc1.children[2]
        info.link = {
          type: m,
          date: [sp.text.replace('on', '').trim(), sp.attr('title')],
          comment: sc1.el.childNodes[2].data.trim(),
          el: sc1,
          name: nxt.text.replace(/['"]/g, '')
        }
        info.link.url = wh
        if (nxt.tag === 'a') {
          info.link.url += nxt.attr('href')
        } else {
          if ((nxt.children.length > 0) && nxt.children[0]['attr'] != null) {
            info.link.url += nxt.children[0].attr('href');
          }
        }
      } else {
        info.el = sc1
      }
      if (!su.has(info.username)) {
        su.set(info.username, {
          faves: [],
          comments: [],
          shouts: [],
          username: info.username,
          link: info.proflink
        })
      }
      switch (!0) {
        case info.link.type === 'f':
          su.get(info.username).faves.push(info.link);
        break;

        case info.link.type === 'cs':
          info.link.comment = info.link.comment === 'replied to' ? 'commented on' : 'replied to';
          su.get(info.username).comments.push(info.link);
        break;
        case info.link.type === 'cj':
          info.link.comment = 'commented on your journal';
          su.get(info.username).comments.push(info.link);
        break;
        case info.link.type === 's':
          info.comment = 'said';
          su.get(info.username).shouts.push(info);
        break;
      }
    });
  });
  let sob, uli;
  sob = p.$('.submission-content', !0);
  uli = p('<ul class="uli">');
  let i = 0;
  su.forEach(s => {
    i++;
    uli.li({
      class: 'p-prev',
      init () {
        this.a({
          class: 'p-link',
          init () {
            this.attr('href', s.link)
            .img({
              class: 'p-profile',
              init () {
                let it = this;
                setTimeout(() => {
                  p.ajax({
                    type: 'GET',
                    url: s.link,
                    load (e, a) {
                      let prof = [].slice.call(((new DOMParser()).parseFromString(e, 'text/html')).links);
                      prof = prof.filter(l => {
                        if ((l.hasAttribute('href') != null) && l.getAttribute('href').includes(s.username.toLowerCase())) {
                          return l;
                        }
                      })[0]
                      if (prof != null) {
                        prof = p(prof).children[0].attr('src');
                        it.attr('src', prof);
                      }
                    },
                    progress () {},
                    error () {
                      it.attr('src', 'chrome-extension://ibjoopfodmnaadlamdijcbjkgojclcjd/icons/no-pfp.gif');
                    },
                    gerror () {
                      it.attr('src', 'chrome-extension://ibjoopfodmnaadlamdijcbjkgojclcjd/icons/no-pfp.gif');
                    }
                  });
                }, 50 * (i + (i + 1)))
                return this;
              }
            })
            .span({
              class: 'p-username',
              text: s.username
            });
            return this;
          }
        })
        if (s.faves.length > 0) {
          this.button({
            class: 'p-btn',
            text: s.faves.length > 1 ? `${s.faves.length} favorites` : s.faves[0].name
          })
        }
        if (s.comments.length > 0) {
          this.button({
            class: 'p-btn',
            text: s.comments.length > 1 ? `${s.comments.length} comments` : s.comments[0].name
          })
        }
        return this;
      }
      // text: s.username + ' f' + s.faves.length + ' c' + s.comments.length
    });
  });
  console.log(su);
  uli.appendTo(sob)
}());
