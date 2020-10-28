import { db } from "../firebase/firebase-config";

export const loadNotes = async (uid) => {
   const notesSnap = await db
      .collection(`${uid}/journal/notes`)
      .get();

   const notes = [];

   notesSnap.forEach((e) => {
      notes.push({
         id: e.id,
         ...e.data(),
      });
   });

   return notes;
};
