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

//Main comparison function
function compare() {
	leftResults = undefined;
	rightResults = undefined;

	count1 = document.getElementById("country1").value;
	count2 = document.getElementById("country2").value;

	c1_sc = getCountryShortcut(count1);
	c2_sc = getCountryShortcut(count2);
	c1_id = getWikiPageId(count1);
	c2_id = getWikiPageId(count2);

	if (validateInput(count1, count2)) {
 		setDbpediaValues(c1_id, "left");
 		setDbpediaValues(c2_id, "right");
	}
}


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
	c2[19] = ciaData(c2_sc ,'f2157'); //HIV/AIDS Deaths

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