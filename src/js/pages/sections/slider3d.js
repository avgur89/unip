/**
 * Slider3d section module.
 *
 * @module Slider3dSection
 */

/** Import utils */
import {
  css,
  bindMethods,
  Resp,
  classNames
} from '../../modules/dev/helpers';
import Animation from '../../modules/dev/animation';
import ScrollController from '../../components/scrollController';
import SectionSlideController from '../../components/sectionSlideController';
import 'materialize-css/js/global';
import '../../modules/dep/materialize.carousel';

export class Slider3dSection {
  /**
   * Cache elements etc.
   *
   * @param {jQuery} [$slider3dSection]
   */
  constructor($slider3dSection = $('#slider3d-section')) {
    this.$section = $slider3dSection;

    this.$skip = this.$section.find('.bottomBtn');
    this.$pageNumber = this.$section.find('.pageNumber');
    this.$textBlock = this.$section.find('.textBlock');

    // bind context
    bindMethods.bind(this)
    ('revealOverlay', 'revealMainContent');

    this.overlayAnimationDelay = 0;
    this.mainContentAnimationDelay = 0;
  }

  /**
   * Scroll to the next section on 'skip' click.
   *
   * @return {Slider3dSection}
   */
  initLearnMore() {
    const nextSectionId = this.$section.next().attr('id');

    this.$skip.on('click tap', () => {
      if (Resp.isDeskCustom) {
        ScrollController.moveToNextSection();
      } else {
        Animation.scrollTo(1.2, {
          scrollTo: `#${nextSectionId}`,
          ease: Power3.easeInOut
        });
      }
    });

    return this;
  }

  /**
   * Activate materialize slider.
   *
   * @return {Slider3dSection}
   */
  initSlider() {
    const $carousel = this.$section.find('.slider3d__carousel');
    const $container = this.$section.find('.slider3d__container');

    $carousel
      .carousel({
        dist: -48,
        onCycleTo: element => {
          if (Resp.isMobile) {
            const currentSlide = $(element).index() + 1;

            $container
              .removeClass(classNames)
              .addClass(`js-slide-${currentSlide}`);
          }
        }
      })
      .carousel('set', 1);

    return this;
  }

  /**
   * Reveal section's overlay.
   *
   * @return {Slider3dSection}
   */
  revealOverlay() {
    // show 'skip' button, page number, text block
    requestAnimationFrame(() => {
      [this.$skip, this.$pageNumber, this.$textBlock]
        .forEach(el => el.addClass(css.animationFinished));
    });

    return this;
  }

  /**
   * Reveal section's main content.
   *
   * @return {Slider3dSection}
   */
  revealMainContent() {
    const $container = this.$section.find('.slider3d__container');
    const $overlay = $container.find('.slider3d__overlay');
    const $text = $container.find('.slider3d__text');
    const $carousel = $container.find('.slider3d__carousel');

    // show circles overlay, text block and carousel
    requestAnimationFrame(() => {
      [$overlay, $text, $carousel]
        .forEach(el => el.addClass(css.animationFinished));
    });

    return this;
  }

  /**
   * Run section's revealing animation.
   *
   * @return {Slider3dSection}
   */
  initAnimation() {
    // reveal overlay with timeout
    Animation.delay(this.overlayAnimationDelay, this.revealOverlay);

    // reveal main content with timeout
    Animation.delay(this.mainContentAnimationDelay, this.revealMainContent);

    return this;
  }

  /**
   * Initialize section's scripts.
   *
   * @return {Slider3dSection}
   */
  initScripts() {
    this
      .initLearnMore()
      .initSlider();

    if (!Resp.isDeskCustom) {
      new SectionSlideController(this.$section).bindControls();
    }

    return this;
  }
}

/** Export initialized class instance by default */
export default new Slider3dSection;
