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
  const [isComposition, setIsComposition] = React.useState<boolean>(false) // 是否处于输入法状态

  const inputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value
    debounce((setSearchBoxValue(value) as unknown) as Function, 500)
    // 如果输入框为空，清空搜索结果
    if (!value) {
      setSearchSugrecResult(undefined)
    }
  }
  // const handleComposition = (e: React.CompositionEvent<HTMLInputElement>) => {
  //   if (e.type === 'compositionend') {
  //     setIsComposition(false)
  //     console.log('%c [ !isComponsition ]: ', 'color: #bf2c9f; background: pink; font-size: 13px;', '!isComponsition')
  //     // inputValueChange(e as unknown as React.ChangeEvent<HTMLInputElement>)
  //   } else if (e.type === 'compositionstart') {
  //     setIsComposition(true)
  //     console.log('%c [ isComponsition ]: ', 'color: #bf2c9f; background: pink; font-size: 13px;', 'isComponsition')
  //   }
  // }

  React.useEffect(() => {
    if (SearchBoxValue !== '') {
      Jsonp()
    } else {
      setTimeout(() => {
        setSearchSugrecResult(undefined)
      }, 500)
    }
    // 打印搜索结果
  }, [SearchBoxValue, isComposition])

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

  const Jsonp: Function = useJSONP({
    url: `https://www.baidu.com/sugrec?wd=${SearchBoxValue}&${ObjectToUrl(SearchRequestValue)}`,
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
            type='search'
            value={SearchBoxValue}
            onChange={(e) => inputValueChange(e)}
            suffix={suffixCom}
            onPressEnter={onPressEnter}
            bordered={false}
          />
          <div className="sugrec-panel" style={{
            height: searchSugrecResult?.g?.length ? (searchSugrecResult.g.length * 33.4) + 16 : 0,
          }}>
            {(typeof searchSugrecResult?.g !== 'undefined') ? sugrecPanel(searchSugrecResult) : null}
          </div>
        </div>
      </div>
    </>
  );
}
