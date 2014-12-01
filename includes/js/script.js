/**
* ---------------------------------------------------------------------------------------------------------------------------------
* Country load from JSON and main function
* @author Maxim Serebrianski (Logic)
* @author Erica Hermanson (Debugging of compare function)
*/

var ctr, c1_sc, c2_sc, c1_id, c2_id, wikiPageCountry, wikiLinkC1, wikiAbsC1, wikiLinkC2, wikiAbsC2;
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
		$.when(setDbpediaValues(c1_id,'c1'), setDbpediaValues(c2_id,'c2')).then(setTimeout(function(){
    		runComp();
    	}, 1500));
	}
}

/**
* ---------------------------------------------------------------------------------------------------------------------------------
* Input validation
* @author Maxim Serebrianski (Logic)
*/

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


/**
* ---------------------------------------------------------------------------------------------------------------------------------
* Wikipedia Abstract+Link
* @author Maxim Serebrianski (Logic)
*/

function getWikiAbstract(c) {
	if (c == 'c1') {
		document.getElementById("wikiAbstract").innerHTML = wikiAbsC1;
	}
	if (c == 'c2') {
		document.getElementById("wikiAbstract").innerHTML = wikiAbsC2;
	}
}

function openWikiPage() {
	window.open(wikiPageCountry,'_blank');
}

function setWikiLink(c) {
	if (c == 'c1') {
		wikiPageCountry = wikiLinkC1;
	}
	if (c == 'c2') {
		wikiPageCountry = wikiLinkC2;
	}
}

/**
* ---------------------------------------------------------------------------------------------------------------------------------
* Alerts
* @author Maxim Serebrianski (Logic)
*/

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


/**
* ---------------------------------------------------------------------------------------------------------------------------------
* Display values in html
* @author Maxim Serebrianski (Logic)
* @author Marcus Szkoc (Bugfixing)
*/

function setValue(id, value) {
	 document.getElementById(id).innerHTML = value;
}

function setValuesC1() {
	setValue('nam1', c1dbp[0]);
	setValue('area1',Math.round(c1dbp[7]));
	setValue('pop1', Math.round(c1dbp[4]));
	setValue('cap1', c1dbp[1]);
	setValue('cur1', c1dbp[2]);
	setValue('lang1', c1dbp[3]);
	setValue('gov1', c1dbp[8]);
	setValue('l1', c1[0]);
	setValue('l2', c1[1]);
	setValue('l3', c1[2]);
	setValue('l4', c1[3]);
	setValue('l5', c1[4]);
	setValue('l6', c1[5]);
	setValue('l7', c1[6]);
	setValue('l8', c1[7]);
	setValue('l9', c1[8]);
	setValue('l10', c1[9]);
	setValue('l11', c1[10]);
	setValue('l12', c1[11]);
	setValue('l13', c1[12]);
	setValue('l14', c1[13]);
	setValue('l15', ciaData(c1_sc ,'f2112'));
	setValue('l16', c1[15]);
	setValue('l17', c1[16]);
	setValue('l18', c1[17]);
	setValue('l19', c1[18]);
	setValue('l20', c1[19]);
}

function setValuesC2() {
	setValue('nam2', c2dbp[0]);
	setValue('area2',Math.round(c2dbp[7]));
	setValue('pop2', Math.round(c2dbp[4]));
	setValue('cap2', c2dbp[1]);
	setValue('cur2', c2dbp[2]);
	setValue('lang2', c2dbp[3]);
	setValue('gov2', c2dbp[8]);
	setValue('r1', c2[0]);
	setValue('r2', c2[1]);
	setValue('r3', c2[2]);
	setValue('r4', c2[3]);
	setValue('r5', c2[4]);
	setValue('r6', c2[5]);
	setValue('r7', c2[6]);
	setValue('r8', c2[7]);
	setValue('r9', c2[8]);
	setValue('r10', c2[9]);
	setValue('r11', c2[10]);
	setValue('r12', c2[11]);
	setValue('r13', c2[12]);
	setValue('r14', c2[13]);
	setValue('r15', ciaData(c2_sc ,'f2112'));
	setValue('r16', c2[15]);
	setValue('r17', c2[16]);
	setValue('r18', c2[17]);
	setValue('r19', c2[18]);
	setValue('r20', c2[19]);
}

