switch (true) {
  case window.location.url.includes('msg/others/'):
    pen("<script>").attr("src", chrome.runtime.getURL('js/notif-sorter.js'))
    .appendTo(pBody);
  break;

  default:
   // a default
}
