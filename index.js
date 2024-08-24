let server = require('./server');
// server 모듈을 index가 생성했음.
let router = require('./router');
// router 모듈도 index가 생성했음.
let requestHandler = require('./requestHandler');

const mariadb = require('./database/connect/mariadb')
mariadb.connect();

server.start(router.route, requestHandler.handle);
// server 함수의 start를 실행시킬건데 router 모듈이 가지고 있는 route를 전달할 것임.
//function route(pathname) {
//   console.log('pathname : ' + pathname);}