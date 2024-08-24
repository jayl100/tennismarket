const fs = require('fs');
const main_view = fs.readFileSync('./main.html', 'utf-8');
const orderlist_view = fs.readFileSync('./orderlist.html', 'utf-8');


const mariadb = require('./database/connect/mariadb');
// select product를 하겠다는 의미

function main(response) {
    console.log('main');

    mariadb.query("SELECT * FROM product", function(err, rows) {
        console.log(rows);
    })
    // sql 을 던지는 것

    response.writeHead(200, { 'Contents_Type': 'text/html' });
    response.write(main_view);
    response.end();
}

function order(response, productId) {
    response.writeHead(200, {'Content-Type' : 'text/html'});

    mariadb.query("INSERT INTO orderlist VALUES (" + productId + ", '" + new Date().toLocaleDateString() + "');", function(err, rows) {
        console.log(rows);
    })

    response.write('Thank you for your purchase');
    response.write('<br>');
    response.write('<a href="/orderlist" class="button">Go to Order List</a>');
    response.end();
}


function orderlist(response) {
    response.writeHead(200, {'Content-Type': 'text/html'});

    mariadb.query("SELECT * FROM orderlist", function(err, rows) {
        response.write(orderlist_view.replace('</table>', '')); // 기존 테이블 닫는 태그 삭제

        rows.forEach(element => {
            response.write(
                "<tr>"
                + "<td>" + element.product_id + "</td>"
                + "<td>" + element.order_date + "</td>"
                + "</tr>"
            );
        });

        response.write("</table>");
        response.end();
    });
}

// 백업
// function orderlist(response) {
//     console.log('orderlist');
//     response.writeHead(200, {'Contents_Type': 'text/html'});
//
//     mariadb.query("SELECT * FROM orderlist", function(err, rows) {
//         response.write(orderlist_view);
//
//         rows.forEach(element => {
//             response.write("<tr>"
//                 + "<td>"+element.product_id+"</td>"
//                 + "<td>"+element.order_date+"</td>"
//                 + "</tr>");
//         });
//
//         response.write("</table>");
//         response.end();
//     })
// }

// 이미지 파일연결
function redRacket(response) {
    fs.readFile('./img/redRacket.png', function(err, data) {
        response.writeHead(200, { 'Contents_Type': 'text/html' });
        response.write(data);
        response.end();
    })
}
function blueRacket(response) {
    fs.readFile('./img/blueRacket.png', function(err, data) {
        response.writeHead(200, { 'Contents_Type': 'text/html' });
        response.write(data);
        response.end();
    })
}
function blackRacket(response) {
    fs.readFile('./img/blackRacket.png', function(err, data) {
        response.writeHead(200, { 'Contents_Type': 'text/html' });
        response.write(data);
        response.end();
    })
}

// CSS, HTML 파일연결
function main_css(response) {
    fs.readFile('./main.css', function(err, data) {
        response.writeHead(200, { 'Contents_Type': 'text/html' });
        response.write(data);
        response.end();
    })
}
function oderlist_css(response) {
    fs.readFile('./orderlist.css', function(err, data) {
        response.writeHead(200, { 'Contents_Type': 'text/html' });
        response.write(data);
        response.end();
    })
}

let handle = {}; //key:value
handle['/'] = main;
handle['/order'] = order;
handle['/orderlist'] = orderlist;

// img 경로
handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;

// HTML CSS 경로
handle['/main.css'] = main_css;
handle['/orderlist.css'] = oderlist_css;



exports.handle = handle;