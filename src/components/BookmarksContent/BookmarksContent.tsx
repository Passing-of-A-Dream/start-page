import * as React from 'react';
import { Collapse } from 'antd';
import store from '@/valtio/index'
import { useSnapshot } from 'valtio';
import "./BookmarksContent.scss"

const { Panel } = Collapse

interface ChromeBookmarkTreeNode {
  id: string;
  parentId?: string;
  index?: number;
  url?: string;
  title?: string;
  dateAdded?: number;
  dateGroupModified?: number;
  children?: ChromeBookmarkTreeNode[];
}

const BookmarksContent = () => {
  const snap = useSnapshot(store)

  const [activeKey, setActiveKsy] = React.useState(['收藏夹栏']) // 默认选中
  const [resData, setResData] = React.useState<ChromeBookmarkTreeNode[]>([]) // 书签内容
  React.useEffect(() => {
    // 获取书签
    chrome.bookmarks && chrome.bookmarks.getTree((res: ChromeBookmarkTreeNode[]) => {
      setResData(res)
    })
  }, [])

  const defaultActiveKey = (str: string) => {
    return activeKey
  }

  const faviconURL = (u: string) => {
    const url = new URL(chrome.runtime.getURL("/_favicon/"));
    url.searchParams.set("pageUrl", u);
    url.searchParams.set("size", "32");
    return url.toString();
  }

  // 递归渲染书签内容
  const bookmarksData = (data: any) => {
    return (
      <div className='bookmarks-container'>
        {
          data.map((item: any) => {
            return (
              <div key={item.title}>
                {
                  item.children ?
                    <Collapse defaultActiveKey={defaultActiveKey(item.title)} ghost>
                      <Panel header={item.title} key={item.title} style={{ borderRadius: 10 }}>
                        {
                          item.children && bookmarksData(item.children)
                        }
                      </Panel>
                    </Collapse> :
                    <div className='bookmarks-content' onClick={() => openBookmarks(item.url)}>
                      <img src={faviconURL(item.url)} alt="" />
                      {contentFilter(item)}
                    </div>
                }
              </div>
            )
          })
        }
      </div>
    )
  }
  // 书签内容过滤
  const contentFilter = (con: any) => {
    return (
      <span className='bookmarks' title={con.url}>{con.title}</span>
    )
  }
  // 打开书签
  const openBookmarks = (url: string) => {
    if (snap.outOpenBookmarks) {
      window.open(url)
    } else {
      window.location.href = url
    }
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: "100%" }}>
      {
        resData.length > 0 ? bookmarksData(resData[0]?.children) : <span>无法获取书签</span>
      }
      {/* <div style={{ display: 'flex', flexDirection: 'column' }}>
        {
          Array.from({ length: 200 }).map((item, index) => {
            return (
              <div key={index}>
                内容
              </div>
            )
          })
        }
      </div> */}

    </div>
  )
}

export default BookmarksContent