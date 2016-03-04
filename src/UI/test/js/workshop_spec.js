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

    it ('should have a name input field in the workshop form', function () {
        var stubbed_body = '<body onload="load_page()"></body>';
        var doc = jsdom(stubbed_body);

        var workshop_form = workshop.show_form(doc);

        var name_input = workshop_form.getElementsByTagName('input')[0];

        name_input.getAttribute('id').should.eql('name_input');
        name_input.getAttribute('type').should.eql('text');
        name_input.getAttribute('name').should.eql('first_name');
        name_input.getAttribute('title').should.eql('first_name_want_to_learn')
    });
});