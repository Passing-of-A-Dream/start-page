import * as React from 'react';
// import resData from '@/utils/bookmarks.json'
import './index.scss';
import YCalendar from '@/components/pageComponent/Calendar/Calendar';
import Bookmarks from '@/components/pageComponent/Bookmarks/Bookmarks';

export interface IIndexProps {
}

const domKey = new Date().toDateString()

const pageComponent = [
  <YCalendar key={domKey + "calendar"} />,
  <Bookmarks key={domKey + "bookmarks"} />,
]

export default function Index(props: IIndexProps) {
  return (
    <div data-page-body="" className='start-page-body-index'>
      {
        pageComponent.map(item => (item))
      }
    </div>
  );
}
