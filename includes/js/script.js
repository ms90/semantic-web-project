/*
Author:  Maxim Serebrianski
*/

var ctr;
var cList = [];
var wikiPageCountry = "";
var IDvaluesOfEachDiv = "genInfoLeft genInfoRight scoresLeft scoresRight";
var IDlist = IDvaluesOfEachDiv.split(" ");

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}


//Fill country list on page load
function loadCountryList(){
	$.ajax({
		url: "resources/countries.json",
		dataType: "text",
		success: function(data) {
			ctr = $.parseJSON(data);
			for (var i in ctr) {
				cList.push(ctr[i].country.toString());
				$('#countries').append("<option value='" + ctr[i].country + "'>");
			}
		}
	});
}


//Main comparison function
function compare() {
	count1 = document.getElementById("country1").value;
	count2 = document.getElementById("country2").value;

	if (validateInput(count1, count2)) {
		setValues();
		runComp();
		setScores();
	}
}

//---------------------------------------------------------------------------------------------------------
//Input validation

function validateInput(c1, c2) {
	//Check if input fields are empty
    if (c1 == null || c1 == "" || c2 == null || c2 == "") {
    	hideDivs();
    	hideAlert('al_invalid');
    	hideAlert('al_same');
    	showAlert('al_missing');
    	setTimeout(function(){
    		fadeOutAlert('al_missing');
    	}, 8000);
    	return false;
    	//Check if input fields are valid
    } else if (checkCountry(c1) == false || checkCountry(c2) == false) {
    	hideDivs();
    	hideAlert('al_missing');
    	hideAlert('al_same');
    	showAlert('al_invalid');
    	setTimeout(function(){
    		fadeOutAlert('al_invalid');
    	}, 8000);
    	return false;
    	//Check if input fields are the same
    } else if (c1 == c2) {
    	hideDivs();
    	hideAlert('al_missing');
    	hideAlert('al_invalid');
    	showAlert('al_same');
    	setTimeout(function(){
    		fadeOutAlert('al_same');
    	}, 8000);
    	return false;
    } else {
    	hideAlert('al_missing');
    	hideAlert('al_invalid');
    	hideAlert('al_same');
    	showDivs();
    	return true;
    }
}

function checkCountry(c) {
	if ($.inArray(c.capitalize(), cList) != -1) {
		return true;
	} else return false;
}

function showDivs() {
for(var i=0; i<IDlist.length; i++) { 
   document.getElementById(IDlist[i]).style.display = "";
   }
}

function hideDivs() {
for(var i=0; i<IDlist.length; i++) { 
   document.getElementById(IDlist[i]).style.display = "none";
   }
}


//----------------------------------------------------------------------------------------------------------
//Wikipedia Abstract+Link

function getWikiAbstract() {
	var out = "Germany (/ˈdʒɜrməni/; German: Deutschland), officially the Federal Republic of Germany (German: Bundesrepublik Deutschland, pronounced [ˈbʊndəsʁepuˌbliːk ˈdɔʏtʃlant] ), is a federal parliamentary republic in western-central Europe. The country consists of 16 states and its capital and largest city is Berlin. Germany covers an area of 357,021 square kilometres (137,847 sq mi) and has a largely temperate seasonal climate. With 80.6 million inhabitants, it is the most populous member state in the European Union. Germany is the major economic and political power of the European continent and a historic leader in many cultural, theoretical and technical fields.Various Germanic tribes occupied what is now northern Germany and southern Scandinavia since classical antiquity. A region named Germania was documented by the Romans before AD 100. During the Migration Period that coincided with the decline of the Roman Empire, the Germanic tribes expanded southward and established kingdoms throughout much of Europe. Beginning in the 10th century, German territories formed a central part of the Holy Roman Empire. During the 16th century, northern German regions became the centre of the Protestant Reformation. Occupied during the Napoleonic Wars, the rise of Pan-Germanism inside the German Confederation resulted in the unification of most of the German states in 1871 into the German Empire, which was dominated by Prussia.<br><br>After the German Revolution of 1918–1919 and the subsequent military surrender in World War I, the Empire was replaced by the parliamentary Weimar Republic in 1918, with some of its territory partitioned in the Treaty of Versailles. Despite its lead in many scientific and cultural fields at this time, Germany nonetheless endured significant economic and political instability, which intensified during the Great Depression and contributed to the establishment of the Third Reich in 1933. The subsequent rise of fascism led to World War II. After 1945, Germany was divided by allied occupation, and evolved into two states, East Germany and West Germany. In 1990, the country was reunified.<br><br>Germany has the world's fourth-largest economy by nominal GDP and the fifth-largest by purchasing power parity. As a global leader in several industrial and technological sectors, it is the second-largest exporter and third-largest importer of goods. It is a developed country with a very high standard of living, featuring comprehensive social security that includes the world's oldest universal health care system. Known for its rich cultural and political history, Germany has been the home of many influential philosophers, music composers, scientists, and inventors. Germany was a founding member of the European Community in 1957, which became the EU in 1993. It is part of the Schengen Area, and has been a member of the eurozone since 1999. Germany is a great power and is a member of the United Nations, NATO, the G8, the G20, the OECD and the Council of Europe.";
	document.getElementById("wikiAbstract").innerHTML = out;
}

