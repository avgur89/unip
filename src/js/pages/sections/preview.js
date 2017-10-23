/**
 * Preview section module.
 *
 * @module PreviewSection
 */

/** Import utils */
import {
  css,
  Resp,
  classNames
} from '../../modules/dev/helpers';
import { Slider3dSection } from './slider3d';
import Animation from '../../modules/dev/animation';
import SectionSlideController from '../../components/sectionSlideController';

export class PreviewSection extends Slider3dSection {
  /**
   * Cache elements etc.
   *
   * @param {jQuery} [$previewSection]
   */
  constructor($previewSection = $('#preview-section')) {
    super($previewSection);

    this.mainContentAnimationDelay = 0.1;
  }

  /**
   * Reveal section's main content.
   *
   * @return {PreviewSection}
   */
  revealMainContent() {
    const $container = this.$section.find('.preview__container');
    const $linesContainer = $container.find('.preview__lines');

    // show main picture, text, bg pictures
    requestAnimationFrame(() => {
      $container.removeClass(css.isHiddenForAnimation);
    });

    // show lines
    Animation.delay(1, () => {
      requestAnimationFrame(() => {
        $linesContainer.removeClass(css.isHiddenForAnimation);
      });
    });

    return this;
  }

  /**
   * Activate materialize slider (mobile only).
   *
   * @return {Slider3dSection}
   */
  initSlider() {
    if (!Resp.isMobile) return this;

    const $container = this.$section.find('.preview__container');
    const $carousel = this.$section.find('.preview__main');

    $carousel
      .carousel({
        dist: -48,
        onCycleTo: element => {
          const currentSlide = $(element).index() + 1;

          $container
            .removeClass(classNames)
            .addClass(`js-slide-${currentSlide}`);
        }
      })
      .carousel('set', 1);

    return this;
  }

  /**
   * Initialize section's scripts.
   *
   * @return {PreviewSection}
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
export default new PreviewSection;
