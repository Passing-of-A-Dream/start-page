import { Divider, Input } from 'antd';
import * as React from 'react';
import { useSnapshot } from 'valtio';
import './SearchBox.scss'
import store from '@/valtio/index'
import useJSONP from 'use-jsonp';
import { SearchOutlined } from '@ant-design/icons'
import { debounce, ObjectToUrl } from '@/utils/utils'

export interface ISearchProps {
}

const { Search } = Input;

interface searchSugrecResultType {
  q: string
  p: string
  slid: string
  queryid: string
  g: Array<{
    q: string;
    sa: string;
    type: string;
  }>
}

export function SearchBox(props: ISearchProps) {
  const snap = useSnapshot(store)

  const [SearchBoxValue, setSearchBoxValue] = React.useState<string>('') // 搜索框的值
  const [searchSugrecResult, setSearchSugrecResult] = React.useState<searchSugrecResultType>() // 搜索框的值

  const inputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value
    setSearchBoxValue(value)
    // 如果输入框为空，清空搜索结果
    if (!value) {
      setSearchSugrecResult(undefined)
    }
  }

  React.useEffect(() => {
    if (SearchBoxValue !== '') {
      debounce(() => Jsonp(), 200)
    } else {
      setSearchSugrecResult(undefined)
    }
    // 打印搜索结果
  }, [SearchBoxValue])

  const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value
    value && searchMethos(value)
  }
  const onSearch = (value: string) => {
    value && searchMethos(value)
  }

  const SearchRequestValue = {
    ie: 'utf-8',
    prod: 'pc',
    from: 'pc_web',
    json: 1,
    bs: 'jsonp'
  }

  const Jsonp = useJSONP({
    url: `https://www.baidu.com/sugrec?wd=${SearchBoxValue}&${ObjectToUrl(SearchRequestValue)}}`,
    id: 'jsonp',
    callback: (data: searchSugrecResultType) => setSearchSugrecResult(data),
    callbackParam: 'cb',
  })

  const searchMethos = (val: string) => {
    if (snap.outOpenSearch) {
      window.open(`https://cn.bing.com/search?q=${val}${snap.fuckCSDN ? ' -site:csdn.net' : ''}`)
    } else {
      window.location.href = `https://cn.bing.com/search?q=${val}${snap.fuckCSDN ? ' -site:csdn.net' : ''}`
    }
  }

  const suffixCom = (
    <div className='suffix-box' onClick={() => onSearch(SearchBoxValue)}>
      <SearchOutlined />
    </div>
  )

  const sugrecPanel = (data: searchSugrecResultType) => {
    const { g } = data
    if (g && typeof g !== 'undefined') {
      return (
        <div className='sugrec-panel-box'>
          <div className='sugrec-panel-content'>
            {g.map((item, index) => {
              return (
                <div key={item.sa} className='sugrec-panel-item' onClick={() => searchMethos(item.q)}>
                  <div className='sugrec-panel-item-title'>{item.q}</div>
                </div>
              )
            })}
          </div>
        </div>
      )
    } else {
      return null
    }
  }

  return (
    <>
      <div data-component-searchbox="" className='Component-SearchBox'>
        <div className="Search">
          <Input
            className='SearchInput'
            placeholder='请输入搜索内容'
            value={SearchBoxValue}
            onChange={(e) => inputValueChange(e)}
            suffix={suffixCom}
            onPressEnter={onPressEnter}
            bordered={false}
          />
          {
            (typeof searchSugrecResult?.g !== 'undefined') ? <div className="sugrec-panel">
              {sugrecPanel(searchSugrecResult)}
            </div> : null
          }
        </div>
      </div>
    </>
  );
}
