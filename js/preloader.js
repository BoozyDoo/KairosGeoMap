/* Display Loading message and spinner */

function launchPreLoader()
{
	console.log("launchPreLoader Hit");
 	$.mobile.loader.prototype.options.text = "loading";
  	$.mobile.loader.prototype.options.textVisible = false;
  	$.mobile.loader.prototype.options.theme = "a";
  	$.mobile.loader.prototype.options.html = "";
  	$.mobile.loading( 'show', {
	text: 'loading please wait...',
	textVisible: true,
});
	loadFunction();
};