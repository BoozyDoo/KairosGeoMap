/* Listen For Signal that Device is ready */

function launchPreLoader()
{
	console.log("launchPreLoader Hit");
	if (navigator.userAgent.match(/Android/)) 
	{
        document.addEventListener("deviceready", onDeviceReady, false);
	} 
	else 
	{
		console.log("loadFunction Hit");
		onDeviceReady();
	}
};