/**
* ---------------------------------------------------------------------------------------------------------------------------------
* Comparison functionality and setting values
* @author Maxim Serebrianski (Logic)
* @author Marcus Szkoc (Bugfixing)
*/

//Attribute values for c1 and c2, attribute weights and inversion flag
var c1 = [], c2 = [], pct = [], inv = [];

//Boolean array that saves for each attribute if "higher = better" --> TRUE or not --> FALSE
var highEqGood = [true,true,false,true,true,true,true,false,true,false,false,false,true,false,false,false,false,true,true,false];

//Final scores for c1 and c2
var sc1;
var sc2;

//Fills c1 array with all attribute values
function setC1() {
	c1[0] = Number(c1dbp[12]);
	c1[1] = Number(c1dbp[10]);
	c1[2] = Number(c1dbp[9]);
	c1[3] = Number(ciaData(c1_sc ,'f2085')); //Roadways
	c1[4] = Number(ciaData(c1_sc ,'f2121')); //Railways
	c1[5] = Number(c1dbp[5]);
	c1[6] = Number(c1dbp[11]);
	c1[7] = Number(c1dbp[6]);
	c1[8] = Number(ciaData(c1_sc ,'f2206')); //Education
	c1[9] = Number(ciaData(c1_sc ,'f2129')); //Unemployment Rate
	c1[10] = Number(ciaData(c1_sc ,'f2221')); //Taxes and other Revenues
	c1[11] = Number(ciaData(c1_sc ,'f2092')); //Inflation Rate
	c1[12] = Number(ciaData(c1_sc ,'f2054')); //Birth Rate
	c1[13] = Number(ciaData(c1_sc ,'f2066')); //Death Rate
	c1[14] = Number(Math.abs(ciaData(c1_sc ,'f2112'))); //Net Migration Rate --> absolute value
	c1[15] = Number(ciaData(c1_sc ,'f2223')); //Maternal Mortality Rate
	c1[16] = Number(ciaData(c1_sc ,'f2091')); //Infant Mortality Rate
	c1[17] = Number(ciaData(c1_sc ,'f2102')); //Life Expectancy at Birth
	c1[18] = Number(ciaData(c1_sc ,'f2225')); //Health Expenditures
	c1[19] = Number(ciaData(c1_sc ,'f2228')); //Obesity
}

//Fills c2 array with all attribute values
function setC2() {
	c2[0] = Number(c2dbp[12]);
	c2[1] = Number(c2dbp[10]);
	c2[2] = Number(c2dbp[9]);
	c2[3] = Number(ciaData(c2_sc ,'f2085')); //Roadways
	c2[4] = Number(ciaData(c2_sc ,'f2121')); //Railways
	c2[5] = Number(c2dbp[5]);
	c2[6] = Number(c2dbp[11]);
	c2[7] = Number(c2dbp[6]);
	c2[8] = Number(ciaData(c2_sc ,'f2206')); //Education
	c2[9] = Number(ciaData(c2_sc ,'f2129')); //Unemployment Rate
	c2[10] = Number(ciaData(c2_sc ,'f2221')); //Taxes and other Revenues
	c2[11] = Number(ciaData(c2_sc ,'f2092')); //Inflation Rate
	c2[12] = Number(ciaData(c2_sc ,'f2054')); //Birth Rate
	c2[13] = Number(ciaData(c2_sc ,'f2066')); //Death Rate
	c2[14] = Number(Math.abs(ciaData(c2_sc ,'f2112'))); //Net Migration Rate --> absolute value
	c2[15] = Number(ciaData(c2_sc ,'f2223')); //Maternal Mortality Rate
	c2[16] = Number(ciaData(c2_sc ,'f2091')); //Infant Mortality Rate
	c2[17] = Number(ciaData(c2_sc ,'f2102')); //Life Expectancy at Birth
	c2[18] = Number(ciaData(c2_sc ,'f2225')); //Health Expenditures
	c2[19] = Number(ciaData(c2_sc ,'f2228')); //Obesity
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

	setScores();
}

function setScores() {
	setValue('sc1', sc1.toFixed(2));
	setValue('sc2', sc2.toFixed(2));
}


