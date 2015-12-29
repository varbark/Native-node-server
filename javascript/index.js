/**
 * Created by TOTO on 12/9/15.
 */

var server = require('./server');
var router = require('./router');
var requestHandler = require('./requestHandler');

var handlerList = {};
handlerList['/'] = {};
handlerList['/add'] = {};
handlerList['/css/style.css'] ={};
handlerList['/css/style.css']['GET'] = requestHandler.loadCSS;
handlerList['/']['GET'] = requestHandler.index;
handlerList['/add']['GET'] = requestHandler.showAddPage;
handlerList['/add']['POST'] = requestHandler.addMovie;
handlerList['/delete/movie'] = {};
handlerList['/delete/movie']['POST'] = requestHandler.deleteMovie;


server.startServer(router.route, handlerList);
