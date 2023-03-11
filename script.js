const items = document.querySelectorAll('.item')
const columns = document.querySelectorAll('.column')

items.forEach(item => {
    item.addEventListener('dragstart', dragStart)
    item.addEventListener('dragend', dragEnd)
});

columns.forEach(column => {
    column.addEventListener('dragover', dragOver);
    column.addEventListener('dragenter', dragEnter);
    column.addEventListener('dragleave', dragLeave);
    column.addEventListener('drop', dragDrop);
});

function dragStart() {
    console.log('drag started');
    setTimeout(() => this.className = 'invisible', 0)
}
function dragEnd() {
    console.log('drag ended');
}

function dragOver() {
    console.log('drag over');
}
function dragEnter() {
    console.log('drag entered');
}
function dragLeave() {
    console.log('drag left');
}
function dragDrop(event) {
    console.log('drag dropped');
    event.preventDefault(); // add this line to prevent default behavior
}