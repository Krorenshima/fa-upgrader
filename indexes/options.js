document.title = "FAUP - Furaffinity Upgrader - Options";
let updateTime = pen('<div class="feef">');
updateTime.span({
  text: 'Check for notifications every '
}).input({
  name: 'uptime',
  init() {
    this.attr('type', 'text')
    .on('keyup', (e) => {
      if (e.key === 'Enter') {
        if ((/[a-z\*\+\-\/]/gi).test(this.text)) {return}
        localStorage['update'] = this.text;
      }
    });
    return this;
  }
}).span({
  text: ' seconds'
}).br({}).span({
  name: 'currTime',
  init () {
    setInterval(() => {
      this.html('Current time: '+localStorage['update'])
    }, 5000);
  }
});

wrapper.append(updateTime);
