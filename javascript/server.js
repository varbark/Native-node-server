/**
 * Created by TOTO on 12/9/15.
 */
var http = require('http');
var url = require('url');

function startServer(route, handle){
  function onRequest(request, response){
    var pathname = url.parse(request.url).pathname;
    var method = request.method;
    route(handle, pathname, request, response, method);
  }
  http.createServer(onRequest).listen(3000);
  console.log('Server is start  on part:3000');
}
exports.startServer = startServer;
