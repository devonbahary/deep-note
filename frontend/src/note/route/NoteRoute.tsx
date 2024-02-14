import { AuthenticatedRoute } from '../../common/components/AuthenticatedRoute'
import { LoadNote } from './LoadNote'

export const NoteRoute = () => (
    <AuthenticatedRoute>
        <LoadNote />
    </AuthenticatedRoute>
)
