(function () {
  if (this['pen'] == null) {location.reload(); return}
  if (!pen.define.isDefined('ul')) {pen.define({}, 'ul')}
  let jours, board;
  pen.$('.sidebar', !0).css('display', 'none');
  jours = pen.$('#journals-list', !0)
  jours = jours.remove(!0).children;
  board = pen('<div class="faup-jour">');
  board
  .div({
    class: 'edit-remo', name: 'editRom',
    init () {
      this.button({text: 'remove'})
      this.button({text: 'edit'})
      return this;
    }
  })
  .ul({
    class: 'faup-jour-list', name: 'list',
    init () {
      this.on('mouseover', (e) => {
        if (e.target.nodeName !== 'LI') {return}
        console.log(e.target);
      });
      return this;
    }
  })
  pBody.append(board);
  console.log(jours[0].children[1].children[1].el);
  jours.forEach(jour => {
    let li = board.list.create('<li>', 'child'),
    jouch = jour.children[0];
    li.attr('data-jid', jouch.attrs.href.split('/')[2]);
    li.a({href: jouch.attrs.href,text: jouch.text});
  });
}());
