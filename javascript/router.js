/**
 * Created by TOTO on 12/9/15.
 */
function route(handle, pathname, request, response, method, id){
  console.log('Pathname: ', pathname, 'method: ',method );
  if(typeof handle[pathname][method] === 'function'){
      handle[pathname][method](request, response);
  }else{
    console.log("Can't find the url path");
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('Can not fine the url: ' + pathname);
    response.end();
  }
}

exports.route = route;
