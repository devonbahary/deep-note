import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Note } from './note/Note'
import { NotFoundPage } from './NotFoundPage'
import { getNote } from './api/notes'
import { Folder } from './folder/Folder'
import { getFolder } from './api/folders'

const router = createBrowserRouter([
    {
        path: '/folders/:id',
        element: <Folder />,
        loader: async ({ params: { id } }) => {
            return getFolder(id)
        },
    },
    {
        path: '/notes/:id',
        element: <Note />,
        loader: async ({ params: { id } }) => {
            return getNote(id)
        },
    },
    {
        path: '/',
        // TODO: landing page
        element: <h1>Hello World</h1>,
        errorElement: <NotFoundPage />,
    },
])

export const App = () => {
    return (
        <div className="h-screen w-screen">
            <RouterProvider router={router} />
        </div>
    )
}
