import React, { Component } from 'react';
import { Modal, Button, Radio, message } from 'antd';
import styles from './CustomModal.less';

// antd Modal弹窗组件封装
export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPass: null
    };
  }

  // 关闭窗口
  cancel = () => {
    this.props.onCancel();
  };

  // 确认
  confirm = () => {
    if (this.state.isPass === null || this.state.isPass === undefined) {
      this.setState({
        isPass: undefined
      });
      return;
    }
    console.log('selectedRows: ', this.props.selectedRows);
    message.success('提交成功');
    this.props.onCancel();
  };

  // 通过1、驳回0
  onRadioChange = e => {
    console.log('value: ', e.target.value);
    this.setState({
      isPass: e.target.value
    });
  };

  render() {
    const RadioGroup = Radio.Group;
    return (
      <Modal
        className={styles.CustomModal}
        title={this.props.title}
        visible={this.props.visible}
        onCancel={this.cancel}
        maskClosable={false}
        footer={
          <Button
            type="primary"
            onClick={this.confirm}
            loading={this.state.isRequest}
          >
            提交
          </Button>
        }
      >
        <div className={styles['content-item']}>
          <span>审核数量：</span>
          <b>{this.props.selectedRows.length}条</b>
        </div>
        <div className={styles['content-item']}>
          <span>审核结果：</span>
          <RadioGroup onChange={this.onRadioChange} value={this.state.isPass}>
            <Radio value={1}>通过</Radio>
            <Radio value={0}>驳回</Radio>
          </RadioGroup>
          {this.state.isPass === undefined && (
            <b style={{ color: 'red' }}>请选择“通过”或“驳回”</b>
          )}
        </div>
      </Modal>
    );
  }
}
