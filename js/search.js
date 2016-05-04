(function(module) {
  var search = {};

  var render = function(brewery) {
    var template = Handlebars.compile($('#breweriesTemplate').text());

    return template(brewery);
  };

  search.getBreweries = function(searchLocation, next) {
    var searchLocation = searchLocation.toLowerCase().replace('-', ' ');

    $.ajax({
      url: '/api/yelp/',
      type: 'GET',
      data: { location: searchLocation },
      dataType: 'json'
    }).done(next);
  };

  search.getTerms = function(term) {
    $.ajax({
      url: '/api/search',
      type: 'GET',
      data: { term: term }
      // dataType: 'json'
    }).done(function(data, message, xhr) {
      console.log(data);
      console.log('🍞');
    });
  };

  search.getTerms('something');

  search.addTerm = function(term) {
    $.ajax({
      url: '/api/search',
      type: 'POST',
      data: { term: term }
      // dataType: 'json'
    }).done(function(data, message, xhr) {
      console.log(data);
    });
  };

  search.gotBreweries = function(data, message, xhr) {
    if (data.error) {
      page.redirect('/');
    } else {
      data.businesses.forEach(function(thisBusiness) {
        $('.searchResults').append(render(thisBusiness));
      });
    }
  };

  search.deleteTerm = function(id) {
    $.ajax({
      url: '/api/search',
      type: 'DELETE',
      data: { id: id }
      // dataType: 'json'
    }).done(function(data, message, xhr) {
      console.log(data);
    });
  };

  search.updateTerm = function(term, id) {
    $.ajax({
      url: '/api/search',
      type: 'PUT',
      data: { id: id, term: term }
      // dataType: 'json'
    }).done(function(data, message, xhr) {
      console.log(data);
    });
  };


  module.search = search;
})(window);
