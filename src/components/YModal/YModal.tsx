import { Modal } from "antd";
import { MouseEventHandler, ReactNode, useEffect } from "react";
import "./YModal.scss"
import store from "@/valtio/index";
import { useSnapshot } from "valtio";

type YNode<T = undefined> = T extends undefined ? ReactNode : (props: T) => ReactNode
interface YModalProps {
  visible: boolean
  closeClick?: ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined
  children?: YNode // body
}

export default function YModal(props: YModalProps) {
  const snap = useSnapshot(store)
  useEffect(()=>{
    store.modalShow = props.visible
    return () => {}
  },[props.visible])
  return (
    <>
      <Modal
        open={props.visible}
        centered
        onCancel={props.closeClick}
        okButtonProps={{ disabled: true }}
        cancelButtonProps={{ disabled: true }}
        closable={false}
        footer={null}
        width={800}
        // style={{ backgroundColor: "transparent" }}
        wrapClassName="bookmarks-modal"
        mask={false}
      >
        <div className="bookmarks-content-container" bookmarks-container="">
          {props.children}
        </div>
      </Modal>
    </>
  )
}