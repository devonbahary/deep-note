import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { LandingPage } from './landing-page/LandingPage'
import { FolderRoute } from './folder/FolderRoute'
import { NoteRoute } from './note/NoteRoute'

const router = createBrowserRouter([
    {
        path: '/folders/:id',
        element: <FolderRoute />,
    },
    {
        path: '/notes/:id',
        element: <NoteRoute />,
    },
    {
        path: '/',
        element: <LandingPage />,
    },
])

const queryClient = new QueryClient()

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="h-screen w-screen">
                <RouterProvider router={router} />
            </div>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
