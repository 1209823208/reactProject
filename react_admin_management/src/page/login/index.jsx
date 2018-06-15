import React from 'react';
import './index.css';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:''
        }
    }
    changeInputValue(e){
      let inputValue = e.target.value,
          inputName = e.e.target.name;
          console.log(e);
      this.setState({
        // [inputName]:inputValue
      })
    }
    render() {
        return (
            <div id="login" className="row">
                <div className="col-md-4 col-md-offset-4">
                    <div className="panel panel-default">
                        <div className="panel-heading">login</div>
                        <div className="panel-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="exampleInputUsername">Username</label>
                                    <input type="text" className="form-control" id="exampleInputUsername" name="username"
                                           placeholder="Username" value={this.state.username} onChange={this.changeInputValue.bind(this)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" name="password"
                                           placeholder="Password" value={this.state.password} onChange={this.changeInputValue.bind(this)}/>
                                </div>
                                <button type="submit" className="btn btn-default">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}