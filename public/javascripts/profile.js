/**
 * Created by jens on 11.01.2017.
 */
$('#saveButton').click(function () {
	$.ajax({
		url        : '/api/v1/users/' + $('#userIdInput').val(),
		method     : 'put',
		contentType: 'application/json',
		dataType   : 'json',
		data       : JSON.stringify({
			userId: $('#userIdInput').val(),
			share : $('#shareCb').is(':checked') ? 1 : 0
		}),
		success    : function (result) {
			window.location = '/profile';
		}
	});
});