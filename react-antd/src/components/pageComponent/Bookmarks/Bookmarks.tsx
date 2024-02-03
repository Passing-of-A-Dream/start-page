import * as React from "react"
import { Button, Modal } from "antd"
import "./Bookmarks.scss"
import BookmarksContent from "@/components/BookmarksContent/BookmarksContent"
import YModal from "@/components/YModal/YModal"
export default function Bookmarks() {
  const [visible, setVisible] = React.useState(false)
  return (
    <>
      <div className="page-component-bookmarks" onClick={() => setVisible(true)}>
        <span>书签</span>
      </div>
      <YModal visible={visible} closeClick={() => setVisible(false)}>
        <BookmarksContent />
      </YModal>
    </>
  )
}