const prices = {
  "TROLL MODZ": {"1 Hour":20,"3 Hours":50,"6 Hours":70,"12 Hours":85,"1 Day":null,"3 Days":180,"7 Days":380},
  "PRIME HOOK APK MOD": {"1 Hour":null,"3 Hours":null,"6 Hours":null,"12 Hours":null,"1 Day":70,"3 Days":140,"7 Days":280},
  "BALA MOD XYZ": {"1 Hour":25,"3 Hours":60,"6 Hours":95,"12 Hours":145,"1 Day":290,"3 Days":null,"7 Days":null}
};

const product = document.getElementById("product");
const plan = document.getElementById("plan");
const summaryProduct = document.getElementById("summaryProduct");
const summaryPlan = document.getElementById("summaryPlan");
const summaryPrice = document.getElementById("summaryPrice");

function refreshPlans(){
  const data = prices[product.value];
  const available = Object.entries(data).filter(([,v]) => v !== null);
  plan.innerHTML = available.map(([name,price]) => `<option value="${name}">${name} — ₹${price}</option>`).join("");
  refreshSummary();
}
function refreshSummary(){
  const value = prices[product.value]?.[plan.value];
  summaryProduct.textContent = product.value;
  summaryPlan.textContent = plan.value || "-";
  summaryPrice.textContent = value == null ? "—" : `₹${value}`;
}
product.addEventListener("change", refreshPlans);
plan.addEventListener("change", refreshSummary);

document.querySelectorAll("[data-product]").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    product.value = btn.dataset.product;
    refreshPlans();
    document.getElementById("order").scrollIntoView({behavior:"smooth"});
  });
});

document.getElementById("orderForm").addEventListener("submit", e=>{
  e.preventDefault();
  const id = "SXM-" + Math.floor(100000 + Math.random()*900000);
  alert(`Demo order created: ${id}\n${product.value} • ${plan.value}\nAmount: ${summaryPrice.textContent}`);
});

document.getElementById("statusBtn").addEventListener("click", ()=>{
  const id = document.getElementById("statusId").value.trim();
  const result = document.getElementById("statusResult");
  result.innerHTML = id
    ? `<div class="notice">Demo status for <b>${id}</b>: Order received. Connect this page to your bot/database for live status.</div>`
    : "Please enter an order ID.";
});

refreshPlans();
