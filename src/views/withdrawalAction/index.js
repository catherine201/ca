import React, { Component } from 'react';
import { Modal, Select, Input, Checkbox, Button, message } from 'antd';
import styles from './withdrawalAction.less';

// 提币审核操作：新增/修改/删除
export default class WithdrawalAction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coin: '', // 选择的币种
      singleLimit: 0, // 单笔限额
      dailyLimit: 0, // 日累计限额
      isDailyNoLimit: false, // 日累计限额不限
      isRequest: false // 正在请求
    };
  }

  componentWillMount = () => {
    if (this.props.actionType !== 'add') {
      const { coin, singleLimit, dailyLimit, isDailyNoLimit } = this.props.row;
      this.setState({
        coin,
        singleLimit,
        dailyLimit,
        isDailyNoLimit
      });
    }
  };

  componentWillReceiveProps = () => {};

  // 组件即将销毁
  componentWillUnmount = () => {};

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
    if (this.state.isRequest) return;
    this.vertify()
      .then(() => {
        const obj = {
          isDailyNoLimit: this.state.isDailyNoLimit,
          coin: this.state.coin,
          singleLimit: this.state.singleLimit,
          dailyLimit: this.state.dailyLimit
        };
        console.log('obj: ', obj);
        this.setState({
          isRequest: true
        });
        setTimeout(() => {
          /*
            这里调接口
          */
          this.setState({
            isRequest: false
          });
          const textSuccess = {
            add: '新增成功',
            edit: '修改成功',
            delete: '删除成功'
          };
          message.success(textSuccess[this.props.actionType]);
          this.props.onConfirm(obj);
        }, 1000);
      })
      .catch(err => {
        console.error('vertify -- err: ', err);
      });
  };

  // 校验
  vertify = () => {
    const that = this;
    const actionType = that.props.actionType;
    if (actionType === 'delete') {
      return Promise.resolve();
    }
    return new Promise(resolve => {
      if (
        that.state.coin &&
        this.isNumber(that.state.singleLimit) &&
        (this.isNumber(that.state.dailyLimit) || that.state.isDailyNoLimit)
      ) {
        resolve();
      }
    });
  };

  // 判断输入的是否是数字
  isNumber = val => {
    if (val === '') val = '-';
    return val - 0 === Number(val);
  };

  render() {
    const titleList = {
      add: '新增审核币种',
      edit: '修改',
      delete: '删除'
    };
    const isDelete = this.props.actionType === 'delete';
    const isEdit = this.props.actionType === 'edit';
    const { coin, singleLimit, dailyLimit } = this.state;
    const deleteText = `确认要删除“${coin}”的提币审核设置吗？`;

    return (
      <Modal
        className={styles.WithdrawalAction}
        title={titleList[this.props.actionType]}
        visible={this.props.visible}
        onCancel={this.cancel}
        maskClosable={false}
        footer={
          <Button
            type="primary"
            className={styles['confirm-btn']}
            onClick={this.confirm}
            loading={this.state.isRequest}
          >
            {isDelete ? '确认' : '提交'}
          </Button>
        }
      >
        {isDelete ? (
          <div className={styles['delete-content']}>{deleteText}</div>
        ) : (
          <ul>
            <li className={styles['li-item']}>
              <span>
                <i>*</i>币种：
              </span>
              <Select
                disabled={isEdit}
                defaultValue={isEdit ? coin : ''}
                style={{ width: 120 }}
                onChange={this.coinChange}
              >
                {this.props.coinOptions.map(coin => (
                  <Select.Option key={coin} value={coin.value}>
                    {coin.label}
                  </Select.Option>
                ))}
              </Select>
              <div
                className={styles.errortext}
                style={{
                  visibility: this.state.coin ? 'hidden' : 'visible'
                }}
              >
                <span>请选择币种</span>
              </div>
            </li>
            <li className={styles['li-item']}>
              <span>
                <i>*</i>单笔限额：
              </span>
              <Input
                defaultValue={isEdit ? singleLimit : ''}
                onBlur={this.singleLimitChange}
              />
              <div
                className={styles.errortext}
                style={{
                  visibility: this.isNumber(this.state.singleLimit)
                    ? 'hidden'
                    : 'visible'
                }}
              >
                <span>请输入数字</span>
              </div>
            </li>
            <li className={styles['li-item']}>
              <span>
                <i>*</i>日累计限额：
              </span>
              <Input
                defaultValue={isEdit ? dailyLimit : ''}
                onBlur={this.dailyLimitChange}
                disabled={this.state.isDailyNoLimit}
              />
              &emsp;
              <Checkbox onChange={this.noLimit}>不限</Checkbox>
              <div
                className={styles.errortext}
                style={{
                  visibility: this.isNumber(this.state.dailyLimit)
                    ? 'hidden'
                    : 'visible'
                }}
              >
                <span>请输入数字</span>
              </div>
            </li>
          </ul>
        )}
      </Modal>
    );
  }
}