//function getWikiAbstract(c) {
	//TODO
	var abs = "";
//	document.getElementById("wikiAbstract").innerHTML = abs;
//}

function setWikiLink(c) {
	if (c == 'c1') {
		wikiPageCountry = document.getElementById('country1').value;
	} else if (c == 'c2') {
		wikiPageCountry = document.getElementById('country2').value;
	}
}

function openWikiPage() {
	var url = "http://en.wikipedia.org/wiki/" + wikiPageCountry;
	window.open(url,'_blank');
}


//------------------------------------------------------------------------------------------------------------
//Alerts


function showAlert(alert) {
	document.getElementById(alert).style.opacity = 1;
	document.getElementById(alert).style.display = "";
}

function fadeOutAlert(alert) {
	var op = 1;
	var timer = setInterval(function () {
		if (op <= 0.1){
			clearInterval(timer);
			document.getElementById(alert).style.display = 'none';
		}
		document.getElementById(alert).style.opacity = op;
		document.getElementById(alert).style.filter = 'alpha(opacity=' + op * 100 + ")";
		op -= op * 0.1;
	}, 30);
}

function hideAlert(alert) {
	document.getElementById(alert).style.display = "none";
}


//--------------------------------------------------------------------------------------------------------------
//Setting values

function setValue(id, value) {
	 document.getElementById(id).innerHTML = value;
}

function setValues() {
	setValue('nam1', 'Placeholder');
	setValue('area1', 42);
	setValue('pop1', 42);
	setValue('cap1', 42);
	setValue('cur1', 42);
	setValue('lang1', 42);
	setValue('gov1', 42);

	setValue('nam2', 'Placeholder');
	setValue('area2', 42);
	setValue('pop2', 42);
	setValue('cap2', 42);
	setValue('cur2', 42);
	setValue('lang2', 42);
	setValue('gov2', 42);

	setValue('l1', 42);
	setValue('l2', 42);
	setValue('l3', 42);
	setValue('l4', 42);
	setValue('l5', 42);
	setValue('l6', 42);
	setValue('l7', 42);
	setValue('l8', 42);
	setValue('l9', 42);
	setValue('l10', 42);
	setValue('l11', 42);
	setValue('l12', 42);
	setValue('l13', 42);
	setValue('l14', 42);
	setValue('l15', 42);
	setValue('l16', 42);
	setValue('l17', 42);
	setValue('l18', 42);
	setValue('l19', 42);
	setValue('l20', 42);

	setValue('r1', 42);
	setValue('r2', 42);
	setValue('r3', 42);
	setValue('r4', 42);
	setValue('r5', 42);
	setValue('r6', 42);
	setValue('r7', 42);
	setValue('r8', 42);
	setValue('r9', 42);
	setValue('r10', 42);
	setValue('r11', 42);
	setValue('r12', 42);
	setValue('r13', 42);
	setValue('r14', 42);
	setValue('r15', 42);
	setValue('r16', 42);
	setValue('r17', 42);
	setValue('r18', 42);
	setValue('r19', 42);
	setValue('r20', 42);
}


