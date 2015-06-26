// Simple list
Sortable.create(simpleList, { 
	animation: 300,
	handle: ".main-text",
    onEnd: updateOrder
 });

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}


var currentPage = 1;
var maxPage = 3;

var restartHtml = '<img src="img/icon-restart.svg" height=40 />';
var nextHtml = '<img src="img/icon-next.svg" height=40 />';
var prevHtmlDisabled = '<img src="img/icon-prev-disabled.svg" height=40 />'

		var hashtagList = ""

// Function to change the content of t2
function nextPage() {
	ga('send', 'event', 'button', 'click', 'next-page-or-restart');
	if (currentPage === 1) {
		document.getElementById("oc-nav-prev").innerHTML = '<img src="img/icon-prev.svg" height=40 />';
	}

	if (currentPage === (maxPage -1)) {
		document.getElementById("oc-nav-next").innerHTML = restartHtml;
		orderBrands()
		// finishing data
		var listHTML = "";

		for (var i = 0; i < 5; i++) {
			var index = i + 1;
			if (brandData[i].score > 0) {
				listHTML = listHTML + "<h5>" + index + ". " + brandData[i].name + " (" + brandData[i].score + ")</h5>";
		}
			if (i<3) {
				hashtagList = hashtagList + " %23" + brandData[i].name.replace(" ", "");
			}

		};
		document.getElementById("orderedBrands").innerHTML = listHTML;
		document.getElementById("tweeter").innerHTML = '<a class="twitter-share-button" href="https://twitter.com/intent/tweet?text=Just checked best brands that match my sustainability choices on http://openchain.co/'  + hashtagList + ' %23sustainability" data-size="large"><button type="button" class="btn btn-primary btn-lg oc-tweet-btn">Tweet this</button></a>'
	}
	// Must be restart
	if (currentPage === maxPage) {
		document.getElementById("oc-nav-next").innerHTML = '<img src="img/icon-next.svg" height=40 />';
		var currentPageId = "page" + currentPage;
		var currentPageEl = document.getElementById(currentPageId)
		currentPageEl.style.display = "none"
		document.getElementById("page1").style.display = "block"
		document.getElementById("oc-nav-prev").innerHTML = prevHtmlDisabled;
		currentPage = 1;
	} else if (currentPage < maxPage) {
		var nextPage = currentPage + 1;
		var currentPageId = "page" + currentPage;
		var nextPageId  = "page" + nextPage;
		var currentPageEl = document.getElementById(currentPageId)
		currentPageEl.style.display = "none"
		var nextPageEl = document.getElementById(nextPageId)
		nextPageEl.style.display = "block"
		currentPage = currentPage + 1;
	}	
	updateProgress()
}

function prevPage() {
		ga('send', 'event', 'button', 'click', 'prev-page');
	if (currentPage === maxPage) {
		document.getElementById("oc-nav-next").innerHTML = nextHtml;
	}
	if (currentPage === 2) {
		document.getElementById("oc-nav-prev").innerHTML = prevHtmlDisabled;
	}
	if (currentPage > 1) {
		var prevPage = currentPage - 1;
		var currentPageId = "page" + currentPage;
		var prevPageId  = "page" + prevPage;
		var currentPageEl = document.getElementById(currentPageId)
		currentPageEl.style.display = "none"
		var prevPageId = document.getElementById(prevPageId)
		prevPageId.style.display = "block"
		currentPage = currentPage - 1;
	}
	updateProgress()
}

function updateProgress() {
	// Reset
	for (var j = 1; j <= maxPage; j++) {
		document.getElementById("bullet-" + j).className = "progress-bullet"
	};

	for (var i = 1; i <= currentPage; i++) {
		document.getElementById("bullet-" + i).className = document.getElementById("bullet-" + i).className + " progress-complete"
	};
}

// add event listener to table
var nextEl = document.getElementById("oc-nav-next");
nextEl.addEventListener("click", nextPage, false);

// add event listener to table
var prevEl = document.getElementById("oc-nav-prev");
prevEl.addEventListener("click", prevPage, false);


var factors = ["land", "women", "farmers", "workers", "climate", "transparency", "water"]
for (var i = 0; i < factors.length; i++) {
	document.getElementById("factor-" + factors[i]).addEventListener("click", showFactorInfo, false)
	document.getElementById("factor-" + factors[i] + "-unacceptable").addEventListener("click", selectFactor, false)
};

var unacceptableFactors = [];

var orderedFactors = factors;
var weighting = [1,1,1,1,1,1,1];
var ordered = false;

