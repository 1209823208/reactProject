import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './index.scss';
import 'font-awesome/css/font-awesome.min.css';

class A extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 'Old State'
    }
    console.log('初始化数据', 'constructor');
  }
  // 组件将要加载->异步请求
  componentWillMount() {
    console.log('componentWillMount');
  }
  // 组件加载完成->有时候异步加载也可以放在这里
  componentDidMount() {
    console.log('componentDidMount');
  }
  // 将要接收父组件传来的props
  componentWillReceiveProps() {
    console.log('componentWillReceiveProps');
  }
  // 子组件是不是应该更新->一定要有返回值，大多数情况下都是true
  shouldComponentUpdate() {
    console.log('shouldComponentUpdate');
    return true;
  }
  //组件将要更新
  componentWillUpdate() {
    console.log('componentWillUpdate');
  }
  // 组件更新完毕
  componentDidUpdate() {
    console.log('componentDidUpdate');
  }
  // 组件即将销毁
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }
  // 处理点击事件
  handleClick() {
    console.log('更新数据：');
    this.setState({
    })
  }
  //渲染：
  render() {
    console.log('render');
    return (
      <div>
        <div>state: {this.state.data}</div>
        <div>Props: {this.props.props_data}</div>
        <button onClick={() => { this.handleClick() }}>更新组件</button>
      </div>
    )
  }
}
class App extends React.Component {
  // 构造函数
  constructor(props) {
    super(props)
    this.state = {
      data: 'Old Props',
      hasChild: true
    }
    console.log('初始化数据', 'root constructor');
  }
  onPropsChange() {
    console.log('更新props:');
    this.setState({
      data: 'New Props'
    });
  }
  onDestoryChild() {
    console.log('干掉子组件：');
    this.setState({
      hasChild: false
    });
  }
  render() {
    return (
      <div>
        {
          this.state.hasChild ? <A/> : null
        }
        <button onClick={() => { this.onPropsChange() }}>改变Props</button>
        <button onClick={() => { this.onDestoryChild() }}>干掉子组件</button>
      </div>
    );
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('app')
);
A.defaultProps = {
  props_data: 'default props data'
};
