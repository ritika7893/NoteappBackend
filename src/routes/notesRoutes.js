import express from 'express';
import { getArchive,restoreNote, archiveNote, createNote, deleteNote, getAllNotes, updateNote } from '../../controllers/notesController.js';
const router = express.Router();
router.get('/', getAllNotes)

router.post('/', createNote)
router.put('/:id',updateNote)
router.delete('/:id',archiveNote)
router.get('/archived',getArchive)
router.put('/:id/restore',restoreNote)
router.delete('/:id/permanent',deleteNote)
export default router;