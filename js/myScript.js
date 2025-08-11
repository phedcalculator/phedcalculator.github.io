// JavaScript Document

const tariffs = {
  'Bilateral': 231,
  'Band A-Non MD': 209.5, 
  'Band A-MD1': 209.5, 
  'Band A-MD2': 209.5, 
  'Band B-Non MD': 68.96,
  'Band B-MD1': 67.18,
  'Band B-MD2': 67.12,
  'Band C-Non MD': 56.38,
  'Band C-MD1': 54.64,
  'Band C-MD2': 54.64,
  'Band D-Non MD': 39.67,
  'Band D-MD1': 55.43,
  'Band D-MD2': 55.43,
  'Band E-Non MD': 39.44, 
  'Band E-MD1': 55.43,
  'Band E-MD2': 55.43
};


//$('.lor__form').hide();

$('.billingKwh__form').hide();
//$('.billingKwh__form').hide();

$('.billing__button').click(function (e) {
   e.preventDefault();
   $(this).addClass('active');
   $('.lor__button').removeClass('active');
   $('.billingKwh__button').removeClass('active');
   $('.billingKW__button').removeClass('active');
   $('.DTRloading__button').removeClass('active');
   $('.fuse__button').removeClass('active');
   $('.billing__form').show();
   $('.billingKW__form').hide();
   $('.lor__form').hide();
   $('.billingKwh__form').hide();
   $('.DTRloading__form').hide();
   $('.fuse__form').hide();

});

$('.lor__button').click(function (e) {
   e.preventDefault();
   $(this).addClass('active');
   $('.billing__button').removeClass('active');
   $('.billingKW__button').removeClass('active');
   $('.billingKwh__button').removeClass('active');
   $('.DTRloading__button').removeClass('active');
   $('.fuse__button').removeClass('active');
   $('.lor__form').show();
   $('.billingKwh__form').hide();
   $('.billingKW__form').hide();
   $('.billing__form').hide();
   //   $('.fuse__form').hide();
   $('.DTRloading__form').hide();
   $('.fuse__form').hide();

});


$('.billingKwh__button').click(function (e) {
   e.preventDefault();
   $(this).addClass('active');
   $('.billing__button').removeClass('active');
   $('.billingKW__button').removeClass('active');
   $('.lor__button').removeClass('active');
   $('.DTRloading__button').removeClass('active');
   $('.fuse__button').removeClass('active');
   $('.billingKwh__form').show();
   $('.lor__form').hide();
   $('.billingKW__form').hide();
   $('.billing__form').hide();
   $('.DTRloading__form').hide();
   $('.fuse__form').hide();
})

$('.DTRloading__button').click(function (e) {
   e.preventDefault();
   $(this).addClass('active');
   $('.billing__button').removeClass('active');
   $('.billingKwh__button').removeClass('active');
   $('.billingKW__button').removeClass('active');
   $('.lor__button').removeClass('active');
   $('.fuse__button').removeClass('active');
   $('.DTRloading__form').show();
   $('.billingKW__form').hide();
   $('.billingKwh__form').hide();
   $('.lor__form').hide();
   $('.billing__form').hide();
   $('.fuse__form').hide();
});

$('.fuse__button').click(function (e) {
   e.preventDefault();
   $(this).addClass('active');
   $('.billing__button').removeClass('active');
   $('.billingKW__button').removeClass('active');
   $('.billingKwh__button').removeClass('active');
   $('.lor__button').removeClass('active');
   $('.DTRloading__button').removeClass('active');
   $('.fuse__form').show();
   $('.billingKwh__form').hide();
   $('.lor__form').hide();
   $('.billingKW__form').hide();
   $('.billing__form').hide();
   $('.DTRloading__form').hide();
});

