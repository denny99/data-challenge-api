/**
 * Created by jens on 17.01.2017.
 */

var PONS = require('pons.js');

var dictionary = new PONS({lang: ['de', 'en']});

exports.translator = function (word) {
    dictionary.translate(word, jsonTreeData => {
        console.dir(jsonTreeData, {depth: null});
    });
};

