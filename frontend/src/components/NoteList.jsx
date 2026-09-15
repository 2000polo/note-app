import React from 'react';
import NoteCard from './NoteCard';

const NoteList = ({notes, setNotes}) => {
    return (
        <ul className="grid grid-cols-4 grid-rows-4 gap-4 mt-8">
            {/* <li className="py-4 pb-2 text-xs opacity-60 tracking-wide">Most played songs this week</li> */}
            {
                notes.map((note) => {
                    return <NoteCard note={note} setNotes={setNotes} key={note?._id} />
                })
            }
        </ul>
    )
}

export default NoteList;