$('.billingKW__button').click(function (e) {
   e.preventDefault();
   $(this).addClass('active');
   $('.billing__button').removeClass('active');
   $('.billingKwh__button').removeClass('active');
   $('.lor__button').removeClass('active');
   $('.fuse__button').removeClass('active');
   $('.DTRloading__button').removeClass('active');
   $('.billingKW__form').show();
   $('.billingKwh__form').hide();
   $('.lor__form').hide();
   $('.fuse__form').hide();
   $('.billing__form').hide();
   $('.DTRloading__form').hide();


});


//                    BILLING (AMP)

const loadAmps = document.querySelector("#singlePhaseAmps");
const Band = document.querySelector("#selectBand");
const output = document.querySelector("#outputCost");
const outputkWh = document.querySelector("#outputKilowattHr");
const start = document.getElementById("btnStart");
const refresh = document.getElementById("btnRefresh");
const a = document.getElementById("rAmp");
const b = document.getElementById("yAmp");
const c = document.getElementById("bAmp");
const neutral = document.getElementById("nAmp");



function calculate(e) {
  e.preventDefault();
  
  // Calculate the average current if phase values are provided
  let avg = (Number(a.value) + Number(b.value) + Number(c.value) + Number(neutral.value)) / 3;
  
  // Check if all the phase values are provided
  let isAvgProvided = 
   a.value !== "" && b.value !== "" && c.value !== "" && neutral.value !== "" &&
  !isNaN(Number(a.value)) &&
  !isNaN(Number(b.value)) &&
  !isNaN(Number(c.value)) &&
  !isNaN(Number(neutral.value));
  
  // Use 0.415 x root 3 if avg is provided, otherwise use 0.240
  let multiplier = isAvgProvided ? 0.719 : 0.240;
  
  // Get the selected band and category
  let selectedBand = Band.options[Band.selectedIndex].text;
  
  // Calculate total cost based on whether avg or loadAmps.value is used
  let totalCost;
  if (isAvgProvided) {
    totalCost = avg * Number(Band.value) * tariffs[selectedBand] * multiplier * 0.6 * 0.85 * 1.075;
  } else {
    totalCost = Number(loadAmps.value) * Number(Band.value) * tariffs[selectedBand] * multiplier * 0.85 * 0.6 * 1.075;
  }
	
  let kWh;
  if (isAvgProvided) {
    kWh = avg * Number(Band.value) * multiplier * 0.6 * 0.85;
  } else {
    kWh = Number(loadAmps.value) * Number(Band.value) * multiplier * 0.6 * 0.85;
  }
	totalCost = totalCost || 0;
	outputkWh.innerHTML = "Your bill for " + kWh.toFixed(1) + "kWh consumption is:";
  
  output.innerHTML = "\u20a6" + totalCost.toLocaleString(undefined,{maximumFractionDigits:2});
}

function emptyInput() {
   output.innerHTML = "";
   outputkWh.innerHTML = "";
   loadAmps.value = "";
   Band.value = "";
   a.value = "";
   b.value = "";
   c.value = "";
   neutral.value = "";
   //  Phase.value = "";
}


start.addEventListener("click", calculate);
refresh.addEventListener("click", emptyInput);
tab1.addEventListener("click", emptyInput);
tab2.addEventListener("click", emptyInput);


//      BILLING (WATT)

const loadW = document.querySelector("#inputW");
const BandW = document.querySelector("#selectBandW");
const outputW = document.querySelector("#outputCostW");
const startW = document.getElementById("btnStartW");
const refreshW = document.getElementById("btnRefreshW");

function calcBillWatt(e) {
  e.preventDefault();
  
  // Get the selected band
  let selectedBand = BandW.options[BandW.selectedIndex].text;
  
  // Calculate the total cost
  var total = (((loadW.value) / 1000) * Number(BandW.value) * tariffs[selectedBand] * 1.075 * 0.6);
 
  outputW.innerHTML = "\u20a6" + total.toLocaleString(undefined,{maximumFractionDigits:2});
}
function emptyBillWattInput() {
 
   outputW.innerHTML = "";
   loadW.value = "";
   BandW.value = "";
   //  Phase.value = "";
}


