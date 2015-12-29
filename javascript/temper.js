var fs = require('fs');

function movieTemp(id, movie, director, discription ){
  var temp =
    '<div class="movieList">' +
    '<li class="movie"> Movie name:' + movie + '</li>' +
    '<li class="director">Director:' + director + '</li>' +
    '<li class="description">Description:' +  discription  + '</li>' +
    '<form method="POST" action="/delete/movie">' +
    '<input name="＿method" type="hidden" value="delete" />' +
    '<input type="hidden" name="id" value=' + '"' + id + '" >' +
    '<button type="submit" class="button">Delete Movie</button>' +
    ' </form>' +
    '</div>';
  return temp;
}

function iterateMoviesOnPage(movies, response) {
  movies.forEach(function (movie, id) {
    response.write(movieTemp(movie.id, movie.movie, movie.director, movie.discription));
  });
}
function renderHTML(path, response, movies, callback) {
  fs.readFile(path, 'utf8', function (err, main) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(main);
    callback(movies, response);
    response.end();
  });
}

function showEmptyHTML(path, response) {
  fs.readFile(path, 'utf8', function (err, main) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(main);
    response.end();
  });
}


  exports.iterateMoviesOnPage = iterateMoviesOnPage;
  exports.renderHTML = renderHTML;
  exports.showEmptyHTML= showEmptyHTML;
