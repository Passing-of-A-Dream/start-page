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

export default function Layout(props: ILayoutProps) {
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
          <footer className='footer'>底部</footer>
        </section>
      </section>
    </div>
  );
}
