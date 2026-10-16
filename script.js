// SUBA AGRO PRODUCTS — interactions
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const toast = document.getElementById("toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove("show"), 2800);
}

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "×" : "☰";
});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  });
});

// Filter product cards by category.
const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    productCards.forEach(card => {
      const visible = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !visible);
    });
  });
});

// Product enquiry buttons open WhatsApp with the product name included.
document.querySelectorAll(".product-link").forEach(button => {
  button.addEventListener("click", () => {
    const product = button.dataset.product;
    const message = `வணக்கம் SUBA AGRO PRODUCTS, ${product} பற்றிய விலை மற்றும் விவரங்களைத் தெரிவிக்கவும்.`;
    window.open(`https://wa.me/919655171345?text=${encodeURIComponent(message)}`, "_blank", "noopener");
  });
});

// Contact form validates locally and prepares a WhatsApp enquiry.
document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const product = document.getElementById("productInterest").value;
  const message = document.getElementById("message").value.trim();
  const whatsappText = [
    "வணக்கம் SUBA AGRO PRODUCTS,",
    `பெயர்: ${name}`,
    `தொலைபேசி: ${phone}`,
    `பொருள்: ${product}`,
    message ? `செய்தி: ${message}` : ""
  ].filter(Boolean).join("\n");
  window.open(`https://wa.me/918838350300?text=${encodeURIComponent(whatsappText)}`, "_blank", "noopener");
});

document.getElementById("year").textContent = new Date().getFullYear();
