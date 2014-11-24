  
  function bees(){
    //code from http://www.adamtavares.com/story/dbpedia/
      var url = "http://dbpedia.org/sparql";
      var query = "\
      PREFIX dbpedia2: <http://dbpedia.org/property/>\
      PREFIX foaf: <http://xmlns.com/foaf/0.1/>\
      SELECT ?o\
      WHERE {\
        ?s dbpedia2:genus \"Apis\"@en;\
        foaf:depiction ?o\
      }";
      var queryUrl = encodeURI( url+"?query="+query+"&format=json" );
      $.ajax({
        dataType: "jsonp",
        url: queryUrl,
        success: function( _data ) {
          var results = _data.results.bindings;
          for ( var i in results ) {
            var src = results[i].o.value;
            //$( 'body' ).append( '<img src="'+src+'"/>' ); //to make into pictures
            $( 'body' ).append( '<p>'+src+'"</p>' );

          }
        }
      });
    }