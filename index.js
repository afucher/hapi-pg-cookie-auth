'use restrict';
const Hapi = require('hapi'),
    CookieAuth = require('hapi-auth-cookie'),
    server = new Hapi.Server(),
    models = require('./models');

server.connection({
    port: 3000
});

server.register(CookieAuth, (err) => {
    server.auth.strategy('session', 'cookie', {
        password: 'F#@f23G%g2h89F#@f23hnh9f@!#!T#RF',
        cookie: 'my_app',
        isSecure: false
    });
    require('./routes')(server);
    models.sequelize.sync({
        force: true
    }).then(() => {
        models.user.create({
            username: 'admin',
            password: 123456
        });
        server.start(err => {
            if (err) {
                throw err;
            }
            console.log('Server running at: ${server.info.uri}');
        });
    });

})