/**
* ---------------------------------------------------------------------------------------------------------------------------------
* Attribute value extraction from CIA factbook XML
* @author Marcus Szkoc (Logic)
* @author Maxim Serebrianski (some Modifications)
*/

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

function ciaData(country, id) {
	for (var i=1, max=400; i < max; i++) {
 		var something = xmlDoc.getElementById(id).childNodes[i];
		if (something && country === something.getAttributeNode('country').value){
			return something.getAttributeNode('number').value;
   		}
	}
}

/**
* ---------------------------------------------------------------------------------------------------------------------------------
* Dbpedia Query
* @author Maxim Serebrianski (Logic)
* @author Erica Hermanson (Logic)
* @author Marcus Szkoc (Bugfixing)
* @author Mahendra Padi (Query)
*/

var c1dbp=[], c2dbp=[];

var firstResults;
function setDbpediaValues(id, c) {
  var url = 'http://dbpedia.org/sparql';
  var query = 'SELECT DISTINCT ?country ?country2  ?capital ?currency ?tongue ?population ?gdpnom ?ginii ?areatotal ?govttype ?perofwater' 
    + ' ?popdensity ?gdppp ?wikilink ?abstract ?hdi WHERE {'
    + ' ?c a dbpedia-owl:Country.'
    + ' ?c dbpedia-owl:wikiPageID "' + id + '"^^xsd:integer.'
    + ' optional {?c dbpprop:conventionalLongName ?country.'
    + ' FILTER(langMatches(lang(?country), "en"))}'
    + ' ?c rdfs:label ?country2.'
    + ' FILTER(langMatches(lang(?country2), "en"))'
    + ' optional {?c dbpedia-owl:capital ?cap.'
    + ' ?cap rdfs:label ?capital.'
    + ' FILTER(langMatches(lang(?capital), "en"))}'
    + ' optional{ ?c dbpedia-owl:currency ?cur.'
    + ' ?cur rdfs:label ?currency.'
    + ' FILTER(langMatches(lang(?currency), "en"))}'
    + ' optional{ ?c dbpprop:officialLanguages ?tongue.'
    + ' FILTER(langMatches(lang(?tongue), "en"))}'
    + ' optional{ ?c dbpedia-owl:populationTotal ?population.}'
    + ' optional{ ?c dbpprop:gdpNominalPerCapita ?gdpnom.}'
    + ' optional{ ?c dbpprop:gini ?ginii.}'
    + ' optional{ ?c dbpedia-owl:areaTotal ?areatotal.}'
    + ' optional{ ?c dbpprop:hdi ?hdi.}'
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
    	results = data.results.bindings;
    	if (c == 'c1') {
	        try{
	            if (typeof(results[0].country) != 'undefined') {
	              c1dbp[0] = results[0].country.value;
	            } else c1dbp[0] = results[0].country2.value;
	            if (typeof(results[0].capital) != 'undefined') {
	              c1dbp[1] = results[0].capital.value;
	            } else c1dbp[1] = "n/a";
	            if (typeof(results[0].currency) != 'undefined') {
	              c1dbp[2] = results[0].currency.value;
	            } else c1dbp[2] = "n/a";
	            if (typeof(results[0].tongue) != 'undefined' && results[0].tongue.value.length < 30) {
	              c1dbp[3] = results[0].tongue.value;
	            } else c1dbp[3] = "n/a";
	            if (typeof(results[0].population) != 'undefined') {
	              c1dbp[4] = Number(results[0].population.value).toFixed(2);
	            } else c1dbp[4] = "n/a";
	            if (typeof(results[0].gdpnom) != 'undefined') {
	              c1dbp[5] = Number(results[0].gdpnom.value).toFixed(2);
	            } else c1dbp[5] = "n/a";
	            if (typeof(results[0].ginii) != 'undefined') {
	              c1dbp[6] = Number(results[0].ginii.value).toFixed(2);
	            } else c1dbp[6] = "n/a";
	            if (typeof(results[0].areatotal) != 'undefined') {
	              c1dbp[7] = ((results[0].areatotal.value) * Math.pow(10, -6)).toFixed(2);
	            } else c1dbp[7] = "n/a";
	            if (typeof(results[0].govttype) != 'undefined') {
	              c1dbp[8] = results[0].govttype.value;
	            } else c1dbp[8] = "n/a";
	            if (typeof(results[0].perofwater) != 'undefined') {
	              c1dbp[9] = Number(results[0].perofwater.value).toFixed(2);
	            } else c1dbp[9] = "n/a";
	            if (typeof(results[0].popdensity) != 'undefined') {
	              c1dbp[10] = Number(results[0].popdensity.value).toFixed(2);
	            } else c1dbp[10] = "n/a";
	            if (typeof(results[0].gdppp) != 'undefined') {
	              c1dbp[11] = Number(results[0].gdppp.value).toFixed(2);
	            } else c1dbp[11] = "n/a";
	            if (typeof(results[0].wikilink) != 'undefined') {
	              wikiLinkC1 = results[0].wikilink.value;
	            } else wikiLinkC1 = "n/a";
	            if (typeof(results[0].abstract) != 'undefined') {
	              wikiAbsC1 = results[0].abstract.value;
	            } else wikiAbsC1 = "n/a";
	            if (typeof(results[0].hdi) != 'undefined') {
	              c1dbp[12] = Number(results[0].hdi.value).toFixed(2);
	            } else c1dbp[12] = "n/a";
	      	} catch(e) {
	      		console.log(e.get + " not defined!"); 
	      	}
	  	setC1();
	  	setValuesC1();
  		} else {
	  		try {
	            if (typeof(results[0].country) != 'undefined') {
	              c2dbp[0] = results[0].country.value;
	            } else c2dbp[0] = results[0].country2.value;
	            if (typeof(results[0].capital) != 'undefined') {
	              c2dbp[1] = results[0].capital.value;
	            } else c2dbp[1] = "n/a";
	            if (typeof(results[0].currency) != 'undefined') {
	              c2dbp[2] = results[0].currency.value;
	            } else c2dbp[2] = "n/a";
	            if (typeof(results[0].tongue) != 'undefined' && results[0].tongue.value.length < 30) {
	              c2dbp[3] = results[0].tongue.value;
	            } else c2dbp[3] = "n/a";
	            if (typeof(results[0].population) != 'undefined') {
	              c2dbp[4] = Number(results[0].population.value).toFixed(2);
	            } else c2dbp[4] = "n/a";
	            if (typeof(results[0].gdpnom) != 'undefined') {
	              c2dbp[5] = Number(results[0].gdpnom.value).toFixed(2);
	            } else c2dbp[5] = "n/a";
	            if (typeof(results[0].ginii) != 'undefined') {
	              c2dbp[6] = Number(results[0].ginii.value).toFixed(2);
	            } else c2dbp[6] = "n/a";
	            if (typeof(results[0].areatotal) != 'undefined') {
	              c2dbp[7] = ((results[0].areatotal.value) * Math.pow(10, -6)).toFixed(2);
	            } else c2dbp[7] = "n/a";
	            if (typeof(results[0].govttype) != 'undefined') {
	              c2dbp[8] = results[0].govttype.value;
	            } else c2dbp[8] = "n/a";
	            if (typeof(results[0].perofwater) != 'undefined') {
	              c2dbp[9] = Number(results[0].perofwater.value).toFixed(2);
	            } else c2dbp[9] = "n/a";
	            if (typeof(results[0].popdensity) != 'undefined') {
	              c2dbp[10] = Number(results[0].popdensity.value).toFixed(2);
	            } else c2dbp[10] = "n/a";
	            if (typeof(results[0].gdppp) != 'undefined') {
	              c2dbp[11] = Number(results[0].gdppp.value).toFixed(2);
	            } else c2dbp[11] = "n/a";
	            if (typeof(results[0].wikilink) != 'undefined') {
	              wikiLinkC2 = results[0].wikilink.value;
	            } else wikiLinkC2 = "n/a";
	            if (typeof(results[0].abstract) != 'undefined') {
	              wikiAbsC2 = results[0].abstract.value;
	            } else wikiAbsC1 = "n/a";
	            if (typeof(results[0].hdi) != 'undefined') {
	              c2dbp[12] = Number(results[0].hdi.value).toFixed(2);
	            } else c2dbp[12] = "n/a";
	    	} catch(e) {
	      		console.log(e.get + " not defined!"); 
	      	}
	   	setC2();
	   	setValuesC2();
    	}
  	}});
}