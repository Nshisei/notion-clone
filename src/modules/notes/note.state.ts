import { atom, useAtom } from "jotai";
import { Note } from "./note.entity";

const noteAtom = atom<Note[]>([]);
// ノート情報を管理するグローバルステート
export const useNoteStore = () => {
    const [notes, setNotes] = useAtom(noteAtom);

    // 二つのnoteリストをmergeする
    const set = (newNotes: Note[]) => {
        setNotes((oldNotes) => {
            const combineNotes = [...oldNotes, ...newNotes]; // noteAリストとnoteBリストを結合
            const uniqueNotes: { [key:number]:Note} = {}; // {1:note1. 2:note2} のような形でkeyをユニークにする

            // ノートをマージする。その際、同じノートがあるときはnewNotes側で上書きする
            for(const note of combineNotes){
                uniqueNotes[note.id] = note;
            }
            return Object.values(uniqueNotes); // keyがユニークなnoteリストを返す

        });

    };

    // ノートを削除する(子ノートも含む)
    const deleteNote = (id:number) => {
        const findChildrenIds = (parentId:number):number[] => {
            const childrenIds = notes
            .filter((note) => note.parent_document === parentId)
            .map((child)=>child.id);
            return childrenIds.concat(
                ...childrenIds.map((childIds) => findChildrenIds(childIds)) // 子ノートのIDを再帰的に取得
            );
        }
        const childrenIds = findChildrenIds(id);
        setNotes((oldNotes) =>
            oldNotes.filter((note) => ![...childrenIds, id].includes(note.id)));
    };
    
    const getOne = (id: number) => notes.find((note) => note.id === id);
    const clear = () => setNotes([]);

    
    return {
        getAll: () => notes,
        getOne,
        set,
        delete: deleteNote,
        clear,
    };
}