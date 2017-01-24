/**
 * Created by admin on 24.01.17.
 */
$('#searchButton').click(function () {
	$.ajax({
		url        : '/api/v1/users/search',
		method     : 'get',
		contentType: 'application/json',
		dataType   : 'json',
		data       : {
			keywords: $('#searchInput').val()
		},
		success    : function (result) {
			//TODO add trs
		}
	});
});