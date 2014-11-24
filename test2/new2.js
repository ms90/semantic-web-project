
function dbpediaID () {
  var url = "http://dbpedia.org/sparql";
  var query = '\
  PREFIX dbpprop: <http://dbpedia.org/property/>\
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
  PREFIX yago:<http://dbpedia.org/class/yago/>\
  PREFIX dbo: <http://dbpedia.org/ontology/>\
  PREFIX category: <http://dbpedia.org/resource/Category:>\
  PREFIX xsd:<http://www.w3.org/2001/XMLSchema#>\
\
  SELECT DISTINCT ?countryname ?wikipageID\
  WHERE {\
    ?country a dbo:Country .\
    ?country rdfs:label ?enName . \
\
    FILTER (langMatches(lang(?enName), "en")) \
\
    { ?country dbpprop:iso3166code ?code . }\
    UNION\
    { ?country dbpprop:iso31661Alpha ?code . }\
    UNION\
    { ?country dbpprop:countryCode ?code . }\
    UNION\
    { ?country a yago:MemberStatesOfTheUnitedNations . }\
\
    BIND (str(?enName) AS ?countryname)\
    ?country dbpedia-owl:wikiPageID ?wikipageID\
\
    FILTER( xsd:integer(?wikipageID))\
  }';
  
  var queryUrl = encodeURI( url+"?query="+query+"&format=json" );
  $.ajax({
    dataType: "jsonp",
    url: queryUrl,
    success: function( _data ) {
      var results = _data.results.bindings;
      for ( var i in results ) {
        var countryname = results[i].countryname.value;
        var wikipageID = results[i].wikipageID.value;
        $( 'body' ).append( '<p>'+countryname+':'+ wikipageID+'</p>' );
      }
    }
  });

}

function wikiAttr () {
//code from http://www.adamtavares.com/story/dbpedia/
  var url = 'http://dbpedia.org/sparql';
  var query = '\
  PREFIX dbpedia2: <http://dbpedia.org/property/>\
  PREFIX foaf: <http://xmlns.com/foaf/0.1/>\
  SELECT  DISTINCT ?country ?capital ?currency ?language ?population\
   ?gdpnom ?ginii ?areatotal ?govttype ?perofwater ?popdencity ?gdppp\
  WHERE {\
    ?c a dbpedia-owl:Country.\
    ?c dbpedia-owl:wikiPageID "11867"^^xsd:integer.\
    ?c rdfs:label ?country.\
    FILTER(langMatches(lang(?country), "en"))\
\
        ?c dbpedia-owl:capital ?cap.\
        ?cap rdfs:label ?capital.\
        FILTER(langMatches(lang(?capital), "en"))\
\
        ?c dbpedia-owl:currency ?cur.\
        ?cur rdfs:label ?currency.\
        FILTER(langMatches(lang(?currency), "en"))\
\
        ?c dbpedia-owl:language ?lang.\
        ?lang rdfs:label ?language.\
        FILTER(langMatches(lang(?language), "en"))\
\
        ?c dbpedia-owl:populationTotal ?population.\
        FILTER (xsd:integer(?population))\
\
        ?c dbpprop:gdpNominalPerCapita ?gdpnom.\
        FILTER( xsd:integer(?gdpnom))\
\
        ?c dbpprop:gini ?ginii.\
        FILTER( xsd:integer(?ginii))\
\
        ?c dbpedia-owl:areaTotal ?areatotal.\
        FILTER( xsd:integer(?areatotal)) \
\
        ?c dbpedia-owl:governmentType ?gvt.\
        ?gvt rdfs:label ?govttype.\
        FILTER(langMatches(lang(?govttype), "en"))\
\
        ?c dbpedia-owl:percentageOfAreaWater ?perofwater.\
        FILTER( xsd:float(?perofwater))\
\
        ?c dbpedia-owl:populationDensity ?popdencity.\
        FILTER( xsd:float(?popdencity))\
\
        ?c dbpprop:gdpPppPerCapita ?gdppp.\
      }';

      var queryUrl = encodeURI( url+"?query="+query+"&format=json" );
      $.ajax({
        dataType: "jsonp",
        url: queryUrl,
        success: function( _data ) {
          var results = _data.results.bindings;
          for ( var i in results ) {
            var country = results[i].country.value;
            $( 'body' ).append( '<p>'+country+'"</p>' );

          }
        }
      });
}