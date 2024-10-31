import mongoose from "mongoose";
import Assignment from "../models/assignment.model.js";

export const getAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find({});
        res.status(200).json({ success: true, data: assignments });
    } catch (error) {
        console.log("error in fetching products:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const createAssignment = async (req, res) => {
    const assignment = req.body;

    if (!assignment.title || !assignment.description) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newAssignment = new Assignment(assignment);

    try {
        await newAssignment.save();
        res.status(201).json({ success: true, data: newAssignment });
    } catch (error) {
        console.error("Error in Create assignment:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const updateAssignment = async (req, res) => {
    const { id } = req.params;

    const assignment = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Assignments Id" });
    }

    try {
        const updatedAssignment = await Assignment.findByIdAndUpdate(id, assignment, { new: true });
        res.status(200).json({ success: true, data: updatedAssignment });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deleteAssignment = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id" });
    }

    try {
        await Assignment.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Assignment deleted" });
    } catch (error) {
        console.log("error in deleting assignment:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
















// import mongoose from "mongoose";
// import Assignment from "../models/assignment.model.js";

// export const getAssignments = async (req, res) => {
//     try {
//         const assignments = await Assignment.find({});
//         res.send(assignments);
//     } catch (error) {
//         res.status(500).send();
//     }
// };

// export const createAssignment = async (req, res) => {
//     try {
//         const assignment = new Assignment(req.body);
//         await assignment.save();
//         res.status(201).send(assignment);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// };

// export const updateAssignment = async (req, res) => {
//     try {
//         const assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
//         if (!assignment) {
//             return res.status(404).send();
//         }
//         res.send(assignment);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// };

// export const deleteAssignment = async (req, res) => {
//     try {
//         const assignment = await Assignment.findByIdAndDelete(req.params.id);
//         if (!assignment) {
//             return res.status(404).send();
//         }
//         res.send(assignment);
//     } catch (error) {
//         res.status(500).send();
//     }
// };
