var frameModule = require("ui/frame");

function createInterstitial(page) {

	var currentPage = frameModule.topmost().currentPage;
	var interstitial = new com.google.android.gms.ads.InterstitialAd(currentPage._context);
	interstitial.setAdUnitId("ca-app-pub-3940256099942544/1033173712");
	
	var MyAdListener = com.google.android.gms.ads.AdListener.extend(
	{
		onAdClosed: function() {
			loadAndroidAd(interstitial);
		},
		onAdLeftApplication: function() {
			// do sth as the user is leaving the app, because of a clicked ad
			console.log("Leaving the app, bye bye!");
		}
	});		
	var listener = new MyAdListener();		
	interstitial.setAdListener(listener);

	loadAndroidAd(interstitial);
			
	currentPage.interstitial = interstitial;
}

function showInterstitial(args) {
	var interstitial = frameModule.topmost().currentPage.interstitial;

	if (interstitial.isLoaded()) {
		interstitial.show();
	}
}

function loadAndroidAd(interstitial) {
	var adRequest = new com.google.android.gms.ads.AdRequest.Builder();
	adRequest.addTestDevice(com.google.android.gms.ads.AdRequest.DEVICE_ID_EMULATOR);
	var requestBuild = adRequest.build();			
	interstitial.loadAd(requestBuild);
}

exports.createInterstitial = createInterstitial;
exports.showInterstitial = showInterstitial;