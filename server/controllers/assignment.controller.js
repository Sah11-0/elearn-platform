import mongoose from "mongoose";
import Assignment from "../models/assignment.model.js";

export const getAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find({});
        res.send(assignments);
    } catch (error) {
        res.status(500).send();
    }
};

export const createAssignment = async (req, res) => {
    try {
        const assignment = new Assignment(req.body);
        await assignment.save();
        res.status(201).send(assignment);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const updateAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!assignment) {
            return res.status(404).send();
        }
        res.send(assignment);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findByIdAndDelete(req.params.id);
        if (!assignment) {
            return res.status(404).send();
        }
        res.send(assignment);
    } catch (error) {
        res.status(500).send();
    }
};