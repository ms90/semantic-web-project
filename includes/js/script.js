/*
Authors:  Maxim Serebrianski & Marcus Szkoc
*/

var ctr, c1_sc, c2_sc, c1_id, c2_id, wikiPageCountry;
var cList = [], cList_s = [], cList_i = [], IDlist = ["genInfoLeft", "genInfoRight", "scoresLeft", "scoresRight"], dbp = [];

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
				cList_s.push(ctr[i].country_short.toString());
				cList_i.push(ctr[i].wiki_id.toString());
				$('#countries').append("<option value='" + ctr[i].country + "'>");
			}
		}
	});
	//console.log(cList);
	//console.log(cList_s);
	//console.log(cList_i);
}

//Main comparison function
function compare() {
	count1 = document.getElementById("country1").value;
	count2 = document.getElementById("country2").value;

	c1_sc = getCountryShortcut(count1);
	c2_sc = getCountryShortcut(count2);
	c1_id = getWikiPageId(count1);
	c2_id = getWikiPageId(count2);

	if (validateInput(count1, count2)) {
		$.when(setDbpediaValues(c1_id), setDbpediaValues(c2_id)).done(runComp);
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
	var out = "Here is the abstract from Wikipedia..."
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
	setValue('l6', c1[5]);
	setValue('l7', 42);
	setValue('l8', 42);
	setValue('l9', c1[8]);
	setValue('l10', 42);
	setValue('l11', 42);
	setValue('l12', 42);
	setValue('l13', 42);
	setValue('l14', 42);
	setValue('l15', 42);
	setValue('l16', 42);
	setValue('l17', 42);
	setValue('l18', 42);
	setValue('l19', c1[18]);
	setValue('l20', 42);

	setValue('r1', 42);
	setValue('r2', 42);
	setValue('r3', 42);
	setValue('r4', 42);
	setValue('r5', 42);
	setValue('r6', c2[5]);
	setValue('r7', 42);
	setValue('r8', 42);
	setValue('r9', c2[8]);
	setValue('r10', 42);
	setValue('r11', 42);
	setValue('r12', 42);
	setValue('r13', 42);
	setValue('r14', 42);
	setValue('r15', 42);
	setValue('r16', 42);
	setValue('r17', 42);
	setValue('r18', 42);
	setValue('r19', c2[18]);
	setValue('r20', 42);
}


//--------------------------------------------------------------------------------------------------
//Comparison functionality

//Attribute values for c1 and c2, attribute weights and inversion flag
var c1 = [], c2 = [], pct = [], inv = [];

//Boolean array that saves for each attribute if "higher = better" --> TRUE or not --> FALSE
var highEqGood = [true,true,false,true,true,true,true,false,true,false,false,false,true,false,false,false,false,true,true,false];

//Final scores for c1 and c2
var sc1;
var sc2;


//Fills c1 array with all attribute values
function setC1() {
	c1[0] = "?";
	c1[1] = "?";
	c1[2] = "?";
	c1[3] = "?";
	c1[4] = "?";

	c1[6] = "?";
	c1[7] = "?";
	c1[8] = education(c1_sc);
	c1[9] = "?";
	c1[10] = "?";
	c1[11] = "?";
	c1[12] = "?";
	c1[13] = "?";
	c1[14] = "?";
	c1[15] = "?";
	c1[16] = "?";
	c1[17] = "?";
	c1[18] = healthExpenses(c1_sc);
	c1[19] = "?";

	console.log("C1 Values: " + c1);
}

//Fills c2 array with all attribute values
function setC2() {
	c2[0] = "?";
	c2[1] = "?";
	c2[2] = "?";
	c2[3] = "?";
	c2[4] = "?";

	c2[6] = "?";
	c2[7] = "?";
	c2[8] = education(c2_sc);
	c2[9] = "?";
	c2[10] = "?";
	c2[11] = "?";
	c2[12] = "?";
	c2[13] = "?";
	c2[14] = "?";
	c2[15] = "?";
	c2[16] = "?";
	c2[17] = "?";
	c2[18] = healthExpenses(c2_sc);
	c2[19] = "?";

	console.log("C2 Values: " + c2);
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
		case isNaN(c1[i]) || isNaN(c2[i]):
			break;
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
		case isNaN(c1[i]) || isNaN(c2[i]):
			break;
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
	setC1();
	setC2();

	fillPct();
	fillInv();

	sc1 = 0;
	sc2 = 0;

	for (var i=0; i<20; i++) {
		if (highEqGood[i]) {
			compAtrHigh(i);
		} else compAtrLow(i);
	}

	console.log("Score 1: " + sc1 + '\n' + "Score 2: " + sc2);

	setValues();
	setScores();
}

function setScores() {
	setValue('sc1', sc1.toFixed(2));
	setValue('sc2', sc2.toFixed(2));
}


//--------------------------------------------------------------------------------------------------
//Attribute value extraction from CIA factbook XML

if (window.XMLHttpRequest) {
	// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
} else {
	// code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}

xmlhttp.open("GET","resources/factbook.xml",false);
xmlhttp.send();
xmlDoc=xmlhttp.responseXML;

function getCountryShortcut(country) {
	for (var i=0; i<cList.length; i++) {
		if (cList[i] == country) {
			return cList_s[i];
			console.log(cList_s[i]);
			break;
		}
	}
}

function getWikiPageId(country) {
	for (var i=0; i<cList.length; i++) {
		if (cList[i] == country) {
			return cList_i[i];
			console.log(cList_i[i]);
			break;
		}
	}
}

//Education expenditures
function education(country) {
	   for (var i=1, max=999; i < max; i++) {
       	if (country === xmlDoc.getElementById('f2206').childNodes[i].getAttributeNode('country').value)
    	   {   return xmlDoc.getElementById('f2206').childNodes[i].getAttributeNode('number').value;
               break;
    	   }}}

//UNemployment Rate
function unemployment(country) {
	   for (var i=1, max=999; i < max; i++) {
       	if (country === xmlDoc.getElementById('f2129').childNodes[i].getAttributeNode('country').value)
    	   {   return xmlDoc.getElementById('f2129').childNodes[i].getAttributeNode('number').value;
               break;
    	   }}}

//Taxes and other revenues
function taxes(country) {
	   for (var i=1, max=999; i < max; i++) {
    if (country === xmlDoc.getElementById('f2221').childNodes[i].getAttributeNode('country').value)
 	   {    return xmlDoc.getElementById('f2221').childNodes[i].getAttributeNode('number').value;
            break;
 	   }}}

//Inflation rate (consumer prices)
function inflation(country) {
	   for (var i=1, max=999; i < max; i++) {
    if (country === xmlDoc.getElementById('f2092').childNodes[i].getAttributeNode('country').value)
 	   {    return xmlDoc.getElementById('f2092').childNodes[i].getAttributeNode('number').value;
            break;
 	   }}}


//Birth rate
function birth(country) {
	   for (var i=1, max=999; i < max; i++) {
    if (country === xmlDoc.getElementById('f2054').childNodes[i].getAttributeNode('country').value)
 	   {    return xmlDoc.getElementById('f2054').childNodes[i].getAttributeNode('number').value;
            break;
 	   }}}


//Death rate
function death(country) {
	   for (var i=1, max=999; i < max; i++) {
    if (country === xmlDoc.getElementById('f2066').childNodes[i].getAttributeNode('country').value)
 	   {    return xmlDoc.getElementById('f2066').childNodes[i].getAttributeNode('number').value;
            break;
 	   }}}

//Net migration rate
function migration(country) {
	   for (var i=1, max=999; i < max; i++) {
    if (country === xmlDoc.getElementById('f2112').childNodes[i].getAttributeNode('country').value)
 	   {     return xmlDoc.getElementById('f2112').childNodes[i].getAttributeNode('number').value;
            break;
 	   }}}


//Maternal mortality rate
function maternalMortality(country) {
	   for (var i=1, max=999; i < max; i++) {
    if (country === xmlDoc.getElementById('f2223').childNodes[i].getAttributeNode('country').value)
 	   {     return xmlDoc.getElementById('f2223').childNodes[i].getAttributeNode('number').value;
            break;
 	   }}}

//Infant mortality rate
function infantMoratilty(country) {
	   for (var i=1, max=999; i < max; i++) {
    if (country === xmlDoc.getElementById('f2091').childNodes[i].getAttributeNode('country').value)
 	   {     return xmlDoc.getElementById('f2091').childNodes[i].getAttributeNode('number').value;
            break;
 	   }}}


//Life expectancy at birth
function expectancy(country) {
	   for (var i=1, max=999; i < max; i++) {
    if (country === xmlDoc.getElementById('f2102').childNodes[i].getAttributeNode('country').value)
 	   {     return xmlDoc.getElementById('f2102').childNodes[i].getAttributeNode('number').value;
            break;
 	   }}}

//Health expenditures
function healthExpenses(country) {
	   for (var i=1, max=999; i < max; i++) {
    if (country === xmlDoc.getElementById('f2225').childNodes[i].getAttributeNode('country').value)
 	   {     return xmlDoc.getElementById('f2225').childNodes[i].getAttributeNode('number').value;
            break;
 	   }}}

//HIV/AIDS - deaths
function hivDeaths(country) {
	   for (var i=1, max=999; i < max; i++) {
    if (country === xmlDoc.getElementById('f2157').childNodes[i].getAttributeNode('country').value)
 	   {     return xmlDoc.getElementById('f2157').childNodes[i].getAttributeNode('number').value;
            break;
 	   }}}

function setDbpediaValues(id) {
  	var url = 'http://dbpedia.org/sparql';
  	var query = 'SELECT DISTINCT ?country ?capital ?currency ?tongue ?population ?gdpnom ?ginii ?areatotal ?govttype ?perofwater' 
		+ ' ?popdensity ?gdppp ?wikilink ?abstract WHERE {'
		+ ' ?c a dbpedia-owl:Country.'
		+ ' ?c dbpedia-owl:wikiPageID "' + id + '"^^xsd:integer.'
		+ ' ?c rdfs:label ?country.'
		+ ' FILTER(langMatches(lang(?country), "en"))'
		+ ' optional {?c dbpedia-owl:capital ?cap.'
		+ ' ?cap rdfs:label ?capital.'
		+ ' FILTER(langMatches(lang(?capital), "en"))}'
		+ ' optional{ ?c dbpedia-owl:currency ?cur.'
		+ ' ?cur rdfs:label ?currency.'
		+ ' FILTER(langMatches(lang(?currency), "en"))}'
		+ ' optional{ ?c dbpedia-owl:language ?t.'
		+ ' ?t dbpprop:name ?tongue.'
		+ ' FILTER(langMatches(lang(?tongue), "en"))}'
		+ ' optional{ ?c dbpedia-owl:populationTotal ?population.}'
		+ ' optional{ ?c dbpprop:gdpNominalPerCapita ?gdpnom.}'
		+ ' optional{ ?c dbpprop:gini ?ginii.}'
		+ ' optional{ ?c dbpedia-owl:areaTotal ?areatotal.}'
		+ ' optional{ ?c dbpedia-owl:governmentType ?gvt.'
		+ ' ?gvt rdfs:label ?govttype.'
		+ ' FILTER(langMatches(lang(?govttype), "en"))}'
		+ ' optional{ ?c dbpedia-owl:percentageOfAreaWater ?perofwater.}'
		+ ' optional{ ?c dbpedia-owl:populationDensity ?popdensity.}'
		+ ' optional{?c dbpprop:gdpPppPerCapita ?gdppp.}'
		+ ' optional{ ?c foaf:isPrimaryTopicOf  ?wikilink.}'
		+ ' ?c dbpedia-owl:abstract ?abstract.'
		+ ' FILTER(langMatches(lang(?abstract), "en"))}';

    var queryUrl = encodeURI( url+"?query="+query+"&format=json" );
    $.ajax({
	    dataType: "jsonp",
	    url: queryUrl,
	    success: function(data) {
	    	dbp = [];
	      	var results = data.results.bindings;
	      	try {
	      		if (typeof(results[0].country) != 'undefined') {
	      			dbp[0] = results[0].country.value;
	      		} else dbp[0] = "n/a";
	      		if (typeof(results[0].capital) != 'undefined') {
	      			dbp[1] = results[0].capital.value;
	      		} else dbp[1] = "n/a";
	      		if (typeof(results[0].currency) != 'undefined') {
	      			dbp[2] = results[0].currency.value;
	      		} else dbp[2] = "n/a";
	      		if (typeof(results[0].tongue) != 'undefined') {
	      			dbp[3] = results[0].tongue.value;
	      		} else dbp[3] = "n/a";
	      		if (typeof(results[0].population) != 'undefined') {
	      			dbp[4] = Number(results[0].population.value);
	      		} else dbp[4] = "n/a";
	      		if (typeof(results[0].gdpnom) != 'undefined') {
	      			dbp[5] = Number(results[0].gdpnom.value);
	      		} else dbp[5] = "n/a";
	      		if (typeof(results[0].ginii) != 'undefined') {
	      			dbp[6] = Number(results[0].ginii.value);
	      		} else dbp[6] = "n/a";
	      		if (typeof(results[0].areatotal) != 'undefined') {
	      			dbp[7] = (results[0].areatotal.value) * Math.pow(10, -6);
	      		} else dbp[7] = "n/a";
	      		if (typeof(results[0].govttype) != 'undefined') {
	      			dbp[8] = results[0].govttype.value;
	      		} else dbp[8] = "n/a";
	      		if (typeof(results[0].perofwater) != 'undefined') {
	      			dbp[9] = Number(results[0].perofwater.value);
	      		} else dbp[9] = "n/a";
	      		if (typeof(results[0].popdensity) != 'undefined') {
	      			dbp[10] = Number(results[0].popdensity.value);
	      		} else dbp[10] = "n/a";
	      		if (typeof(results[0].gdppp) != 'undefined') {
	      			dbp[11] = Number(results[0].gdppp.value);
	      		} else dbp[11] = "n/a";
	      		if (typeof(results[0].wikilink) != 'undefined') {
	      			dbp[12] = results[0].wikilink.value;
	      		} else dbp[12] = "n/a";
	      		if (typeof(results[0].abstract) != 'undefined') {
	      			dbp[13] = results[0].abstract.value;
	      		} else dbp[13] = "n/a";
	      	} catch(e) {
	      		console.log(e.get + " not defined!"); 
	      	}
	      	
		    console.log(dbp);
		}
	});
}

//--------------------------------------------------------------------------------------------------