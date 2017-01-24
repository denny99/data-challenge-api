/**
 * Created by admin on 24.01.17.
 */
function sortNumber(a, b) {
	return a - b;
}

var estimateModal  = $('#estimateModal');
var titleTd = $('#title');
var minSalaryTd    = $('#minSalary');
var maxSalaryTd    = $('#maxSalary');
var medianSalaryTd = $('#medianSalary');

function createTableRow(user) {
	var row = "<tr>";
	row += "<td>";
	row += user.first_name;
	row += "</td>";

	row += "<td>";
	row += user.last_name;
	row += "</td>";

	row += "<td>";
	row += user.gender;
	row += "</td>";

	row += "<td>";
	row += user.employment.name;
	row += "</td>";

	row += "<td>";
	row += user.employment.title;
	row += "</td>";

	row += "<td>";
	row += "<button class='btn btn-default btn-block estimate' value='" + user.id + "'>Gehalt schätzen</button>";
	row += "</td>";

	row += "</tr>";
	return row;
}

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
			var table = $('#searchResults');
			table.empty();
			result.forEach(function (user) {
				table.append(createTableRow(user));
			});

			$('.estimate').click(function (event) {
				var userId = event.currentTarget.value;
				$.ajax({
					url        : '/api/v1/users/xing/' + userId + '/analyze',
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
			});
		}
	});
});