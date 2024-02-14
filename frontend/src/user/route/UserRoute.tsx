import { AuthenticatedRoute } from '../../common/components/AuthenticatedRoute'
import { LoadUser } from './LoadUser'

export const UserRoute = () => (
    <AuthenticatedRoute>
        <LoadUser />
    </AuthenticatedRoute>
)
