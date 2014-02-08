(function(w, undefined) {

	function render(city, coords) {
		$('#mainsearch').val(city);
		$('#main').animate({top:'20px'}, 'slow', function () {
			$('#results').slideDown('slow');
		});

		$.post("/places", { city: city, lat: coords['d'], lng: coords['e']}).done(function(res) {
			$('#results').html(res);
		});
	}

	function success(position) {
		var coord, map, latlng, coords, geocoder, city;

		coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

		options = {
			zoom: 15,
			center: coords,
			mapTypeControl: false,
			navigationControlOptions: {
				style: google.maps.NavigationControlStyle.SMALL
			},
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		map 		= new google.maps.Map(document.getElementById("background"), options);
		latlng 		= new google.maps.LatLng(coords['d'], coords['e']);
		geocoder 	= new google.maps.Geocoder();

		geocoder.geocode({'latLng': latlng}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[0]) {
					city = results[0].address_components[2].long_name;
					render(city, coords);
				}
			}
		});
	};

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(success);
	};
})(window);