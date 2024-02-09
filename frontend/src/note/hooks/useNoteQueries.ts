import { useMutation, useQuery } from '@tanstack/react-query'
import { Content } from '@tiptap/react'
import { useGet, useUpdate } from '../../common/hooks/useApi'
import { Note } from '../../types/Note'
import { UpdateNoteContentInput } from '../../types/types'

export const useGetNote = (id?: string) => {
    const get = useGet<Note>('/api/notes')

    return useQuery({
        queryKey: ['note', id],
        queryFn: () => {
            if (id) return get(id)
            throw new Error(`Cannot get note without id`)
        },
        enabled: Boolean(id),
        gcTime: 0, // don't cache notes b/c they're stale the moment they're loaded due to content being in local state
    })
}

export const useUpdateContent = (noteId: string) => {
    const update = useUpdate<Note, UpdateNoteContentInput>('/api/notes')

    return useMutation({
        mutationFn: (content: Content) => update(noteId, { content }),
    })
}
