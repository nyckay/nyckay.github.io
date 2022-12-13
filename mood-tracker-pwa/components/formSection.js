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


<main>
  <div id="journal-content">
    <h2>Entries</h2>
    <button class="plus-button" id="toggle-form">+</button>
  </div>

  <entry-list id="entriesComponent"></entry-list>


  <div id="form-content">
    <h2>How Are You Feeling Today?</h2>

    <form id="entry-form">
      <label for="title">Title</label><br>
      <input type="text" id="titleText" name="title">
      <br>
      <br>
      <label for="mood-selection">Mood</label><br>
      <select name="mood-selection" id="mood-selection">
        <option value="">-Select-</option>
        <option value="happy">Happy</option>
        <option value="inspired">Inspired</option>
        <option value="sad">Sad</option>
      </select> 
      <br>
      <br>
      <textarea id="mood-entry" name="mood-entry" rows="10" cols="50"></textarea>
      <br>
      <br>
      <button id="cancel-button">Cancel</button>
      <button id="submit-entry-button">Submit</button>
      <br>
      <br>
    </form> 
  </div>
</main>
`;

/** Class representing a navigation bar. */
class FormSection extends HTMLElement {
   /**
     * Call super first in constructor
     * Create shadow root.
     * Append template (created elements) to shadow DOM
     * Create showForm property to hide form section by default
     * Aadd property for title, mood, entryText
    */
  constructor() { 
    super();

    this.showForm = true;
    // eslint-disable-next-line no-unused-expressions

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));

    this.titleName = this.shadowRoot.querySelector("#titleText");
    this.moodSelection = this.shadowRoot.querySelector("#mood-selection");
    this.moodEntry = this.shadowRoot.querySelector("#mood-entry");
  }
  
  /**
     * Track element's attribute update: changed, added, or removed
    */
  attributeChangedCallback(property, oldValue, newValue) { 
    // If nothing changes, stop execution
  }


  /**
     * Function toggles between displaying or hiding form content and journal entry
  */
  toggleForm() { 
    this.showForm = !this.showForm;

    const entryList = this.shadowRoot.querySelector('#entriesComponent');
    const journalContent = this.shadowRoot.querySelector('#journal-content');
    const formContent = this.shadowRoot.querySelector('#form-content');

    if (this.showForm) {
      entryList.style.display = 'block';
      journalContent.style.display = 'block';
      formContent.style.display = 'none';
    } else {
      entryList.style.display = 'none';
      journalContent.style.display = 'none';
      formContent.style.display = 'block'
    }
  }

  /**
     * Lifecyle method call everytime element is appended into the DOM
     * Triggers toggleForm function when plus button is clicked
     * Store the entries data in the state obj when submit button is clicked
  */
  connectedCallback() {
  
    this.shadowRoot.querySelector('#toggle-form').addEventListener('click', (e) => this.toggleForm());
    this.shadowRoot.querySelector('#submit-entry-button').addEventListener('click', (e) => {
      e.preventDefault();

      // Generate a timestamp
      this.timeStampVal= Number(new Date());
      
      // Convert timestamp to date representation
      this.dateRep = new Date(this.timeStampVal).toLocaleString();

      if (this.titleName.value && this.moodSelection.value && this.moodEntry.value && this.dateRep) {
        storeSetUp.storeEntryInfo(this.titleName.value, this.moodSelection.value, this.moodEntry.value, this.dateRep);

        this.toggleForm();
      }
    });
    
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