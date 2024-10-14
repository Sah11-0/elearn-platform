import express from "express";

import { createAssignment, deleteAssignment, getAssignments, updateAssignment } from "../controllers/assignment.controller.js";

const router = express.Router();


router.post('/', createAssignment);
router.get('/', getAssignments);
router.put('/:id', updateAssignment);
router.delete('/:id', deleteAssignment);

export default router;
