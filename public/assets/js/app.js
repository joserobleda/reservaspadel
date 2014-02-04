(function(w, undefined) {
	function success(position) {
		var coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

		var options = {
			zoom: 15,
			center: coords,
			mapTypeControl: false,
			navigationControlOptions: {
				style: google.maps.NavigationControlStyle.SMALL
			},
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(document.getElementById("background"), options);
	}

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(success);
	}
})(window);