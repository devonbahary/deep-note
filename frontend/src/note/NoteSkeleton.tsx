import { Fragment } from 'react'
import { Header } from '../common/Header'
import { HeaderFolderItemContents } from '../common/HeaderFolderItemContents'
import { SkeletonBox } from '../common/SkeletonBox'
import { getRandomArray } from '../common/skeletonUtility'
import { COMMAND_BUTTON_GROUPS } from './editor-commands-menu/commands'
import { CommandButtonGroup } from './editor-commands-menu/CommandButtonGroup'
import { EditCommandsMenuContainer } from './editor-commands-menu/EditCommandsMenuContainer'
import { ViewContainer } from '../common/ViewContainer'

export const NoteSkeleton = () => {
    const skeletonTexts = getRandomArray(4, 10)

    return (
        <ViewContainer
            fixedContent={
                <>
                    <Header>
                        <HeaderFolderItemContents>
                            <SkeletonBox size="sm" />
                        </HeaderFolderItemContents>
                    </Header>
                    <EditCommandsMenuContainer>
                        {COMMAND_BUTTON_GROUPS.map((group, groupIdx) => (
                            <CommandButtonGroup key={groupIdx}>
                                {group.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className="icon-box animate-pulse bg-zinc-800 rounded-lg border-2 border-zinc-900"
                                    />
                                ))}
                            </CommandButtonGroup>
                        ))}
                    </EditCommandsMenuContainer>
                    <div className="p-4 bg-zinc-900 min-h-full">
                        {skeletonTexts.map((_, index) => {
                            const randMargin = 1 + Math.floor(Math.random() * 4) // 1-5

                            const marginItems = new Array(randMargin).fill(null)

                            return (
                                <Fragment key={index}>
                                    <SkeletonBox size="lg" />
                                    {marginItems.map((_, index) => (
                                        <div
                                            key={index}
                                            className="m-2 h-1 w-1"
                                        ></div>
                                    ))}
                                </Fragment>
                            )
                        })}
                    </div>
                </>
            }
        />
    )
}
