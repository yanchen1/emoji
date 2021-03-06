// Generated by CoffeeScript 1.8.0
var search, setRelatedDOMVisibility;

$(document).on('emoji:ready', function() {
  if (location.hash.length) {
    return search($('.speedy-filter').val(location.hash.substr(1)).val());
  } else {
    return search();
  }
});

search = function(keyword) {
  if (keyword == null) {
    keyword = '';
  }
  $('.keyword').text(keyword);
  keyword = keyword.trim();
  if (window.speedy_keyword !== keyword) {
    window.speedy_keyword = keyword;
    if (keyword.length) {
      $('.result').hide();
      $('.result').each(function() {
        if ($(this).text().toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
          return $(this).show();
        }
      });
    } else {
      $('.result').show();
    }
  }
  return setRelatedDOMVisibility(keyword);
};

setRelatedDOMVisibility = function(keyword) {
  var foundSomething;
  foundSomething = !!$('.result:visible').length;
  $('.no-results').toggle(!foundSomething);
  if (keyword.length >= 3) {
    if (!foundSomething) {
      return ga('send', 'event', 'search', 'no results');
    } else {
      return ga('send', 'event', 'search', keyword);
    }
  }
};

$(document).on('search keyup', '.speedy-filter', function() {
  return location.hash = $(this).val();
});

$(document).on('click', '.group', function() {
  ga('send', 'event', 'search', 'quick group search');
  return search($('.speedy-filter').val($(this).attr('href').substr(1)).val());
});

$(document).on('click', '.speedy-remover', function() {
  $('.speedy-filter').val('');
  $('.result').show();
  return location.hash = '';
});

window.onhashchange = function() {
  search($('.speedy-filter').val(location.hash.substr(1)).val());
  $('[href^="#"]').removeClass('active');
  return $("[href='" + location.hash + "']").addClass('active');
};
