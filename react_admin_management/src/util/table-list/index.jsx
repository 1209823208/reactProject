import React from 'react';
export default class TableList extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    let tableHeader = this.props.tableHeader.map((item,index)=>{
      if(typeof item === 'object'){
        return (
            <th key={index} width={item.width}>{item.name}</th>
        )
      }else if(typeof item === 'string'){
        return (
          <th key={index}>{item}</th>
        )
      }
    })
    let tbodyData = this.props.children
    let nodata = <tr><td colSpan={this.props.tableHeader.length}>暂无数据</td></tr>
    let tableData = tbodyData.length>0?tbodyData:nodata
    return (
        <div className="row">
            <div className="col-md-12">
              <table className="table table-striped">
                <thead>
                  <tr>
                    {tableHeader}
                  </tr>
                </thead>
                <tbody>{tableData.length>0?tableData:<tr></tr>}</tbody>
              </table>
            </div>
      </div>
    );
  }
}
