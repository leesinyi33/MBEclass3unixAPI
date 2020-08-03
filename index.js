var express = require('express'); // call express module
var app = express(); // define our app using express, create a server express assigned it to app
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // import body parser module

var port = process.env.PORT || 8080; // set our port
var router = express.Router();
router.get('/', (req, res)=>{
 res.json({message:'yeahhh! welcome to our api!'})
})
router.get('/timestamp/:date', (req, res)=>{
	if(parseInt(req.params.date*1000)) {
 		res.json({"unix":req.params.date, "utc":new Date(req.params.date*1000)})
 	} else {
 		if (new Date(req.params.date) != "Invalid Date"){
 			res.json({"unix":req.params.date,
 				"utc":(new Date(req.params.date)).getTime()/1000})
 		}
 		else {
 			res.json({"error" : "Invalid Date"})
 		}
 	}
})
/*router.get('/goodbye/:name', (req, res)=>{
 res.json({message:'Goodbye '+req.params.name})
})
router.post('/sum', (req, res)=>{
	var sum = req.body.num1+req.body.num2
	res.json({message:"The sum is "+sum})
})*/
app.use('/api', router);
app.listen(port);
console.log('Magic happens on port ' + port);