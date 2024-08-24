const { log } = require('console');
let http = require('http');
// require() : 소괄호 안에 있는 모듈을 가져온다.
// http 라는 이름으로 http 모듈을 가져오는 것.

let url = require('url');
// url이라는 모듈.

function start(route, handle) {

    function onRequest(request, response) {
        // url 모듈
        let pathname = url.parse(request.url).pathname;
        // parse : 문자열을 캐치한다.
        // request.url : 요청받은 url을
        // url.parse(request.url) : url을 읽었다.
        // .pathname : 그 경로가 어떻게 되는지 확인한다.
        // url모듈에 있는 parse 함수를 통해서 클라이언트에서 요청받은 url을 캐치해왔고 그 경로가 어떻게 되는지 확인

        let queryData = url.parse(request.url, true).query;

        route(pathname, handle, response, queryData.productId);

        // http 모듈
        // response.writeHead(200, { 'Contents_Type': 'text/html' });
        // response.write('hello');
        // response.end();
    }

    // createServer() 함수로 서버를 만들 수 있다.
    http.createServer(onRequest).listen(8888);
    // localhost:8888

}

exports.start = start;




