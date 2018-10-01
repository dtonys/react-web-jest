const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const bodyParser = require('body-parser');


const app = express();
const compiler = webpack(webpackConfig);
app.use( webpackDevMiddleware(compiler) );
app.use( webpackHotMiddleware(compiler) );
app.use( express.static('public') );
app.use( bodyParser.json() );
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if ( email !== 'email@test.com' ) {
    res.status(404).json({ success: false, error: 'user not found' });
    return;
  }
  if ( email === 'email@test.com' && password !== 'password' ) {
    res.status(422).json({ success: false, error: 'incorrect password' });
    return;
  }
  if ( email === 'email@test.com' && password === 'password' ) {
    res.json({ success: true });
  }
});
app.get('*', ( req, res ) => {
  res.sendFile( path.join(__dirname, '../dist/index.html') );
});
app.listen(process.env.PORT || 3000, () => {
  console.log('app listening on port 3000'); // eslint-disable-line no-console
});
