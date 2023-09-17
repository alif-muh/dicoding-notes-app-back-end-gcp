const {addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler} = require('./handler');

const routes = [
  // POST route to /notes
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },

  // GET route to /notes
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },

  // GET route to /notes/{id}
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
  },

  // PUT route to /notes/{id}
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHandler,
  },

  // DELETE route to /notes/{id}
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler,
  },
];

module.exports = routes;
