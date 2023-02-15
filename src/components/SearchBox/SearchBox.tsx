import { Input } from 'antd';
import * as React from 'react';
import { useSnapshot } from 'valtio';
import './SearchBox.scss'
import store from '@/valtio/index'

export interface ISearchProps {
}

const { Search } = Input;

export function SearchBox(props: ISearchProps) {
  const snap = useSnapshot(store)

  const [SearchBoxValue, setSearchBoxValue] = React.useState<string>('')

  const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value
    value && searchMethos(value)
  }
  const onSearch = (value: string) => {
    value && searchMethos(value)
  }

  const searchMethos = (val: string) => {
    if (snap.outOpenSearch) {
      window.open(`https://cn.bing.com/search?q=${val} -site:csdn.net`)
    } else {
      window.location.href = `https://cn.bing.com/search?q=${val} -site:csdn.net`
    }
  }

  return (
    <>
      <div data-component-searchbox="" className='Component-SearchBox'>
        <Search
          className='Search'
          placeholder='请输入搜索内容'
          value={SearchBoxValue}
          onChange={(e) => setSearchBoxValue(e.target.value)}
          enterButton
          onPressEnter={onPressEnter}
          onSearch={onSearch}
        />
      </div>
    </>
  );
}
