
(function() {

/*
amplify.request.define( "contacts", "ajax", {
	url: "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20whitepages.search%20where%20api_key%20%3D%20'4c8d6c236f218544d164857fd65f0ad0'%20and%20firstname%20%3D%20'{firstname}'%20and%20lastname%20%3D%20'{lastname}'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
	dataType: "jsonp",
	decoder: function( data, status, xhr, success, error ) {
		var transformed = $.map( data.query.results.wp.listings.listing, function( contact ) {
			var person = contact.people.person[0],
				address = contact.address;
         
			if ( !person ) return null;

			return {
				"id": 0,
				"firstName": person.firstname,
				"middleName": person.middlename,
				"lastName": person.lastname,
				"street": address.fullstreet,
				"city": address.city,
				"state": address.state,
				"zip": address.zip,
				"country": address.country
			};
		});

		success( { contacts : transformed } );
	}
});
*/

// Wouldn't be nice if you could do something like this instead?
amplify.request.define( "contacts", "whitepages", {
	decoder: "whitepagesDecoder"
});

}());

