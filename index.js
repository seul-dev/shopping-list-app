const items = document.querySelector('.items');
const input = document.querySelector('.footer__input');
const form = document.querySelector('.footer__form');

const Items = 'items';
let shoppingItems = [];

const savedItems = localStorage.getItem(Items);
if (savedItems !== null) {
  const parsedItems = JSON.parse(savedItems);
  shoppingItems = parsedItems;
  parsedItems.forEach(paintItem);
}

function saveShoppingItems() {
  localStorage.setItem(Items, JSON.stringify(shoppingItems));
}

function deleteItem(itemRowId) {
  const toBeDeleted = document.querySelector(`.item__row[id="${itemRowId}"]`);
  toBeDeleted.remove();
  shoppingItems = shoppingItems.filter(
    (item) => item.id !== parseInt(itemRowId)
  );
  saveShoppingItems();
}

function paintItem(newItem) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item__row');
  itemRow.id = newItem.id;
  itemRow.innerHTML = `
    <div class="item">
      <span class="item__name">${newItem.text}</span>
      <button class="item__delete">
        <i class="fa-solid fa-trash-can" data-id=${itemRow.id}></i>
      </button>
    </div>
    <div class="item__dividor"></div>
  `;
  items.appendChild(itemRow);
  itemRow.scrollIntoView({ block: 'center' });
}

function onAdd() {
  const newItem = input.value;
  if (newItem === '') {
    input.focus();
    return;
  }
  const newItemObj = { id: Date.now(), text: newItem };
  paintItem(newItemObj);
  shoppingItems.push(newItemObj);
  saveShoppingItems();
  input.value = '';
  input.focus();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  onAdd();
});

items.addEventListener('click', (e) => {
  const id = e.target.dataset.id;
  if (id) {
    deleteItem(id);
  }
});
