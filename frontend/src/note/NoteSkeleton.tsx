import { Fragment } from 'react'
import { Header } from '../common/Header'
import { HeaderFolderItemContents } from '../common/HeaderFolderItemContents'
import { SkeletonBox } from '../common/SkeletonBox'
import { NoteContainer } from './NoteContainer'
import { getArrayOfSize, getRandomArray } from '../common/skeletonUtility'

// TODO: this... probably won't cut it
const NUM_MENU_BUTTONS = 17

export const NoteSkeleton = () => {
    const skeletonMenuButtons = getArrayOfSize(NUM_MENU_BUTTONS)

    const skeletonTexts = getRandomArray(4, 10)

    return (
        <NoteContainer>
            <Header>
                <HeaderFolderItemContents>
                    <SkeletonBox size="sm" />
                </HeaderFolderItemContents>
            </Header>
            <div className="grow bg-zinc-900">
                {/* <Menu />*/}
                <div className="flex flex-row gap-2 px-4 py-4 bg-zinc-900">
                    {skeletonMenuButtons.map((_, index) => (
                        <div
                            key={index}
                            className="icon-box animate-pulse bg-zinc-800 rounded-lg border-2 border-zinc-900"
                        />
                    ))}
                </div>
                <div className="p-4">
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
            </div>
        </NoteContainer>
    )
}
