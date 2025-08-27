# Pouch Rx
Library wrapping [PouchDB](https://pouchdb.com/) with [rxjs](https://rxjs.dev/) observables.

## Usage
Module esports function style interface and class based interface.
### Function style interface
All functions take PouchDB database object as first argument with additional arguments as needed.

Following functions are provided:
### Sources
* all - returns observable of all documents
* view - returns observable of view results
* changes - returns observable of a change feed
### Sinks
* sink - returns operator that writes incoming objects into db without conflict resolution
* merge - returns operator that writes incoming objects into db with conflict resolution using provided merge function. 
  * assign - merge function that does shallow assignment of new properties over existing ones
  * override - merge function that overrides existing document with new one
  * skip - merge function that skips update if document already exist in db

### Class based interface
Class based interface wraps PouchDB database object with `PouchRx` instance that alias all functions as its methods skipping database argument.