// essentials I guess
let icon, header, wrapper;
header = pen('<span class="title">');
header.span({
  init () {
    return this.html('FA').css('color', 'orange');
  }
})
.span({
  class:'vers', name: 'versionNum',
  init () {
    this.html('UP - ').html(chrome.runtime.getManifest().version, {app: !0});
    return this;
  }
});

wrapper = pen('<div class="wrapper" id="wrpr">');

pBody.append(header, wrapper);

pen.ajax({
  url: 'https://www.furaffinity.net/',
  type: 'GET',
  load (ef, e) {
    let img;
    img = pen((new DOMParser()).parseFromString(ef, 'text/html')).$('img.loggedin_user_avatar', !0);
    icon = pen(`<a href="https://www.furaffinity.net/user/${img.attrs.alt}" class="icon" title="go to your page">`);
    icon.create(`<img src="https:${img.attrs.src}">`).appendTo(wrapper);
  },
  progress () {}
})
