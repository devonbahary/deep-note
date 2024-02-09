import { AuthenticatedRoute } from '../../common/components/AuthenticatedRoute'
import { LoadFolder } from './LoadFolder'

export const FolderRoute = () => (
    <AuthenticatedRoute>
        <LoadFolder />
    </AuthenticatedRoute>
)
