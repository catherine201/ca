import React from 'react';
import { Form, Input, Row, Col, InputNumber } from 'antd';
import styles from './index.less';
import { regular } from '../../../utils/validate';

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
          name: this.state.data.name,
          remark: this.state.data.remark,
          sort: this.state.data.sort,
          target: this.state.data.target,
          icon_url: this.state.data.icon_url,
          children: this.state.data.children,
          parent_id: this.state.data.parent_id
        });
      }
    );
  }

  validateUrl = (rule, value, callback) => {
    // const reg = /^https?:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/i; // 密码至少为8位的字母,数字,字符任意两种的组合
    if (value && !regular.url.test(value)) {
      callback('地址不符合规范');
    } else {
      callback();
    }
  };

  render() {
    // const { data } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
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
              <Form.Item label="名称" {...formItemLayout}>
                {getFieldDecorator('name', {
                  rules: [
                    { required: true, message: '请输入菜单名称!' },
                    { min: 2, max: 16, message: '最少2位，最多16位!' }
                  ]
                })(<Input placeholder="请输入菜单名称" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="描述" {...formItemLayout}>
                {getFieldDecorator('remark', {
                  rules: [{ max: 32, message: '最多32位!' }]
                })(<Input placeholder="请输入描述" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            {/* type="number"  */}
            <Col span={12}>
              <Form.Item label="排序" {...formItemLayout}>
                {getFieldDecorator('sort')(
                  <InputNumber placeholder="排序" min={0} />
                )}
              </Form.Item>
            </Col>
            {/* <Col span={12}>
              <Form.Item label="父菜单id" {...formItemLayout}>
                {getFieldDecorator('parent_id', {
                  rules: [{ max: 64, message: '最多64位!' }]
                })(<Input placeholder="请输入父菜单id" />)}
              </Form.Item>
            </Col> */}
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="跳转地址" {...formItemLayout}>
                {getFieldDecorator('target', {
                  rules: [
                    { required: true, message: '请输入跳转地址!' },
                    { max: 128, message: '最多128位!' },
                    {
                      validator: this.validateUrl
                    }
                  ]
                })(<Input placeholder="请输入跳转地址" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="图标地址" {...formItemLayout}>
                {getFieldDecorator('icon_url', {
                  rules: [
                    { max: 128, message: '最多128位!' },
                    {
                      validator: this.validateUrl
                    }
                  ]
                })(<Input placeholder="请输入图标地址" />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default Form.create()(AddEditMenu);
