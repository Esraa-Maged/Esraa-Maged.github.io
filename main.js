// أزرار تسهيل الوصول: تكبير الخط والتباين الأعلى
// الاختيارات بتتحفظ في المتصفح (localStorage) من غير أي خوادم أو تتبع

(function () {
  "use strict";

  var html = document.documentElement;
  var status = document.getElementById("a11y-status");
  var fontBtn = document.getElementById("font-btn");
  var contrastBtn = document.getElementById("contrast-btn");

  var SIZES = [100, 125, 150];
  var FONT_KEY = "esraa-pref-font";
  var CONTRAST_KEY = "esraa-pref-contrast";

  function announce(message) {
    if (status) {
      status.textContent = "";
      // إعادة الكتابة عشان قارئ الشاشة يقرأ الرسالة الجديدة حتى لو نفس النص
      window.setTimeout(function () {
        status.textContent = message;
      }, 50);
    }
  }

  function currentSizeIndex() {
    var stored = window.localStorage.getItem(FONT_KEY);
    var n = parseInt(stored, 10);
    var i = SIZES.indexOf(n);
    return i === -1 ? 0 : i;
  }

  function applySize(index) {
    var size = SIZES[index];
    html.style.fontSize = size + "%";
    window.localStorage.setItem(FONT_KEY, String(size));
    fontBtn.setAttribute("aria-pressed", index > 0 ? "true" : "false");
    fontBtn.textContent = index === 0 ? "تكبير الخط" : "حجم الخط " + size + "٪";
  }

  fontBtn.addEventListener("click", function () {
    var next = (currentSizeIndex() + 1) % SIZES.length;
    applySize(next);
    if (next === 0) {
      announce("رجع حجم الخط للطبيعي");
    } else {
      announce("حجم الخط دلوقتي " + SIZES[next] + " في المية");
    }
  });

  function applyContrast(on) {
    html.classList.toggle("hc", on);
    window.localStorage.setItem(CONTRAST_KEY, on ? "on" : "off");
    contrastBtn.setAttribute("aria-pressed", on ? "true" : "false");
    contrastBtn.textContent = on ? "تباين عادي" : "تباين أعلى";
  }

  contrastBtn.addEventListener("click", function () {
    var on = !html.classList.contains("hc");
    applyContrast(on);
    announce(on ? "وضع التباين الأعلى اتفعل" : "رجع التباين العادي");
  });

  // تطبيق الاختيارات المحفوظة عند فتح الصفحة
  applySize(currentSizeIndex());
  applyContrast(window.localStorage.getItem(CONTRAST_KEY) === "on");
})();
