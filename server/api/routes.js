const router = require('express').Router();


module.exports = function (app,cp) {

	const login = require('./Login')(cp);///
	const actions = require('./Actions')(cp);///
	const history = require('./History')(cp);
	const magazine = require('./Magazine')(cp);//
	const payforms = require('./PayForms')(cp);///
	const products = require('./Products')(cp);///
	const ttPriceList = require('./TTPriceList')(cp);///
	const ttProducts = require('./TTProducts')(cp);///
	const priceList = require('./PriceList')(cp);///
	const ttActions = require('./TTActions')(cp);//
	const ttDiscounts = require('./TTDiscounts')(cp);//
	const ttPayForms = require('./TTPayForms')(cp);//
	const routes = require('./Routes_')(cp);//
	const visitInfo = require('./VisitInfo')(cp);//
	const Warehouse = require('./Warehouse')(cp);//
	const Stocks=require('./Stocks')(cp);
	const TTAnswers=require('./TTAnswers')(cp);
	const TTProdActions=require('./TTProdActions')(cp);
	const MyUsers=require('./MyUsers')(cp);

	router.use('/login', login);//
	router.use('/actions', actions);
	router.use('/history', history);
	router.use('/magazine', magazine);
	router.use('/payforms', payforms);//
	router.use('/products', products);//
	router.use('/ttPriceList', ttPriceList);//
	router.use('/ttProducts', ttProducts);
	router.use('/priceList', priceList);//
	router.use('/ttActions', ttActions);
	router.use('/TTDiscounts', ttDiscounts);
	router.use('/TTPayForms', ttPayForms);
	router.use('/Routes', routes);
	router.use('/VisitInfo', visitInfo);
	router.use('/Warehouse', Warehouse);
	router.use('/stocks', Stocks);
	router.use('/ttAnswers', TTAnswers);
	router.use('/TTProdActions', TTProdActions);
	router.use('/MyUsers', MyUsers);


	router.use('/*', (req, res) => {
		 res.badRequest();
	});

	return router;
};
