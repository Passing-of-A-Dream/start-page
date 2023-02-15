import { Button } from 'antd';
import { useSnapshot } from 'valtio';
import YDate from '../Date/Date';
import './Layout.scss';
import { ReactNode, useEffect, useState } from 'react';
import { SideBar } from '../SideBar/SideBar';
import { SearchBox } from '../SearchBox/SearchBox';

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
  const [oneLanguage, setOneLanguage] = useState<IOneLanguage>()
  useEffect(() => {
    fetch("https://v1.hitokoto.cn/")
      .then(res => res.json())
      .then(res => {
        setOneLanguage(res)
      })
  }, [])
  return (
    <div className='Component-Layout'>
      <section className='section-of-body'>
        <aside className='side-bar'>
          <SideBar />
        </aside>
        <section className='side-body'>
          <header className='time'>
            <YDate color="#f3f3f3" />
          </header>
          <SearchBox />
          <main>
            {props.children}
          </main>
          <footer className='footer'>
            <div className='one-language'>
              <span>{oneLanguage?.hitokoto}</span>
              <span>&mdash;{oneLanguage?.from + '-' + oneLanguage?.from_who}</span>
            </div>
          </footer>
        </section>
      </section>
    </div>
  );
}
