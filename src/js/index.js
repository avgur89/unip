'use strict';

/**
 * App entry point.
 *
 * @module App
 */

/** Import commonly used libs/modules */
import 'babel-polyfill';
import 'gsap';
import 'gsap/ScrollToPlugin';
import 'slick-carousel';
import './components/common';

/** Import page controllers */
import Home from 'js/pages/home';
import Drivers from 'js/pages/drivers';
import Private from 'js/pages/private';
import Municipality from 'js/pages/municipality';
import About from 'js/pages/about';
import Contacts from 'js/pages/contacts';

/** Import utils */
import { currentPage } from 'js/modules/dev/helpers';

/**
 * Run appropriate scripts for each page.
 **/
switch (currentPage) {
  /** Home page */
  case 'home': new Home; break;
  /** Drivers page */
  case 'drivers': new Drivers; break;
  /** Private page */
  case 'private': new Private; break;
  /** Municipality page */
  case 'municipality': new Municipality; break;
  /** About page */
  case 'about': new About; break;
  /** About page */
  case 'contacts': new Contacts; break;

  /** No pages found */
  default: console.log('Null page');
}
