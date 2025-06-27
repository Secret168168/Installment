function recalculateAll() {
  const price = parseFloat(document.getElementById("priceInput").value) || 0;
  const rows = document.querySelectorAll("#creditTable tr");

  rows.forEach(row => {
    const cells = row.querySelectorAll("td");
    const interest = parseFloat(cells[1].innerText) || 0;
    const months = parseInt(cells[2].innerText) || 1;

    const interestRate = interest / 100;
    const total = price + (price * interestRate * months);
    const perMonth = total / months;

    cells[3].innerText = isFinite(perMonth) ? perMonth.toFixed(2) : '-';
  });
}

function addRow() {
  const table = document.getElementById("creditTable");
  const row = document.createElement("tr");

  row.innerHTML = `
    <td contenteditable="true" data-label="บัตรเครดิต" oninput="recalculateAll()">ชื่อบัตรใหม่</td>
    <td contenteditable="true" data-label="ดอกเบี้ย (%)" oninput="recalculateAll()">0</td>
    <td contenteditable="true" data-label="จำนวนเดือน" oninput="recalculateAll()">0</td>
    <td class="result" data-label="ผ่อน/เดือน (บาท)">-</td>
    <td data-label="ลบ"><button onclick="deleteRow(this)">🗑</button></td>
  `;

  table.appendChild(row);
  recalculateAll();
}

function deleteRow(button) {
  const row = button.closest("tr");
  row.remove();
  recalculateAll();
}
