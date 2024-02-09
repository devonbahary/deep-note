import { useQuery } from '@tanstack/react-query'
import { getNote } from '../../api/notes'

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
