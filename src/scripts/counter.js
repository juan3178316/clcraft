function setSecondsPage(time=null) {
	let getDivCounter = document.getElementById('show-counter');
	if (typeof time !== 'number' || time <= 0) {
		getDivCounter.innerHTML = '<h4 style="color: red;"> please, put a integer value</h4>'
	}
	else {
		getDivCounter.innerHTML = `<p>redirect in ${time} seconds...</p>`
	};
}

setSecondsPage(5);