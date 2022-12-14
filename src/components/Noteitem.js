import React from "react";
import { useContext } from "react";
import noteContext from "../context/notes/NoteContext";
function Noteitem(props) {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note,updateNote} = props;
  const handleCopy = () => {
    
    navigator.clipboard.writeText(note.desc);
    
    if(note.desc.length>0){
      props.showAlert("Text Copied to ClipBoard","success")
    }
  };
  return (
    <div className="col-md-4 my-2">
      <div className="card ">
        <div className="card-body">
          <div className="d-flex align-items-center">
            {" "}
            <h4 className="card-title">{note.title}</h4>
            
            <i className="fa-solid fa-trash-can mx-2 ms-5 " onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Successfully","success")}}></i>
            <i className="fa-regular fa-pen-to-square mx-2 ms-5" onClick={()=>{updateNote(note)}}></i>
          
            <i className="fa-solid fa-copy ms-5" onClick={handleCopy}></i>
          </div>
<hr/>
          <p className="card-text"> {note.desc}</p>
          
          <p className="card-text "> <button disabled={true} className="btn btn-dark" ><span style={{color:'white'}}>Tag : {note.tag}</span></button></p>
        </div>
      </div>
    </div>
  );
}

export default Noteitem;
