
(function() {

amplify.request.define( "contacts", "ajax", {
	url: "/cgi-bin/datasource-remote.cgi",
	dataType: "json"
});
	
}());
