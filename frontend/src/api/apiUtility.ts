export const toJSONOrThrow = async (url: string) => {
    const response = await fetch(url)

    if (response.ok) {
        return response.json()
    } else {
        throw new Error(`${response.status}`)
    }
}

export const create = async <T>(
    url: string,
    parentFolderId?: string
): Promise<T> => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            parentFolderId,
        }),
    })

    return response.json()
}

export const update = async <T, I>(url: string, input: I): Promise<T> => {
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
    })

    return response.json()
}

export const destroy = async (url: string) => {
    await fetch(url, {
        method: 'DELETE',
    })
}
