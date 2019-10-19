// makes favoriting, watching and much more, eaiser
(function () {
  let user = pen.$$('a#my-username', !0);
  user.forEach(child => {
    child.text = child.text.replace(/~|\(|\)|my fa /gi, '');
  });

  let stt = pen('<button class="faup-to-top" title="Scroll to top">');
  stt.on('mouseup', (e) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }).css('display', 'none');
  pBody.append(stt);
  pWin.on('scroll', (e) => {
    stt.css('display', (window.scrollY >= 100 ? '' : 'none'))
  });
}())
