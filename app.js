'use strict';

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

var azbn = new require(__dirname + '/../../../../../../system/bootstrap')({
	
});

var app = azbn.loadApp(module);

var argv = require('optimist').argv;

azbn.setMdl('config', require('./config/main'));


const puppeteer = require('puppeteer');

let runTask = async function() {
	
	let runTask_result = '';
	
	const browser = await puppeteer.launch({
		headless : false,
		ignoreHTTPSErrors : true,
		args :[

		],
		devtools : false,
		//userDataDir : '',
		//executablePath : '',
		//slowMo : 250,
	});
	
	const page = await browser.newPage();

	await page.setUserAgent('DevAzbn');

	await page.setViewport({
		width : 1024,
		height : 768,
		//deviceScaleFactor : 1,
		//isMobile : true,
		//hasTouch : true,
		//isLandscape : true,
	});
	
	page.on('console', function(msg){
		console.log('puppeteer log:', msg.args);
	});

	page.on('dialog', async function(dialog){
		сonsole.log(dialog.message());
		//dialog.accept([promptText])
		await dialog.dismiss();
		//await browser.close();
	});
	
	await page.goto('https://yandex.ru/', {
		waitUntil : [
			'domcontentloaded',
			//'load',
			//'networkidle2',
		],
	});
	
	//await page.waitFor(500);

	//https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md
	
	//await page.mainFrame().$(selector)
	//page.mainFrame().url()
	//await page.$(selector)
	//await page.$$(selector)
	//await page.$eval('link[rel=preload]', el => el.href);
	//await page.$$eval('div', divs => divs.length);
	//await page.click('.test', {
	//	button <string> left, right, or middle, defaults to left.
	//	clickCount <number> defaults to 1. See UIEvent.detail.
	//	delay <number> Time to wait between mousedown and mouseup in milliseconds. Defaults to 0.
	//});
	//await page.type('#mytextarea', 'World', {delay: 100});
	//await page.waitForSelector(selector[, options])
	//await page.mainFrame().waitForFunction('window.innerWidth < 100');
	//await page.keyboard.type(CREDS.username);
	//await page.waitForNavigation();
	//await page.mainFrame().addScriptTag({
	//	url : '',
	//	path : '',
	//	content : '',	
	//})
	//await page.addStyleTag(options)
	//await page.authenticate({
	//	username : '',
	//	password : '',
	//})
	//await page.cookies(...urls)
	//await page.deleteCookie(...cookies)
	//await page.emulate(options)
	//await page.waitFor(selectorOrFunctionOrTimeout[, options[, ...args]])

	//const inputElement = await page.$('input[type=submit]');
	//await inputElement.click();

	//elementHandle.boundingBox()

	//elementHandle.uploadFile(...filePaths)
	
	runTask_result = await page.evaluate(function(){
		let title = document.querySelector('title').innerText;
		return title;
	});

	await page.waitFor(500);
	
	await page.waitForSelector('.input__control.input__input#text');
	await page.type('.input__control.input__input#text', 'лес', {
		delay : 92,
	});

	await page.waitFor(500);

	await page.click('.search2__button button', {
		button : 'left',
		clickCount : 1,
		delay : 92,
	});

	await page.waitFor(500);

	await page.waitForNavigation({
		waitUntil : [
			'domcontentloaded',
			//'load',
		],
	});

	//await page.waitForSelector('.input__control[name="text"]');
	await page.type('.input__control[name="text"]', 'master', {
		delay : 92,
	});

	await page.keyboard.press('Delete');
	await page.keyboard.press('Delete');
	await page.keyboard.press('Delete');

	await page.waitFor(500);

	await page.click('.search2__button button', {
		button : 'left',
		clickCount : 1,
		delay : 92,
	});

	await page.waitFor(1500);
	
	//await page.waitForSelector('.input__control[name="text"]');
	
	await page.screenshot({
		path : './data/yandex.ru.png',
		fullPage : true,
	});
	
	/*
	await page.waitFor(1000);

	await page.pdf({
		path : './data/yandex.ru.pdf',
		format : 'A4',
	});
	*/

	await browser.close();
	
	return runTask_result;
	
}

runTask().then(function(value){
    console.log(value);
});
