import React from 'react';
import { Form, Input, Row, Col } from 'antd';
import styles from './index.less';

class AddEditMenu extends React.Component {
  state = {
    data: {}
  };

  componentDidMount() {
    this.setState(
      {
        data: this.props.sendData
      },
      () => {
        this.props.form.setFieldsValue({
          user_name: this.state.data.user_name,
          path_name: this.state.data.path_name
        });
      }
    );
  }

  render() {
    // const { data } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14 }
    };
    return (
      <div className={`menuMsg_modal_wrapper ${styles.menuMsg_modal_wrapper}`}>
        {/* layout="horizontal" */}
        <Form
          className={`menuMsg_modal_Form ${styles.menuMsg_modal_Form}`}
          layout="horizontal"
        >
          <Row>
            <Col span={12}>
              <Form.Item label="用户名称" {...formItemLayout}>
                {getFieldDecorator('user_name', {
                  rules: [{ required: true, message: '请输入用户名称!' }]
                })(<Input placeholder="请输入用户名称" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="权限模块" {...formItemLayout}>
                {getFieldDecorator('path_name', {
                  rules: [{ required: true, message: '请输入权限模块!' }]
                })(<Input placeholder="请输入权限模块" />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default Form.create()(AddEditMenu);
