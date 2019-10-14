let href = window.location.href;

pen("<script>").attr("src", chrome.runtime.getURL("js/pen.js")).appendTo(pBody);
pen("<script>").attr("src", chrome.runtime.getURL("js/addons.js")).appendTo(pBody);

switch (true) {
  case href.includes('msg/others/'):
    pen("<script>").attr("src", chrome.runtime.getURL('js/notif-sorter.js'))
    .appendTo(pBody);
  break;

  default:
    console.log('no scripts to inject');
   // a default
}