startW.addEventListener("click", calcBillWatt);
refreshW.addEventListener("click", emptyBillWattInput);

//       LOR (ENERGY THEFT)

const lorSingle = document.querySelector("#lorSingleAmps");
const duration = document.querySelector("#inputHrs");
const Band1 = document.querySelector("#selectBand1");
const output1 = document.querySelector("#outputCost1");
const start1 = document.getElementById("btnStart1");
const refresh1 = document.getElementById("btnRefresh1");
const lorR = document.getElementById("lorRAmp");
const lorY= document.getElementById("lorYAmp");
const lorB = document.getElementById("lorBAmp");
const lorN = document.getElementById("lorNAmp");


function calcLorRPD(e) {
  e.preventDefault();
	
	// Calculate the average current if phase values are provided
  let LorAvg = (Number(lorR.value) + Number(lorY.value) + Number(lorB.value) + Number(lorN.value)) / 3;
  
  // Check if all the phase values are provided
let isLorAvgProvided =
  lorR.value !== "" && lorY.value !== "" && lorB.value !== "" && lorN.value !== "" &&
  !isNaN(Number(lorR.value)) &&
  !isNaN(Number(lorY.value)) &&
  !isNaN(Number(lorB.value)) &&
  !isNaN(Number(lorN.value));
  
  // Use 0.415 x root 3 if avg is provided, otherwise use 0.240
  let LorMultiplier = isLorAvgProvided ? 0.719 : 0.240;
  
  // Get the selected band and category
  let selectedBand = Band1.options[Band1.selectedIndex].text;
  
  // Calculate total cost based on whether avg or loadAmps.value is used
  let totalLOR;
  if (isLorAvgProvided) {
    totalLOR = LorAvg * Number(duration.value) * Number(Band1.value) * tariffs[selectedBand] * LorMultiplier * 0.6 * 0.85 * 1.075;
  } else {
    totalLOR = Number(lorSingle.value) * Number(duration.value) * Number(Band1.value) * tariffs[selectedBand] * LorMultiplier * 0.85 * 0.6 * 1.075;
  }
	
  let kWh;
  if (isLorAvgProvided) {
    kWh = LorAvg * Number(duration.value) * Number(Band1.value) * LorMultiplier * 0.6 * 0.85;
  } else {
    kWh = Number(lorSingle.value) * Number(duration.value) * Number(Band1.value) * LorMultiplier * 0.6 * 0.85 ;
  }
	totalLOR = totalLOR || 0;
	outputLorkWh.innerHTML = "Your LOR for " + kWh.toFixed(1) + "kWh consumption is:";
  
  output1.innerHTML = "\u20a6" + totalLOR.toLocaleString(undefined,{maximumFractionDigits:2});
}

function emptyLorRPDInput() {
   
   output1.innerHTML = "";
   outputLorkWh.innerHTML = "";
   lorSingle.value = "";
   duration.value = "";
   Band1.value = "";
  lorR.value = "";
   lorY.value = "";
   lorB.value = "";
  lorN.value = "";
}



start1.addEventListener("click", calcLorRPD);
refresh1.addEventListener("click", emptyLorRPDInput);
tab5.addEventListener("click", emptyInput);
tab6.addEventListener("click", emptyInput);

  document.addEventListener("DOMContentLoaded", function () {
    const tab5 = document.getElementById("tab5");
    const tab6 = document.getElementById("tab6");

    const clearTab5Inputs = () => {
      document.querySelectorAll(".clearSingle").forEach(input => input.value = "");
    };

    const clearTab6Inputs = () => {
      document.querySelectorAll(".clearLor3phase").forEach(input => input.value = "");
    };

    tab5.addEventListener("change", () => {
      if (tab5.checked) {
        clearTab6Inputs();
      }
    });

    tab6.addEventListener("change", () => {
      if (tab6.checked) {
        clearTab5Inputs();
      }
    });
  });

//              BILLING (kWh)

const loadMW = document.querySelector("#inputMW");

