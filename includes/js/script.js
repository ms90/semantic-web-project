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

	if (validateInput(count1, count2)) {
		runComp(count1, count2);
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
	setValue('l6', 42);
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
	setValue('r6', 42);
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
function fillC1() {
	c1[0] = "?";
	c1[1] = "?";
	c1[2] = "?";
	c1[3] = "?";
	c1[4] = "?";
	c1[5] = "?";
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
function fillC2() {
	c2[0] = "?";
	c2[1] = "?";
	c2[2] = "?";
	c2[3] = "?";
	c2[4] = "?";
	c2[5] = "?";
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
function runComp(c1, c2) {
	getDbpediaValues(c1);

	c1_sc = getCountryShortcut(c1);
	c2_sc = getCountryShortcut(c2);
	c1_id = getWikiPageId(c1);
	c2_id = getWikiPageId(c2);
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

/*
function countryTranslation(country) {
    switch (country) {
    	case 'Albania': return country = "al"; break;
        case 'Algeria': return country = "ag"; break;
        case 'Angola': return country = "ao"; break;
        case 'Anguilla': return country = "av"; break;
        case 'Antigua and Barbuda': return country = "ac"; break;
        case 'Argentinia': return country = "ar"; break;
        case 'Armenia': return country = "am"; break;
        case 'Aruba': return country = "aa"; break;          
        case 'Australia': return country = "as"; break;
        case 'Austria': return country = "au"; break;
        case 'Azerbaijan': return country = "aj"; break;
        case 'Bahrain': return country = "ba"; break;
        case 'Bangladesh': return country = "bg"; break;
        case 'Barbados': return country = "bb"; break;
        case 'Belarus': return country = "bo"; break;
        case 'Belgium': return country = "be"; break;
        case 'Belize': return country = "bh"; break;
        case 'Benin': return country = "bn"; break;
        case 'Bermuda': return country = "bd"; break;
        case 'Bhutan': return country = "bt"; break;
        case 'Bolivia': return country = "bl"; break;
        case 'Botswana': return country = "bc"; break;
        case 'Brazil': return country = "br"; break;
        case 'British Virgin Islands': return country = "vi"; break;
        case 'Brunei': return country = "bx"; break;
        case 'Bulgaria': return country = "bu"; break;
        case 'Burkina Faso': return country = "uv"; break;
        case 'Burma': return country = "bm"; break;
        case 'Burundi': return country = "by"; break;
        case 'Cabo Verde': return country = "cv"; break;
        case 'Cambodia': return country = "cb"; break;
        case 'Cameroon': return country = "cm"; break;
        case 'Canada': return country = "ca"; break;
        case 'Central African Republic': return country = "ct"; break;
        case 'Chad': return country = "cd"; break;
        case 'Chile': return country = "ci"; break;
        case 'Colombia': return country = "co"; break;
        case 'Comoros': return country = "cn"; break;
        case 'Cook Islands': return country = "cw"; break;
        case 'Costa Rica': return country = "cs"; break;
        case 'Cote d\'Ivoire': return country = "iv"; break;
        case 'Croatia': return country = "hr"; break;
        case 'Cuba': return country = "cu"; break;
        case 'Cyprus': return country = "cy"; break;
        case 'Czech Republic': return country = "ez"; break;
        case 'Democratic Republic of the Congo': return country = "cg"; break;
        case 'Denmark': return country = "da"; break;
        case 'Djibouti': return country = "dj"; break;
        case 'Dominica': return country = "do"; break;
        case 'Dominican Republic': return country = "dr"; break;
        case 'Ecuador': return country = "ec"; break;
        case 'Egypt': return country = "eg"; break;
        case 'El Salvador': return country = "es"; break;
        case 'Equatorial Guinea': return country = "ek"; break;
        case 'Eritrea': return country = "er"; break;
        case 'Estonia': return country = "en"; break;
        case 'Ethiopia': return country = "et"; break;
        case 'Fiji': return country = "fj"; break;
        case 'Finland': return country = "fi"; break;
        case 'France': return country = "fr"; break;
        case 'Gambia': return country = "ga"; break;
        case 'Georgia': return country = "gg"; break;
        case 'Germany': return country = "gm"; break;
        case 'Ghana': return country = "gh"; break;
        case 'Greece': return country = "gr"; break;
        case 'Grenada': return country = "gj"; break;
        case 'Guatemala': return country = "gt"; break;
        case 'Guinea': return country = "gv"; break;
        case 'Guyana': return country = "gy"; break;
        case 'Hong Kong': return country = "hk"; break;
        case 'Hungary': return country = "hu"; break;           
        case 'Iceland': return country = "ic"; break;
        case 'India': return country = "in"; break;
        case 'Indonesia': return country = "id"; break;
        case 'Iran': return country = "ir"; break;
        case 'Ireland': return country = "ei"; break;
        case 'Israel': return country = "is"; break;
        case 'Italy': return country = "it"; break;
        case 'Jamaica': return country = "jm"; break;
        case 'Japan': return country = "ja"; break;
        case 'Kazakhstan': return country = "kz"; break;
        case 'Kenya': return country = "ke"; break;
        case 'Kiribati': return country = "kr"; break;
        case 'Kosovo': return country = "kv"; break;
        case 'Kuwait': return country = "ku"; break;
        case 'Kyrgyzstan': return country = "kg"; break;
        case 'Laos': return country = "la"; break;
        case 'Latvia': return country = "lg"; break;
        case 'Lebanon': return country = "le"; break;
        case 'Lesotho': return country = "lt"; break;
        case 'Liberia': return country = "li"; break;
        case 'Liechtenstein': return country = "ls"; break;
        case 'Lithuania': return country = "lh"; break;
        case 'Luxembourg': return country = "lu"; break;
        case 'Macau': return country = "mc"; break;
        case 'Madagascar': return country = "ma"; break;
        case 'Malawi': return country = "mi"; break;
        case 'Malaysia': return country = "my"; break;
        case 'Maldives': return country = "mv"; break;
        case 'Mali': return country = "ml"; break;
        case 'Malta': return country = "mt"; break;
        case 'Marshall Islands': return country = "rm"; break;
        case 'Mauritania': return country = "mr"; break;
        case 'Mauritius': return country = "mp"; break;
        case 'Mexico': return country = "mx"; break;
        case 'Moldova': return country = "md"; break;
        case 'Monaco': return country = "mn"; break;
        case 'Mongolia': return country = "mg"; break;
        case 'Morocco': return country = "mo"; break;
        case 'Mozambique': return country = "mz"; break;
        case 'Namibia': return country = "wa"; break;
        case 'Nepal': return country = "np"; break;
        case 'Netherlands': return country = "nl"; break;
        case 'New Zealand': return country = "nz"; break;
        case 'Nicaragua': return country = "nu"; break;
        case 'Niger': return country = "ng"; break;
        case 'Norway': return country = "no"; break;
        case 'Oman': return country = "mu"; break;
        case 'Pakistan': return country = "pk"; break;
        case 'Palau': return country = "ps"; break;
        case 'Panama': return country = "pm"; break;
        case 'Paraguay': return country = "pa"; break;
        case 'Peru': return country = "pe"; break;
        case 'Philippines': return country = "rp"; break;
        case 'Poland': return country = "pl"; break;
        case 'Portugal': return country = "po"; break;
        case 'Qatar': return country = "qa"; break;
        case 'Republic of the Congo': return country = "cf"; break;
        case 'Romania': return country = "ro"; break;
        case 'Russia': return country = "rs"; break;
        case 'Rwanda': return country = "rw"; break;
        case 'Saint Kitts and Nevis': return country = "sc"; break;
        case 'Saint Lucia': return country = "st"; break;
        case 'Saint Vincent and the Grenadines': return country = "vc"; break;
        case 'Samoa': return country = "ws"; break;
        case 'Sao Tome and Principe': return country = "tp"; break;
        case 'Saudi Arabia': return country = "sa"; break;
        case 'Senegal': return country = "sg"; break;
        case 'Serbia': return country = "ri"; break;
        case 'Seychelles': return country = "se"; break;     
        case 'Sierra Leone': return country = "sl"; break;
        case 'Singapore': return country = "sn"; break;
        case 'Slovakia': return country = "lo"; break;
        case 'Slovenia': return country = "si"; break;
        case 'Solomon Islands': return country = "bp"; break;
        case 'South Africa': return country = "sf"; break;
        case 'South Korea': return country = "ks"; break;
        case 'Spain': return country = "sp"; break;
        case 'Sri Lanka': return country = "ce"; break;
        case 'Swaziland': return country = "wz"; break;
        case 'Sweden': return country = "sw"; break;
        case 'Switzerland': return country = "sz"; break;
        case 'Syria': return country = "sy"; break;
        case 'Tajikistan': return country = "ti"; break;
        case 'Tanzania': return country = "tz"; break;
        case 'Thailand': return country = "th"; break;
        case 'Timor-Leste': return country = "tt"; break;
        case 'Togo': return country = "to"; break;
        case 'Tonga': return country = "tn"; break;
        case 'Trinidad and Tobago': return country = "td"; break;
        case 'Tunisia': return country = "ts"; break;
        case 'Turkey': return country = "tu"; break;
        case 'Uganda': return country = "ug"; break;
        case 'Ukraine': return country = "up"; break;
        case 'United Kingdom': return country = "uk"; break;
        case 'United States': return country = "us"; break;
        case 'Uruguay': return country = "uy"; break;
        case 'Vanuatu': return country = "nh"; break;
        case 'Venezuela': return country = "ve"; break;
        case 'Vietnam': return country = "vm"; break;
        case 'Yemen': return country = "ym"; break;
        case 'Zambia': return country = "za"; break;
        case 'Zimbabwe': return country = "zi"; break;
	}
}
*/

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

function getDbpediaValues (id) {
  	var url = 'http://dbpedia.org/sparql';
  	var query = '\
		SELECT DISTINCT ?country ?capital ?currency ?tongue ?population ?gdpnom ?ginii ?areatotal ?govttype ?perofwater \
		?popdensity ?gdppp ?wikilink ?abstract WHERE {\
		\
		?c a dbpedia-owl:Country.\
		?c dbpedia-owl:wikiPageID "' + id + '"^^xsd:integer.\
		?c rdfs:label ?country.\
		FILTER(langMatches(lang(?country), "en"))\
		\
		optional {?c dbpedia-owl:capital ?cap.\
		?cap rdfs:label ?capital.\
		FILTER(langMatches(lang(?capital), "en"))}\
		\
		optional{ ?c dbpedia-owl:currency ?cur.\
		?cur rdfs:label ?currency.\
		FILTER(langMatches(lang(?currency), "en")) }\
		\
		optional{ ?c dbpedia-owl:language ?t.\
		?t dbpprop:name ?tongue.\
		FILTER(langMatches(lang(?tongue), "en"))}\
		\
		optional{ ?c dbpedia-owl:populationTotal ?population.}\
		\
		optional{ ?c dbpprop:gdpNominalPerCapita ?gdpnom.}\
		\
		optional{ ?c dbpprop:gini ?ginii.}\
		\
		optional{ ?c dbpedia-owl:areaTotal ?areatotal.}\
		\
		optional{ ?c dbpedia-owl:governmentType ?gvt.\
		?gvt rdfs:label ?govttype.\
		FILTER(langMatches(lang(?govttype), "en"))}\
		 \
		optional{ ?c dbpedia-owl:percentageOfAreaWater ?perofwater.}\
		\
		optional{ ?c dbpedia-owl:populationDensity ?popdensity.}\
		\
		optional{?c dbpprop:gdpPppPerCapita ?gdppp.}\
		\
		optional{ ?c foaf:isPrimaryTopicOf  ?wikilink.}\
		\
		?c dbpedia-owl:abstract ?abstract.
		FILTER(langMatches(lang(?abstract), "en"))}\
		}';

    var queryUrl = encodeURI( url+"?query="+query+"&format=json" );
    $.ajax({
	    dataType: "jsonp",
	    url: queryUrl,
	    success: function( _data ) {
	      var results = _data.results.bindings;
			console.log("Query successful!");
	        dbp[0] = results[0].country.value;
	        console.log(dbp[0]);
	        dbp[1] = results[0].capital.value;
	        console.log(dbp[1]);
	        dbp[2] = results[0].currency.value;
	        console.log(dbp[2]);
	        dbp[3] = results[0].tongue.value;
	        console.log(dbp[3]);
	        dbp[4] = results[0].population.value;
	        console.log(dbp[4]);
	        dbp[5] = results[0].gdpnom.value;
	        console.log(dbp[5]);
	        dbp[6] = results[0].ginii.value;
	        console.log(dbp[6]);
	        dbp[7] = results[0].areatotal.value;
	        console.log(dbp[7]);
	        dbp[8] = results[0].govttype.value;
	        console.log(dbp[8]);
	        dbp[9] = results[0].perofwater.value;
	        console.log(dbp[9]);
	        dbp[10] = results[0].popdensity.value;
	        console.log(dbp[10]);
	        dbp[11] = results[0].gdppp.value;
	        console.log(dbp[11]);
	        dbp[12] = results[0].wikilink.value;
	        console.log(dbp[12]);
	        dbp[13] = results[0].abstract.value;
	        console.log(dbp[13]); 
   	}});
}