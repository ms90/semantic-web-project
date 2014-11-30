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
    + ' optional{ ?c foaf:isPrimaryTopicOf  ?wikilink.}'
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
//          var c1dbp=[], c2dbp=[];
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
  
          console.log(c1dbp+'\n'+'\n'+c2dbp);
          runComp();
          //BIG PROBLEM!!!  the country in the arrays could be either (it's different every time).

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