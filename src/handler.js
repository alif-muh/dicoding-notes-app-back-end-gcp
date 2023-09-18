const {nanoid} = require('nanoid');
const notes = require('./notes');

// ADD NOTES handler
const addNoteHandler = (request, h) => {
  // get body request
  const {title, tags, body} = request.payload;

  // note objects to be saved
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

// GET ALL NOTES handler
const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

// GET NOTES BY ID handler
const getNoteByIdHandler = (request, h) => {
  const {id} = request.params; // get id of the note

  const note = notes.filter((n) => n.id === id)[0]; // filter the notes

  // if the note found
  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  // if the notes empty
  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

// EDIT NOTES BY ID handler
const editNoteByIdHandler = (request, h) => {
  const {id} = request.params; // get id of the note

  const {title, tags, body} = request.payload; // get data of the notes
  const updatedAt = new Date().toISOString(); // update date of note

  const index = notes.findIndex((note) => note.id === id); // get array index of the note

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// DELETE NOTE BY ID handler
const deleteNoteByIdHandler = (request, h) => {
  const {id} = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler};
