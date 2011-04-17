
(function( amplify, $, undefined ) {

amplify.request.decoders.whitepagesDecoder = 
	function ( data, status, xhr, success, error ) {
		if ( status === "success" ) {
			success({ contacts: transform(data) });
		} else if ( status === "fail" || status === "error" ) {
			error( data.message, status );
		} else {
			error( data.message , "fatal" );
		}
	};

function transform( data ) {
	return $.map( data.query.results.wp.listings.listing, 
		function( contact ) {
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
}

}( window.amplify = window.amplify || {}, jQuery ));