const Band2 = document.querySelector("#selectBand2");
const output2 = document.querySelector("#outputCost2");
const start2 = document.getElementById("btnStart2");
const refresh2 = document.getElementById("btnRefresh2");

function calcbillingKwh(e) {
  e.preventDefault();
  
  // Get the selected band
  let selectedBand = Band2.options[Band2.selectedIndex].text;
  
  // Calculate the total cost
  var total = loadMW.value * tariffs[selectedBand] * 1.075;
  
  output2.innerHTML = "\u20a6" + total.toLocaleString(undefined,{maximumFractionDigits:2});
}

function emptybillingKwhInput() {
  output2.innerHTML = "";
  loadMW.value = "";
  Band2.value = "";
}
start2.addEventListener("click", calcbillingKwh);
refresh2.addEventListener("click", emptybillingKwhInput);







//      DTR LOADING


// MAIN WRAPPER FUNCTION
document.getElementById("btnStart3").addEventListener('click', doMath);

function doMath() {
    calculateLoading();
    calculateImbalance();
}

// --- DTR LOADING CALCULATION ---
function calculateLoading() {
    const red = parseFloat(document.querySelector("#red").value);
    const yellow = parseFloat(document.querySelector("#yellow").value);
    const blue = parseFloat(document.querySelector("#blue").value);
    const neutral = parseFloat(document.querySelector("#neutral").value);
    const capacity = parseFloat(document.querySelector("#inputKVA").value);
    const outputLoad = document.querySelector("#outputLoading");

    const avgCurrent = (red + yellow + blue + neutral) / 3;
    let loading = (avgCurrent / (capacity * 1.4)) * 100;
    loading = loading || 0;

    // Set color based on loading
    if (loading === 0) {
        outputLoad.style.color = "black";
    } else if (loading < 50) {
        outputLoad.style.color = "green";
    } else {
        outputLoad.style.color = "red";
    }

    outputLoad.innerHTML = loading.toFixed(0) + "%";
}

// --- IMBALANCE CALCULATION ---
function calculateImbalance() {
    const red = parseFloat(document.querySelector("#red").value);
    const yellow = parseFloat(document.querySelector("#yellow").value);
    const blue = parseFloat(document.querySelector("#blue").value);
    const outputImbalance = document.getElementById("outputImbalance");
    const balanceText = document.getElementById("balance");

    const avgCurrent = (red + yellow + blue) / 3;
    const maxDeviation = Math.max(
        Math.abs(red - avgCurrent),
        Math.abs(yellow - avgCurrent),
        Math.abs(blue - avgCurrent)
    );

    let percentageImbalance = (maxDeviation / avgCurrent) * 100;
    percentageImbalance = percentageImbalance || 0;

    // Interpret imbalance
    if (percentageImbalance === 0) {
        outputImbalance.style.color = "black";
        balanceText.innerHTML = "";
    } else if (percentageImbalance <= 10) {
        outputImbalance.style.color = "green";
        balanceText.style.color = "green";
        balanceText.innerHTML = "DTR's Load is Balanced";
    } else if (percentageImbalance <= 20) {
        outputImbalance.style.color = "brown";
        balanceText.style.color = "brown";
        balanceText.innerHTML = "DTR's Load is Moderately Balanced";
    } else {
        outputImbalance.style.color = "red";
        balanceText.style.color = "red";
        balanceText.innerHTML = "DTR's Load is Highly Unbalanced";
    }

    outputImbalance.innerHTML = percentageImbalance.toFixed(0) + "%";
}

// --- RESET BUTTON ---
$(".btnReset").click(function () {
    $(".clear").empty();
    document.querySelector('#red').value = '';
    document.querySelector('#yellow').value = '';
    document.querySelector('#blue').value = '';
    document.querySelector('#neutral').value = '';
    document.querySelector('#inputKVA').value = '';
    document.getElementById('outputLoading').innerHTML = '';
    document.getElementById('outputImbalance').innerHTML = '';
    document.getElementById('balance').innerHTML = '';
});

	

