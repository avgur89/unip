import Header from '../components/header';
import {
  currentPage,
  $body,
  $main,
  Resp
} from '../modules/dev/helpers';

/**
 * @class DefaultNewsPage
 */
export default class CommonSubPage {
  /**
   * Cache data.
   *
   * @constructor
   */
  constructor() {
    // initialize after construction
    this.init();
  }

  /**
   * Run header's reveal animation.
   *
   * @return {CommonSubPage}
   */
  initHeaderAnimation() {
    Header.initAnimation();

    return this;
  }

  /**
   * Enable body scroll
   *
   * @return {CommonSubPage}
   */
  enableBodyScroll() {
    if (currentPage !== 'home') {
      $body.css('overflow', 'visible');
      $main.css('overflow-x', 'hidden');
    }

    return this;
  }

  /**
   * Wrap <p> elements in wrapper to hide them.
   *
   * @return {CommonSubPage}
   */
  wrapTextToHide() {
    const $collapsibleTexts = $('.collapsible__text');

    $collapsibleTexts.each((index, el) => {
      const $el = $(el);
      const $children = $el.children();

      if ($children.length < 3) return;

      const paragraphs = $children.filter('p').toArray();
      const firstParagraph = paragraphs.shift().textContent.trim();
      const hiddenParagraphs = paragraphs.map(p => `<p>${p.textContent}</p>`).join('');
      const $newHtml =
        $(`<p>${firstParagraph}</p><div class="hidden_paragraphs">${hiddenParagraphs}</div>`);
      const $newEl = $el.html($newHtml);
      const $hiddenParagraphs = $newEl.find('.hidden_paragraphs');
      const $button = $children.filter('span');

      $hiddenParagraphs.append($button);
    });

    return this;
  }

  /**
   * Show more text on what & why section
   *
   * @return {CommonSubPage}
   */
  enableTextToggle() {
    function resizeBlock(context) {
      context = context.type ? this : context;

      const $context = $(context);
      const $block = $context.closest('.hidden_paragraphs');
      const blockHeight = $block.prop('scrollHeight');

      $block.addClass('hidden').css('height', blockHeight);
      $context.hide();
    }

    $('.what__desc-hidden-btn').on('click', function() {
      const $this = $(this);

      resizeBlock($this);

      setTimeout(function() {
        if (Resp.isDeskCustom) {
          const $whatItem = $this.closest('.what__item');
          const elHeight = $this.closest('.what__desc').prop('scrollHeight') - 341;
          const whatItemHeight = elHeight > 0 ? (519 + elHeight + 'px') : (519 + 'px');
          $whatItem.css('height', whatItemHeight);

          const $whatItemReverse = $this.closest('.what__item-reverse');
          const elHeightReverse = $this.closest('.what__desc-reverse').prop('scrollHeight') - 286;
          const whatItemReverseHeight = elHeightReverse > 0 ? (519 + elHeightReverse + 'px') : (519 + 'px');
          $whatItemReverse.css('height', whatItemReverseHeight);
        }
      }, 500);
    });

    $('.functionality__text-hidden-btn').on('click', resizeBlock);

    return this;
  }

  /**
   * Initialize scripts.
   */
  init() {
    this
      .initHeaderAnimation()
      .enableBodyScroll()
      .wrapTextToHide()
      .enableTextToggle();
  }
}
