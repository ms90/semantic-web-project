var dbp = [];

function wikiAttr () {
//code from http://www.adamtavares.com/story/dbpedia/
var url = 'http://dbpedia.org/sparql';
    var query = '\
    SELECT DISTINCT ?country ?capital ?currency ?tongue ?population ?gdpnom ?ginii ?areatotal ?govttype ?perofwater \
    ?popdensity ?gdppp ?wikilink ?abstract WHERE {\
    \
    ?c a dbpedia-owl:Country.\
    ?c dbpedia-owl:wikiPageID "11867"^^xsd:integer.\
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
    ?c dbpedia-owl:abstract ?abstract.\
    FILTER(langMatches(lang(?abstract), "en"))\
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

        dbp[7] = (results[0].areatotal.value) * Math.pow(10, -6);
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
          }
        });
}

