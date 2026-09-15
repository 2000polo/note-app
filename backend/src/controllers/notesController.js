import mongoose from "mongoose";
import Notes from "../models/Notes.js";

export const getNotes = async(req, res) => {
    try{
        const notes = await Notes.find({ user: req.userId });
        res.status(200).json({notes});
    }catch(error){
        res.status(500).json({success: false, message: error.message});
    }
}

export const createNote = async (req, res) => {
    try{
        const {title, description} = req.body;

        if (!title?.trim() || !description?.trim()) {
            return res.status(400).send({success: false, message: "title and description are required"});
        }

        const note = await Notes.create({title, description, user: req.userId});
        res.status(201).send({success: true, note, message: "note created successfully"});
    }catch(err){
        res.status(500).send({success: false, message: err.message});
    }
}

export const updateNote = async (req, res) => {
    try {
        const {id} = req.params;
        const {title, description} = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({success: false, message: "invalid note id"});
        }

        if (!title?.trim() || !description?.trim()) {
            return res.status(400).send({success: false, message: "title and description are required"});
        }

        const note = await Notes.findOneAndUpdate(
            { _id: id, user: req.userId },
            {title, description},
            {new: true}
        );

        if(!note){
            return res.status(404).send({success: false, message: "note not found"});
        }

        res.status(200).send({success: true, note, message: "note updated successfully"});
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
}

export const deleteNote = async (req, res) => {
    try{
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({success: false, message: "invalid note id"});
        }

        const note = await Notes.findOneAndDelete({ _id: id, user: req.userId });
        if(!note){
            return res.status(404).send({success: false, message: "note not found"});
        }
        res.status(200).send({success: true, note, message: "note deleted successfully"});
    }catch(error){
        res.status(500).send({success: false, message: error.message});
    }
}

export const getNoteById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({success: false, message: "invalid note id"});
        }

        const note = await Notes.findOne({ _id: id, user: req.userId })
        if(!note){
            return res.status(404).send({success: false, message: "note not found"});
        }
        res.status(200).json({note})
    }catch(error){
        res.status(500).send({success: false, message: error.message});
    }
}
