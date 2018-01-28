const express = require('express');
const hbs = require('hbs');


var app = express();

var port = process.env.PORT || 8080;
//var port = 3000;

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + "/public"));

app.use((req, res, next)=> {
    var now = new Date().toString();
    
    console.log(`${now}:`);
    next();
});


hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text)=> {
    return text.toUpperCase();
});


app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        currentYear: new Date().getFullYear(),
        message: "'ello yer slag!"
    });
    
});

app.get('/guilded', (req,res) =>{
    res.render('guilded.hbs', {
       pageTitle: 'Guilded' 
    });
});


app.get('/contracts', (req,res) => {
   res.render('contracts.hbs', {
       pageTitle: 'Contracts',
       currentYear: new Date().getFullYear()
   });
});


// /bad - fail - send back json with errorMessage property.
app.get('/bad', (req,res)=> {
    res.send({
        errorMessage: "Dis broke innit"
    });
});


app.listen(port, () => {
    console.log("Server is listening to " + port + ", because it's a nosey bastard. It knows what dodgy sites you like and it thinks you're a dirty whore, but that's okay, it likes it.");
});