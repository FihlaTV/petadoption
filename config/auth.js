// expose our config directly to our application using module.exports
module.exports = {
  'facebookAuth': {
    'clientID': '665114316936017', // your App ID
    'clientSecret': '84a326438313b701b0f1330fba5d547f', // your App Secret
    'callbackURL': 'http://localhost:3000/auth/facebook/callback'
  },

  'twitterAuth': {
    'consumerKey': '5vLhySiFfL5NqMzu2U4DCAlvq',
    'consumerSecret': '4ABipQQxokR5iEPKCHqLrutG3YNCuu8zgq3tG6uSB10WsozZ7I',
    'callbackURL': 'http://localhost:3000/auth/twitter/callback'
  },

  'googleAuth': {
    'clientID': '880716802815-pi4jpanj04jrmhcmqo61s2bc6o2bmkim.apps.googleusercontent.com',
    'clientSecret': '10_u1sqMugJwp23-5lJ-tFHx',
    'callbackURL': 'http://127.0.0.1:3000/auth/google/callback'
  }

}
