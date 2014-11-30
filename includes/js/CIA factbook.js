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

function ciaData(country, id) {
	for (var i=1, max=400; i < max; i++) {
 		if (country === xmlDoc.getElementById(id).childNodes[i].getAttributeNode('country').value){
 			return xmlDoc.getElementById(id).childNodes[i].getAttributeNode('number').value;
         	break;
	   }
 		
 		else
 			{
 			return '';
 			}
	}
}