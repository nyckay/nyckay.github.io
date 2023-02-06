/* eslint-disable prettier/prettier */
/* eslint-disable import/prefer-default-export */
/* eslint-disable prettier/prettier */
import { openDB } from "idb";

// export database called quoteEntry version 1
// Create two tables in database  quoteOfDay & quoteEntry
export const database = openDB('quoteEntry', 1, {
  upgrade(db) {
    // db.createObjectStore('quoteOfDay');
    db.createObjectStore('quoteEntry');
    // db.createObjectStore('quoteByTag');
  },
});