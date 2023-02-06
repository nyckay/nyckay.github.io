/* eslint-disable prettier/prettier */
import { storeSetUp } from '../store/store';
/* eslint-disable new-cap */
/* eslint-disable prettier/prettier */
/* eslint-disable no-const-assign */
/* eslint-disable prettier/prettier */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-constructor */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
// eslint-disable-next-line prettier/prettier
/** @constant
    @type {object}
    @default
*/
const template = document.createElement('template');
template.innerHTML = `
<link rel="stylesheet" href="/css/base.css" />
<link rel="stylesheet" href="/css/mobile.css" media="(max-width: 767px)" />
<link rel="stylesheet" href="/css/tablet.css" media="(min-width: 768px) and (max-width: 1023px)" />
<link rel="stylesheet" href="/css/desktop.css" media="(min-width: 1024px)"  />

// This is the format we'll use for adding the api quote of the day
<div class="quote-container">
  <h3 class="text-color-jordy-blue">Quote Of The Day</h3>
  <p class="text-color-old-lavender">Ninety-nine percent of the failures come from people who have the habit of making excuses.</p>
  <p class="text-color-desert-sand">George Washington Carver</p>
</div>
`;

/** Class representing a quote of the day section. */
class QuoteOfDay extends HTMLElement {
   /**
     * Call super first in constructor
     * Create shadow root.
     * Append template (created elements) to shadow DOM
    */
  constructor() { 
    super();
    const shadow = this.attachShadow({ mode: "open" });
    // shadow.appendChild(template.content.cloneNode(true));

  }
  
  /**
     * track element's attribute update: changed, added, or removed
    */
  attributeChangedCallback(property, oldValue, newValue) { 
    // If nothing changes, stop execution
  }

  /**
     * 
    */
  connectedCallback() {
    // storeSetUp.subscribe((state) => {
    //   console.log(state)

    // });

    
  }
}

window.customElements.define('quote-of-day', QuoteOfDay);