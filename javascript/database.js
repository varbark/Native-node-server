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


function addMovieToDB(movie, director, description, response) {
  pg.connect(connectionString, function (err, client) {
    if (err) {
      console.log('Can not log into database');
    } else {
      console.log('Connect to database...');
      //Get the max id number, so we could know what is next id number should be
      client.query(
        'SELECT id from  movies ' +
        'order by id desc ' +
        'limit 1;', function(err, result){
          //After get the max id number, do this call back to add new movie
          if(err){
            console.log('Id error');
          }else{
            var id = result.rows[0].id + 1;
            //Max id number + 1 will be the next new movie id
          }
          var insertQuery = 'INSERT INTO movies (id, movie, director, discription) ' +
            'values ('+ id +','+ "'" + movie + "'" + ','+ "'" + director + "'" + ','+ "'" + description + "'" +');';
          //in PG, only single quote ' could be recognized , not double quote "
          client.query(insertQuery, function (err, result) {
            if(err){
              console.log('Save error!!');
              console.log(err);
              callback();
            }else{
              console.log('Save data Success!');
              //After save the data, use response to redirect to index page
              response.writeHead(302, {'Location': 'http://localhost:3000/'});
              response.end();
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
