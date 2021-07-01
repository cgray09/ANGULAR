const expressJwt = require('express-jwt');

function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            // for the routes that have the same url but different methods
            { url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] }, 
            // RE represents any url with something coming after "products"
            { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/orders(.*)/, methods: ['POST', 'OPTIONS'] },
            
            `${api}/users/login`,
            `${api}/users/register`
        ]
    });
}

async function isRevoked(req, payload, done) {
    console.log(req.url);
    console.log(req.method);
    if (payload.isAdmin) {
        done();
    } else if (req.url.include('orders')) {
    }

    done(null, true); // reject the token and request
}

module.exports = authJwt;
