import { FC } from 'react'
import { CreateRootFolderAction } from '../folder/common/CreateRootFolderAction'
import { UserInfo } from './UserInfo'
import { AuthenticationAction } from './AuthenticationAction'
import { Folder } from '../types/Folder'
import { UnorderedList } from '../folder/common/UnorderedList'
import { RootFolderListItem } from './RootFolderListItem'

type UserProps = {
    rootFolders: Folder[]
}

export const User: FC<UserProps> = ({ rootFolders }) => {
    return (
        <div className="relative bg-zinc-900 text-zinc-100 overflow-y-scroll w-full h-full grid">
            <div className="place-self-center pt-16 pb-8">
                <UserInfo />
                <div className="mt-8 mb-12">
                    {rootFolders.length ? (
                        <>
                            <p className="text-center mb-4 text-zinc-300">
                                {rootFolders.length > 1
                                    ? 'Your folders'
                                    : 'Your folder'}
                            </p>
                            <UnorderedList>
                                {rootFolders?.map((folder) => (
                                    <RootFolderListItem
                                        key={folder._id}
                                        folder={folder}
                                    />
                                ))}
                            </UnorderedList>
                        </>
                    ) : (
                        <>
                            <p className="text-center text-zinc-400">
                                You don't have any folders yet.
                            </p>
                            <CreateRootFolderAction />
                        </>
                    )}
                </div>
                <AuthenticationAction />
            </div>
        </div>
    )
}
