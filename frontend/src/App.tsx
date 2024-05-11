import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Auth0Provider } from '@auth0/auth0-react'
import { FolderRoute } from './folder/route/FolderRoute'
import { NoteRoute } from './note/route/NoteRoute'
import { AccessTokenProvider } from './common/components/AccessTokenProvider'
import { UserRoute } from './user/route/UserRoute'
const { VITE_AUTH_DOMAIN, VITE_AUTH_CLIENT_ID } = import.meta.env

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
        element: <UserRoute />,
    },
])

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: (failureCount, error) => {
                if (error.message === '403') return false;
                return failureCount < 2;
            }
        }
    }
})

export const App = () => {
    return (
        <Auth0Provider
            domain={VITE_AUTH_DOMAIN}
            clientId={VITE_AUTH_CLIENT_ID}
            authorizationParams={{
                redirect_uri: window.location.origin,
            }}
        >
            <AccessTokenProvider>
                <QueryClientProvider client={queryClient}>
                    <div className="h-screen w-screen">
                        <RouterProvider router={router} />
                    </div>
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </AccessTokenProvider>
        </Auth0Provider>
    )
}
