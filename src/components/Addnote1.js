import React from "react";
import { useContext, useState } from "react";
import noteContext from "../context/notes/NoteContext";
const Addnote1 = (props) => {
  
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", desc: "", tag: "" });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title,note.desc,note.tag);
    setNote({ title: "", desc: "", tag: "" })
    props.showAlert("Note Added Successfully","success")
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
          <form>
          <div className="mb-3 ">
            <h1 style={{color:'white'}}>Save Here Your Notes</h1>
            <label htmlFor="exampleInputEmail1" className="form-label" style={{color:'white'}}>
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
             value={note.title}
            />
          </div>
          <div className="mb-3 ">
            <label htmlFor="exampleInputPassword1" className="form-label" style={{color:'white'}}>
              Description
            </label>
            
            <textarea type="text" class="form-control" id="desc" name="desc" onChange={onChange} value={note.desc} rows="3"></textarea>
          </div>
          <div className="mb-3 ">
            <label htmlFor="exampleInputPassword1" className="form-label" style={{color:'white'}}>
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={onChange}
              value={note.tag}
            />
          </div>
         
          <button
          disabled={note.title.length<5 || note.desc.length<5}
            type="submit"
            className="btn btn-primary ms-1"
            onClick={handleClick}
            
          >
            Add Note
          </button>
        </form>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Addnote1;
