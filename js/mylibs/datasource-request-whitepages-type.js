
(function( amplify, $, undefined ) {    
    
amplify.request.types.whitepages = function( typeSettings ) {
	typeSettings = $.extend({
		type: "GET",
		dataType: "JSONP",
		api_key: "4c8d6c236f218544d164857fd65f0ad0",
		lastname: "Query",
		firstname: "j*",
		city: null,
		state: null,
		name: null,
		house: null,
		street: null,
		zip: null,
		areacode: null,
		metro: 0,
		baseQuery: "select * from whitepages.search",
		yqlUrlFormat: "http://query.yahooapis.com/v1/public/yql?q={query}&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
	}, typeSettings );

	return function( settings, request ) {        
		var configs = $.extend( {}, typeSettings, settings.data ),
			url = stringFormat( typeSettings.yqlUrlFormat, 
				{ query : encodeURIComponent( buildQuery(configs) ) } );
        
		$.ajax( $.extend({}, typeSettings, {
			url: url,
			type: typeSettings.type,
			data: settings.data,
			dataType: typeSettings.dataType,
			success: function( data, status, xhr ) {
				settings.success( data, xhr, status );
			},
			error: function( xhr, status, error, data ) {
				settings.error( data, xhr, status );
			},
			beforeSend: function( xhr, ajaxSettings ) {
				var ret = typeSettings.beforeSend ?
					typeSettings.beforeSend.apply( this, arguments ) : true;

				return ret && amplify.publish( "request.before.ajax",
					typeSettings, settings, ajaxSettings, xhr );
			}
		}));
	};
};
   
function buildQuery( settings ) {
	var query = settings.baseQuery;

	query += " where api_key='{api_key}' and lastname='{lastname}'";

	if ( settings.firstname ) { query += " and firstname='{firstname}'" }
	if ( settings.city ) { query += " and city='{city}'" }
	if ( settings.state ) { query += " and state='{state}'" }
	if ( settings.name ) { query += " and name='{name}'" }
	if ( settings.house ) { query += " and house='{house}'" }
	if ( settings.street ) { query += " and street='{street}'" }
	if ( settings.zip ) { query += " and zip='{zip}'" }
	if ( settings.areacode ) { query += " and areacode='{areacode}'" }
	if ( settings.metro ) { query += " and metro={metro}" }

	query = stringFormat( query, settings );

	return query;
}

//Inspired by Thomas Fuchs http://bit.ly/tweet-sized-js-template-engine   
function stringFormat( format, settings ) {
	for ( var key in settings ) {
		format = format.replace( new RegExp("{" + key + "}", "g"), settings[key] );
	}

	return format;
}

}( window.amplify = window.amplify || {}, jQuery ));

