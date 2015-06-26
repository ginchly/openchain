// Simple list
Sortable.create(simpleList, { 
	animation: 300,
	handle: ".main-text"
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

// Function to change the content of t2
function nextPage() {
	if (currentPage === 1) {
		document.getElementById("oc-nav-prev").innerHTML = '<img src="img/icon-prev.svg" height=40 />';
	}

	if (currentPage === (maxPage -1)) {
		document.getElementById("oc-nav-next").innerHTML = restartHtml;
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

// add event listener to table
var factorEl = document.getElementById("factor-land");
factorEl.addEventListener("click", showFactorInfo, false);
factorEl = document.getElementById("factor-women");
factorEl.addEventListener("click", showFactorInfo, false);
factorEl = document.getElementById("factor-farmers");
factorEl.addEventListener("click", showFactorInfo, false);
factorEl = document.getElementById("factor-workers");
factorEl.addEventListener("click", showFactorInfo, false);
factorEl = document.getElementById("factor-climate");
factorEl.addEventListener("click", showFactorInfo, false);
factorEl = document.getElementById("factor-transparency");
factorEl.addEventListener("click", showFactorInfo, false);
factorEl = document.getElementById("factor-water");
factorEl.addEventListener("click", showFactorInfo, false);

var toggleState = {"factor-land": false, "factor-women": false, "factor-farmers": false, "factor-workers": false, "factor-climate": false ,"factor-transparency": false ,"factor-water": false}

function showFactorInfo() {
	var id, el;
	if (event.target.className.indexOf("glyphicon") !== -1) {
		id = event.target.parentElement.id;
		el = event.target.parentElement;
	} else {
		return;
	}
	toggleState[id] = !toggleState[id]
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

