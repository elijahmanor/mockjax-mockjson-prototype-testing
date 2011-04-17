
// http://docs.jquery.com/QUnit
// https://github.com/mmonteleone/pavlov
// http://mwbrooks.github.com/dominator.js

QUnit.specify.globalApi = true;
QUnit.specify("QUnit Test Suite", function() {

   describe( "Contact Manager", function() {
      var contacts =  [
         { guid: 1, "firstName": "John", "middleName": "E", "lastName": "Query", 
            "street": "", "city": "Boston", "state": "MA", "zip": "", "country": "USA" }, 
         { guid: 2, "firstName": "Julian", "middleName": "", "lastName": "Query", 
            "street": "", "city": "Brussels", "state": "", "zip": "", "country": "Belgium" }, 
         { guid: 3, "firstName": "Jorn", "middleName": "",  "lastName": "Query", 
            "street": "", "city": "Cologne", "state": "", "zip": "", "country": "Germany" }
      ], timeToWait = 500;
       
      before( function() {
         $.mockjax({
	         url: "/cgi-bin/datasource-remote.cgi",
	         contentType: 'text/json',
	         dataType: 'json',
	         responseText: { "contacts": contacts }
         });

         contactManager.init();
         contactManager.getList();
      });

      after( function() {
         $.mockjaxClear();
      });

      describe( "Contact List", function() {

         it( "should return 3 contacts", function() {
            wait( timeToWait, function() {
               assert( $("#developers tbody tr").length ).equals( 3 );
            });
         });

         it( "should match the contacts that was provided", function() {
            wait( timeToWait, function() {
               assert( $("#developers tbody tr:eq(0)" ) ).matchesColumns( rowColumns(contacts[0]) );
               assert( $("#developers tbody tr:eq(1)" ) ).matchesColumns( rowColumns(contacts[1]) );
               assert( $("#developers tbody tr:eq(2)" ) ).matchesColumns( rowColumns(contacts[2]) );
            });

            function rowColumns( contact ) {
               return [contact.firstName, contact.middleName, contact.lastName, contact.city, contact.country];
            }
         });

         it( "should not be showing the details form", function() {
            wait( timeToWait, function() {
               assert( $("#developer") ).isEmpty();
            });
         });

         it( "should not be showing the edit form", function() {
            wait( timeToWait, function() {
               assert( $("#developer-form") ).isEmpty();
            });
         });

      });

      describe( "Contact Details", function() {

         before( function() {
            wait( timeToWait, function() {
               $( "#developers tbody tr:first" ).trigger( "click" );
            });
         });

         after( function() {
         });

         it( "should show a read only view of the grid row", function() {
            wait( timeToWait, function() {
               assert( $("#developer") ).hasContent();
            });
         });

         it( "should display the data of the contact selected", function() {
            wait( timeToWait, function() {
               var developer = $( "#developer" ),
                  contact = contacts[0];

               assert( developer.find( ".full-name" ).text() ).isEqualTo( 
                  contact.firstName + " " + contact.middleName + " " + contact.lastName );
               assert( developer.find( ".address" ).text() ).isEqualTo( 
                  contact.city + ", " + contact.state );
               assert( developer.find( ".country" ).text() ).isEqualTo( contact.country );
            });
         });

      });

      describe( "Contact Edit", function() {

         before( function() {
            wait( timeToWait, function() {
               $( "#developers tbody tr:first" ).trigger( "click" );
            });
         });

         after( function() {
         });

         it( "should show the edit modal dialog with the inputs filled in", function() {
            assert( $("#developer-form") ).hasContent();
         });

         it( "should default the inputs with the contact selected", function() {
            var form = $( "#developer-form" ), 
               contact = contacts[0];

            assert( form.find( "input[name=firstName]" ).val() ).isEqualTo( contact.firstName );
            assert( form.find( "input[name=middleName]" ).val() ).isEqualTo( contact.middleName );
            assert( form.find( "input[name=lastName]" ).val() ).isEqualTo( contact.lastName );
            assert( form.find( "input[name=street]" ).val() ).isEqualTo( contact.street );
            assert( form.find( "input[name=city]" ).val() ).isEqualTo( contact.city );
            assert( form.find( "input[name=zip]" ).val() ).isEqualTo( contact.zip );
            assert( form.find( "input[name=country]" ).val() ).isEqualTo( contact.country );
         });

         it( "should update the grid with the updated values once saved", function() {
            $( "#developer-form" ).find( "input[name=firstName]" ).val( "Mike" ).end()
               .find( "input[type=submit]" ).trigger( "submit" );

            wait( 1000, function() {
               var cell = $("#developers tbody tr:eq(0)" ).find( "td:eq(0)" ); 

               assert( cell.text() ).isEqualTo( "Mike" );
            });
         });

      });

   });

});

QUnit.specify.extendAssertions({
   matchesColumns: function(actual, expected, message) {
      var i, length = expected.length, columns = actual.find( "td" );

      for ( i = 0; i < length; i++ ) {
         ok( columns.eq(i).text() === expected[i], message );
      }
   },
   isEmpty: function( actual, message ) {
      ok( actual.html().length === 0, message );         
   },
   hasContent: function( actual, message ) {
      ok( actual.html().length > 0, message );
   },
   isVisible: function(actual, message) {
      ok( actual.is( ":visible" ), message );
   },
   isHidden: function(actual, message) {
      ok( !actual.is( ":visible" ), message );          
   }
});

