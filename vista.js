var express = require('express');

var fortune = require('./lib/fortune.js');

var app = express();

app.set('port', process.env.PORT || 3000);

var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.use(function(req,res,next) {
	res.locals.showTests = app.get('env') !== 'production' &&
		req.query.test === '1';
	next();
});


app.get('/', function(req,res) {
	// res.type('text/plain');
	// res.send("Welcome to Vista Travels");
	res.render('home');
});


app.get('/about', function(req,res) {
	// var randomFortune = fortunes[
	// 	Math.floor(Math.random() * fortunes.length)];
	// res.type('text/plain');
	// res.send("Vista Travels is a travel website");
	res.render('about', {
		fortune : fortune.getFortune(),
		pageTestScript: '/qa/tests-about.js'
	});

});

app.get('/tours/carribean-cruise', function(req, res){
        res.render('tours/carribean-cruise');
});
app.get('/tours/oregon-coast', function(req, res){
        res.render('tours/oregon-coast');
});
app.get('/tours/request-group-rate', function(req, res){
        res.render('tours/request-group-rate');
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