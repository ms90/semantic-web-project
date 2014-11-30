﻿/*
Authors: Maxim Serebrianski & Marcus Szkoc
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
$.when(setDbpediaValues(c1_id)).then(setDbpediaValues(c2_id));
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
// document.getElementById("wikiAbstract").innerHTML = abs;
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
setValue('nam1', 'placeholder');
setValue('area1', 1);
setValue('pop1', c1dbp[4]);
setValue('cap1', c1dbp[1]);
setValue('cur1', c1dbp[2]);
setValue('lang1', c1dbp[3]);
setValue('gov1', c1dbp[8]);
setValue('nam2', 'placeholder');
setValue('area2', 3);
setValue('pop2', c2dbp[4]);
setValue('cap2', c2dbp[1]);
setValue('cur2', c2dbp[2]);
setValue('lang2', c2dbp[3]);
setValue('gov2', c2dbp[8]);
setValue('l1', 5);
setValue('l2', 6);
setValue('l3', 7);
setValue('l4', c1[3]);
setValue('l5', c1[4]);
setValue('l6', c1dbp[5]);
setValue('l7', 10);
setValue('l8', 11);
setValue('l9', c1[8]);
setValue('l10', c1[9]);
setValue('l11', c1[10]);
setValue('l12', c1[11]);
setValue('l13', c1[12]);
setValue('l14', c1[13]);
setValue('l15', c1[14]);
setValue('l16', c1[15]);
setValue('l17', c1[16]);
setValue('l18', c1[17]);
setValue('l19', c1[18]);
setValue('l20', c1[19]);
setValue('r1', 22);
setValue('r2', 23);
setValue('r3', 24);
setValue('r4', c2[3]);
setValue('r5', c2[4]);
setValue('r6', c2dbp[5]);
setValue('r7', 27);
setValue('r8', 28);
setValue('r9', c2[8]);
setValue('r10', c2[9]);
setValue('r11', c2[10]);
setValue('r12', c2[11]);
setValue('r13', c2[12]);
setValue('r14', c2[13]);
setValue('r15', c2[14]);
setValue('r16', c2[15]);
setValue('r17', c2[16]);
setValue('r18', c2[17]);
setValue('r19', c2[18]);
setValue('r20', c2[19]);
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
	c1[3] = ciaData(c1_sc ,'f2085'); //Roadways
	c1[4] = ciaData(c1_sc ,'f2121'); //Railways

	c1[6] = "?";
	c1[7] = "?";
	c1[8] = ciaData(c1_sc ,'f2206'); //Education
	c1[9] = ciaData(c1_sc ,'f2129'); //Unemployment Rate
	c1[10] = ciaData(c1_sc ,'f2221'); //Taxes and other Revenues
	c1[11] = ciaData(c1_sc ,'f2092'); //Inflation Rate
	c1[12] = ciaData(c1_sc ,'f2054'); //Birth Rate
	c1[13] = ciaData(c1_sc ,'f2066'); //Death Rate
	c1[14] = ciaData(c1_sc ,'f2112'); //Net Migration Rate
	c1[15] = ciaData(c1_sc ,'f2223'); //Maternal Mortality Rate
	c1[16] = ciaData(c1_sc ,'f2091'); //Infant Mortality Rate
	c1[17] = ciaData(c1_sc ,'f2102'); //Life Expectancy at Birth
	c1[18] = ciaData(c1_sc ,'f2225'); //Health Expenditures
	c1[19] = ciaData(c1_sc ,'f2157'); //HIV/AIDS Deaths

	console.log("C1 Values: " + c1);
}
//Fills c2 array with all attribute values
function setC2() {
	c2[0] = "?";
	c2[1] = "?";
	c2[2] = "?";
	c2[3] = ciaData(c2_sc ,'f2085'); //Roadways
	c2[4] = ciaData(c2_sc ,'f2121'); //Railways

	c2[6] = "?";
	c2[7] = "?";
	c2[8] = ciaData(c2_sc ,'f2206'); //Education
	c2[9] = ciaData(c2_sc ,'f2129'); //Unemployment Rate
	c2[10] = ciaData(c2_sc ,'f2221'); //Taxes and other Revenues
	c2[11] = ciaData(c2_sc ,'f2092'); //Inflation Rate
	c2[12] = ciaData(c2_sc ,'f2054'); //Birth Rate
	c2[13] = ciaData(c2_sc ,'f2066'); //Death Rate
	c2[14] = ciaData(c2_sc ,'f2112'); //Net Migration Rate
	c2[15] = ciaData(c2_sc ,'f2223'); //Maternal Mortality Rate
	c2[16] = ciaData(c2_sc ,'f2091'); //Infant Mortality Rate
	c2[17] = ciaData(c2_sc ,'f2102'); //Life Expectancy at Birth
	c2[18] = ciaData(c2_sc ,'f2225'); //Health Expenditures
	c2[19] = ciaData(c1_sc ,'f2157'); //HIV/AIDS Deaths

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

function ciaData(country, id) {
	   for (var i=1, max=400; i < max; i++) {
 	if (country === xmlDoc.getElementById(id).childNodes[i].getAttributeNode('country').value)
	   {   return xmlDoc.getElementById(id).childNodes[i].getAttributeNode('number').value;
         break;
	   }}}

var c1dbp=[], c2dbp=[];
var firstResults;
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
+ ' optional{ ?c foaf:isPrimaryTopicOf ?wikilink.}'
+ ' ?c dbpedia-owl:abstract ?abstract.'
+ ' FILTER(langMatches(lang(?abstract), "en"))}';
var queryUrl = encodeURI( url+"?query="+query+"&format=json" );
$.ajax({
dataType: "jsonp",
url: queryUrl,
success: function(_data) {
if (firstResults) {
//validate values
//compare (we have to run the compare etc from here in order to ensure that the function is run after success)
//or setValues
try{
secondResults = _data.results.bindings;
// var c1dbp=[], c2dbp=[];
if (typeof(firstResults[0].country) != 'undefined') {
c1dbp[0] = firstResults[0].country.value;
} else c1dbp[0] = "n/a";
if (typeof(firstResults[0].capital) != 'undefined') {
c1dbp[1] = firstResults[0].capital.value;
} else c1dbp[1] = "n/a";
if (typeof(firstResults[0].currency) != 'undefined') {
c1dbp[2] = firstResults[0].currency.value;
} else c1dbp[2] = "n/a";
if (typeof(firstResults[0].tongue) != 'undefined') {
c1dbp[3] = firstResults[0].tongue.value;
} else c1dbp[3] = "n/a";
if (typeof(firstResults[0].population) != 'undefined') {
c1dbp[4] = Number(firstResults[0].population.value);
} else c1dbp[4] = "n/a";
if (typeof(firstResults[0].gdpnom) != 'undefined') {
c1dbp[5] = Number(firstResults[0].gdpnom.value);
} else c1dbp[5] = "n/a";
if (typeof(firstResults[0].ginii) != 'undefined') {
c1dbp[6] = Number(firstResults[0].ginii.value);
} else c1dbp[6] = "n/a";
if (typeof(firstResults[0].areatotal) != 'undefined') {
c1dbp[7] = (firstResults[0].areatotal.value) * Math.pow(10, -6);
} else c1dbp[7] = "n/a";
if (typeof(firstResults[0].govttype) != 'undefined') {
c1dbp[8] = firstResults[0].govttype.value;
} else c1dbp[8] = "n/a";
if (typeof(firstResults[0].perofwater) != 'undefined') {
c1dbp[9] = Number(firstResults[0].perofwater.value);
} else c1dbp[9] = "n/a";
if (typeof(firstResults[0].popdensity) != 'undefined') {
c1dbp[10] = Number(firstResults[0].popdensity.value);
} else c1dbp[10] = "n/a";
if (typeof(firstResults[0].gdppp) != 'undefined') {
c1dbp[11] = Number(firstResults[0].gdppp.value);
} else c1dbp[11] = "n/a";
if (typeof(firstResults[0].wikilink) != 'undefined') {
c1dbp[12] = firstResults[0].wikilink.value;
} else c1dbp[12] = "n/a";
if (typeof(firstResults[0].abstract) != 'undefined') {
c1dbp[13] = firstResults[0].abstract.value;
} else c1dbp[13] = "n/a";
if (typeof(secondResults[0].country) != 'undefined') {
c2dbp[0] = secondResults[0].country.value;
} else c2dbp[0] = "n/a";
if (typeof(secondResults[0].capital) != 'undefined') {
c2dbp[1] = secondResults[0].capital.value;
} else c2dbp[1] = "n/a";
if (typeof(secondResults[0].currency) != 'undefined') {
c2dbp[2] = secondResults[0].currency.value;
} else c2dbp[2] = "n/a";
if (typeof(secondResults[0].tongue) != 'undefined') {
c2dbp[3] = secondResults[0].tongue.value;
} else c2dbp[3] = "n/a";
if (typeof(secondResults[0].population) != 'undefined') {
c2dbp[4] = Number(secondResults[0].population.value);
} else c2dbp[4] = "n/a";
if (typeof(secondResults[0].gdpnom) != 'undefined') {
c2dbp[5] = Number(secondResults[0].gdpnom.value);
} else c2dbp[5] = "n/a";
if (typeof(secondResults[0].ginii) != 'undefined') {
c2dbp[6] = Number(secondResults[0].ginii.value);
} else c2dbp[6] = "n/a";
if (typeof(secondResults[0].areatotal) != 'undefined') {
c2dbp[7] = (secondResults[0].areatotal.value) * Math.pow(10, -6);
} else c2dbp[7] = "n/a";
if (typeof(secondResults[0].govttype) != 'undefined') {
c2dbp[8] = secondResults[0].govttype.value;
} else c2dbp[8] = "n/a";
if (typeof(secondResults[0].perofwater) != 'undefined') {
c2dbp[9] = Number(secondResults[0].perofwater.value);
} else c2dbp[9] = "n/a";
if (typeof(secondResults[0].popdensity) != 'undefined') {
c2dbp[10] = Number(secondResults[0].popdensity.value);
} else c2dbp[10] = "n/a";
if (typeof(secondResults[0].gdppp) != 'undefined') {
c2dbp[11] = Number(secondResults[0].gdppp.value);
} else c2dbp[11] = "n/a";
if (typeof(secondResults[0].wikilink) != 'undefined') {
c2dbp[12] = secondResults[0].wikilink.value;
} else c2dbp[12] = "n/a";
if (typeof(secondResults[0].abstract) != 'undefined') {
c2dbp[13] = secondResults[0].abstract.value;
} else c2dbp[13] = "n/a";
console.log(c1dbp+c2dbp);
runComp()
//BIG PROBLEM!!! the country in the arrays could be either (it's different every time).
}
catch(e) {
console.log(e.get + " not defined!");
}
}
else{
firstResults = _data.results.bindings; //save data
//var results = _data.results.bindings;
var attr = firstResults[0].capital.value;
$( 'body' ).append( '<p>'+attr+'</p>' );
}
}
});
}
//--------------------------------------------------------------------------------------------------