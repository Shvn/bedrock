/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

(function(w, $) {
    'use strict';

    var client = w.Mozilla.Client;

    function showDownloadButtons() {
        // hide the footer download button and extend email form to full width
        $('#download-wrapper').show();
        $('#subscribe-wrapper').addClass('columned');

        // show the download button on the overview page intro section
        $('#overview-intro-download-wrapper').fadeIn('fast');

        // show download button in sticky nav on overview page
        $('#sticky-download-desktop').fadeIn('fast');
    }

    // only show download buttons for users on desktop platforms, using either a non-Firefox browser
    // or an out of date version of Firefox
    if (client.isDesktop) {
        if (client.isFirefox) {
            client.getFirefoxDetails(function(data) {
                if (!data.isUpToDate) {
                    showDownloadButtons();
                }
            });
        } else {
            showDownloadButtons();
        }
    }

    $('.ga-section').waypoint(function(dir) {
        // only track scrolling down

        if (dir === 'down') {
            w.dataLayer.push({
                'event': 'scroll-section',
                'section': $(this.element).data('ga-label')
            });
        }
    }, {
        offset: 100
    });
})(window, window.jQuery);
