/* eslint-disable prettier/prettier */
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


<main>
  <div class="journal-content">
    <h2>Entries</h2>
    <button class="plus-button" id="toggle-form">+</button>
  </div>

  <entry-list></entry-list>
</main>
`;

/** Class representing a navigation bar. */
class FormSection extends HTMLElement {
   /**
     * Call super first in constructor
     * Create shadow root.
     * Append template (created elements) to shadow DOM
     * property added to hide form by default
    */
  constructor() { 
    super();

    this.showForm = false;

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));

  }
  
  /**
     * Track element's attribute update: changed, added, or removed
    */
  attributeChangedCallback(property, oldValue, newValue) { 
    // If nothing changes, stop execution
  }

  toggleForm() { 
    console.log("Hello");
  }

  /**
     * Lifecyle method call everytime element is appended into the DOM
     * Triggers toggleForm function when plus button is clicked
    */
  connectedCallback() {
    this.shadowRoot.querySelector('#toggle-form').addEventListener('click', (e) => this.toggleForm());
  }
  
  /**
     * Lifecyle method call everytime element is removed from the DOM
     * Remove event listener on the plus button
    */
  disconnectedCallback() {
    this.shadowRoot.querySelector('#toggle-form').removeEventListener();
  }
}

window.customElements.define('form-section', FormSection);


// Working on show form and list of entries
// https://www.youtube.com/watch?v=PCWaFLy3VUo
// 24.18