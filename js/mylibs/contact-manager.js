
var contactManager = (function( $, undefind ) {
	var pub = {}, formItem, form;

	pub.init = function() {
		$.ui.dataitem.extend( "developer", {
			fullName: function() {
				return this.get( "firstName" ) + " " + this.get( "lastName" );
			}
		});

		$.ui.datasource({
			type: "developer",
			source: function( request, response ) {
				/* Uses local JSON file */
				$.getJSON( "/js/mylibs/datasource-local.js", 
					{ firstname: "j*", lastname: "Query" }, 
					function( data ) { 
						response( data.contacts );
					}
				);
			}
		});

		form = $( "#developer-form" ).submit( function(e) {
			var $this = $( this ),
				serialized = $this.children( "form" ).serializeArray(),
				item = formItem.options.data;

			$.each( serialized, function( i, field ) {
				item[ field.name ] = field.value;
			});

			$( "#developers" ).grid( "refresh" );
			$this.fadeOut( function() { $( this ).empty() } );
			$( "#developer" ).fadeOut( function() { $( this ).empty() } );

			e.preventDefault();
		});
	};

	pub.getList = function() {
		$( "#developers" ).grid({
			type: "developer",
			rowTemplate: $( "#row-tmpl" ).html(),
			select: this.showDetails
		});
	};

	pub.showDetails = function( e, ui ) {
		formItem = ui.item;

		$( "#developer-form-tmpl" )
			.tmpl( ui.item.options.data )
			.appendTo( form.empty() );
		$( "#developer-form" ).fadeIn();

		$( "#developer-tmpl" )
			.tmpl( ui.item.options.data )
			.appendTo( $("#developer").empty() );
		$( "#developer" ).fadeIn();
	};

   return pub;

}( jQuery ));

