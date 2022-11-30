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
<link rel="stylesheet" href="./css/base.css" />
<link rel="stylesheet" href="./css/mobile.css" media="(max-width: 767px)" />
<link rel="stylesheet" href="./css/tablet.css" media="(min-width: 768px) and (max-width: 1023px)" />
<link rel="stylesheet" href="./css/desktop.css" media="(min-width: 1024px)"  />

<style>

</style>

<div>
  <header>
     <h1><img src="./images/mood_title.png" alt="Mood"></h1>
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Journal</a></li>
        <li><a href="#">Calendar</a></li>
        <li><a href="#">About</a></li>    
      </ul>
    </nav>
  </header>
</div>
`;

/** Class representing a navigation bar. */
class NavBar extends HTMLElement {
   /**
     * Call super first in constructor
     * Create shadow root.
     * Append template (created elements) to shadow DOM
    */
  constructor() { 
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));

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
    storeSetUp.subscribe((state) => {
      console.log(state)

    });

    
  }
}

window.customElements.define('nav-bar', NavBar);