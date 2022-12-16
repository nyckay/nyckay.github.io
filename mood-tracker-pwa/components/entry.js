/* eslint-disable prettier/prettier */
import { storeSetUp } from "../store/store";
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

    
  }

   // Observe entries attribute for changes
   static get observedAttributes() {
    return ["entries"];
   }

  
  /**
     * Track element's attribute update: changed, added, or removed
    */
  attributeChangedCallback(property, oldValue, newValue) { 
    // If nothing changes, stop execution
    if (oldValue === newValue) return;

    // If attribute changes, convert new value into string and assign it a string
    const entries = JSON.parse(newValue);

    // Loop into the entries array and create the entry with new tags and attach it to ul element
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < entries.length; i++) {
      const list = document.createElement("li");
      const img = document.createElement("img");
      const pOne = document.createElement("p");
      const pTwo = document.createElement("p");
      const h4 = document.createElement("h4");
      const pFour = document.createElement("p");
      const h3 = document.createElement("h3");
      const divOne = document.createElement("div");
      const divTwo = document.createElement("div");
      const divThree = document.createElement("div");
      const divFour = document.createElement("div");
      const viewButton = document.createElement("view-modal");
      
      
      list.appendChild(pOne);
      list.appendChild(divThree);
      divThree.appendChild(divOne);
      divThree.appendChild(divTwo);
      divOne.appendChild(h3);
      divOne.appendChild(pTwo);
      pTwo.appendChild(img);
      divTwo.appendChild(h4);
      divTwo.appendChild(pFour);
      divTwo.appendChild(viewButton);

      // Set attribute to image element & view-modal component
      img.setAttribute("src", `https://www.shutterstock.com/image-vector/smiley-vector-happy-face-260nw-644809084.jpg`);
      viewButton.setAttribute("timeStamp", `${entries[i].time}`);
      viewButton.setAttribute("entryTitle", `${entries[i].title}`);
      viewButton.setAttribute("entryText", `${entries[i].text}`);
      viewButton.setAttribute("entryMood", `${entries[i].mood}`);

      pOne.textContent = `${entries[i].time}`;
      h4.textContent = `${entries[i].title}`;
      pFour.textContent = `${entries[i].text}`;
      h3.textContent = `${entries[i].mood}`;
      this.list.appendChild(list);
    }
   
  }

  /**
     * Subcribe to changes in the store with the call back function 
     * Lifecyle method call everytime element is appended into the DOM
     * Triggers toggleForm function when plus button is clicked
    */
  connectedCallback() {
    storeSetUp.subscribe((state) => {
      console.log(state.entries);

      // Set and update the 'entries' attribute in the <entry-list></entry-list> element and the whole key-value of the state object then convert it into string
      // This will trigger the attributeChangedCallback function, which will update the entries list, letting the same mechanism for updating the entries work both from outside the component, and from within the component on the state changes.
      this.setAttribute("entries", JSON.stringify(state.entries));
    });



   
  }
  
}

window.customElements.define('entry-list', Entry);