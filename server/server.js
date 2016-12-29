var express  = require("express");
var path = require("path");
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var cookieParser = require('cookie-parser');
var sql = require('mssql');
var configs = require('../properties');
var cookie = require('cookie');
var escapeHtml = require('escape-html');
var https = require('https');
var fs = require('fs');
var url = require('url');
var cookieEncrypter = require('cookie-encrypter');
const uuidV1 = require('uuid/v1');

var socketServer = require('./socket-server/index') ;
//cp - connection pool to MS SQL DataBase
var cp = new sql.Connection(configs.db,function(err){
	if(err){
		console.log(err);
	}
	console.log("connected to db");
}); 
console.log( process.env.NODE_ENV);
const isDeveloping =process.env.NODE_ENV == 'production';

const httpsOptions = {
	cert: fs.readFileSync(path.join(__dirname,'ssl','server.crt')),
	key:  fs.readFileSync(path.join(__dirname,'ssl','server.key'))
}

var config;

if(isDeveloping){
	 config= require("../webpack.config.js");
}
else{
	 config = require("../webpackdev.config.js");
}

const bodyParser = require('body-parser');



var app = express();
app.use(cookieParser(configs.secretKey));
app.use(cookieEncrypter(configs.secretKey));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get("/SendData", (req,res)=>{
	if(req.signedCookies && req.signedCookies.UserDao){
		res.sendFile(path.resolve('client/Routes.html'));
	}
	else{
		res.redirect('/');
	}
	
});


app.get("/Preload", (req,res)=>{
	if(req.signedCookies && req.signedCookies.UserDao){
		res.sendFile(path.resolve('client/Routes.html'));
	}
	else{
		res.redirect('/');
	}
	
});

app.get("/Home", (req,res)=>{
	if(req.signedCookies && req.signedCookies.UserDao){
		res.redirect('/Preload');
	}
	else{
		res.redirect('/');
	}
});
app.get("/DaylyReport", (req,res)=>{
	if(req.signedCookies && req.signedCookies.UserDao){
		res.redirect('/Preload');
	}
	else{
		res.redirect('/');
	}
});
app.get("/Documents", (req,res)=>{
	if(req.signedCookies && req.signedCookies.UserDao){
		res.redirect('/Preload');
	}
	else{
		res.redirect('/');
	}
});
app.get("/Routes", (req,res)=>{
	if(req.signedCookies && req.signedCookies.UserDao){
		res.redirect('/Preload');
	}
	else{
		res.redirect('/');
	}
});
app.get("/TT/*", (req,res)=>{
	if(req.signedCookies && req.signedCookies.UserDao){
		res.redirect('/Preload');
	}
	else{
		res.redirect('/');
	}
});
app.get("/Camera", (req,res)=>{
	if(req.signedCookies && req.signedCookies.UserDao){
		res.redirect('/Preload');
	}
	else{
		res.redirect('/');
	}
});
app.get("/Gallery", (req,res)=>{
	if(req.signedCookies && req.signedCookies.UserDao){
		res.redirect('/Preload');
	}
	else{
		res.redirect('/');
	}
});
app.get("/Orders", (req,res)=>{
	if(req.signedCookies && req.signedCookies.UserDao){
		res.redirect('/Preload');
	}
	else{
		res.redirect('/');
	}
});
app.get("/Order", (req,res)=>{
	if(req.signedCookies && req.signedCookies.UserDao){
		res.redirect('/Preload');
	}
	else{
		res.redirect('/');
	}
});
app.get("/Stocks", (req,res)=>{
	if(req.signedCookies && req.signedCookies.UserDao){
		res.redirect('/Preload');
	}
	else{
		res.redirect('/');
	}
});

app.post("/Images", (req,res)=>{
	const coockie = JSON.parse(req.signedCookies.UserDao)[0];
    const UserLogin = coockie.UserLogin;
    const imgFolder = path.join(configs.files_folder,UserLogin)
    if (!fs.existsSync(imgFolder)) {
    	fs.mkdirSync(imgFolder);
    }
    const imgName = uuidV1()+'.jpeg';
	const imm = req.body.data.replace(/^data:image\/jpeg;base64,/, "");
	const buf = new Buffer(imm, 'base64'); 

	const responseVal = path.join(UserLogin,imgName);
	const imagePath = path.join(configs.files_folder, responseVal);
	fs.writeFile(imagePath, buf, function(err) {
		if(err) {
			console.log("err", err);
		} 
		else {
			return res.json({id:req.body.id, path :responseVal });
		}
	})
})


app.get("/Image/:id", (req,res)=>{
	 const filePath = path.join(configs.files_folder, req.params.id);
	 if (fs.existsSync(filePath)) {
	 	res.sendFile (path.resolve(filePath));
	 }
	 else{
	 	res.sendFile(path.resolve('dist/files/ic_tag_faces_black_24dp_2x.png'));
	 }
	 
	 // res.status(200).json({id:req.params.id});
});
// app.get("/Test", (req,res)=>{
// 	res.sendFile(path.resolve('client/test.html'));
// });



if(!isDeveloping){
	var compler = webpack(config);
	app.use(webpackDevMiddleware(compler,{noInfo: true, publicPath: config.output.publickPath}));
	app.use(webpackHotMiddleware(compler));
}



app.use(express.static("./dist"));
//api routes
const routes = require('./routes')(app,cp);

app.get('/',function (req,res){
	if(req.signedCookies && req.signedCookies.UserDao){
		res.redirect('/Preload');
	}
	else{
		res.sendFile(path.resolve('client/Login.html'));
	}
	
});


var port = configs.port;


var httpsServer = https.createServer(httpsOptions, app);


var httpServer =app.listen(port+1);


var server = httpsServer.listen(port,function(error){
	if(error){
		console.log(error);
	}
	console.info('==> Listening on port %s. Open up http://127.0.0.1:%s/ in your browser.', port, port);
});

socketServer(server,cp);
module.exports = server;