---
layout: null
---

let howOldIAm = {
  inYears: function (date) {
    let birthdate = new Date(date);
    let now = new Date();

    var howoldyouare = now.getFullYear() - birthdate.getFullYear();
    return document.write(howoldyouare);
  },
};

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('{{'sw-register.js'|relative_url}}');
  });
}
