// setup and initialize server
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express')
const path = require('path')
const app = express()
const port = 3000

const allowCode = "1652002"

// setup auto static assets routes
app.use(express.static(path.join(__dirname, 'assets')));


// THESE 2 MIDDLEWEARS ARE FOR PARSING HTML FORM SUBMIT BODY
// parse application/x-www-for  m-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


// THIS MIDDLWEAR IS FOR PARSING COOKIES INTO OBJECT
app.use(cookieParser());

// authentication interceptor
app.use((req, res, next) => {
    if(req.path !== "/login") {
        if(req.cookies.accessCode == allowCode) {
            // user manode
            next();
        } else {
            res.redirect('/login');
    
        }
    } else {
        next()
    }

})

// routes:

const getPath = (relativePath) => {
    return path.join(__dirname, relativePath);
}

const getPage = (name) => {
    const folderPath = `./pages/${name}.html`;
    return getPath(folderPath)
}

app.get('/login', (req, res) => {
    res.sendFile(getPage('login'))
})


app.post('/login', (req, res) => {
    // console.log(req.body.code);
    if(req.body.code == allowCode) {
        // user is allowed
        res.cookie('accessCode', req.body.code);
        res.redirect('/');
    } else {
        // user is not allowed
        res.send('pora');
    }
})
    
// home route (www.examplewebsite.com/)
app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, './pages/index.html'))
  res.sendFile(getPage('index'))
})

app.get('/brighton', (req, res) => {
//   res.sendFile(path.join(__dirname, './pages/index.html'))
  res.sendFile(getPage('brighton-html/index'))
})

app.get('/bd', (req, res) => {
//   res.sendFile(path.join(__dirname, './pages/index.html'))
  res.sendFile(getPage('bd/index'))
})

app.get('/index.html', (req, res) => {
//   res.sendFile(path.join(__dirname, './pages/index.html'))
    res.sendFile(getPage('brighton-html/index'))
})

app.get('/about.html', (req, res) => {
//   res.sendFile(path.join(__dirname, './pages/index.html'))
  res.sendFile(getPage('brighton-html/about'))
})

app.get('/program.html', (req, res) => {
//   res.sendFile(path.join(__dirname, './pages/index.html'))
    res.sendFile(getPage('brighton-html/program'))
})

app.get('/contact.html', (req, res) => {
//   res.sendFile(path.join(__dirname, './pages/index.html'))
  res.sendFile(getPage('brighton-html/contact'))
})
// catch all 404 fallback
app.get('/*', (req, res) => {
    res.status(404).send('THIS IS 404, GO BACK')
})


// server listens to port {port}
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})