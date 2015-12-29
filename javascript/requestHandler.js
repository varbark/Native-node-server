/**
 * Created by TOTO on 12/9/15.
 */
var fs = require('fs');
var qs = require('querystring');
var database = require('./database');
var temper = require('./temper');

function index(request, response){
  //Get all the movies from database and render each of them(via temper.renderHTML) into index page
  function printAllMoviesOnHTML(movies) {
    temper.renderHTML('../index.html',response, movies, temper.iterateMoviesOnPage);
  }
  database.showAllMovies(printAllMoviesOnHTML);
}

function loadCSS(req, res){
    fs.readFile('../css/style.css', function (err, data) {
      if (err) {
        console.log(err);
      }else{
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.write(data);
        res.end();
      }
    });
}

function showAddPage(request, response){
  //Show add movie page
  temper.showEmptyHTML('../add.html', response);
}

function addMovie(request, response){
  //Post request to add movie to database
  var POST = '';
  request.on('data',function(data) {
    //Take all the request data into a long string
    POST += data;
  });
  request.on('end', function(){
    if (POST.length > 1e6) {
      //If the request is extremely long then stop
      // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
      request.connection.destroy();
    }else{
      POST = qs.parse(POST);
      //make post into object so could be read
      database.addMovieToDB(POST.movie, POST.director, POST.description, response);
      //Give it response so it could be redirected back to index page
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

