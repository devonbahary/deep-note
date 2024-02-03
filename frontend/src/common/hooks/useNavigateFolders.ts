import { useNavigate } from 'react-router-dom'

type UseNavigateFoldersResponse = {
    goToFolder: (id: string) => void
    goToNote: (id: string) => void
}

export const useNavigateFolders = (): UseNavigateFoldersResponse => {
    const navigate = useNavigate()

    const goToFolder = (id: string) => navigate(`/folders/${id}`)
    const goToNote = (id: string) => navigate(`/notes/${id}`)

    return {
        goToFolder,
        goToNote,
    }
}
