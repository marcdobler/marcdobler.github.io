---
layout: null
---

let howOldIAm = {
  inYears: function (date) {
    // Get date now 
    let now = Date.now();
    // Get date birth
    let birthdate = new Date(date).getTime();

    // Make diff between date
    let diff = now - birthdate;

    // define as a date
    let age = new Date(diff);
    
    // Show only years diff
    var howoldyouare = Math.abs(age.getUTCFullYear() - 1970);

    // return write value
    return document.write(howoldyouare);
  },
};

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', function() {
//     navigator.serviceWorker.register('{{'sw-register.js'|relative_url}}');
//   });
// }
