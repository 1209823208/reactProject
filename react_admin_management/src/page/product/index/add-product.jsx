import React from 'react';
import PageTitle from 'component/page-title/index.jsx';

export default class AddProduct extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchKeyWord:'',
      searchKey:'productId',
    }
  }

  render() {
    return (
        <div id="page-wrapper">
          <div id="AddProduct">
              <PageTitle title="添加商品"/>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-horizontal">
                    <div className="form-group">
                      <label for="inputEmail3" className="col-sm-2 control-label">Email</label>
                      <div className="col-sm-4">
                        <input type="email" className="form-control" id="inputEmail3" placeholder="Email" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label for="inputPassword3" className="col-sm-2 control-label">Password</label>
                      <div className="col-sm-4">
                        <input type="password" className="form-control" id="inputPassword3" placeholder="Password" />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-sm-offset-2 col-sm-4">
                        <button type="submit" className="btn btn-default">Sign in</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
      </div>
    );
  }
}
