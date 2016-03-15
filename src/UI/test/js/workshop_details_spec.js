var should = require('should');
var jsdom = require('jsdom').jsdom;

var workshop_details = require('../../src/js/workshop_details.js');

describe ('Workshop Details', function () {
    it('should replace the contents of the body tag with the workshop details', function () {
        var stubbed_body = '<body onload="load_page()">' +
                    '<button onclick="show_workshop_form()" type="button" id="workshop_form_button">' +
                        'Create Workshop' +
                    '</button>' +
                    '<div id="workshops"></div>' +
                '</body>';
        var doc = jsdom(stubbed_body);

        workshop_details.show(doc);

        var workshop_details_display = doc.getElementById('workshop_details');
        workshop_details_display.id.should.eql('workshop_details');

        var body = doc.getElementsByTagName('body')[0];
        body.childElementCount.should.eql(1);
    });
});