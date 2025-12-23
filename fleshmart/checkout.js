const BTC_ADDRESS = 'bc1q9d3w8k2m4v5r0c8x7t9l6e2yqk4m8n0s';

function loadCart() {
  try {
    return JSON.parse(sessionStorage.getItem('FM_CART')) || [];
  } catch {
    return [];
  }
}

function renderSummary() {
  const cart = loadCart();
  let total = 0;

  const rows = cart.map(it => {
    total += parseFloat(it.btc);
    return `<p>${it.id} — ${it.btc} BTC</p>`;
  }).join('');

  document.getElementById('checkoutStage').innerHTML = `
    <h2>Order summary</h2>
    ${rows || '<p>No items found.</p>'}
    <p><strong>Total:</strong> ${total.toFixed(3)} BTC</p>

    <h2>Payment</h2>
    <p>Send exact amount to:</p>
    <p style="font-family:monospace;">${BTC_ADDRESS}</p>

    <button id="payBtn">Confirm payment</button>

    <p class="muted" style="margin-top:12px;">
      Payments are monitored manually.
    </p>
  `;

  document.getElementById('payBtn').onclick = renderProcessing;
}

function renderProcessing() {
  document.getElementById('checkoutStage').innerHTML = `
    <h2>Processing</h2>
    <p>Awaiting confirmation.</p>
    <p class="muted">Do not refresh.</p>
  `;

  setTimeout(renderFulfilment, 1400);
}

function renderFulfilment() {
  const orderId = 'FM-' + Math.random().toString(36).substring(2,8).toUpperCase();

  sessionStorage.removeItem('FM_CART');

  document.getElementById('checkoutStage').innerHTML = `
    <h2>Order accepted</h2>

    <p><strong>Order reference:</strong> ${orderId}</p>

    <h2>Fulfilment</h2>
    <p>
      Collection is arranged via external partner.
    </p>

    <p>
      Locate <strong>Spitalfield Meats</strong> on Findr.
    </p>

    <p>
      Submit the order reference and await confirmation.
    </p>

    <p class="muted">
      Do not attend without confirmation.
    </p>
  `;
}

document.addEventListener('DOMContentLoaded', renderSummary);
