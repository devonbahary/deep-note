import { useContext } from 'react'
import { AccessTokenContext } from '../components/AccessTokenProvider'

const BASE_URL = '/api'

const useAuthHeaders = (): HeadersInit => {
    const { accessToken } = useContext(AccessTokenContext)

    return accessToken
        ? {
              Authorization: `Bearer ${accessToken}`,
          }
        : {}
}

export const useGet = <T>(url: string) => {
    const headers = useAuthHeaders()

    const get = async (id?: string): Promise<T> => {
        const response = await fetch(
            id ? `${BASE_URL}${url}/${id}` : `${BASE_URL}${url}`,
            {
                headers,
            }
        )

        if (response.ok) {
            return response.json()
        } else {
            throw new Error(`${response.status}`)
        }
    }

    return get
}

export const useCreate = <T, I>(url: string) => {
    const headers = useAuthHeaders()

    const create = async (input: I): Promise<T> => {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: JSON.stringify(input),
        })

        if (response.ok) {
            return response.json()
        } else {
            throw new Error(`${response.status}`)
        }
    }

    return create
}

export const useUpdate = <T, I>(url: string) => {
    const headers = useAuthHeaders()

    const update = async (id: string, input: I): Promise<T> => {
        const response = await fetch(`${BASE_URL}${url}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: JSON.stringify(input),
        })

        if (response.ok) {
            return response.json()
        } else {
            throw new Error(`${response.status}`)
        }
    }

    return update
}

export const useDelete = (url: string) => {
    const headers = useAuthHeaders()

    const destroy = async (id: string): Promise<void> => {
        const response = await fetch(`${BASE_URL}${url}/${id}`, {
            method: 'DELETE',
            headers,
        })

        if (!response.ok) {
            throw new Error(`${response.status}`)
        }
    }

    return destroy
}
