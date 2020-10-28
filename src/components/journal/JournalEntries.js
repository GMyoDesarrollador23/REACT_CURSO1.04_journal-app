import React from "react";
import { useSelector } from "react-redux";
import { JornalEntry } from "./JornalEntry";

export const JournalEntries = () => {
   const { notes } = useSelector((state) => state.notes);

   return (
      <div className="journal__entries ">
         {notes.map((note) => (
            <JornalEntry key={note.id} {...note} />
         ))}
      </div>
   );
};
