import { useNavigate } from 'react-router-dom'

type useNavigationResponse = {
    goToFolder: (id: string) => void
    goToNote: (id: string) => void
    goToUser: () => void
}

export const useNavigation = (): useNavigationResponse => {
    const navigate = useNavigate()

    return {
        goToFolder: (id: string) => navigate(`/folders/${id}`),
        goToNote: (id: string) => navigate(`/notes/${id}`),
        goToUser: () => navigate('/'),
    }
}
