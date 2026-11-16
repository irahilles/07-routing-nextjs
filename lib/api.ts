import axios from "axios";
import type {Note, NoteTag} from '@/types/note';


const URL = 'https://notehub-public.goit.study/api/notes';
const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

interface FetchNotesProps{
    notes: Note[];
    totalPages: number;
}

export interface InitialValuesProps{
    title: string,
    content: string,
    tag: NoteTag,
}

export async function fetchNotes(query: string, page = 1, perPage = 12, tag?: string): Promise<FetchNotesProps>{
    const response = await axios.get<FetchNotesProps>(URL, {
        params: {
            search: query,
            page,
            perPage,
            ...(tag ? { tag } : {}),
        },
        headers: {
            Authorization: `Bearer ${myKey}`,
        }
    })
    return {
        notes: response.data.notes,
        totalPages: response.data.totalPages,
    };
}


export async function createNote(values: InitialValuesProps): Promise<Note> {
    const response = await axios.post<Note>(URL, values, {
        headers: {
            Authorization: `Bearer ${myKey}`,
        },
    })
    return response.data;
}

export async function deleteNote(id: string) {
    const response = await axios.delete<Note>(`${URL}/${id}`, { headers: { Authorization: `Bearer ${myKey}` } })
    return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await axios.get<Note>(`${URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });

  return response.data;
}