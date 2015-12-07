var frameModule = require("ui/frame");

function createInterstitial() {
	var currentPage = frameModule.topmost().currentPage;
	currentPage.delegate = GADInterstitialDelegateImpl.new();
	currentPage.interstitial = createAndLoadiOSInterstitial(); 
}

function showInterstitial(args) {
	var interstitial = frameModule.topmost().currentPage.interstitial;

	if(interstitial.isReady) {
		interstitial.presentFromRootViewController(args.object.page.frame.ios.controller);
	}
}

function createAndLoadiOSInterstitial() {
	var interstitial = GADInterstitial.alloc().initWithAdUnitID("ca-app-pub-3940256099942544/4411468910");
	var request = GADRequest.request();
	interstitial.strongDelegateRef = interstitial.delegate = frameModule.topmost().currentPage.delegate;
	request.testDevices = [kGADSimulatorID];
	interstitial.loadRequest(request);

	return interstitial;
}

var GADInterstitialDelegateImpl = (function (_super) {
	__extends(GADInterstitialDelegateImpl, _super);
	function GADInterstitialDelegateImpl() {
		_super.apply(this, arguments);
	}
	GADInterstitialDelegateImpl.prototype.interstitialDidDismissScreen = function (gadinterstitial) {
		frameModule.topmost().currentPage.interstitial = createAndLoadiOSInterstitial();
	};
	GADInterstitialDelegateImpl.ObjCProtocols = [GADInterstitialDelegate];
	return GADInterstitialDelegateImpl;
})(NSObject);

exports.createInterstitial = createInterstitial;
exports.showInterstitial = showInterstitial;