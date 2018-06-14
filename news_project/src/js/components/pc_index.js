import React from 'react';
import ReactDOM from 'react-dom';
import PcHeader from './pc_header';
import PcFooter from './pc_footer'
import PCNewsContainer from './pc_news_container'
export default class PcIndex extends React.Component {
  render() {
    return (
      <div>
        <PcHeader></PcHeader>
        <PCNewsContainer/>
        <PcFooter></PcFooter>
      </div>
    );
  }
}
