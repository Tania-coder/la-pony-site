/* =========================================================
   La Pony Bakery — JavaScript
   1) mobile menu  2) price choice  3) quantity counter
   4) cart  5) reveal on scroll
   6) contact form
   One file is used on every page, so each block first checks
   whether the element it needs exists on the current page.
   ========================================================= */

/* Mark that JavaScript is running: the .reveal animation depends on this class.
   If the script fails to load, the blocks simply stay visible. */
document.documentElement.classList.add('js');

/* ---------- 1. Mobile menu ---------- */
const burger = document.getElementById('burger');
const navList = document.getElementById('navList');

if (burger && navList) {
  burger.addEventListener('click', () => {
    navList.classList.toggle('is-open');   // the is-open class is described in the CSS
  });
}

/* ---------- 2. Price choice (Dozen / Half dozen) ---------- */
document.querySelectorAll('.option').forEach((option) => {
  const prices = option.querySelectorAll('.price');

  prices.forEach((price) => {
    price.addEventListener('click', () => {
      // clear the highlight from every price inside this option
      prices.forEach((p) => p.classList.remove('is-selected'));
      price.classList.add('is-selected');

      // clear the other options in the same card:
      // only one option can be selected at a time
      const card = option.closest('.menu-card');
      card.querySelectorAll('.option').forEach((other) => {
        if (other !== option) {
          other.querySelectorAll('.price').forEach((p) => p.classList.remove('is-selected'));
        }
      });

      updateCardTotal(card);
    });
  });
});

/* ---------- 3. Quantity counter ---------- */
document.querySelectorAll('.qty').forEach((qty) => {
  const value = qty.querySelector('.qty__value');

  qty.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      const step = Number(button.dataset.step);           // -1 or +1
      let next = Number(value.textContent) + step;
      if (next < 1) next = 1;                             // never go below one
      if (next > 20) next = 20;
      value.textContent = next;

      updateCardTotal(qty.closest('.menu-card'));
    });
  });
});

/* Recalculate the total in the card button: price x quantity */
function updateCardTotal(card) {
  if (!card) return;

  const selected = card.querySelector('.price.is-selected');
  const qty = Number(card.querySelector('.qty__value').textContent);
  const total = card.querySelector('.js-total');

  if (selected && total) {
    total.textContent = Number(selected.dataset.price) * qty;
  }
}

/* ---------- 4. Cart ---------- */
let cartItems = 0;
const cartCount = document.getElementById('cartCount');

document.querySelectorAll('.js-add').forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.menu-card');
    const qty = Number(card.querySelector('.qty__value').textContent);

    cartItems += qty;
    if (cartCount) cartCount.textContent = cartItems;

    // a short confirmation instead of a real checkout
    const original = button.innerHTML;
    button.innerHTML = 'Added ✓';
    setTimeout(() => { button.innerHTML = original; }, 1200);
  });
});

/* ---------- 5. Reveal blocks on scroll ---------- */
const revealItems = document.querySelectorAll('.reveal');

if (revealItems.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);   // animate only once
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach((item) => observer.observe(item));
}

/* ---------- 6. Contact form ---------- */
const form = document.getElementById('contactForm');

if (form) {
  const status = document.getElementById('formStatus');

  form.addEventListener('submit', (event) => {
    event.preventDefault();       // do not reload the page
    let isValid = true;

    // check the required fields
    form.querySelectorAll('[required]').forEach((input) => {
      const field = input.closest('.field');
      const error = field.querySelector('.error');
      let message = '';

      if (!input.value.trim()) {
        message = 'Please fill in this field';
      } else if (input.type === 'email' && !input.value.includes('@')) {
        message = 'Please enter a valid email';
      }

      error.textContent = message;
      field.classList.toggle('has-error', Boolean(message));
      if (message) isValid = false;
    });

    if (isValid) {
      status.textContent = 'Thank you! We will reply within a day.';
      form.reset();
    } else {
      status.textContent = '';
    }
  });
}
