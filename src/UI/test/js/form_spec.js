var jsdom = require('jsdom').jsdom;
var should = require('should');

var form = require('../../src/js/form.js');

describe ('Workshop', function () {
    it ('should replace the show workshop form button with the workshop form', function () {
        var stubbed_body = '<body onload="load_page()">' +
            '<button onclick="show_workshop_form()" type="button" id="workshop_form_button">' +
                'Create Workshop' +
            '</button>' +
            '<div id="workshops"></div>' +
        '</body>';

        var doc = jsdom(stubbed_body);

        form.show_form(doc);

        var workshop_form = doc.getElementById('workshop_form');
        workshop_form.id.should.eql('workshop_form');

        var show_workshop_button = doc.getElementById('workshop_form_button');
        should.not.exist(show_workshop_button);
    });

    it ('should replace the workshop form with the show workshop form button', function () {
        var stubbed_body = '<body onload="load_page()">' +
            '<div id="workshop_form"></div>' +
            '<div id="workshops"></div>' +
        '</body>';

        var doc = jsdom(stubbed_body);

        form.hide_form(doc);

        var workshop_form = doc.getElementById('workshop_form');
        should.not.exist(workshop_form);

        var show_workshop_button = doc.getElementById('workshop_form_button');
        show_workshop_button.id.should.eql('workshop_form_button');
    });
});