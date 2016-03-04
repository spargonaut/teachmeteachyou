var jsdom = require('jsdom').jsdom;
var should = require('should');

var workshop = require('../../src/js/workshop');

describe ('Workshop', function () {
    it ('sohuld create a workshop form', function () {
        var stubbed_body = '<body onload="load_page()"></body>';
        var doc = jsdom(stubbed_body);

        var workshop_form = workshop.show_form(doc);

        workshop_form.className.should.eql('workshop');
    });
});