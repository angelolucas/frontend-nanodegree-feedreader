/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* RSS Feeds
   * this suite is all about the RSS feeds definitions.
   */
  describe('RSS Feeds', function() {
    /* It tests to make sure that the allFeeds variable
     * has been defined and that it is not empty.
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    // Loops through each feed in the allFeeds object
    allFeeds.forEach(function(feed, index) {
      describe('feed ' + index, function() {

        // Ensures it has a URL defined and that the URL is not empty.
        it('has defined URL: ' + feed.url, function(){
          expect(feed.url).toBeDefined();
          expect(feed.url).not.toBe('');
        });

        // Ensures it has a name defined and that the name is not empty.
        it('has defined name: ' + feed.name, function() {
          expect(feed.name).toBeDefined();
          expect(feed.name).not.toBe('');
        });
      });
    });
  });

  describe('The menu', function() {
    /* This test that ensures the menu element
     * is hidden by default.
     */
    var $menuHidden = $('body').hasClass('menu-hidden');

    it('menu is hidden by default', function() {
      expect($menuHidden).toBe(true);
    });

    /* This test ensures that the menu changes
     * visibility when the menu icon is clicked. The test
     * should have two expectations:
     */

    // Does the menu display when clicked
    it('display menu after click', function() {
      $('.menu-icon-link').trigger('click');
      $menuHidden = $('body').hasClass('menu-hidden');
      expect($menuHidden).toBe(false);
    });

    // Does it hide when clicked again.
    it('hide menu after click again', function() {
      $('.menu-icon-link').trigger('click');
      $menuHidden = $('body').hasClass('menu-hidden');
      expect($menuHidden).toBe(true);
    });
  });

  describe('Initial Entries', function() {
    /* That ensures the loadFeed function is called
     * and completes its work, there is at least
     * a single .entry element within the .feed container.
     */

    beforeEach(function(done) {
      loadFeed(0, done);
    });

    it('has at least a single .entry element within the .feed container', function() {
      var $entries = $('.feed .entry').length;
      expect($entries).toBeGreaterThan(0);
    });
  });

  describe('New Feed Selection', function() {
    /* That ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     */
    var $firstFeed,
        $secondFeed;

    beforeEach(function(done) {
      loadFeed(0, function(){
        $firstFeed = $('.feed').html();
        done();
      });
    });

    it('new feed is loaded', function(done) {
      loadFeed(1, function() {
        $secondFeed = $('.feed').html();

        expect($secondFeed).not.toBe($firstFeed);
        done();
      });
    });
  });
}());
