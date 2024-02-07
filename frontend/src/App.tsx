import { RouterProvider, createBrowserRouter, defer } from 'react-router-dom'
import { getNote } from './api/notes'
import { getFolder } from './api/folders'
import { FolderRoute } from './folder/FolderRoute'
import { NoteRoute } from './note/NoteRoute'
import { AsyncErrorElement } from './common/AsyncErrorElement'

const router = createBrowserRouter([
    {
        path: '/folders/:id',
        element: <FolderRoute />,
        loader: async ({ params: { id } }) => {
            return defer({
                folder: getFolder(id),
            })
        },
    },
    {
        path: '/notes/:id',
        element: <NoteRoute />,
        loader: async ({ params: { id } }) => {
            return defer({
                note: getNote(id),
            })
        },
    },
    {
        path: '/',
        // TODO: landing page
        element: <h1>Hello World</h1>,
        errorElement: <AsyncErrorElement />,
    },
])

export const App = () => {
    return (
        <div className="h-screen w-screen">
            <RouterProvider router={router} />
        </div>
    )
}
