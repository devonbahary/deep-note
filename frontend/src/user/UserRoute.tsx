import { AuthenticatedRoute } from '../common/components/AuthenticatedRoute'
import { User } from './User'

export const UserRoute = () => (
    <AuthenticatedRoute>
        <User />
    </AuthenticatedRoute>
)
