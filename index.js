//입력창 내용 -> 리스트아이템 추가
// 버튼 클릭시, enter키
// delete 버튼 클릭시 -> 리스트 아이템 삭제
// item local storage에 저장하기

const items = document.querySelector('.items');
const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('.footer__button');

function createItem(newItem) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item__row');

  const item = document.createElement('div');
  item.setAttribute('class', 'item');

  const span = document.createElement('span');
  span.setAttribute('class', 'item__name');
  span.innerText = newItem;

  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('class', 'item__delete');
  deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  deleteBtn.addEventListener('click', () => items.removeChild(itemRow));

  const itemDividor = document.createElement('div');
  itemDividor.setAttribute('class', 'item__dividor');

  item.appendChild(span);
  item.appendChild(deleteBtn);
  itemRow.appendChild(item);
  itemRow.appendChild(itemDividor);
  return itemRow;
}

function onAdd() {
  const newItem = input.value;
  if (newItem === '') {
    input.focus();
    return;
  }
  const item = createItem(newItem);
  items.appendChild(item);
  item.scrollIntoView({ block: 'center' });
  input.value = '';
  input.focus();
}

addBtn.addEventListener('click', onAdd);

input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    onAdd();
  }
});
