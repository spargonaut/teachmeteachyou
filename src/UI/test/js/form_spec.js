var jsdom = require('jsdom').jsdom;
var should = require('should');

var form = require('../../src/js/form.js');

describe ('Workshop', function () {
    it ('should create a workshop form', function () {
        var stubbed_body = '<body onload="load_page()"></body>';
        var doc = jsdom(stubbed_body);

        var workshop_form = form.show(doc);

        workshop_form.className.should.eql('workshop');
    });

    it ('should have a name input field in the workshop form', function () {
        var stubbed_body = '<body onload="load_page()"></body>';
        var doc = jsdom(stubbed_body);

        var workshop_form = form.show(doc);

        var name_input = workshop_form.getElementsByTagName('input')[0];

        name_input.getAttribute('id').should.eql('name_input');
        name_input.getAttribute('type').should.eql('text');
        name_input.getAttribute('name').should.eql('name_input');
        name_input.getAttribute('title').should.eql('name_input')
    });

    it ('should have a new workshop title input field', function () {
        var stubbed_body = '<body onload="load_page()"></body>';
        var doc = jsdom(stubbed_body);

        var workshop_form = form.show(doc);

        var workshop_title_input = workshop_form.getElementsByTagName('input')[1]

        workshop_title_input.getAttribute('id').should.eql('new_workshop_title');
        workshop_title_input.getAttribute('type').should.eql('text');
        workshop_title_input.getAttribute('name').should.eql('new_workshop_title');
        workshop_title_input.getAttribute('title').should.eql('new_workshop_title');
    });

    it ('should have a workshop details field', function () {
        var stubbed_body = '<body onload="load_page()"></body>';
        var doc = jsdom(stubbed_body);

        var workshop_form = form.show(doc);

        var workshop_details_input = workshop_form.getElementsByTagName('input')[2]

        workshop_details_input.getAttribute('id').should.eql('new_workshop_details');
        workshop_details_input.getAttribute('type').should.eql('text');
        workshop_details_input.getAttribute('name').should.eql('new_workshop_details');
        workshop_details_input.getAttribute('title').should.eql('new_workshop_details');
    });

    it ('should have a submit button', function () {
        var stubbed_body = '<body onload="load_page()"></body>';
        var doc = jsdom(stubbed_body);

        var workshop_form = form.show(doc);

        var submit_button = workshop_form.getElementsByTagName('button')[0];

        submit_button.getAttribute('id').should.eql('workshop_submit');
        submit_button.getAttribute('type').should.eql('button');
        submit_button.getAttribute('onClick').should.eql('createWorkshop()');
    });
});