$(document).ready(function(){
  $(".toggleButton").click(function(){
    var button = $(this);
    var text = button.next(".displayText");

    if (text.is(":hidden")) {
        text.slideDown("fast");
        button.text("X");
        button.css({"padding-left": "10px", "padding-right": "10px"});
    } else {
        text.slideUp("fast");
        button.text("Helpful Tips!");
        button.css({"padding-left": "5px", "padding-right": "5px"});
    }
  });
});



	
//                    TARIFF TICKER



// Get the current date
function formatDate(date) {
  const day = date.getDate();
  const month = date.toLocaleString('en-NG', { month: 'long' });
  const year = date.getFullYear();

  function getOrdinalSuffix(day) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
  }

  return `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
}

// Usage
const currentDate = new Date();
const formattedDate = formatDate(currentDate); // "21st May, 2024"


const news = `<span class="ticker-text">&nbsp Electricity Tariff as at <span class="brown-text">${formattedDate}</span> &nbsp | &nbsp
  Band A-Non MD <span class="green-text">₦${tariffs['Band A-Non MD']}/kWh</span> &nbsp &nbsp
  Band A-MD1 <span class="green-text">₦${tariffs['Band A-MD1']}/kWh</span> &nbsp &nbsp
  Band A-MD2 <span class="green-text">₦${tariffs['Band A-MD2']}/kWh</span> &nbsp &nbsp
  Band B-Non MD <span class="green-text">₦${tariffs['Band B-Non MD']}/kWh</span>  &nbsp &nbsp
  Band B-MD1 <span class="green-text">₦${tariffs['Band B-MD1']}/kWh</span>  &nbsp &nbsp
  Band B-MD2 <span class="green-text">₦${tariffs['Band B-MD2']}/kWh</span>  &nbsp &nbsp
  Band C-Non MD <span class="green-text">₦${tariffs['Band C-Non MD']}/kWh</span> &nbsp &nbsp   
  Band C-MD1 <span class="green-text">₦${tariffs['Band C-MD1']}/kWh</span> &nbsp &nbsp   
  Band C-MD2 <span class="green-text">₦${tariffs['Band C-MD2']}/kWh</span> &nbsp &nbsp   
  Band D-Non MD <span class="green-text">₦${tariffs['Band D-Non MD']}/kWh</span>  &nbsp &nbsp
  Band D-MD1 <span class="green-text">₦${tariffs['Band D-MD1']}/kWh</span>  &nbsp &nbsp
  Band D-MD2 <span class="green-text">₦${tariffs['Band D-MD2']}/kWh</span>  &nbsp &nbsp
  Band E-Non MD <span class="green-text">₦${tariffs['Band E-Non MD']}/kWh</span> &nbsp &nbsp | &nbsp 
  Band E-MD1 <span class="green-text">₦${tariffs['Band E-MD1']}/kWh</span> &nbsp &nbsp | &nbsp 
  Band E-MD2 <span class="green-text">₦${tariffs['Band E-MD2']}/kWh</span> &nbsp &nbsp | &nbsp 
  Designed by: Obot Akpan &nbsp</span>`;
// Select the container div by its class
const container = document.querySelector('.logo');
container.style.overflow = 'hidden'; 
container.style.position = 'relative'; 

// Create a ticker container with a new unique ID
const tickerContainer = document.createElement('div');
tickerContainer.id = 'tariffScroll';
tickerContainer.style.position = 'absolute';
tickerContainer.style.boxShadow = '5px 2px 6px rgba(0, 0, 0, 0.2)';

tickerContainer.style.bottom = '0';
tickerContainer.style.left = '0';
tickerContainer.style.whiteSpace = 'nowrap';
tickerContainer.innerHTML = news;

// Append the ticker container to the selected container div
container.appendChild(tickerContainer);

// Animate the ticker
let position = container.offsetWidth; 
let tickerPaused = false; 

function scrollTicker() {
  if (!tickerPaused) {
    position--;
    if (position < -tickerContainer.offsetWidth) {
      position = container.offsetWidth;
    }
    tickerContainer.style.transform = 'translateX(' + position + 'px)';
  }
  requestAnimationFrame(scrollTicker);
}

// Event listener to pause the ticker on mouse enter
tickerContainer.addEventListener('mouseenter', () => {
  tickerPaused = true;
});

// Event listener to resume the ticker on mouse leave
tickerContainer.addEventListener('mouseleave', () => {
  tickerPaused = false;
});

// Start the scrolling
scrollTicker();

document.addEventListener("DOMContentLoaded", function () {
  const debtAmountInput = document.getElementById("debtAmount");
  const result = document.getElementById("result");
  const exportContainer = document.getElementById("exportContainer");
  const resetBtn = document.getElementById("btnRefreshDp");
  const calcBtn = document.getElementById("btnCalculate");
  const selects = document.querySelectorAll("select");

  const adjustContainer = document.getElementById("adjustContainer");
  const adjustBtn = document.getElementById("btnAdjustDiscount");
  const discountInput = document.getElementById("customDiscountInput");
  let customDiscountRate = null;

  // Toggle discount input field
  adjustBtn.addEventListener("click", () => {
    discountInput.style.display =
      discountInput.style.display === "none" ? "block" : "none";
  });

  // Export button
  const exportBtn = document.createElement("button");
  exportBtn.id = "btnExportPdf";
  exportBtn.textContent = "📄 Export to PDF";
  Object.assign(exportBtn.style, {
    marginTop: "15px",
    padding: "10px 20px",
    backgroundColor: "#808000",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "15px",
    cursor: "pointer",
    display: "none"
  });
  exportContainer.insertAdjacentElement("afterend", exportBtn);

  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      if (debtAmountInput) debtAmountInput.value = "";
      if (result) {
        result.innerHTML = "";
        result.classList.remove("show");
      }
      exportBtn.style.display = "none";
      adjustContainer.style.display = "none";
      discountInput.style.display = "none";
      discountInput.value = "";
      customDiscountRate = null;

      document.getElementById("customerType").selectedIndex = 0;
      document.getElementById("debtYear").selectedIndex = 0;
      document.getElementById("paymentOption").selectedIndex = 0;

      selects.forEach(updatePlaceholderColor);
      updateInputPlaceholderColor(debtAmountInput);
    });
  }

  if (calcBtn) {
    calcBtn.addEventListener("click", function (e) {
      e.preventDefault();
      calculateResult();
    });
  }

  function calculateResult(forExport = false) {
    const amount = parseFloat(debtAmountInput.value);
    const customerType = document.getElementById("customerType").value;
    const yearValue = document.getElementById("debtYear").value;
    const paymentOption = document.getElementById("paymentOption").value;

    if (customerType === "") {
      result.innerHTML = "⚠️ Please select a Customer Type.";
      result.classList.add("show");
      exportBtn.style.display = "none";
      return;
    }

    if (yearValue === "") {
      result.innerHTML = "⚠️ Please select a Debt Year.";
      result.classList.add("show");
      exportBtn.style.display = "none";
      return;
    }

    if (paymentOption === "") {
      result.innerHTML = "⚠️ Please select a Payment Option.";
      result.classList.add("show");
      exportBtn.style.display = "none";
      return;
    }

    const minAmount = customerType === "bulk" ? 500000 : 100000;

    if (isNaN(amount)) {
      result.innerHTML = "⚠️ Please enter a valid debt amount.";
      result.classList.add("show");
      exportBtn.style.display = "none";
      return;
    }

    if (amount < minAmount) {
      result.innerHTML = `⚠️ Amount must be at least ₦${minAmount.toLocaleString()} for selected customer type.`;
      result.classList.add("show");
      exportBtn.style.display = "none";
      return;
    }

    let discountRate = 0;
    let staffIncentiveRate = 0;

    if (yearValue === "cumulative") {
      staffIncentiveRate = 0.025;
      discountRate = paymentOption === "oneOff" ? 0.12 : 0.07;
    } else if (yearValue === "2025") {
      staffIncentiveRate = 0.025;
      discountRate = paymentOption === "oneOff" ? 0.10 : 0.05;
    } else if (yearValue === "2024") {
      staffIncentiveRate = 0.05;
      discountRate = paymentOption === "oneOff" ? 0.20 : 0.15;
    } else if (yearValue === "before2024") {
      staffIncentiveRate = 0.10;
      discountRate = paymentOption === "oneOff" ? 0.25 : 0.20;
    } else {
      result.innerHTML = "⚠️ No discount available for selected options.";
      result.classList.add("show");
      exportBtn.style.display = "none";
      return;
    }

    customDiscountRate = parseFloat(discountInput.value);
    if (!isNaN(customDiscountRate)) {
      const customDecimal = customDiscountRate / 100;
      if (customDecimal <= discountRate) {
        discountRate = customDecimal;
      } else {
        result.innerHTML = `⚠️ Your input (${customDiscountRate}%) exceeds the allowed discount of ${(discountRate * 100).toFixed(1)}%. Please enter a lower rate.`;
        result.classList.add("show");
        exportBtn.style.display = "none";
        return;
      }
    }

    const discountAmount = amount * discountRate;
    const customerPays = amount - discountAmount;
    const staffEarns = customerPays * staffIncentiveRate;

    const customerTypeText = customerType === "regular" ? "Regular Customer" : "Unmetered MD/CBB";
    const debtYearText = yearValue === "before2024" ? "Before 2024" : (yearValue === "cumulative" ? "Cumulative" : yearValue);

    result.innerHTML = `
      <h1 style="text-align:center; font-weight:bold; font-size:22px">Debt Discount Payment Slip</h1>
      <table border="1" cellpadding="8" cellspacing="0" style="margin: auto; border-collapse: collapse;">
          <tr><th>Customer Type</th><td>${customerTypeText}</td></tr>
          <tr><th>Payment Option</th><td>${paymentOption === 'oneOff' ? "One-Off Payment" : "3-Month Installment"}</td></tr>
          <tr><th>Debt Year</th><td>${debtYearText}</td></tr>
          <tr><th>Original Debt</th><td>₦${amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td></tr>
          <tr><th>Customer Pays</th><td>₦${customerPays.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td></tr>
          ${paymentOption !== 'oneOff' ? `<tr><th>Payment Breakdown</th><td>₦${(customerPays / 3).toLocaleString(undefined, { maximumFractionDigits: 2 })} x 3 months</td></tr>` : ""}
          <tr><th>Customer Saves</th><td>₦${discountAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} (${(discountRate * 100).toFixed(1)}%)</td></tr>
          ${!forExport ? `<tr><th>Staff Incentive</th><td>₦${staffEarns.toLocaleString(undefined, { maximumFractionDigits: 2 })} (${(staffIncentiveRate * 100).toFixed(1)}%)</td></tr>` : ""}
      </table>
    `;
    result.classList.add("show");
    exportBtn.style.display = "inline-block";
    adjustContainer.style.display = "flex";
  }

  // Export button functionality placeholder
  exportBtn.addEventListener("click", async function () {
    // Your export-to-PDF logic goes here
  });

  function updatePlaceholderColor(select) {
    select.classList.toggle("placeholder-red", select.value === "");
  }

  function updateInputPlaceholderColor(input) {
    input.classList.toggle("red-placeholder", input.value === "");
  }

  selects.forEach(select => {
    updatePlaceholderColor(select);
    select.addEventListener("change", () => updatePlaceholderColor(select));
  });

  if (debtAmountInput) {
    updateInputPlaceholderColor(debtAmountInput);
    debtAmountInput.addEventListener("input", () => updateInputPlaceholderColor(debtAmountInput));
  }
});


