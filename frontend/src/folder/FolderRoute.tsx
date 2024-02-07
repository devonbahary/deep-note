import { Suspense } from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import { Folder as FolderType } from '../types/Folder'
import { Folder } from './Folder'
import { FolderSkeleton } from './FolderSkeleton'
import { AsyncErrorElement } from '../common/AsyncErrorElement'

export const FolderRoute = () => {
    const data = useLoaderData() as { folder: FolderType }

    return (
        <Suspense fallback={<FolderSkeleton />}>
            <Await resolve={data.folder} errorElement={<AsyncErrorElement />}>
                {(folder) => <Folder folder={folder} />}
            </Await>
        </Suspense>
    )
}
