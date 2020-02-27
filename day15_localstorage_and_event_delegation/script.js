
const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];
populateList(items, itemsList);

function addItem(e) {
    e.preventDefault();
    const text = (this.querySelector('[name=item]')).value;
    const item = {
        text,
        done: false
    };
    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
    this.reset();
}

function toggleDone(e) {
    if(!e.target.matches('input')) return; //skip unless it is an input
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
        return `
            <li>
                <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''}/>
                <label for="item${i}">${plate.text}</label>
            </li>
        `;
    }).join('');
}


addItems.addEventListener('submit',addItem);
itemsList.addEventListener('click', toggleDone);