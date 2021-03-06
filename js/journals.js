(function () {
  if (this['p'] == null) {location.reload(); return}
  if (!p.define.isDefined('ul')) {p.define({}, 'ul')}
  let jours, board, jids;
  p.$('.sidebar', !0).css('display', 'none');
  jids = new Map();
  jours = p.$('#journals-list', !0)
  jours = jours.remove(!0).children;
  board = p('<div class="faup-jour">');
  board.div({
    class: 'edit-remo', name: 'editRom',
    init () {
      this.button({text: 'remove', name: 'rmBtn'}).button({text: 'edit', name: 'edtBtn'})
      return this;
    }
  }).ul({
    class: 'faup-jour-list', name: 'list',
    init () {
      this.on('mouseover', (e) => {
        if (e.target.nodeName !== 'LI') {return}
        let tg = p(e.target);
        if (jids.has(tg.data.jid)) {
          console.log(jids.get(tg.data.jid));
        }
      });
      return this;
    }
  })
  p.body.append(board);
  jours.forEach(jour => {
    let li, jouch, jid, key;
    li = board.list.create('<li>', 'child');
    jouch = jour.children[0];

    jid = jouch.attr('href').split('/')[2];
    key = jour.children[5].children[1];
    key = key.attrs.onclick.split('/').slice(-1).pop().replace(/key|=|\?|'|\)/gi, '');
    jids.set(jid, {jid: jid, key: key});
    li.attr('data-jid', jid);
    li.a({href: jouch.attrs.href,text: jouch.text});
  });
  jours = null;
}());
