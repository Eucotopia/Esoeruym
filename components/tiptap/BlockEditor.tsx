import {Editor, EditorContent} from "@tiptap/react";
import {TextMenu} from "./menus/TextMenu";
import {useRef} from "react";
import {LinkMenu} from "./menus/LinkMenu";
import {ContentItemMenu} from "./menus/ContentItemMenu";

export const BlockEditor = ({editor}: { editor: Editor }) => {

    const menuContainerRef = useRef(null)

    if (!editor) {
        return null
    }

    return (
        <div className="flex h-full">
            {/*<Sidebar isOpen={leftSidebar.isOpen} onClose={leftSidebar.close} editor={editor} />*/}
            <div className="relative flex flex-col flex-1 h-full overflow-hidden">
                {/*<EditorHeader*/}
                {/*  editor={editor}*/}
                {/*  collabState={collabState}*/}
                {/*  users={users}*/}
                {/*  isSidebarOpen={leftSidebar.isOpen}*/}
                {/*  toggleSidebar={leftSidebar.toggle}*/}
                {/*/>*/}
                <EditorContent editor={editor} className="flex-1 overflow-y-auto"/>
                <ContentItemMenu editor={editor}/>
                <LinkMenu editor={editor} appendTo={menuContainerRef}/>
                <TextMenu editor={editor}/>
                {/*<ColumnsMenu editor={editor} appendTo={menuContainerRef} />*/}
                {/*<TableRowMenu editor={editor} appendTo={menuContainerRef} />*/}
                {/*<TableColumnMenu editor={editor} appendTo={menuContainerRef} />*/}
                {/*<ImageBlockMenu editor={editor} appendTo={menuContainerRef} />*/}
            </div>
        </div>
    )

}