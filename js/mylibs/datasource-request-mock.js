
(function() {

amplify.request.define( "contacts", function( settings ) {
	settings.success({
	   "contacts": [{
			"guid": 1,
			"firstName": "John",
			"middleName": "E",
			"lastName": "Query",
			"street": "",
			"city": "Boston",
			"state": "MA",
			"zip": "",
			"country": "USA"
		}, {
			"guid": 2,
			"firstName": "Julian",
			"middleName": "",
			"lastName": "Query",
			"street": "",
			"city": "Brussels",
			"state": "",
			"zip": "",
			"country": "Belgium"
		}, {
			"guid": 3,
			"firstName": "Jorn",
			"middleName": "",
			"lastName": "Query",
			"street": "",
			"city": "Cologne",
			"state": "",
			"zip": "",
			"country": "Germany"
		}]
	});
});

}());
