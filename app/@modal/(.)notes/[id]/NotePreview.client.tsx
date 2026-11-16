'use client';
import css from './NotePreview.module.css';
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from 'next/navigation';
import { fetchNoteById } from "@/lib/api";
import Modal from '@/components/Modal/Modal';



export default function NotePreviewClient() {
    const router = useRouter();
    const closeModal = () => router.back();

    const { id } = useParams<{ id: string }>();

    const { data: note, isLoading, isError } = useQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false,
    });
    
    if (isLoading) return <p>Loading, please wait...</p>;
    if (isError || !note) return <p>Something went wrong.</p>;

    return (
         <Modal onClose={closeModal}>
            <div className={css.container}>
                <div className={css.item}>
                    <div className={css.header}>
                        <h2>{note.title}</h2>
                    </div>
                    <p className={css.tag}>{note.tag}</p>
                    <p className={css.content}>{note.content}</p>
                    <p className={css.date}>{note.createdAt}</p>
                    <button className={css.backBtn} onClick={closeModal}>Go back</button>
                </div>
            </div>
        </Modal>
    )
}