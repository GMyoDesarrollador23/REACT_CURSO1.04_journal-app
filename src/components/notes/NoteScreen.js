import Swal from "sweetalert2";
import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { NoteAppBar } from "./NoteAppBar";
import { useForm } from "../../hooks/useForm";
import {
   activeNote,
   startDeleting,
} from "../../actions/notes";

export const NoteScreen = () => {
   const dispatch = useDispatch();

   const { active: note } = useSelector(
      (state) => state.notes
   );

   const [formValues, handleInputChange, reset] = useForm(
      note
   );
   const { title, body, id } = formValues;

   const activeId = useRef(note.id);

   useEffect(() => {
      if (note.id !== activeId.current) {
         reset(note);
         activeId.current = note.id;
      }
   }, [note, reset]);

   useEffect(() => {
      dispatch(
         activeNote(formValues.id, { ...formValues })
      );
   }, [formValues, dispatch]);

   const handleDelete = () => {
      Swal.fire({
         title: "Delete Note",
         text: "Are you sure you want to delete this note?",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
         confirmButtonText: "Yes, delete it!",
      }).then((result) => {
         if (result.value) {
            dispatch(startDeleting(id));
            Swal.fire({
               position: "center",
               icon: "success",
               title: "note cleared with success",
               showConfirmButton: false,
               timer: 1500,
            });
         }
      });
   };

   return (
      <div className="notes__main-content animate__animated animate__fadeIn animate__faster">
         <NoteAppBar />

         <div className="notes__content">
            <input
               type="text"
               placeholder="hola"
               className="notes__title-input"
               autoComplete="off"
               name="title"
               value={title}
               onChange={handleInputChange}
            />
            <textarea
               placeholder="que paso ayer"
               className="notes__texaria"
               name="body"
               value={body}
               onChange={handleInputChange}
            ></textarea>
            {note.url && (
               <div className="notes__image animate__animated animate__fadeIn animate__faster">
                  <img src={note.url} alt="paisaje" />
               </div>
            )}
         </div>
         <button
            className="btn btn-danger"
            onClick={handleDelete}
         >
            Delete
         </button>
      </div>
   );
};
