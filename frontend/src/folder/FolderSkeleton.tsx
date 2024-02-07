import { Header } from '../common/Header'
import { ListItem } from './common/ListItem'
import { UnorderedList } from './common/UnorderedList'
import { HeaderFolderItemContents } from '../common/HeaderFolderItemContents'
import { SkeletonBox } from '../common/SkeletonBox'
import { FolderContainer } from './FolderContainer'
import { getRandomArray } from '../common/skeletonUtility'
import SquareIcon from '../assets/square-fill.svg?react'

export const FolderSkeleton = () => {
    const skeletonItems = getRandomArray(4, 10)

    return (
        <FolderContainer>
            <Header>
                <HeaderFolderItemContents>
                    <SkeletonBox size="sm" />
                </HeaderFolderItemContents>
            </Header>
            <UnorderedList className="grow bg-zinc-900">
                {skeletonItems.map((_, index) => (
                    <ListItem
                        key={index}
                        className="animate-pulse bg-zinc-900  border-zinc-700"
                        icon={<SquareIcon className="text-zinc-300" />}
                    >
                        <SkeletonBox size="sm" />
                    </ListItem>
                ))}
            </UnorderedList>
        </FolderContainer>
    )
}
