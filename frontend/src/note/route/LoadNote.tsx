import { useParams } from 'react-router-dom'
import { ErrorElement } from '../../common/components/ErrorElement'
import { useGetNote } from '../hooks/useNoteQueries'
import { NoteSkeleton } from './NoteSkeleton'
import { Note } from '../Note'

export const LoadNote = () => {
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
