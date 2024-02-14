import { AuthenticatedRoute } from '../common/components/AuthenticatedRoute'
import { LandingPage } from './LandingPage'

export const LandingPageRoute = () => (
    <AuthenticatedRoute>
        <LandingPage />
    </AuthenticatedRoute>
)
