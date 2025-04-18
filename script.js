let cart = JSON.parse(localStorage.getItem('cart')) || [];

let cartTotal = cart.reduce((sum, item) => sum + item.price, 0);
let cartCount = cart.length;
let allPizzas = [];

const cartPriceElem = document.querySelector('.cart span:first-child');
const cartCountElem = document.querySelector('.cart span:last-child');
const menuContainer = document.querySelector('.pizza-container');

cartPriceElem.textContent = `${cartTotal} ₽`;
cartCountElem.textContent = `🛒${cartCount}`;

function updateCartDisplay() {
  cartPriceElem.textContent = `${cart.reduce((sum, item) => sum + item.price, 0)} ₽`;
  cartCountElem.textContent = `🛒${cart.length}`;
  localStorage.setItem('cart', JSON.stringify(cart));
}

// функция для отрисовки карточек по фильтру
function renderPizzas(pizzas) {
  menuContainer.innerHTML = ''; // очищаем контейнер перед перерисовкой

  const grid = document.createElement('div');
  grid.className = 'pizza-grid';
  menuContainer.appendChild(grid);

  pizzas.forEach(pizza => {
    const card = document.createElement('div');
    card.className = 'pizza-card';

    card.innerHTML = `
      <img src="${pizza.image}" alt="${pizza.name}">
      <h3>${pizza.name}</h3>
      <div class="options">${pizza.options}</div>
      <div class="options">${pizza.sizes}</div>
      <div class="bottom">
        <div class="price">${pizza.price} ₽</div>
        <button class="add-btn">+ Добавить</button>
      </div>
    `;

    const button = card.querySelector('.add-btn');

    button.addEventListener('click', () => {
      // Удаляем все символы, кроме цифр, из строки цены
      const priceNumber = parseInt(pizza.price.replace(/\D/g, ''));
      cart.push({ name: pizza.name, price: priceNumber });
      updateCartDisplay();
    });
    
    grid.appendChild(card);
  });
}

// загружаем JSON и сразу отрисовываем все пиццы
fetch('pizzas.json')
  .then(response => response.json())
  .then(pizzas => {
    allPizzas = pizzas;
    renderPizzas(allPizzas);
  })
  .catch(error => console.error('Ошибка загрузки JSON:', error));

// обработка клика по фильтрам
document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const category = button.textContent;

    if (category === 'Все') {
      renderPizzas(allPizzas);
    } else {
      const filtered = allPizzas.filter(pizza => pizza.category === category);
      renderPizzas(filtered);
    }
  });
});
