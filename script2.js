// script2.js

function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.getElementById('cart-items');
    const totalElem = document.getElementById('cart-total');
  
    container.innerHTML = '';
  
    if (cart.length === 0) {
        container.innerHTML = `
          <div class="empty-cart">
            <img src="https://t4.ftcdn.net/jpg/02/98/04/43/360_F_298044303_IDpbpQsUIhkMQJp2hCM7IlQfm6gamLHu.jpg" alt="Empty Cart" class="empty-cart-img">
            <p class="empty-cart-text">Корзина пустая</p>
            <p class="subtext">Вероятней всего, вы не заказали ещё пиццу. Для того, чтобы заказать пицу, перейдите на главную страницу.</p>
          </div>
        `;
        totalElem.textContent = '';
        return;
      }
      
    // Группируем товары по названию
    const grouped = {};
    cart.forEach(item => {
      if (!grouped[item.name]) {
        // Если возможно, можно добавить и ссылку на изображение (если передаёте ее с первого сайта)
        grouped[item.name] = { ...item, quantity: 1 };
      } else {
        grouped[item.name].quantity++;
      }
    });
  
    let total = 0;
    for (const key in grouped) {
      const item = grouped[key];
  
      // Создаем карточку товара с дополнительной информацией: количество
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <div class="item-info">
          <!-- Добавляем изображение, если оно есть -->
          ${item.image ? `<img src="${item.image}" alt="${item.name}" class="item-img">` : ''}
          <div class="item-details">
            <h3>${item.name}</h3>
            <!-- Отображаем количество товара -->
            <p class="quantity">Количество: ${item.quantity}</p>
          </div>
        </div>
        <div class="item-price">${item.price * item.quantity} ₽</div>
      `;
      container.appendChild(div);
      
      total += item.price * item.quantity;
    }      
  
    totalElem.textContent = `Итого: ${total} ₽`;
  }
  
  function clearCart() {
    localStorage.removeItem('cart');
    loadCart();
  }
  
  function goBack() {
    window.location.href = 'index.html';
  }
  
  loadCart();
  