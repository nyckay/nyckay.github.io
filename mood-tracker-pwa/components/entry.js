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

<div id='entries'>
  <ul id='entries-list'></ul>
</div>

`;

/** Class representing Entry. */
class Entry extends HTMLElement {
   /**
     * Call super first in constructor
     * Create shadow root.
     * Append template (created elements) to shadow DOM
     * property added to hide form by default
    */
  constructor() { 
    super();

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));

    this.list = this.shadowRoot.querySelector("#entries-list");
    this.favoriteContainer = this.shadowRoot.querySelector('#entries');

    const list = document.createElement("li");
    const img = document.createElement("img");
    const pOne = document.createElement("p");
    const pTwo = document.createElement("p");
    const pThree = document.createElement("p");
    const pFour = document.createElement("p");
    const pFive = document.createElement("p");
    const divOne = document.createElement("div");
    const divTwo = document.createElement("div");
    const divThree = document.createElement("div");
    const divFour = document.createElement("div");
    
    
    list.appendChild(pOne);
    list.appendChild(divThree);
    divThree.appendChild(divOne);
    divThree.appendChild(divTwo);
    divOne.appendChild(pFive);
    divOne.append(pTwo);
    pTwo.appendChild(img);
    divTwo.appendChild(pThree)
    divTwo.appendChild(pFour);


    // img.setAttribute("src", `${favoriteMovies[i].movie}`);

    pOne.textContent = `Sunday, 20  Nov 2022, 6:40pm`;
    pThree.textContent = `Title`;
    pFour.textContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;
    pFive.textContent = `Happy`

    this.list.appendChild(list);

  }
  
  /**
     * Track element's attribute update: changed, added, or removed
    */
  attributeChangedCallback(property, oldValue, newValue) { 
    // If nothing changes, stop execution
  }

  /**
     * Lifecyle method call everytime element is appended into the DOM
     * Triggers toggleForm function when plus button is clicked
    */
  connectedCallback() {
    this.shadowRoot.querySelector('#toggle-form').addEventListener('click', (e) => this.toggleForm());
  }
  
}

window.customElements.define('entry-list', Entry);