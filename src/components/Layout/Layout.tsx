import { Button } from 'antd';
import { useSnapshot } from 'valtio';
import store from '@/valtio/index';
import YDate from '../Date/Date';
import './Layout.scss';
import { ReactNode, useEffect, useState } from 'react';
// import { SideBar } from '../SideBar/SideBar';
import { SearchBox } from '../SearchBox/SearchBox';
import { cssVarModify } from '@/utils/utils';

type YNode<T = undefined> = T extends undefined ? ReactNode : (props: T) => ReactNode
export interface ILayoutProps {
  children: YNode;
}

interface IOneLanguage {
  commit_from: string
  hitokoto: string
  from: string
  from_who: string
  creator: string
  created_at: string
  id: number
  length: number
  reviewer: number
  uuid: string
  type: string
}

export default function Layout(props: ILayoutProps) {
  const snap = useSnapshot(store)
  const [oneLanguage, setOneLanguage] = useState<IOneLanguage>()
  useEffect(() => {
    getOneLanguage();
    () => { }
  }, [])
  function getOneLanguage() {
    fetch("https://v1.hitokoto.cn/")
      .then(res => res.json())
      .then(res => {
        setOneLanguage(res)
      })
      .catch(err => {
        cssVarModify('--pagebody-backgroundImage', 'url("/background.jfif")')
      })
  }
  const oneLanguageStyle: React.CSSProperties = {
    mixBlendMode: "difference"
  }
  function oneLanguageClick() {
    if (snap.oneLanguage) {
      getOneLanguage();
    }
  }
  return (
    <div className='Component-Layout' style={{
      backdropFilter: !snap.backImageBlur ? 'blur(0px)' : 'blur(3.3px)'
    }}>
      <section className='section-of-body'>
        {/* <aside className='side-bar'>
          <SideBar />
        </aside> */}
        <section className='side-body'>
          <header className='time'>
            <YDate color="#f3f3f3" />
          </header>
          <SearchBox />
          <main className={`${snap.isSimpleMode ? 'main-none' : 'main-show'}`}>
            {props.children}
          </main>
          <footer className='footer'>
            <div className='one-language' style={oneLanguageStyle} onClick={oneLanguageClick}>
              <span>{oneLanguage ? oneLanguage?.hitokoto : "无法获取一言"}</span>
              <span>
                &mdash;
                {
                  oneLanguage ?
                    (
                      (oneLanguage?.from ? oneLanguage?.from : '未知') +
                      (oneLanguage?.from_who ? '-' + oneLanguage?.from_who : '')
                    ) :
                    "请检查网络"
                }
              </span>
            </div>
          </footer>
        </section>
      </section>
    </div>
  );
}
