/**
 * Created by TOTO on 12/9/15.
 */
var fs = require('fs');
var database = require('./database');
var qs = require('querystring');
var temper = require('./temper');

function loadCSS(req, res){
  if(req.url.indexOf('.css') != -1){ //req.url has the pathname, check if it conatins '.css'
    fs.readFile('../css/style.css', function (err, data) {
      if (err) console.log(err);
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.write(data);
      res.end();
    });
  }
}

function index(request, response){
  console.log('Request index had been received!');
  function printAllMoviesOnHTML(movies) {
    temper.renderHTML('../index.html',response, movies, temper.iterateMoviesOnPage);
  }
  database.showAllMovies(printAllMoviesOnHTML);
}

function showAddPage(request, response){
  console.log('Request add had been received!');
  temper.showEmptyHTML('../add.html', response);
}

function addMovie(request, response){
  var POST = '';
  request.on('data',function(data) {
    POST += data;
  });
  request.on('end', function(){
    if (POST.length > 1e6) {
      // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
      request.connection.destroy();
    }else{
      POST = qs.parse(POST);
      database.addMovieToDB(POST.movie, POST.director, POST.description, request, response, index)
    }
  });
}

function deleteMovie(request, response){
  var POST = '';
  request.on('data', function(data){
    POST += data;
  });
  request.on('end', function(){
    if(POST.length > 1e6){
      request.connection.destroy();
    }else{
      POST = qs.parse(POST);
      database.deleteMovie(parseInt(POST.id, 10), response);
    }
  });
}


exports.index = index;
exports.addMovie = addMovie;
exports.showAddPage = showAddPage;
exports.loadCSS = loadCSS;
exports.deleteMovie = deleteMovie;

