/**
 * Created by jens on 11.01.2017.
 */
function sortNumber(a, b) {
	return a - b;
}

var estimateModal   = $('#estimateModal');
var titleTd         = $('#title');
var minSalaryTd     = $('#minSalary');
var maxSalaryTd     = $('#maxSalary');
var medianSalaryTd  = $('#medianSalary');
var userIdInput     = $('#userIdInput');
var xingIdInput     = $('#xingIdInput');
var linkedInIdInput = $('#linkedInIdInput');

function estimate(network) {
	var userId = network === 'xing' ? xingIdInput.val() : linkedInIdInput.val();
	$.ajax({
		url        : '/api/v1/users/' + network + '/' + userId + '/analyze',
		method     : 'get',
		contentType: 'application/json',
		dataType   : 'json',
		data       : {
			keywords: $('#searchInput').val()
		},
		success    : function (result) {
			var salaryMin = [result[0].salaryMin, result[1].salaryMin];
			salaryMin.sort(sortNumber);
			var salaryMax = [result[0].salaryMax, result[1].salaryMax];
			salaryMax.sort(sortNumber);
			var salaryMedian = [result[0].salaryMedian, result[1].salaryMedian];
			salaryMedian.sort(sortNumber);

			titleTd.html(result[0].jobTitle);
			minSalaryTd.html(salaryMin[0] + '-' + salaryMin[1]);
			maxSalaryTd.html(salaryMax[0] + '-' + salaryMax[1]);
			medianSalaryTd.html(salaryMedian[0] + '-' + salaryMedian[1]);
			estimateModal.modal('show');
		},
		error      : function (err) {
			if (err.status === 403) {
				$.growl.error({title: '', message: "Gehaltschätzung wurde nicht genehmigt."});
			}
		}
	});
}

$('#saveButton').click(function () {
	$.ajax({
		url        : '/api/v1/users/' + userIdInput.val(),
		method     : 'put',
		contentType: 'application/json',
		dataType   : 'json',
		data       : JSON.stringify({
			userId: userIdInput.val(),
			share : $('#shareCb').is(':checked') ? 1 : 0
		}),
		success    : function (result) {
			$.growl.notice({title: '', message: "Änderung gespeichert!"});
		}
	});
});

$('#estimateXing').click(function () {
	estimate('xing');
});
$('#estimateLinkedIn').click(function () {
	estimate('linkedIn');
});