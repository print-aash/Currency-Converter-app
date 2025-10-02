// js File \\

const dropSelect = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".btn-exe");
let amnt = document.querySelector("#input");
const crrform = document.querySelector(".form select");
const crrto = document.querySelector(".to select");
const liveRate = document.querySelector("#rate-live");

// select option \\
for (let select of dropSelect) {
  for (crrCode in countryList) {
    let newElop = document.createElement("option");
    newElop.innerText = crrCode;
    newElop.value = crrCode;
    if (select.name === "selt-frm" && crrCode === "USD") {
      newElop.selected = "selected";
    } else if (select.name === "selt-to" && crrCode === "INR") {
      newElop.selected = "selected";
    }
    select.append(newElop);
  }
  select.addEventListener("change", (evt) => {
    flagUpdate(evt.target);
  });
}

//Flag Logic \\
const flagUpdate = (el) => {
  //   console.log(el);
  let crrCode = el.value;
  console.log(crrCode);
  let countryCode = countryList[crrCode];
  console.log(countryCode);
  let newFlagSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
  let img = el.parentElement.querySelector("img");
  img.src = newFlagSrc;
};

//button logic \\
btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let displayAmnt = Number(amnt.value);
  if (displayAmnt === "" || displayAmnt < 1) {
    displayAmnt = 1;
    amnt.value = 1;
  }
  console.log("From=", crrform.value, "To=", crrto.value); //Just For Checking

  const fromCurrency = crrform.value;
  const toCurrency = crrto.value;
  const BASE_URL = `https://api.frankfurter.app/latest?from=${fromCurrency}&to=${toCurrency}`;
  let responce = await fetch(BASE_URL);
  let data = await responce.json();
  let rate = data.rates[crrto.value];
  let finalAmnt = displayAmnt * rate;
  liveRate.innerText = `${displayAmnt} ${crrform.value} = ${finalAmnt} ${crrto.value}`;
});
