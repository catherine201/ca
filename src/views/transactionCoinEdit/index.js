import React, { Component } from 'react';
import {
  Input,
  InputNumber,
  Button,
  message,
  DatePicker,
  LocaleProvider
} from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
// 引入编辑器组件
import BraftEditor from 'braft-editor';
// 引入编辑器样式
import 'braft-editor/dist/index.css';
import { getTimeYMD } from '../../utils';
import coinMaintenance from '../../api/coinMaintenance';
import styles from './transactionCoinEdit.less';

moment.locale('zh-cn');

// 币种编辑
export default class TransactionCoinEdit extends Component {
  constructor(props) {
    super(props);
    // 编辑行的原始数据
    this.rawData = {
      code: null,
      chineseName: null, // 中文名
      name: null, // 全称
      issueTime: null, // 发行时间
      circulationAmount: null, // 发行总量
      crowdFundingPrice: null, // 众筹价格
      whitePaper: null, // 白皮书地址
      officialWebsite: null, // 网站
      blockQueryWebsite: null, // 区块链查询地址
      description: null // 简介
    };
    this.state = {
      editData: this.rawData, // 正在编辑的数据
      isAdd: this.props.match.params.transactionCoinEditId === 'add',
      isRequest: false
    };
  }

  componentDidMount = () => {
    // 新增：transactionCoinEditId === 'add'
    if (!this.state.isAdd) {
      this.getEditData();
    }
  };

  // 根据Id获取待编辑的数据
  getEditData = async () => {
    const param = {
      // url将 拼到请求地址后面 (请求地址/url的值)
      url: this.props.match.params.transactionCoinEditId
    };
    const { editData } = this.state;
    coinMaintenance
      .getCoinInfoById(param)
      .then(res => {
        this.rawData = res.detailInfo;
        this.rawData.issueTime = getTimeYMD(this.rawData.issueTime);
        this.rawData.description = BraftEditor.createEditorState(
          this.rawData.description
        );
        Object.keys(editData).forEach(key => {
          if (!this.rawData[key]) editData[key] = '';
          else if (this.rawData[key]) editData[key] = this.rawData[key];
        });
        this.setState({
          editData
        });
      })
      .catch(err => {
        console.error('getCoinInfoById -- err: ', err);
      });
  };

  // change事件
  handlerChange = (editKey, value) => {
    const editData = Object.assign({}, this.state.editData);
    if (editKey === 'issueTime') {
      editData[editKey] = moment(value).format('YYYY-MM-DD');
    } else {
      editData[editKey] = value;
    }
    this.setState({
      editData
    });
  };

  handleEditorChange = description => {
    const editData = Object.assign({}, this.state.editData, {
      description: BraftEditor.createEditorState(description)
    });
    this.setState({ editData });
  };

  // 确定
  confirm = () => {
    const { editData, isAdd, isRequest } = this.state;
    const param = {};
    if (isRequest) return;
    // 新增
    if (isAdd) {
      if (!editData.code) {
        editData.code = '';
        this.setState({ editData });
        message.warning('币种名称必填！');
        return;
      }
      param.detailInfo = {};
      Object.keys(editData).forEach(editKey => {
        // 有修改
        if (editKey === 'description') {
          param.detailInfo[editKey] = editData[editKey].toHTML();
        } else if (editKey === 'issueTime') {
          param.detailInfo[editKey] = (
            new Date(editData[editKey] || getTimeYMD()).getTime() / 1000
          ).toFixed(0);
        } else {
          param.detailInfo[editKey] = editData[editKey];
        }
      });
      this.coinAdd(param);
    } else {
      // 编辑
      param.query = {};
      // url将 拼到请求地址后面 (请求地址/url的值)
      param.url = this.props.match.params.transactionCoinEditId;
      Object.keys(editData).forEach(editKey => {
        if (editKey === 'description') {
          param.query[editKey] = editData[editKey].toHTML();
        } else if (editKey === 'issueTime') {
          param.query[editKey] = (
            new Date(editData[editKey] || getTimeYMD()).getTime() / 1000
          ).toFixed(0);
        } else {
          param.query[editKey] = editData[editKey];
        }
      });
      this.coinUpdate(param);
    }
    this.setState({
      isRequest: true
    });
  };

  // 新增
  coinAdd = param => {
    coinMaintenance
      .addCoinInfo(param)
      .then(res => {
        if (res.resultCode === 1) {
          message.success('新增成功！');
          this.props.history.goBack();
        } else {
          message.warn('新增失败！');
        }
      })
      .catch(err => {
        console.error('addCoinInfo -- err: ', err);
      });
  };

