import React from 'react';
import {Row,Col,BackTop} from 'antd';
import PcHeader from './pc_header';
import PcFooter from './pc_footer';
import PCImageBlock from './pc_images_block';
import CommonComments from './common_comments';
export default class PcDetails extends React.Component{
  constructor(){
    super();
    this.state = {
      newsItem:''
    }
  };
  componentDidMount() {
		var myFetchOptions = {
			method: 'GET'
		};
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.params.uniquekey, myFetchOptions).then(response => response.json()).then(json => {
			this.setState({newsItem: json});
			document.title = this.state.newsItem.title + " - React News | React 驱动的新闻平台";
		})
	};
	createMarkup() {
		return {__html: this.state.newsItem.pagecontent};
	};
  render(){
    return(
      <div>
        <PcHeader></PcHeader>
        <Row>
          <Col span={2}></Col>
          <Col span={14} className="container">
            <div class="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
            <hr/>
            <CommonComments uniquekey={this.props.params.uniquekey}/>
          </Col>
          <Col span={6}>
            <PCImageBlock count={20} type="guoji" width="400px" cartTitle="国际头条" imageWidth="150px"/>
          </Col>
          <Col span={2}></Col>
        </Row>
        <PcFooter></PcFooter>
        <BackTop />
      </div>
    )
  }
}
