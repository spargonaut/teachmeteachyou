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
        name_input.getAttribute('name').should.eql('name_input');
        name_input.getAttribute('title').should.eql('name_input')
    });

    it ('should have a new workshop title input field', function () {
        var stubbed_body = '<body onload="load_page()"></body>';
        var doc = jsdom(stubbed_body);

        var workshop_form = workshop.show_form(doc);

        var workshop_title_input = workshop_form.getElementsByTagName('input')[1]

        workshop_title_input.getAttribute('id').should.eql('new_workshop_details');
        workshop_title_input.getAttribute('type').should.eql('text');
        workshop_title_input.getAttribute('name').should.eql('new_workshop_details');
        workshop_title_input.getAttribute('title').should.eql('new_workshop_details')
    });
});