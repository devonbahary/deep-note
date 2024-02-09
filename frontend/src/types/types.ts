import { Content } from '@tiptap/react'
import { FunctionComponent } from 'react'

type Document = {
    _id: string
}

export type FolderChild = Document &
    Timestamps & {
        _parentFolderId: string
        name: string
        tailwindColor?: string
    }

export type CreateFolderChildInput = {
    parentFolderId?: string
}

export type UpdateFolderChildInput = {
    id: string
    name?: string
    parentFolderId?: string
    tailwindColor?: string
}

export type UpdateNoteContentInput = {
    content: Content
}

export type Timestamps = {
    createdAt: Date
    updatedAt: Date
}

export type SVGIcon = FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
        title?: string | undefined
    }
>
