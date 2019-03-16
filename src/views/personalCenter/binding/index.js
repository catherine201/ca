import React from 'react';
import { Divider, Button, Input, Form, Modal } from 'antd';
// import PropTypes from 'prop-types';
import styles from './binding.less';

class Info extends React.Component {
  static propTypes = {};

  constructor() {
    // super(props);
    super();
    this.state = {
      email: '122',
      phone: 12333
      // inputVal: ''
      //   nickName: '冰琉璃2050',
      //   srcImg: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
    };
    this.bindFuc = this.bindFuc.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
  }

  bindApi = () => {};

  bindFuc = val => {
    console.dir(val);
    this.props.form.setFieldsValue({
      email: this.state.email,
      phone: this.state.phone
    });
    Modal.confirm({
      content: (
        <Form layout="horizontal">
          <Form.Item label="名称">
            {this.props.form.getFieldDecorator('email', {
              rules: [{ required: true, message: '请输入菜单名称!' }]
            })(<Input placeholder="请输入菜单名称" />)}
          </Form.Item>
        </Form>
      ),
      cancelText: '取消',
      okText: '确定',
      className: 'noIcon',
      onOk: this.bindApi()
    });
  };

  render() {
    // const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.binding_wrapper}>
        <h2 className={`add_h2 ${styles.h2}`}>账号绑定</h2>
        <Divider />
        <div className={styles.binding_line}>
          <div className={styles.binding_line_left}>
            <span>账号名:</span>
            <span>未绑定</span>
          </div>
          <Button type="primary">绑定</Button>
        </div>
        <Divider dashed />
        <div className={styles.binding_line}>
          <div className={styles.binding_line_left}>
            <span>Email:</span>
            <span>未绑定</span>
          </div>
          <Button type="primary" onClick={() => this.bindFuc('email')}>
            绑定
          </Button>
        </div>
        <Divider dashed />
        <div className={styles.binding_line}>
          <div className={styles.binding_line_left}>
            <span>手机:</span>
            <span>110</span>
          </div>
          <Button type="primary">解绑</Button>
        </div>
      </div>
    );
  }
}

export default Form.create()(Info);
