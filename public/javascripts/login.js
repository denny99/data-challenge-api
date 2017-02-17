/**
 * Created by jens on 11.01.2017.
 */

$('#loginButton').click(function () {
	$.ajax({
		url     : "/api/v1/users/authenticate/basic",
		username: $('#inputUsername').val(),
		password: $('#inputPassword').val(),
		success : function (result) {
			window.location = '/dashboard';
		}
	});
});