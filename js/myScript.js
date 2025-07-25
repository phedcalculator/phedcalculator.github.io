// JavaScript Document

const tariffs = {
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


//  BILLING (AMP)

//  BILLING (AMP)


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
  
  // Check if any of the phase values are provided
  let isAvgProvided = a.value || b.value || c.value || neutral.value;
  
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

const loadAmps1 = document.querySelector("#inputAmps1");
const billHrs = document.querySelector("#inputHrs");
const Band1 = document.querySelector("#selectBand1");
const output1 = document.querySelector("#outputCost1");
const start1 = document.getElementById("btnStart1");
const refresh1 = document.getElementById("btnRefresh1");

function calcLorRPD(e) {
  e.preventDefault();
  
  // Get the selected band
  let selectedBand = Band1.options[Band1.selectedIndex].text;
  
  // Calculate the total cost
  var total = Number(loadAmps1.value) * Number(billHrs.value) * Number(Band1.value) * tariffs[selectedBand] * 0.240 * 0.6 * 0.85 * 1.075;
  
  output1.innerHTML = "\u20a6" + total.toLocaleString(undefined,{maximumFractionDigits:2});
}

function emptyLorRPDInput() {
   
   output1.innerHTML = "";
   loadAmps1.value = "";
   billHrs.value = "";
   Band1.value = "";
   //  Phase1.value = "";
}


start1.addEventListener("click", calcLorRPD);
refresh1.addEventListener("click", emptyLorRPDInput);


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

//      


//        DTR LOADING

document.getElementById("btnStart3").addEventListener('click', doCalc);

function doCalc() {

   let x = parseFloat(document.querySelector("#red").value);
   let y = parseFloat(document.querySelector("#yellow").value);
   let z = parseFloat(document.querySelector("#blue").value);
   const outputLoad = document.querySelector("#outputLoading");
   const capacity = document.querySelector("#inputKVA");
	
//  const refresh3 = document.getElementById("btnRefresh3");

   let loading = ((Math.max(x, y, z) / (capacity.value * 1.4)) * 100);

   loading = loading || 0;
	if(loading === 0) {
	document.getElementById('outputLoading').style.color = "black";
		
    }else if(loading < 50) {
	document.getElementById('outputLoading').style.color = "green";
		
    }else if(loading >= 50) {
                document.getElementById('outputLoading').style.color = "red";
	}
	
   outputLoad.innerHTML = loading.toFixed(0) + "%";
}

document.getElementById("btnStart3").addEventListener('click', doMath);

		
	function doMath() {
//function calculatePercentageImbalance(xx, yy, zz) {
   let xx = parseFloat(document.querySelector("#red").value);
   let yy = parseFloat(document.querySelector("#yellow").value);
   let zz = parseFloat(document.querySelector("#blue").value);
//   let nn = parseFloat(document.querySelector("#neutral").value);
	
		
		function calculatePercentageImbalance(xx, yy, zz) {
    // Calculate the average current
    let avgCurrent = (xx + yy + zz) / 3;

    // Calculate the deviations
    let redDeviation = Math.abs(xx - avgCurrent);
    let yellowDeviation = Math.abs(yy - avgCurrent);
    let blueDeviation = Math.abs(zz - avgCurrent);

    // Find the maximum deviation
    let maxDeviation = Math.max(redDeviation, yellowDeviation, blueDeviation);

    // Calculate the percentage imbalance
    let percentageImbalance = (maxDeviation / avgCurrent) * 100;
			percentageImbalance = percentageImbalance || 0;
			
			if(percentageImbalance === 0) {
    balance.innerHTML = "";
    document.getElementById('outputImbalance').style.color = "black";
} else if(percentageImbalance <= 4) {
    document.getElementById('outputImbalance').style.color = "green";
    document.getElementById('balance').style.color = "green";
    balance.innerHTML = "DTR's Load is Balanced";
} else if(percentageImbalance > 4 && percentageImbalance <= 10) {
    document.getElementById('outputImbalance').style.color = "brown";
    document.getElementById('balance').style.color = "brown";
    balance.innerHTML = "DTR's Load is Moderately Balanced";
} else if(percentageImbalance > 10) {
    document.getElementById('outputImbalance').style.color = "red";
    document.getElementById('balance').style.color = "red";
    balance.innerHTML = "DTR's Load is Highly Unbalanced";
}
    return percentageImbalance;
			
			
}

let percentageImbalance = calculatePercentageImbalance(xx, yy, zz);


outputImbalance.innerHTML = (percentageImbalance.toFixed(0) + "%");


}

	$( ".btnReset" ).click(function() {
  $( ".clear" ).empty();
	document.querySelector('#red').value ='';
	document.querySelector('#yellow').value ='';
	document.querySelector('#blue').value ='';
	document.querySelector('#neutral').value ='';
	document.querySelector('#inputKVA').value ='';
});		




const lbRecordBtn = document.getElementById("lbRecord");
if (lbRecordBtn) {
  lbRecordBtn.addEventListener('click', extractValues);
}

function extractValues() {
    const red = parseFloat(document.querySelector("#red").value);
    const yellow = parseFloat(document.querySelector("#yellow").value);
    const blue = parseFloat(document.querySelector("#blue").value);
    const neutral = parseFloat(document.querySelector("#neutral").value);
    const capacity = parseFloat(document.querySelector("#inputKVA").value);

    // Check if any value is empty
    if (isNaN(red) || isNaN(yellow) || isNaN(blue) || isNaN(neutral) || isNaN(capacity)) {
        const errorMessageDiv = document.getElementById("errorMessage");
        errorMessageDiv.textContent = "Please fill in all the required values.";
        setTimeout(() => {
            errorMessageDiv.textContent = "";
        }, 5000); 

        return; 
    }

    // Calculate loading percentage
    const loading = ((Math.max(red, yellow, blue) / (capacity * 1.4)) * 100) || 0;

    // Calculate percentage imbalance
    const avgCurrent = (red + yellow + blue) / 3;
    const maxDeviation = Math.max(Math.abs(red - avgCurrent), Math.abs(yellow - avgCurrent), Math.abs(blue - avgCurrent));
    const imbalance = (maxDeviation / avgCurrent) * 100 || 0;

    const url = `LB Report.html?red=${red}&yellow=${yellow}&blue=${blue}&neutral=${neutral}&capacity=${capacity}&loading=${loading.toFixed(2)}&imbalance=${imbalance.toFixed(2)}`;

    // Open the result page in a new tab
    window.open(url, '_blank');
}


	

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


const news = `&nbsp Electricity Tariff as at <span class="brown-text">${formattedDate}</span> &nbsp | &nbsp
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
  Designed by: Obot Akpan &nbsp`;

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


function calculateResult() { 
  const customerType = document.getElementById('customerType').value;
  const amount = parseFloat(document.getElementById('debtAmount').value);
  const yearValue = document.getElementById('debtYear').value;
  const paymentOption = document.getElementById('paymentOption').value;
  const result = document.getElementById('result');

  // ✅ Check one missing field at a time
  if (customerType === "") {
    result.innerHTML = "❌ Please select a Customer Type.";
    result.classList.add('show');
    return;
  }

  if (yearValue === "") {
    result.innerHTML = "❌ Please select a Debt Year.";
    result.classList.add('show');
    return;
  }

  if (paymentOption === "") {
    result.innerHTML = "❌ Please select a Payment Option.";
    result.classList.add('show');
    return;
  }

  // ✅ Validate amount
  const minAmount = customerType === 'bulk' ? 500000 : 100000;

  if (isNaN(amount)) {
    result.innerHTML = "❌ Please enter a valid debt amount.";
    result.classList.add('show');
    return;
  }

  if (amount < minAmount) {
    result.innerHTML = `❌ Amount must be at least ₦${minAmount.toLocaleString()} for selected customer type.`;
    result.classList.add('show');
    return;
  }

  // ✅ Compute discount and staff incentive
  let discountRate = 0;
  let staffIncentiveRate = 0;

  if (yearValue === "2025") {
    staffIncentiveRate = 0.025;
    discountRate = paymentOption === "oneOff" ? 0.10 : 0.05;
  } else if (yearValue === "2024") {
    staffIncentiveRate = 0.05;
    discountRate = paymentOption === "oneOff" ? 0.20 : 0.15;
  } else if (yearValue === "before2024") {
    staffIncentiveRate = 0.10;
    discountRate = paymentOption === "oneOff" ? 0.25 : 0.20;
  }

  const discountAmount = amount * discountRate;
  const customerPays = amount - discountAmount;
  const staffEarns = customerPays * staffIncentiveRate

  const customerTypeText = document.getElementById('customerType').options[document.getElementById('customerType').selectedIndex].text;
  const debtYearText = document.getElementById('debtYear').options[document.getElementById('debtYear').selectedIndex].text;

  result.innerHTML = `
     <table>
    <tr><th>Customer Type</th><td>${customerTypeText}</td></tr>
    <tr><th>Payment Option</th><td>${paymentOption === 'oneOff' ? "One-Off Payment" : "3-Month Installment"}</td></tr>
    <tr><th>Debt Year</th><td>${debtYearText}</td></tr>
    <tr><th>Original Debt</th><td>₦${amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td></tr>
    <tr><th>Customer Pays</th><td>₦${customerPays.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td></tr>
    <tr><th>Customer Saves</th><td>₦${discountAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} (${(discountRate * 100).toFixed(1)}%)</td></tr>
    <tr><th>Staff Incentive</th><td>₦${staffEarns.toLocaleString(undefined, { maximumFractionDigits: 2 })} (${(staffIncentiveRate * 100).toFixed(1)}%)</td></tr>
  </table>
  `;

  result.classList.add('show');
}

function updatePlaceholderColor(select) {
  if (select.value === "") {
    select.classList.add("placeholder-red");
  } else {
    select.classList.remove("placeholder-red");
  }
}

function updateInputPlaceholderColor(input) {
  if (input.value === "") {
    input.classList.add("red-placeholder");
  } else {
    input.classList.remove("red-placeholder");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const selects = document.querySelectorAll("select");
  const debtAmountInput = document.getElementById("debtAmount");
  const result = document.getElementById("result");

  selects.forEach(select => {
    updatePlaceholderColor(select); 
    select.addEventListener("change", function () {
      updatePlaceholderColor(select);
    });
  });

  updateInputPlaceholderColor(debtAmountInput);
  debtAmountInput.addEventListener("input", function () {
    updateInputPlaceholderColor(debtAmountInput);
  });
  document.getElementById('btnRefreshDp').addEventListener('click', function () {
    document.getElementById('debtAmount').value = '';
    document.getElementById('customerType').selectedIndex = 0;
    document.getElementById('debtYear').selectedIndex = 0;
    document.getElementById('paymentOption').selectedIndex = 0;

    result.innerHTML = '';
    result.classList.remove('show');

    updateInputPlaceholderColor(debtAmountInput);
    selects.forEach(updatePlaceholderColor);
  });
});



