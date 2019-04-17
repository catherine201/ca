import React, { Component } from 'react';
import { Modal, Select, Input, Checkbox, Button, message } from 'antd';
import styles from './withdrawalAction.less';

// 提币审核操作：新增/修改/删除
export default class WithdrawalAction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coin: '',
      isDailyNoLimit: false,
      singleLimit: 0,
      dailyLimit: 0
    };
  }

  componentDidUpdate() {
    // console.log('props: ', this.props);
  }

  // 选择币种
  coinChange = coin => {
    this.setState({
      coin
    });
  };

  // 单笔限额
  singleLimitChange = e => {
    this.setState({
      singleLimit: e.target.value
    });
  };

  // 日累计限额
  dailyLimitChange = e => {
    this.setState({
      dailyLimit: e.target.value
    });
  };

  // 日累计限额 不限
  noLimit = e => {
    this.setState({
      isDailyNoLimit: e.target.checked
    });
  };

  // 取消
  cancel = () => {
    this.props.onClose();
  };

  // 确认
  confirm = () => {
    this.vertify().then(() => {
      const obj = {
        isDailyNoLimit: this.state.isDailyNoLimit,
        coin: this.state.coin,
        singleLimit: this.state.singleLimit,
        dailyLimit: this.state.dailyLimit
      };
      this.props.onConfirm(obj);
    });
  };

  vertify = () => {
    if (this.props.actionType === 'delete') {
      return Promise.resolve();
    }
    return new Promise(resolve => {
      if (
        this.state.coin &&
        this.state.singleLimit &&
        (this.state.isDailyNoLimit || this.state.dailyLimit)
      ) {
        resolve();
      } else if (!this.state.coin && this.props.actionType === 'add') {
        message.error('请选择币种');
      } else if (!this.state.singleLimit) {
        message.error('请输入单笔限额');
      } else if (!this.state.dailyLimit) {
        message.error('请输入日累计限额或勾选"不限"');
      }
    });
  };

  render() {
    const titleList = {
      add: '新增审核币种',
      edit: '修改',
      delete: '删除'
    };
    const isDelete = this.props.actionType === 'delete';
    const disabledSelect =
      this.props.actionType === 'edit' || this.props.actionType === 'delete';

    return (
      <Modal
        className={styles.WithdrawalAction}
        title={titleList[this.props.actionType]}
        visible={this.props.visible}
        onCancel={this.cancel}
        destroyOnClose
        maskClosable={false}
        footer={
          <Button
            type="primary"
            className={styles['confirm-btn']}
            onClick={this.confirm}
          >
            {!isDelete ? '提交' : '确认'}
          </Button>
        }
      >
        {!isDelete ? (
          <ul>
            <li className={styles['li-item']}>
              <span>
                <i>*</i>币种：
              </span>
              <Select
                disabled={disabledSelect}
                defaultValue=""
                style={{ width: 120 }}
                onChange={this.coinChange}
              >
                <Select.Option value="">请选择币种</Select.Option>
                <Select.Option value="BTC">BTC</Select.Option>
                <Select.Option value="ETH">ETH</Select.Option>
              </Select>
            </li>
            <li className={styles['li-item']}>
              <span>
                <i>*</i>单笔限额：
              </span>
              <Input onBlur={this.singleLimitChange} />
            </li>
            <li className={styles['li-item']}>
              <span>
                <i>*</i>日累计限额：
              </span>
              <Input
                onBlur={this.dailyLimitChange}
                disabled={this.state.isDailyNoLimit}
              />
              &emsp;
              <Checkbox onChange={this.noLimit}>不限</Checkbox>
            </li>
          </ul>
        ) : (
          <div className={styles['delete-content']}>
            确认要删除“BTC”的提币审核设置吗？
          </div>
        )}
      </Modal>
    );
  }
}
