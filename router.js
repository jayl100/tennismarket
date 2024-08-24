function route(pathname, handle, response, productId) {
    console.log('pathname : ' + pathname);

    if (typeof handle[pathname] == 'function') {
        handle[pathname](response, productId);
    } else {
        response.writeHead(404, { 'Contents_Type': 'text/html' });
        response.write('Page Not Found');
        response.end();
        console.log('404')
    }
}

exports.route = route;