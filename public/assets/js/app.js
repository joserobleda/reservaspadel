(function(w, undefined) {

	function render(city) {
		$('#mainsearch').val(city);
		$('#main').animate({top:'15px'}, 'slow', function () {
			$('#results').show().animate({ height: "450px" }, 1500);
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
					render(city);
				}
			}
		});
	};

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(success);
	};
})(window);