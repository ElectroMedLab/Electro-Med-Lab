// Electro-Medicine Lab — shared interactions

document.addEventListener("DOMContentLoaded", () => {
  // mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const mobile = document.querySelector(".nav-mobile");
  if (toggle && mobile) {
    toggle.addEventListener("click", () => {
      const open = mobile.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "Close" : "Menu";
    });
    mobile.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        mobile.classList.remove("open");
        toggle.textContent = "Menu";
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  // footer year
  document.querySelectorAll("[data-current-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // sub tabs (research.html, team.html)
  document.querySelectorAll(".tabs").forEach((tabGroup) => {
    const group = tabGroup.dataset.group;
    const buttons = tabGroup.querySelectorAll(".tab-btn");
    const panels = document.querySelectorAll(`.tab-panel[data-group="${group}"]`);
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("active"));
        panels.forEach((p) => p.classList.remove("active"));
        btn.classList.add("active");
        const target = document.querySelector(`.tab-panel[data-group="${group}"][data-tab="${btn.dataset.tab}"]`);
        if (target) target.classList.add("active");
      });
    });
  });

  // publications year filter (publications.html) — simple dropdown
  const yearSelect = document.getElementById("pub-year-select");
  if (yearSelect) {
    yearSelect.addEventListener("change", () => {
      const year = yearSelect.value;
      let visible = 0;
      document.querySelectorAll("#pub-list .pub-item").forEach((item) => {
        const match = year === "all" || item.dataset.year === year;
        item.style.display = match ? "" : "none";
        if (match) visible++;
      });
      const countEl = document.getElementById("pub-count");
      if (countEl) countEl.textContent = visible + (visible === 1 ? " publication" : " publications");
    });
  }
});
