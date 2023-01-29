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



<!-- Open modal -->
<button id="viewBtn">View</button>

<div id="myModal" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <span class="close">&times;</span> 
    <p class="time-stamp"></p> 
    <div>
      <div class="moodTitle"></div>
      <div class="entryText"></div>
     </div>
    </div>
  </div>
`;

/** Class representing a view button. */
class View extends HTMLElement {
   /**
     * Call super first in constructor
     * Create shadow root.
     * Append template (created elements) to shadow DOM
    */
  constructor() { 
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));

    // Get the modal
    this.modal = this.shadowRoot.querySelector("#myModal");

    // Get the view button that opens the modal
    this.viewBtn = this.shadowRoot.querySelector("#viewBtn");

    // Get the <span> element that closes the modal
    this.span = this.shadowRoot.querySelector(".close");
    
    // Get <div> element with the class moodTitle & entryText
    this.moodTitle = this.shadowRoot.querySelector(".moodTitle")
    this.viewEntry = this.shadowRoot.querySelector(".entryText");

    // Get <div> element with the class time stamp
    this.timeStamp = this.shadowRoot.querySelector(".time-stamp");
  }

  // Observe timestamp, entrytitle, entrytext, & entrymood attributes for changes
  static get observedAttributes() {
    return ["timestamp", "entrytitle", "entrytext", "entrymood"];
   }
  
  /**
     * track element's attribute update: changed, added, or removed
    */
  attributeChangedCallback(property, oldValue, newValue) { 
    // If nothing changes, stop execution
    // eslint-disable-next-line no-useless-return
    if (oldValue === newValue) return;


    // Conditional statement will look at the name of the atttribute and it's value in view-modal element. If matched, add attribute value to text content of element created and appended to the modal content
    if (property === "entrymood") {
      const headerTwo = document.createElement("h2");
      headerTwo.textContent = `${newValue}`;
      this.moodTitle.appendChild(headerTwo);
    } else if (property === "timestamp") {
      // const pOne = document.createElement("p");
      // pOne.textContent = `${newValue}`;
      this.timeStamp.textContent = `${newValue}`;
    } else if (property === "entrytitle") {
      const headerThree = document.createElement("h3");
      headerThree.textContent = `${newValue}`;
      this.viewEntry.appendChild(headerThree);
    } else if (property === "entrytext") {
      const pTwo = document.createElement("p");
      pTwo.textContent = `${newValue}`;
      this.viewEntry.appendChild(pTwo);
    }
   
    
  }

  // Function will show and hide modal when x or view button is clicked
  showModal(state) { 
    // Get the modal
    const modal = this.shadowRoot.querySelector("#myModal");

    if (state) {
      // Display modal
      modal.style.display = 'block';
    } else {
      // Hide modal
      modal.style.display = 'none';
    }
  }

  // Function will hide modal when clicking outside modal content
  hideModalWindow(e) {
    // select the modal container
    const modal = this.shadowRoot.querySelector("#myModal");

    // Get event target inside a web component by getting the first item of the event path
    // When user clicks the modal container, this will match the same modal container assigned to modal variable and change the display style to none
    // eslint-disable-next-line
    if (e.composedPath()[0] == modal) {
      modal.style.display = "none";
    }
  }

  /**
     * Listen to view button when clicked and trigger showModal()
     * showModal() pass true view card will pop up
     * close icon is clicked view card will hide
    */
  connectedCallback() {

    this.shadowRoot.querySelector('#viewBtn').addEventListener('click', (e) => this.showModal(true));
    this.shadowRoot.querySelector('.close').addEventListener('click', (e) => this.showModal(false));
    
    window.addEventListener('click', (e) => this.hideModalWindow(e));
    
  }

  disconnectedCallback() {
    // this.shadowRoot.querySelector('#toggle-form').removeEventListener();
  }
}

window.customElements.define('view-modal', View);