function updateOrder() {
	weighting = [2,2,2,1,0.0,0.0,0.0];
	ordered = true;
	orderedFactors = [];
	var orderedElements = document.getElementsByClassName("list-group-item-orderable")
	for (var i = 0; i < orderedElements.length; i++) {
		orderedFactors[i] = orderedElements[i].id.replace("factor-", "")
	};
	console.log(orderedFactors)
}

function showFactorInfo() {
	ga('send', 'event', 'list-item', 'click', 'factor-info-toggled');
	var id, el;
	if (event.target.className.indexOf("glyphicon") !== -1) {
		id = event.target.parentElement.id;
		el = event.target.parentElement;
	} else {
		return;
	}
	if (el.className.indexOf("expanded") === -1) {
			// remove expanded to collapse all others first
		var els = document.getElementsByClassName("list-item-factor");
		for (var i = 0; i < els.length; i++) {
			els[i].className = "list-group-item list-item-factor"
		};
		el.className = el.className + " expanded"
	} else {
		el.className = "list-group-item list-item-factor"
	}
}

function selectFactor() {
	var factor = event.target.textContent.toLowerCase()
	ga('send', 'event', 'list-item', 'click', 'select-toggled');
	el = event.target
	if (el.className.indexOf("selected") === -1) {
			// remove expanded to collapse all others first
		el.className = el.className + " selected"
		unacceptableFactors.push(factor) 
	} else {
		el.className = "main-text"
		var index = unacceptableFactors.indexOf(factor);
		if (index > -1) {
		    unacceptableFactors.splice(index, 1);
		}
	}
	console.log(unacceptableFactors);
}

var desirableBrandList = ["Unilever","Nestlé","Coca Cola","PepsiCo","Mars","Mondelez", "Kellogg's","Danone","General Mills","Associated British Foods plc"]
function filterBrands() {
	for (var i = 0; i < brandData.length; i++) {
		var brand = brandData[i]
		for (var j = 0; j < unacceptableFactors.length; j++) {
			var factor = unacceptableFactors[j]
			if (brand[factor] <= 3) {
				var index = desirableBrandList.indexOf(brand.name);
				if (index > -1) {
				    desirableBrandList.splice(index, 1);
				}
			}
		};
	};
	console.log(desirableBrandList);
}

var sortedBrandList = []
function orderBrands() {
	filterBrands();
	for (var i = 0; i < brandData.length; i++) {
		var brandScore = 0;
		var brand = brandData[i]
		for (var j = 0; j < orderedFactors.length; j++) {
			var factor = orderedFactors[j]
			brandScore = brandScore + (brand[factor] * weighting[j])
		};
		if (desirableBrandList.indexOf(brand.name) === -1) {
			brandScore = 0;
		}
		updateScore(brand, brandScore)
	};
	brandData.sort(compare);
	console.log(brandData);
}

function updateScore(brand, score) {
	var thisScore = score;
	brand.score = Math.round(thisScore);
}

function compare(a,b) {
  if (a.score < b.score)
    return 1;
  if (a.score > b.score)
    return -1;
  return 0;
}

var brandData = [{"name": "Unilever", "land": 7, "women": 5, "farmers": 8, "workers": 8, "climate": 9, "transparency": 7, "water": 6},
{"name": "Nestlé", "land": 8, "women": 5, "farmers": 7, "workers": 6, "climate": 8, "transparency": 7, "water": 7},
{"name": "Coca Cola", "land": 8, "women": 6, "farmers": 2, "workers": 6, "climate": 6, "transparency": 5, "water": 5},
{"name": "PepsiCo", "land": 7, "women": 2, "farmers": 2, "workers": 3, "climate": 6, "transparency": 5, "water": 5},
{"name": "Mars", "land": 2, "women": 5, "farmers": 4, "workers": 4, "climate": 6, "transparency": 4, "water": 3},
{"name": "Mondelez", "land": 3, "women": 6, "farmers": 4, "workers": 3, "climate": 4, "transparency": 4, "water": 2},
{"name": "Kellogg's", "land": 2, "women": 3, "farmers": 2, "workers": 2, "climate": 7, "transparency": 5, "water": 3},
{"name": "Danone", "land": 2, "women": 1, "farmers": 2, "workers": 3, "climate": 6, "transparency": 5, "water": 3},
{"name": "General Mills", "land": 2, "women": 2, "farmers": 2, "workers": 2, "climate": 5, "transparency": 4, "water": 5},
{"name": "Associated British Foods plc", "land": 3, "women": 2, "farmers": 3, "workers": 4, "climate": 4, "transparency": 3, "water": 2}];