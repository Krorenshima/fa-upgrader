// essentials I guess
if (pen.$('.vers')) {
  pen.$('.vers',!0).html(chrome.runtime.getManifest().version);
}

let icon = pen('<img>');
pen.ajax({
  url: 'https://www.furaffinity.net/',
  type: 'GET',
  load (ef, e) {
    let img, icon;
    img = pen((new DOMParser()).parseFromString(ef, 'text/html')).$('img.loggedin_user_avatar', !0);
    icon = pen(`<a href="https://www.furaffinity.net/user/${img.attrs.alt}" class="icon" title="go to your page">`);
    icon.create('<img>','child').attr('src', 'https:'+img.attrs.src);
    icon.appendTo(pBody);
  },
  progress () {}
})
