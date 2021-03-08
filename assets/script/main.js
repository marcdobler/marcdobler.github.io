let howOldIAm = {
  inYears: function (date) {
    let birthdate = new Date(date);
    let now = new Date();

    var howoldyouare = now.getFullYear() - birthdate.getFullYear();
    return document.write(howoldyouare);
  },
};

window.onload = function () {
  var script = document.createElement('script');
  var firstScript = document.getElementsByTagName('script')[0];
  script.async = true;
  script.src = '{{'sw-register.js'|relative_url}}?v=' + Date.now();
  firstScript.parentNode.insertBefore(script, firstScript);
};
