const devConfig = {
  port: 3000,
  database: 'invoice-builder',
  secret: 'AHSDEUIYEIUER',
  frontendURL: 'http://localhost:4200',
  google: {
    clientId: '680653728559-is3miek16esfhqmp3kast20jp4l2vndk.apps.googleusercontent.com',
    clientSecret: 'nM4S2CU9MaG18RJkrAM4j9re',
    callbackURL: 'http://localhost:3000/api/auth/google/callback',
  },
  twitter: {
    consumerKey: 'tDpiVQhiwC9eOX9DoNUjXPLBW',
    consumerSecret: 'AGrY6fRkPQfbj6uPpI3JANbvbsnuCsgOMn9W9BLXXCDDIRIaLx',
    callbackURL: 'http://localhost:3000/api/auth/twitter/callback',
    userProfileURL: 'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true',
  },
  github: {
    clientId: '9421e7b9bfc057dcba84',
    clientSecret: '83cfb2a47db3ad1b58661541666f4df5b8488e27',
    callbackURL: 'http://localhost:3000/api/auth/github/callback',
  },
  ethereal: {
    username: '	clint.damore13@ethereal.email',
    password: 'wHuUScM6DuHN5BHKbB',
    host: 'smtp.ethereal.email',
    port: 587,
  },
};

module.exports = devConfig;