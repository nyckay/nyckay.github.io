/* eslint-disable prettier/prettier */
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line prettier/prettier
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { database } from "../database/database";

/**
     * New state store created
     * Store allows for reusable functionality & including extra functionality
    */
export class Store {
  // Store creation have an empty object as an initial state
  constructor(init = {}) {
    // Reference the store from within
    const self = this;
    
    // Subcribers holds an array of function and will look for changes to the store. Ex: A change in state will cause subscriber to input the state in a function and call the function
    this.subscribers = [];
    
    //  wait for database to be open
    database.then(async (db) => {
      // make the database reusable from with in the store by using the store db property (this.db)
      this.db = db;

      // get the state key from the quoteEntry table in the database
      const previousEntries = await db.get('quoteEntry', 'entries');
      // const previousQuoteDay = await db.get('quoteOfDay', 'quoteDay');
      // const previousquoteByTag = await db.get('quoteByTag', 'quote');
      

      // if database exist with table, loop over the entries in side the database 
      if (previousEntries) {
        // eslint-disable-next-line no-restricted-syntax
        for (const [key, val] of Object.entries(previousEntries)) {
          // set the key values in the state manager
          this.set(key, val);
        }
      }
    });


     /**
     * Assign new Proxy to the store's state.
     * Proxy similiar to an object will have the initial state (empty object)
     * Pass in another object which inside has a 'trap' to the Proxy. Set/Get is a trap.
     * When someone changes a key/property, the Proxy will look at the current key-value of the state object with the help of set trap and set the new value to that key/property
    */
      this.state = new Proxy(init, {

        async set(state, key, value) {
          // Make the update to property in the state object
          // eslint-disable-next-line no-param-reassign
          state[key] = value;
  
          // whenever the store gets updated, save the changes to the indexedb. This helps for later recovery of data
          //  check to see if database is open
          if (self.db) {
            // grab the quoteEntry database add or put in the state inside the database and assign the key name of 'entries'. ex: entries: "value" 
            await self.db.put('quoteEntry', state, 'entries');
          }
  
          // subscribers will react to state being updated by looping each subscriber and call each subscriber function with an updated state. This will subscribe new updated state to the Store
          self.subscribers.forEach((subscriber) => subscriber(state));
  
          return true;
        }
      });
    }

    // Create a subscribe method that takes in a call back (cb) function. Subscribe will listen for state changes. This how you add a new subscriber
    subscribe(cb) { 
      if (typeof cb !== 'function') {
        throw new Error('You must subscribe with a function');
      }

      // add call back function to the subscribers array
      this.subscribers.push(cb);

      // call the callback function with the updated state
      cb(this.state);
  }

  // calling set function will trigger Proxy and set a key with the new value inside the state
  set(key, value) { 
    this.state[key] = value;
  }

  // grab the value from the state
  get(key) {
    return this.state[key];
  }

  
  // Function will input information from the form into the state [used in the form after submit button]
  storeEntryInfo(title, mood, entryText, time) {
    
    // All entry information will be store in an object & assigned to constant var
    const entryInfo = { 
        "title": title,
        "mood": mood,
        "text": entryText,
        "time": time
    }

    // Assign the constant variable to 'entries' key in state
    const listItem = this.get('entries');
    // Push new entry to entries array
    listItem.push(entryInfo);
    // set the updated array to entries key in the state
    this.set('entries', listItem);
  }



  // Function will store data from API to do the database
   postQuoteOfDay(dataQuoteOfDay) {
     this.set('quoteOfDay', dataQuoteOfDay);
    }


}

export const storeSetUp = new Store({ entries: [], quoteOfDay: {} });

