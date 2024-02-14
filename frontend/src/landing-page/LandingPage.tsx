import { useRedirectToUserOnIdentification } from './hooks/useRedirectToUserOnAuthentication'
import { CreateRootFolderAction } from '../folder/common/CreateRootFolderAction'

export const LandingPage = () => {
    useRedirectToUserOnIdentification()

    return (
        <div className="w-full h-full bg-zinc-900 grid">
            <div className="place-self-center">
                <CreateRootFolderAction />
            </div>
        </div>
    )
}
