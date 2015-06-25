// Simple list
Sortable.create(simpleList, { 
	animation: 300
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
var el = document.getElementById("oc-nav-next");
el.addEventListener("click", nextPage, false);

// add event listener to table
var el = document.getElementById("oc-nav-prev");
el.addEventListener("click", prevPage, false);


