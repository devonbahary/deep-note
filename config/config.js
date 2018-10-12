if (process.env.NODE_ENV === 'test') {
  process.env.MONGODB_URI = 'mongodb://localhost:27017/sample-app-test';
} else if (process.env.NODE_ENV === 'dev') {
  process.env.MONGODB_URI = 'mongodb://localhost:27017/sample-app';
} else {
  process.env.MONGODB_URI = 'mongodb://heroku_bszzpjgw:tjvtrpp3pe1e7rprjkf2no0e98@ds231133.mlab.com:31133/heroku_bszzpjgw';
}
