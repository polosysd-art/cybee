function addItem() {
  const item = document.createElement('div');
  item.classList.add('item');
  item.innerHTML = `
    <input type="text" placeholder="Item Description" class="desc" required />
    <input type="number" placeholder="Qty" class="qty" required />
    <input type="number" placeholder="Price" class="price" required />
  `;
  document.getElementById('items').appendChild(item);
}

document.getElementById('invoiceForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const clientName = document.getElementById('clientName').value;
  const invoiceNumber = document.getElementById('invoiceNumber').value;
  const items = Array.from(document.querySelectorAll('.item'));

 
