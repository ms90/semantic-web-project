/*

My Custom JS
============

Author:  Maxim Serebrianski
Updated: 2014-10-31

*/

var wikiPageCountry = "";
var IDvaluesOfEachDiv = "genInfoLeft genInfoRight scoresLeft scoresRight";
var IDlist = IDvaluesOfEachDiv.split(" ");

function compare() {
	count1 = document.getElementById("country1").value;
	count2 = document.getElementById("country2").value;

	if (validateInput(count1, count2)) {
		runComp(count1, count2);
		setValues();
	}
}

function validateInput(c1, c2) {
    if (c1 == null || c1 == "" || c2 == null || c2 == "") {
    	hideDivs();
    	showAlert();
    	setTimeout(function(){
    		fadeOutAlert();
    	}, 8000);
    	return false;
    } else {
    	hideAlert();
    	showDivs();
    	return true;
    }
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

function runComp(c1, c2) {
	//TODO
}

function showAlert() {
	document.getElementById('al').style.opacity = 1;
	document.getElementById('al').style.display = "";
}

function fadeOutAlert() {
	var op = 1;
	var timer = setInterval(function () {
		if (op <= 0.1){
			clearInterval(timer);
			document.getElementById('al').style.display = 'none';
		}
		document.getElementById('al').style.opacity = op;
		document.getElementById('al').style.filter = 'alpha(opacity=' + op * 100 + ")";
		op -= op * 0.1;
	}, 30);
}

function hideAlert() {
	document.getElementById('al').style.display = "none";
}

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
	setValue('sc1', 'Placeholder');

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
	setValue('sc2', 'Placeholder');
}