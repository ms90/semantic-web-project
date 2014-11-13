//have i reasoned correctly? Is the structure ok or should i change it?

//or should i assume i will get the attributes in an arraylist of objects?
//and use it as an input for a big function, or make several small ones to be called upon?


//made up values
var boolDeathRate=false; //for inverse
var prefDeathRate=0.25; //for importance
var c1DeathRate=30;
var c2DeathRate=20;

var boolWater=false; 
var prefWater=1;
var c1Water=100;
var c2Water=20;

//for counting the final score
var c1FinalScore=0;
var c2FinalScore=0;

function compare(){
	console.log("c1FinalScore:",c1FinalScore, "c2FinalScore:", c2FinalScore);
	
	function DeathRateScore(){
		var c1Score=0;
		var c2Score=0;
		
		//good with high death rate
		if (boolDeathRate==true) {
			if (c1DeathRate > c2DeathRate) {
				c1Score=1;
				c2Score=c2DeathRate/c1DeathRate;
			} 
			else if(c1DeathRate < c2DeathRate){
				c1Score=c1DeathRate/c2DeathRate;
				c2Score=1;
			}
			else{
				c1Score=0.5;
				c2Score=0.5;
			}
		} 
		//good wth low
		else{
			if (c1DeathRate < c2DeathRate) {
				c1Score=1;
				c2Score=c1DeathRate/c2DeathRate;
			} 
			else if(c1DeathRate > c2DeathRate){
				c1Score=c2DeathRate/c1DeathRate;
				c2Score=1;
			}
			else{
				c1Score=0.5;
				c2Score=0.5;
			}
		}
			c1FinalScore=c1FinalScore+(c1Score*prefDeathRate);
			c2FinalScore=c2FinalScore+(c2Score*prefDeathRate);
	};

	function WaterScore(){
		var c1Score=0;
		var c2Score=0;	
		//good wth low
		if (boolWater==true) {
			if (c1Water < c2Water) {
				c1Score=c1Score+1;
				c2Score=c2Score+c1Water/c2Water;
			} 
			else if(c1Water > c2Water){
				c1Score=c1Score+c2Water/c1Water;
				c2Score=c2Score+1;
			}
			else{
				c1Score=c1Score+0.5;
				c2Score=c2Score+0.5;
			}
		}
		//good with high
		else{
			if (c1Water > c2Water) {
				c1Score=c1Score+1;
				c2Score=c2Score+c2Water/c1Water;
			} 
			else if(c1Water < c2Water){
				c1Score=c1Score+c1Water/c2Water;
				c2Score=c2Score+1;
			}
			else{
				c1Score=c1Score+0.5;
				c2Score=c2Score+0.5;
			} 

		}
			c1FinalScore=c1FinalScore+(c1Score*prefWater);
			c2FinalScore=c2FinalScore+(c2Score*prefWater);
	};
	DeathRateScore();
	console.log("c1FinalScore:",c1FinalScore, "c2FinalScore:", c2FinalScore);
	WaterScore();
	console.log("c1FinalScore:",c1FinalScore, "c2FinalScore:", c2FinalScore);
};