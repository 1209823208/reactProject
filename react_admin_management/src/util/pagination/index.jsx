import React from 'react';
import RcPagination from 'rc-pagination';
import 'rc-pagination/dist/rc-pagination.min.css'
export default class Pagination extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div>
        <RcPagination {...this.props} showQuickJumper hideOnSinglePage/>
      </div>
    );
  }
}
