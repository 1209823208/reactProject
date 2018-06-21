import React from 'react';
import $ from 'jquery';
import Simditor from 'simditor';
import 'simditor/styles/simditor.scss';
export default class RichEditor extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.loadEditor();
  }
  // 初始化编辑
  loadEditor(){
    let element = this.refs['textarea'];
    this.editor = new Simditor({
      textarea:element,
      upload: {
          url             : '/manage/product/richtext_img_upload.do',
          defaultImage    : '',
          fileKey         : 'upload_file'
      }
    });
    let goodsDesc = this.props.goodsDesc || '<p>请输入内容</p>'
    this.editor.setValue(goodsDesc);
    this.bindEditorEvent();
  }
  // 初始化富文本编辑器的事件
  bindEditorEvent(){
      this.editor.on('valuechanged', e => {
          this.props.updateGoodsEditor(this.editor.getValue())
      })
  }
  render() {
    return (
      <div >
        <textarea ref="textarea"></textarea>
      </div>
    );
  }
}
