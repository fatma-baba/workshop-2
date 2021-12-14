
const express = require('express')
var path = require('path');
const app = express()
const port = 8080

app.engine('.html', require('ejs').__express);

// Optional since express defaults to CWD/views

app.set('views', path.join(__dirname, 'views'));

// Path to our public directory

app.use(express.static(path.join(__dirname, 'public')));

// Without this you would need to
// supply the extension to res.render()
// ex: res.render('users.html').
app.set('view engine', 'html');

const open_dayes = [1, 2, 3 , 4, 5]
const start_hour = 9
const end_hour = 17
var checkTime = function (req, res, next) {
  let currentTime = new Date()
  console.log(currentTime.getDay())
  console.log(currentTime.getHours())
  if(open_dayes.includes(currentTime.getDay())) {
    if(currentTime.getHours() >= start_hour && currentTime.getHours() <= end_hour){
      next()
    }
  }
  res.render('closed');
}

app.use(checkTime)

app.get('/', (req, res) => {
  res.render('home');
})

app.get('/home', (req, res) => {
  res.render('home');
})

app.get('/service', (req, res) => {
    res.render('service');
  })

app.get('/contact', (req, res) => {
res.render('contact');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
