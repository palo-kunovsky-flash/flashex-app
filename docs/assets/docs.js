// The sidebar on narrow screens, and a link mark on headings. No tracking,
// no requests.
(function () {
  var body = document.body;
  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") body.classList.remove("nav-open");
  });
  document.querySelectorAll(".sidebar a").forEach(function (a) {
    a.addEventListener("click", function () { body.classList.remove("nav-open"); });
  });
  document.querySelectorAll(".content h2[id], .content h3[id]").forEach(function (h) {
    var a = document.createElement("a");
    a.className = "anchor";
    a.href = "#" + h.id;
    a.setAttribute("aria-label", "Link to this section");
    a.textContent = "#";
    h.appendChild(a);
  });
})();
