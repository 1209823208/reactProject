import React from 'react';
import FileUpload from 'util/file-upload/FileUpload.jsx';
export default class FileUploader extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    const options={
  		baseUrl:'/manage/product/upload.do',
  		param:{
  			fid:0
  		},
      dataType:'json',
      chooseAndUpload:true,
      fileFieldName   : 'upload_file',
      uploadSuccess : (res)=>{
        this.props.onUploadSuccess(res.data);
    },
    uploadError :(err)=>{
        this.props.onUploadSuccess(err.message || '上传图片出错啦');
      }
  	}
    return (
        <div>
          <FileUpload options={options}>
            <button ref='chooseAndUpload'>上传图片</button>
          </FileUpload>
      </div>
    );
  }
}