//--------------------------------------------------------------------------------------------------
//Comparison functionality

//Attribute values for c1 and c2, attribute weights and inversion flag
var c1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
var c2 = [20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1];
var pct = [];
var inv = [];

//Boolean array that saves for each attribute if "higher = better" --> TRUE or not --> FALSE
var highEqGood = [true,true,false,true,true,true,true,false,true,false,false,false,true,false,false,false,false,true,true,false];

//Final scores for c1 and c2
var sc1;
var sc2;


//Fills c1 array with all attribute values
function fillC1() {
	//TODO: Get values from SPARQL query and CIA factbook query
	//console.log("C1 Values: " + c1);
}

//Fills c2 array with all attribute values
function fillC2() {
	//TODO: Get values from SPARQL query and CIA factbook query
	//console.log("C2 Values: " + c2);
}

//Fills array with user weights
function fillPct() {
	for (var i=0; i<20; i++) {
		pct[i] = parseFloat(document.getElementById('at' + (i+1)).value);
	}
	//console.log("Percent: " + pct);
}

//Fills array with inversion flag, wenn gesetzt --> TRUE, sonst --> FALSE
function fillInv() {
	for (var i=0; i<20; i++) {
		if (document.getElementById('chk' + (i+1)).checked) {
			inv[i] = true;
		} else inv[i] = false;
	}
	//console.log("Inversion: " + inv);
}

//Updates final scores with the assumption that higher = better
function compAtrHigh(i) {
	switch (true) {
		case c1[i] > c2[i]:
			if (!inv[i]) {
				sc1 += 1 * pct[i];
				sc2 += (c2[i]/c1[i]) * pct[i];
			} else {
				sc1 += (c2[i]/c1[i]) * pct[i];
				sc2 += 1 * pct[i];
			} break;
		case c1[i] < c2[i]:
			if (!inv[i]) {
				sc1 += (c1[i]/c2[i]) * pct[i];
				sc2 += 1 * pct[i];
			} else {
				sc1 += 1 * pct[i];
				sc2 += (c1[i]/c2[i]) * pct[i];
			} break;
		case c1[i] = c2[i]:
			sc1 += 1 * pct[i];
			sc2 += 1 * pct[i];
			break;
	}
}

//Updates final scores with the assumption that lower = better
function compAtrLow(i) {
	switch (true) {
		case c1[i] > c2[i]:
			if (!inv[i]) {
				sc1 += (c2[i]/c1[i]) * pct[i];
				sc2 += 1 * pct[i];
			} else {
				sc1 += 1 * pct[i];
				sc2 += (c2[i]/c1[i]) * pct[i];
			} break;
		case c1[i] < c2[i]:
			if (!inv[i]) {
				sc1 += 1 * pct[i];
				sc2 += (c1[i]/c2[i]) * pct[i];
			} else {
				sc1 += (c1[i]/c2[i]) * pct[i];
				sc2 += 1 * pct[i];
			} break;
		case c1[i] = c2[i]:
			sc1 += 1 * pct[i];
			sc2 += 1 * pct[i];
			break;
	}
}

//Compare function
function runComp() {
	fillC1();
	fillC2();
	fillPct();
	fillInv();
	sc1 = 0;
	sc2 = 0;

	for (var i=0; i<20; i++) {
		if (highEqGood[i]) {
			compAtrHigh(i);
		} else compAtrLow(i);
	}
	//Normalize to 1-10 scale
	sc1 *= 0.5;
	sc2 *= 0.5;
	console.log("Score 1: " + sc1 + '\n' + "Score 2: " + sc2);
}

function setScores() {
	setValue('sc1', sc1.toFixed(2));
	setValue('sc2', sc2.toFixed(2));
}