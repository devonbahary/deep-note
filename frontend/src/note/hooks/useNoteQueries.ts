import { useMutation, useQuery } from '@tanstack/react-query'
import { getNote, updateNote } from '../../api/notes'
import { Content } from '@tiptap/react'

export const useGetNote = (id?: string) => {
    return useQuery({
        queryKey: ['note', id],
        queryFn: () => {
            if (id) return getNote(id)
            throw new Error(`Cannot get note without id`)
        },
        enabled: Boolean(id),
        gcTime: 0, // don't cache notes b/c they're stale the moment they're loaded due to content being in local state
    })
}

export const useUpdateContent = (noteId: string) => {
    return useMutation({
        mutationFn: (content: Content) => updateNote({ id: noteId, content }),
    })
}
