import Notes from "../models/Notes.js";

export const getNotes = async(req, res) => {
    try{
        const notes = await Notes.find();
        res.status(200).json({notes});
    }catch(error){
        res.status(500).json({success: false, message: error.message});
    }
}

export const createNote = async (req, res) => {
    try{
        const {title, description} = req.body;
        console.log(title, description);
        const note = await Notes.create({title, description});
        res.status(201).send({success: true, note, message: "note created successfully"});
    }catch(err){
        res.status(500).send({success: false, message: err.message});
    }
}

export const updateNote = async (req, res) => {
    try {
        const {id} = req.params;
        const {title, description} = req.body;
        const note = await Notes.findByIdAndUpdate(id, {title, description}, {new: true});
        res.status(200).send({success: true, note, message: "note updated successfully"});
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
}

export const deleteNote = async (req, res) => {
    try{
        const { id } = req.params;
        const note = await Notes.findByIdAndDelete(id);
        if(!note){
            return res.status(404).send({success: false, message: "note not found"});
        }
        res.status(200).send({success: true, note, message: "note deleted successfully"});
    }catch(error){
        res.status(500).send({success: false, message: error.message});
    }
}