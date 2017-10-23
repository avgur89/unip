/**
 * Drivers page scripts.
 *
 * @module Drivers
 */

import CommonSubPage from './_CommonSubPage';

export default class Drivers extends CommonSubPage {
  /**
   * Close all accordion items and remove active classes
   *
   * @private
   */
  _closeAllTabs() {
    // close all items
    $('.faq__tabs-item').each(function () {
      $(this).find('.faq__tabs-panel').slideUp(400);
      $(this).removeClass('faq__tabs-item-active');
    });
  }
  /**
   * Init accordion
   *
   * @return {Drivers}
   */
  initAccordion() {
    const _this = this;

    $('.faq__tabs-nav-link').on('click tap', function() {
      const dataAttr = $(this).data('tablink');
      const currentTab = $('.faq__tabs-list' + `[data-tabcontent='${dataAttr}']`);

      if ( $(this).hasClass('faq__tabs-nav-link-active') ) return;

      $('.faq__tabs-nav-link').removeClass('faq__tabs-nav-link-active');
      $(this).addClass('faq__tabs-nav-link-active');

      $('.faq__tabs-list').slideUp(600, function() {
        $(this).removeClass('faq__tabs-list-active');
      });
      currentTab.delay(500).slideDown(600, function() {
        $(this).addClass('faq__tabs-list-active');
      });
    });

    $('.faq__tabs-item').on('click tap', function() {
      const panel = $(this).find('.faq__tabs-panel');

      if ($(this).hasClass('faq__tabs-item-active')) {
        // if item was active close it
        panel.slideToggle(400);
        $(this).toggleClass('faq__tabs-item-active');
      } else {
        _this._closeAllTabs();
        // open current item and add active class
        panel.slideToggle(400);
        $(this).toggleClass('faq__tabs-item-active');
      }
    });

    return _this;
  }

  /**
   * Scroll to page sections
   *
   * @return {Drivers}
   */
  scrollToSection() {
    $('.drivers__cta-nav-link').on('click tap', function(e) {
      e.preventDefault();
      const dataScroll = $(this).attr('data-scroll');
      const sectionToScroll = $('main').find(`[data-section='${dataScroll}']`).offset().top;
      const headerHeight = $('.header').outerHeight();

      $('body,html').stop().animate({scrollTop: sectionToScroll - headerHeight}, 500, 'swing');
    });

    return this;
  }

  /**
   * Initialize Drivers page scripts.
   *
   * @override
   */
  init() {
    super.init();

    this
      .initAccordion()
      .scrollToSection();
  }
}
