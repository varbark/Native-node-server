/**
 * Created by TOTO on 12/9/15.
 */
var pg = require('pg');
var connectionString = 'pg://development:development@localhost/database' ;

function showAllMovies(callback){
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('Can not log into database');
    } else {
      console.log('Connect to database...');
      client.query('SELECT * FROM movies', function (err, result) {
        callback(result.rows);
        done();  // client idles for 30 seconds before closing
        //console.log(result.rows[0].movie);
      });
      console.log('Show succes!');
    }
  });
  pg.end();
}


function addMovieToDB(movie, director, description,request, response, callback) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('Can not log into database');
    } else {
      console.log('Connect to database...');
      client.query(
        'SELECT id from  movies ' +
        'order by id desc ' +
        'limit 1;', function(err, result){
          if(err){
            console.log('Id error');
          }else{
            var id = result.rows[0].id + 1;
          }

          var insertQuery = 'INSERT INTO movies (id, movie, director, discription) ' +
            'values ('+ id +','+ "'" + movie + "'" + ','+ "'" + director + "'" + ','+ "'" + description + "'" +');';
          client.query(insertQuery, function (err, result) {
            if(err){
              console.log('Save error!!');
              console.log(err);
              callback();
            }else{
              console.log('Save data Success!');
              var request;
              callback(request, response);
            }
          });
        });
    }
  });
}

function deleteMovie(id, response){
  pg.connect(connectionString, function (err, client, done){
    var query =  "DELETE from movies WHERE id = "+  id  +";";
    console.log(query);
    if(err){
      console.log('Can not log into database');
    }else{
      console.log('Connect to database...');
      client.query(
        query, function(err,result){
          if(err){
            console.log(err);
          }else{
            console.log('Delete id: ', id);
            response.writeHead(302, {'Location': 'http://localhost:3000/'});
            response.end();
          }
        }
      )
    }
  })
}



exports.showAllMovies = showAllMovies;
exports.addMovieToDB = addMovieToDB;
exports.deleteMovie = deleteMovie;
