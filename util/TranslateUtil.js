/**
 * Created by jens on 17.01.2017.
 */

var PONS = require('pons.js');

var dictionary = new PONS({lang: ['de', 'en']});

/**
 * translates concatenated words
 * @param word
 * @param cb
 */
exports.translate = function (word, cb) {
	function translate(current) {
		if (current < words.length) {
			var word = words[current];
			current++;
			dictionary.translate(word, function (err, json) {
				if (err || json.length === 0) {
					result += ' ' + word;
				}
				for (var i = 0, l = json.length; i < l; i++) {
					var object = json[i];
					if (object.from === 'de' && object.to === 'en') {
						result += ' ' + object.words[0].words[0].words[0].result;
					}
				}
				translate(current);
			});
		}
		else {
			return cb(result);
		}
	}

	var words  = word.split(/\s|-/g);
	var result = '';
	translate(0);

};

