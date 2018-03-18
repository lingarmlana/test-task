var count;
var outerNumber;

function musicSearch() {
	document.getElementById("Accordion").innerHTML = "";
	var query = "https://itunes.apple.com/search?term=" + document.getElementById("musicSearch").value;
	var xhr = new XMLHttpRequest();
	xhr.open("GET", query, false);
	xhr.send();
	if (xhr.status != 200) {
			alert("Ошибка " + xhr.status + ": " + xhr.statusText);
		  } else {
	var result = JSON.parse(xhr.responseText);
	count = 0;
	var musicBackground;
	var time;
	var min;
	var sec;
	for(var id in result){
		if(id == "results") {
			for(var item in result[id]) {
				musicBackground = (count%2) ? "" : "musicBackground";

				time = new Date(result[id][item]["trackTimeMillis"]);
				min = time.getMinutes();
				sec = (time.getSeconds() < 10) ? "0" + time.getSeconds() : time.getSeconds();

				document.getElementById("Accordion").innerHTML += "<div class='panel panel-default " + musicBackground + "' id='panel-background'> <div class='panel-heading' role='tab' id='Heading" + count + "'> <a name='collapse' id='collapse" + count + "' data-toggle='collapse' data-parent='#Accordion' href='#Collapse" + count + "' aria-expanded='false' aria-controls='Collapse" + count + "' onclick='setDetailSign(" + count + ")'> <div class='row align-items-center'> <div class='cover'> <img src='" + result[id][item]["artworkUrl100"] + "' class='img-thumbnail img-cover'> </div> <div class='col-2'> " + result[id][item]["artistName"] + " </div> <div class='col-3'> " + result[id][item]["trackName"] + " </div> <div class='col-2'> " + result[id][item]["collectionName"] + " </div> <div class='col-2'> " + result[id][item]["primaryGenreName"] + " </div> <div class='col-1' name='detailSign' id='detailSign" + count + "'> <i class='fa fa-plus fa-2x' aria-hidden='true'></i> </div> </div> </a> </div>  <div id='Collapse" + count + "' class='panel-collapse collapse in' role='tabpanel' aria-labelledby='Heading" + count + "'> <div class='container-fluid container-details'> <div class='row'> <div class='col-5' id='details-name'> <p>" + result[id][item]["artistName"] + " - " + result[id][item]["trackName"] + " <i class='fa fa-music' aria-hidden='true'></i></p> </div> </div> <div class='row'> <div class='col-5'> <p><b>Collection:</b> " + result[id][item]["collectionName"] + "<br /> <b>Track Count:</b> " + result[id][item]["trackCount"] + "<br /> <b>Price:</b> " + result[id][item]["collectionPrice"] + " USD</p> </div> <div class='col-4'> <p><b>Track Duration:</b> " + min + ":" + sec + " min<br /> <b>Track Price:</b> " + result[id][item]["trackPrice"] + " USD</p> </div> </div> </div> </div> </div>";
				count++;
			}
		}
	}
  }
}

function setDetailSign(number) {
	
	var tagCollapse = document.getElementById("collapse" + number);
	var statusCollapse = tagCollapse.getAttribute("aria-expanded");

	var detailSign = document.getElementById("detailSign" + number);
	var plusHTML = "<i class='fa fa-plus fa-2x' aria-hidden='true'></i>";
	var minusHTML = "<i class='fa fa-minus fa-2x' aria-hidden='true'></i>";
	detailSign.innerHTML = (statusCollapse == "true") ? plusHTML : minusHTML;
	if (outerNumber != undefined) {
		document.getElementById("detailSign" + outerNumber).innerHTML = plusHTML;
	}
	outerNumber = number;
}