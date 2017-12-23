"use strict";

$(document).ready(function() {
	/*
		This file shows how client-side javascript can be included via a plugin.
		If you check `plugin.json`, you'll see that this file is listed under "scripts".
		That array tells NodeBB which files to bundle into the minified javascript
		that is served to the end user.

		Some events you can elect to listen for:

		$(document).ready();			Fired when the DOM is ready
		$(window).on('action:ajaxify.end', function(data) { ... });			"data" contains "url"
	*/

	console.log('nodebb-plugin-quickstart: loaded');
	// Note how this is shown in the console on the first load of every page
});



(function () {
	"use strict";

	$(window).on('action:topic.loaded', function (event, data) {
		//resortComments();
		console.log('action:topic.loaded'+data);
	});


	$(window).on('action:posts.onNewPost', function (event, data) {
		//resortComments();
		console.log('action:posts.onNewPost'+data);
	});
	$(window).on('posts.onNewPost', function (event, data) {
		//resortComments();
		console.log('posts.onNewPost'+data);
	});
	$(window).on('event:new_post', function (event, data) {
		//resortComments();
		console.log('event:new_post'+data);
	});






	function resortComments(){
		$( ".posts li" ).each(function( index ) {
			if( $(this).data('parent') &&  !$(this).data('sorted')){
				$(this).data('sorted',"y");
				$('*[data-pid="'+$(this).data('parent')+'"]').append(this);
			}
		});
	}

}());