(function( $, undefined ) {

$.mockjax({
	url: "/service/datasource-remote.php",
	contentType: "text/json",
	dataType: "json",
	responseTime: 750,
	responseText: $.mockJSON.generateFromTemplate({
        "contacts|50-500": [{
			"guid|1-1000": 0,
			"firstName": "@MALE_FIRST_NAME",
			"middleName": "@LETTER_UPPER",
			"lastName": "@LAST_NAME",
			"street" : "@LOREM",
			"city": "@CITY_NAME",
			"state": "@STATE_ABBREVIATION",
			"zip|5-5": "@NUMBER", 
			"country": "@COUNTRY_NAME",
		}]
	})
});

}( jQuery ));
