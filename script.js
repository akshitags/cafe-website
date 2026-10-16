/* Shortcut for document.getElementById */
const $ = (id) => document.getElementById(id);

/* ----- 1. Mobile navigation menu: open and close ----- */
const navToggle = $("navToggle");
const navLinks = $("navLinks");
navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", open);
});

/* ----- 2. Menu cards (only runs on menu.html) ----- */
const grid = $("menuGrid");

if (grid) {
  /* Menu data: add or edit items here */
  const items = [
    { name: "Cappuccino",     desc: "Espresso with warm, foamy milk",   price: 120 },
    { name: "Iced Latte",     desc: "Espresso, cold milk, and ice",     price: 150 },
    { name: "Butter Croissant", desc: "Freshly baked every morning",    price: 220 },
    { name: "Avocado Toast",  desc: "Sourdough, avocado, and chili flakes", price: 280 }
  ];

  /* Load saved items from the browser (so they stay after refresh) */
  let saved = [];
  try { saved = JSON.parse(localStorage.getItem("savedItems")) || []; } catch (e) { saved = []; }

  /* Build one card per menu item */
  items.forEach((item, i) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <span class="num">0${i + 1}</span>
      <h3>${item.name}</h3>
      <p class="desc">${item.desc}</p>
      <div class="row">
        <span class="price">Rs.${item.price}</span>
        <button class="save-btn" data-name="${item.name}">Save</button>
      </div>`;
    grid.appendChild(card);
  });

  /* Show the right state on every button, and update the counter */
  function refresh() {
    document.querySelectorAll(".save-btn").forEach((btn) => {
      const isSaved = saved.includes(btn.dataset.name);
      btn.classList.toggle("saved", isSaved);
      btn.textContent = isSaved ? "Saved ✓" : "Save";
    });
    $("savedCount").textContent = saved.length;
    try { localStorage.setItem("savedItems", JSON.stringify(saved)); } catch (e) {}
  }

  /* One click listener for all Save buttons: click again to un-save */
  grid.addEventListener("click", (e) => {
    const btn = e.target.closest(".save-btn");
    if (!btn) return;
    const name = btn.dataset.name;
    saved = saved.includes(name) ? saved.filter((n) => n !== name) : [...saved, name];
    refresh();
  });

  refresh();
}