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
<button id="myBtn">View</button>

<div id="myModal" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <span class="close">&times;</span>
    <p>Some text in the Modal..</p>
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
    this.viewBtn = this.shadowRoot.querySelector("#myBtn");

    // Get the <span> element that closes the modal
    this.span = this.shadowRoot.querySelector(".close");

  }
  
  /**
     * track element's attribute update: changed, added, or removed
    */
  attributeChangedCallback(property, oldValue, newValue) { 
    // If nothing changes, stop execution
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
    // eslint-disable-next-line eqeqeq
    if (e.path[0] == modal) {
      modal.style.display = "none";
    }
  }

  /**
     * Listen to view button when clicked and trigger showModal()
    */
  connectedCallback() {

    this.shadowRoot.querySelector('#myBtn').addEventListener('click', (e) => this.showModal(true));

    this.shadowRoot.querySelector('.close').addEventListener('click', (e) => this.showModal(false));
    

    window.addEventListener('click', (e) => this.hideModalWindow(e));
    
  }

  disconnectedCallback() {
    // this.shadowRoot.querySelector('#toggle-form').removeEventListener();
  }
}

window.customElements.define('view-modal', View);