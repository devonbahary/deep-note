import { Await, useLoaderData } from 'react-router-dom'
import { Note as NoteType } from '../types/Note'
import { Suspense } from 'react'
import { AsyncErrorElement } from '../common/AsyncErrorElement'
import { Note } from './Note'
import { NoteSkeleton } from './NoteSkeleton'

export const NoteRoute = () => {
    const data = useLoaderData() as { note: NoteType }

    return (
        <Suspense fallback={<NoteSkeleton />}>
            <Await resolve={data.note} errorElement={<AsyncErrorElement />}>
                {(note) => <Note note={note} />}
            </Await>
        </Suspense>
    )
}
