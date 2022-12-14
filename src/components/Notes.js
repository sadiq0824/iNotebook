import React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
import { useNavigate } from "react-router-dom";
import Nonotes from "./Nonotes";

const Notes = (props) => {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNote, editNote } = context;
  useEffect(() => {
    if (localStorage.getItem('token' )) {
      getNote();
    } else {
      navigate('/login')
    }

    //eslint-disable-next
  });
  const ref = useRef(null);
  const refClose = useRef(null);
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edesc: currentNote.desc, etag: currentNote.tag });

  };
  const [note, setNote] = useState({ id: "", etitle: "", edesc: "", etag: "" });
  const handleClick = (e) => {

    refClose.current.click();
    editNote(note.id, note.etitle, note.edesc, note.etag)
    props.showAlert("Updated Successfully", "success")
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* <Addnote /> */}

      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel" style={{color:'white'}}>
                Update Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3 ">
                  <h1>Update Notes</h1>
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    value={note.etitle}
                    onChange={onChange}

                  />
                </div>
                <div className="mb-3 ">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edesc"
                    name="edesc"
                    value={note.edesc}
                    onChange={onChange}

                  />
                </div>
                <div className="mb-3 ">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}

                  />
                </div>


              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={note.etitle.length < 5 || note.edesc.length < 5}
                onClick={handleClick} type="button" className="btn btn-primary" >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h3 className="my-2" style={{color:'white'}}>Your Notes</h3>
        <div className="container mx-3">
          {notes.length === 0 && <Nonotes />}
        </div>
        {notes.map((note, index) => {
          return <Noteitem note={note} key={index} updateNote={updateNote} showAlert={props.showAlert} />;
        })}
      </div>
    </>
  );
};

export default Notes;
