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

	var cities = ["Almería","Roquetas de Mar","Cádiz","Algeciras","Chiclana de la Frontera","Jerez de la Frontera","Puerto de Santa María","San Fernando","San Roque","Córdoba","Granada","Atarfe","Huelva","Aljaraque","Jaén","Málaga","Benahavís","Benalmádena","Estepona","Marbella","Sevilla","Alcalá de Guadaíra","Dos Hermanas","Espartinas","Mairena del Aljarafe","Rinconada","Huesca","Teruel","Zaragoza","Oviedo","Gijón","Palma de Mallorca","Palmas de Gran Canaria","Santa Cruz de Tenerife","Adeje","Santander","Ávila","Burgos","León","Ponferrada","Palencia","Salamanca","Segovia","Soria","Valladolid","Zamora","Albacete","Ciudad Real","Cuenca","Guadalajara","Toledo","Barcelona","Castellar del Vallés","Castelldefels","Mataró","Sabadell","Sant Cugat del Vallés","Terrassa","Viladecans","Girona","Lleida","Tarragona","Cambrils","Reus","Ceuta","Madrid","Alcalá de Henares","Alcobendas","Alcorcón","Aranjuez","Arganda del Rey","Boadilla del Monte","Fuenlabrada","Leganés","Majadahonda","Móstoles","Parla","Pozuelo de Alarcón","Rivas-Vaciamadrid","Rozas de Madrid","San Sebastián de los Reyes","Torrejón de Ardoz","Tres Cantos","Villanueva de la Cañada","Villaviciosa de Odón","Alicante","Benidorm","Elx","Orihuela","Sant Joan d Alacant","Castellón de la Plana","Valencia","el Torrent","Eliana","Paterna","Sagunto/Sagunt","Xàtiva","Badajoz","Mérida","Cáceres","La Coruña","Lugo","Ourense","Pontevedra","Vigo","Logroño","Melilla", "Pamplona Iruña","Vitoria-Gasteiz","San Sebastián","Bilbao","Getxo","Murcia","Cartagena","Molina de Segura"];
	 
	$('#mainsearch').typeahead({local: cities})
	.on('typeahead:selected', function(e){
     	$.post("/places", { city: $(this).val() }).done(function(res) { 
			$('#results').html(res);
		});
   });


})(window);