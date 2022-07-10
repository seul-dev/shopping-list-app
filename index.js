const items = document.querySelector('.items');
const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('.footer__button');

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
  shoppingItems = shoppingItems.filter(
    (item) => item.id !== parseInt(itemRowId)
  );
  saveShoppingItems();
}

function paintItem(newItem) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item__row');
  itemRow.id = newItem.id;

  const item = document.createElement('div');
  item.setAttribute('class', 'item');

  const span = document.createElement('span');
  span.setAttribute('class', 'item__name');
  span.innerText = newItem.text;

  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('class', 'item__delete');
  deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  deleteBtn.addEventListener('click', () => {
    items.removeChild(itemRow);
    deleteItem(itemRow.id);
  });

  const itemDividor = document.createElement('div');
  itemDividor.setAttribute('class', 'item__dividor');

  item.appendChild(span);
  item.appendChild(deleteBtn);
  itemRow.appendChild(item);
  itemRow.appendChild(itemDividor);
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

addBtn.addEventListener('click', onAdd);

input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    onAdd();
  }
});
