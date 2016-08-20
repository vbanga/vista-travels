var express = require('express');

var app = express();

app.set('port', process.env.PORT || 3000);

var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req,res) {
	// res.type('text/plain');
	// res.send("Welcome to Vista Travels");
	res.render('home');
});

var fortunes = [
        "Conquer your fears or they will conquer you.",
        "Rivers need springs.",
        "Do not fear what you don't know.",
        "You will have a pleasant surprise.",
        "Whenever possible, keep it simple.",
];

app.get('/about', function(req,res) {
	var randomFortune = fortunes[
		Math.floor(Math.random() * fortunes.length)];
	// res.type('text/plain');
	// res.send("Vista Travels is a travel website");
	res.render('about', {fortune : randomFortune});
});

app.use(function (req,res) {
	// res.type('text/plain');
	res.status(404);
	// res.send('404 - Not Found');
	res.render('404');
});

app.use(function (err,req,res,next) {
	// console.error(err.stack);
	// res.type('text/plain');
	res.status(500);
	// res.send('500 - Node server error');
	res.render('500');
});

app.listen(app.get('port'), function() {
	console.log("Express started on localhost. Listening on: " + app.get('port'));
});