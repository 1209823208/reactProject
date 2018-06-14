import React from 'react';
import {Row, Col} from 'antd';
export default class PcFooter extends React.Component {
  render() {
    return (
      <div>
        <footer>
          <Row>
            <Col span={2}></Col>
            <Col span={20}>
              <div class='footer'>
                footer
              </div>
            </Col>
              <Col span={2}></Col>
          </Row>
        </footer>
      </div>
    );
  }
}
