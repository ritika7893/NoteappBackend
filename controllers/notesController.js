import Note from "../models/Note.js"
export async function getAllNotes(req,res){
    try{
  const notes=await Note.find()
  res.status(200).json(notes)
    }
    catch(error){
        res.status.json({message:"Internal Server Error"})
        console.error("Error in getAllNotes",error)
    }
}
export async function createNote(req,res){
    try{
           const {title,content}=req.body
           const newNote=new Note({title,content})
           const savedNote=await newNote.save()
          res.status(201).json({message:"Note created successfully",savedNote})
    }
    catch(error){

        res.status.json({message:"Internal Server Error"})
        console.error("Error in createNotes",error)
    }
}
import mongoose from "mongoose";

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid Note ID format" });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note ID not found!" });
    }

    res.status(200).json({
      message: "Note updated successfully",
      updatedNote
    });

  } catch (error) {
    console.error("Error in updateNote", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteNote(req,res){
try{
           const {title,content}=req.body

           const deleteNote= await Note.findByIdAndDelete(req.params.id)
           if(!deleteNote){
            return res.status(404).json({message:"Note Id is not found!@"})
           }
          res.status(200).json({message:"Note deleted successfully",deleteNote})
    }
    catch(error){

        res.status(500).json({message:"Internal Server Error"})
        console.error("Error in createNotes",error)
    }
}

