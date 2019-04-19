import React, { Component } from 'react';
import { Modal, Select, Checkbox, Button, message, InputNumber } from 'antd';
import styles from './withdrawalAction.less';

// 提币审核操作：新增/修改/删除
export default class WithdrawalAction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coin: null, // 选择的币种
      singleLimit: null, // 单笔限额
      dailyLimit: null, // 日累计限额
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
    const actionType = this.props.actionType;
    const { coin, singleLimit, dailyLimit, isDailyNoLimit } = this.state;
    if (this.state.isRequest) return;
    if (
      actionType === 'edit' &&
      coin === this.props.row.coin &&
      singleLimit === this.props.row.singleLimit &&
      dailyLimit === this.props.row.dailyLimit &&
      isDailyNoLimit === this.props.row.isDailyNoLimit
    ) {
      message.info('没有修改');
      this.props.onConfirm();
      return;
    }
    this.vertify()
      .then(() => {
        const { coin, singleLimit, dailyLimit, isDailyNoLimit } = this.state;
        const obj = {
          coin,
          singleLimit,
          dailyLimit,
          isDailyNoLimit
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
    const { coin, singleLimit, dailyLimit, isDailyNoLimit } = this.state;
    if (actionType === 'delete') {
      return Promise.resolve();
    }
    return new Promise(resolve => {
      if (
        coin &&
        singleLimit &&
        that.isNumber(singleLimit) &&
        (isDailyNoLimit || that.isNumber(dailyLimit))
      ) {
        resolve();
      }
      if (coin === null)
        that.setState({
          coin: ''
        });
      if (singleLimit === null)
        that.setState({
          singleLimit: ''
        });
      if (dailyLimit === null)
        that.setState({
          dailyLimit: ''
        });
    });
  };

  // 判断输入的是否是数字
  isNumber = val => {
    if (val === '' || val === null) val = '-';
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
                  visibility:
                    this.state.coin === null || this.state.coin
                      ? 'hidden'
                      : 'visible'
                }}
              >
                <span>请选择币种</span>
              </div>
            </li>
            <li className={styles['li-item']}>
              <span>
                <i>*</i>单笔限额：
              </span>
              {/* <Input
                defaultValue={isEdit ? singleLimit : ''}
                onBlur={this.singleLimitChange}
              /> */}
              <InputNumber
                min={1}
                defaultValue={isEdit ? singleLimit : ''}
                onBlur={this.singleLimitChange}
              />
              <div
                className={styles.errortext}
                style={{
                  visibility:
                    this.state.singleLimit === null ||
                    this.isNumber(this.state.singleLimit)
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
              {/* <Input
                defaultValue={isEdit ? dailyLimit : ''}
                onBlur={this.dailyLimitChange}
                disabled={this.state.isDailyNoLimit}
              /> */}
              <InputNumber
                min={1}
                defaultValue={isEdit ? dailyLimit : ''}
                onBlur={this.dailyLimitChange}
                disabled={this.state.isDailyNoLimit}
              />
              &emsp;
              <Checkbox onChange={this.noLimit}>不限</Checkbox>
              <div
                className={styles.errortext}
                style={{
                  visibility:
                    this.state.isDailyNoLimit ||
                    this.state.dailyLimit === null ||
                    this.isNumber(this.state.dailyLimit)
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
