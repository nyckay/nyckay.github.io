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

<div class="quote-container">
  <h3 class="text-color-jordy-blue">Quote Of The Day</h3>
  <p class="text-color-old-lavender" id="quoteText"></p>
  <p class="text-color-desert-sand" id="quoteAuthor"></p>
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
    shadow.appendChild(template.content.cloneNode(true));

    this.quoteContainer = this.shadowRoot.querySelector(".quote-container");
    this.quoteText = this.shadowRoot.querySelector("#quoteText");
    this.quoteAuthor = this.shadowRoot.querySelector("#quoteAuthor");
  }

   // Observe qouteOfDay attribute for changes
   static get observedAttributes() {
    return ["quote"];
  }
  
  /**
     * track element's attribute update: changed, added, or removed
    */
  attributeChangedCallback(property, oldValue, newValue) { 
    // If nothing changes, stop execution
    if (oldValue === newValue) return;
    
    const quoteObj = JSON.parse(newValue);
    
  
    this.quoteText.textContent = `${quoteObj.quote?.body}`
    this.quoteAuthor.textContent = `${quoteObj.quote?.author}`
  }

  /**
     * 
    */
  connectedCallback() {
    storeSetUp.subscribe((state) => {
      this.setAttribute("quote",  JSON.stringify(state.quoteOfDay));
    });
  }
}

window.customElements.define('quote-of-day', QuoteOfDay);