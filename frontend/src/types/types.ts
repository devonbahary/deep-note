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

export type UpdateFolderChildInput = {
    name?: string
    parentFolderId?: string
    tailwindColor?: string
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
