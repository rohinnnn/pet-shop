const nav = document.getElementById('nav');
document.getElementById('menuToggle').addEventListener('click', () => nav.classList.toggle('show'));
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('show')));

let cart = [];
const body = document.body;
const panel = document.getElementById('cartPanel');
function renderCart() {
  document.getElementById('cartCount').textContent = cart.reduce((sum, item) => sum + item.qty, 0);
  const items = document.getElementById('cartItems');
  if (!cart.length) {
    items.innerHTML = '<p class="empty-cart">Your bag is waiting for some love. ♡</p>';
  } else {
    items.innerHTML = cart.map((item, index) =>
      `<div class="cart-line"><span>${item.name} × ${item.qty}</span><b>₹${item.price * item.qty}</b><button data-remove="${index}" aria-label="Remove ${item.name}">Remove</button></div>`
    ).join('');
  }
  document.getElementById('cartTotal').textContent = '₹' + cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}
function openCart(){ body.classList.add('cart-open'); }
function closeCart(){ body.classList.remove('cart-open'); }
document.getElementById('cartOpen').addEventListener('click', openCart);
document.getElementById('cartClose').addEventListener('click', closeCart);
document.getElementById('cartBackdrop').addEventListener('click', closeCart);
document.querySelectorAll('.add-btn').forEach(button => button.addEventListener('click', () => {
  const name = button.dataset.name, price = Number(button.dataset.price);
  const existing = cart.find(item => item.name === name);
  if (existing) existing.qty++; else cart.push({name, price, qty: 1});
  renderCart();
  button.textContent = 'Added ✓';
  setTimeout(() => button.textContent = 'Add to bag +', 1000);
}));
document.getElementById('cartItems').addEventListener('click', event => {
  const index = event.target.dataset.remove;
  if (index !== undefined) { cart.splice(Number(index), 1); renderCart(); }
});
document.getElementById('checkout').addEventListener('click', () => {
  if (!cart.length) { alert('Your bag is empty. Add a product first.'); return; }
  const summary = cart.map(item => `${item.name} x ${item.qty} — ₹${item.price * item.qty}`).join('\n');
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  alert(`Demo order summary\n\n${summary}\n\nSubtotal: ₹${total}\n\nConnect a real order or payment service to accept orders.`);
});
document.getElementById('contactForm').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.target);
  const subject = encodeURIComponent('PET SHOP website enquiry');
  const bodyText = encodeURIComponent(`Name: ${data.get('name')}\nContact: ${data.get('contact')}\n\nMessage:\n${data.get('message')}`);
  // Replace the placeholder address with your real shop email.
  window.location.href = `mailto:hello@example.com?subject=${subject}&body=${bodyText}`;
});
document.getElementById('year').textContent = new Date().getFullYear();
renderCart();