  // 编辑更新
  coinUpdate = param => {
    coinMaintenance
      .updateCoinInfo(param)
      .then(res => {
        if (res.resultCode === 1) {
          message.success('修改成功！');
          this.props.history.goBack();
        } else {
          message.warn('修改失败！');
        }
      })
      .catch(err => {
        console.error('updateCoinInfo -- err: ', err);
      });
  };

  render() {
    const {
      code,
      chineseName,
      name,
      issueTime,
      circulationAmount,
      crowdFundingPrice,
      whitePaper,
      officialWebsite,
      blockQueryWebsite,
      description
    } = this.state.editData;
    const { isAdd } = this.state;

    return (
      <div className={styles.transactionCoinEdit}>
        <section className="common_title">
          {isAdd ? '新增币种' : '币种编辑'}
        </section>
        <section
          className={`${styles['edit-content']} ${styles.transactionCoinEdit}`}
        >
          <div className={styles['content-item']}>
            <span>
              币种
              {isAdd && <b style={{ color: 'red' }}>*</b>}
            </span>
            {isAdd ? (
              <Input
                defaultValue={code}
                style={{ borderColor: code === '' ? 'red' : '' }}
                onChange={e => this.handlerChange('code', e.target.value)}
                onBlur={e => this.handlerChange('code', e.target.value)}
              />
            ) : (
              <b>{code}</b>
            )}
            {code === '' && (
              <b className={styles['warn-text']}>币种名称必填！</b>
            )}
          </div>
          <div className={styles['content-item']}>
            <span>中文名</span>
            <Input
              defaultValue={chineseName}
              onChange={e => this.handlerChange('chineseName', e.target.value)}
            />
          </div>
          <div className={styles['content-item']}>
            <span>币全写</span>
            <Input
              defaultValue={name}
              onChange={e => this.handlerChange('name', e.target.value)}
            />
          </div>
          <div className={styles['content-item']}>
            <span>发行时间</span>
            {isAdd ? ( // 新增
              <LocaleProvider locale={zh_CN}>
                <DatePicker
                  defaultValue={moment(getTimeYMD(), 'YYYY-MM-DD')}
                  onChange={time => this.handlerChange('issueTime', time)}
                />
              </LocaleProvider>
            ) : (
              // 编辑
              issueTime !== null && (
                <DatePicker
                  defaultValue={moment(issueTime, 'YYYY-MM-DD')}
                  onChange={time => this.handlerChange('issueTime', time)}
                />
              )
            )}
          </div>
          <div className={styles['content-item']}>
            <span>发行总量(万)</span>
            {isAdd ? (
              <InputNumber
                min={0}
                defaultValue={circulationAmount}
                onChange={value =>
                  this.handlerChange('circulationAmount', `${value}`)
                }
              />
            ) : (
              circulationAmount !== null && (
                <InputNumber
                  min={0}
                  defaultValue={circulationAmount}
                  onChange={value =>
                    this.handlerChange('circulationAmount', `${value}`)
                  }
                />
              )
            )}
          </div>
          <div className={styles['content-item']}>
            <span>众筹价格</span>
            {isAdd ? (
              <InputNumber
                min={0}
                defaultValue={crowdFundingPrice}
                onChange={value =>
                  this.handlerChange('crowdFundingPrice', `${value}`)
                }
              />
            ) : (
              crowdFundingPrice !== null && (
                <InputNumber
                  min={0}
                  defaultValue={crowdFundingPrice}
                  onChange={value =>
                    this.handlerChange('crowdFundingPrice', `${value}`)
                  }
                />
              )
            )}
          </div>
          <div className={styles['content-item']}>
            <span>白皮书地址</span>
            <Input
              defaultValue={whitePaper}
              onChange={e => this.handlerChange('whitePaper', e.target.value)}
            />
          </div>
          <div className={styles['content-item']}>
            <span>官网地址</span>
            <Input
              defaultValue={officialWebsite}
              onChange={e =>
                this.handlerChange('officialWebsite', e.target.value)
              }
            />
          </div>
          <div className={styles['content-item']}>
            <span>区块查询地址</span>
            <Input
              defaultValue={blockQueryWebsite}
              onChange={e =>
                this.handlerChange('blockQueryWebsite', e.target.value)
              }
            />
          </div>
          <div className={styles['content-item']}>
            <span>简介</span>
            <BraftEditor
              className={styles.editor}
              value={BraftEditor.createEditorState(description)}
              onChange={this.handleEditorChange}
              onSave={this.submitContent}
            />
          </div>
          <section className={`${styles['content-item']} ${styles.actionBtn}`}>
            <Button
              type="primary"
              onClick={this.confirm}
              loading={this.state.isRequest}
            >
              提交
            </Button>
          </section>
        </section>
      </div>
    );
  }
}
