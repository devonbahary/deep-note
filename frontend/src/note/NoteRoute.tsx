import { useParams } from 'react-router-dom'
import { NoteSkeleton } from './NoteSkeleton'
import { ErrorElement } from '../common/ErrorElement'
import { Note } from './Note'
import { useGetNote } from './hooks/useNoteQueries'

export const NoteRoute = () => {
    const { id } = useParams()

    const { isPending, isError, data: note, error } = useGetNote(id)

    if (isPending) {
        return <NoteSkeleton />
    }

    if (isError) {
        return <ErrorElement error={error} />
    }

    return <Note note={note} />
}
