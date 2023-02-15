import * as React from 'react';
import './settingsBody.scss'

type YNode<T = undefined> = T extends undefined ? React.ReactNode : (props: T) => React.ReactNode
export interface ISettingsBodyProps {
  title: string;
  children: YNode;
}

export function SettingsBody(props: ISettingsBodyProps) {
  return (
    <>
      <div className='settings-components-body'>
        <header className="header">
          <span>{props.title}</span>
        </header>
        <main className='main'>
          {props.children}
        </main>
      </div>
    </>
  );
}
