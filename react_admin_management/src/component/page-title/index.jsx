import React from 'react';
import './index.css';
export default class PageTitle extends React.Component {
  constructor(props) {
    super(props);
  };
  componentWillMount(){
      document.title = this.props.title;
  }
  render() {
    return (
      <div id="pageTitle">
          <div className='row'>
              <div className='col-md-12'>
                 <h1 className='page-header'> {this.props.title}</h1>
                  {this.props.children}
              </div>
          </div>
      </div>
    );
  }
}