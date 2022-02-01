const express = require('express')
// const favicon = require('express-favicon')
const compression = require('compression')
const path = require('path')
const port = process.env.PORT || 3000
const morgan = require('morgan')
const app = express()
const dev = app.get('env') !== 'production'
// app.get('*.js', function(req, res, next) {
//   req.url = req.url + '.gz';
//   res.set('Content-Encoding', 'gzip');
//   res.set('Content-Type', 'text/javascript');
//   next();
//  });
 
//  app.get('*.css', function(req, res, next) {
//   req.url = req.url + '.gz';
//   res.set('Content-Encoding', 'gzip');
//   res.set('Content-Type', 'text/css');
//   next();
//  });
 if(!dev) {
  app.disable('x-powered-by')
  app.use(compression())
  app.use(morgan('common'))
  // app.use(favicon(__dirname + '/build/favicon.ico'))
  // the __dirname is the current directory from where the script is running
  // app.use(express.static(__dirname))
  app.use(express.static(path.join(__dirname, 'build')))
  
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  })
 }
 if(dev) {
  app.use(morgan('dev'))
} 

app.listen(port, () => {
  console.log('express running on port 3000')
})
