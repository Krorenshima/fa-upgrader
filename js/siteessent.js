// makes favoriting, watching and much more, eaiser
(function () {
  if (this['p'] == null) {location.reload(); return}
  let user = p.$$('a#my-username', !0);
  user.forEach(child => {
    child.text = child.text.replace(/~|\(|\)|my fa /gi, '');
  });

  let stt = p('<button class="faup-to-top" title="Scroll to top">');
  stt.on('mouseup', (e) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }).css('display', 'none');
  p.body.append(stt);
  p.win.on('scroll', (e) => {
    stt.css('display', (window.scrollY >= 100 ? '' : 'none'))
  });
}())
