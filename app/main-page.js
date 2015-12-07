var vmModule = require("./main-view-model");
var platformModule = require("platform");
var frameModule = require("ui/frame");

var interstitialModule = require("./interstitial");

function pageLoaded(args) {
	var page = args.object;
	page.bindingContext = vmModule.mainViewModel;
	
	interstitialModule.createInterstitial();
}

function buttonTapped(args) {
	interstitialModule.showInterstitial(args);
}

exports.pageLoaded = pageLoaded;
exports.buttonTapped = buttonTapped;