import React, { Component } from 'react';
import { Input, Button, message } from 'antd';
// 引入编辑器组件
import BraftEditor from 'braft-editor';
// 引入编辑器样式
import 'braft-editor/dist/index.css';
import styles from './transactionCoinEdit.less';
import coinMaintenance from '../../api/coinMaintenance';

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
      issueAmount: null, // 发行总量
      crowdFundingPrice: null, // 众筹价格
      whitePaper: null, // 白皮书地址
      officialWebsite: null, // 网站
      blockQueryWebsite: null, // 区块链查询地址
      description: null // 简介
    };
    this.state = {
      editData: this.rawData, // 正在编辑的数据
      isRequest: false
    };
  }

  componentDidMount = () => {
    this.getEditData();
  };

  // 根据Id获取待编辑的数据
  getEditData = async () => {
    const param = {
      // url将 拼到请求地址后面 (请求地址/url的值)
      url: this.props.match.params.transactionCoinEditId
    };
    coinMaintenance
      .getCoinInfoById(param)
      .then(res => {
        this.rawData = res;
        this.rawData.description = BraftEditor.createEditorState(
          this.rawData.description
        );
        this.setState({
          editData: this.rawData.detailInfo
        });
      })
      .catch(err => {
        console.error('getCoinInfoById -- err: ', err);
      });
  };

  // change事件
  handlerChange = (editKey, value) => {
    const editData = Object.assign({}, this.state.editData);
    editData[editKey] = value;
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

  confirm = () => {
    const param = {
      // url将 拼到请求地址后面 (请求地址/url的值)
      url: this.props.match.params.transactionCoinEditId
    };
    // 只收集修改项
    Object.keys(this.rawData).forEach(editKey => {
      if (
        JSON.stringify(this.state.editData[editKey]) !==
        JSON.stringify(this.rawData[editKey])
      ) {
        // 有修改
        if (editKey === 'description') {
          param[editKey] = this.state.editData[editKey].toHTML();
        } else {
          param[editKey] = this.state.editData[editKey];
        }
      }
    });
    console.log('param: ', param);
    // this.props.history.goBack();

    coinMaintenance
      .updateCoinInfo(param)
      .then(res => {
        if (res.resultCode === 1) {
          message.success('修改成功！');
        } else {
          message.warn(res.msg);
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
      issueAmount,
      crowdFundingPrice,
      whitePaper,
      officialWebsite,
      blockQueryWebsite,
      description
    } = this.state.editData;

    return (
      <div className={styles.transactionCoinEdit}>
        <section className="common_title">币种编辑</section>
        <section
          className={`${styles['edit-content']} ${styles.transactionCoinEdit}`}
        >
          <div className={styles['content-item']}>
            <span>币种</span>
            <b>{code}</b>
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
            <Input
              defaultValue={issueTime}
              onChange={e => this.handlerChange('issueTime', e.target.value)}
            />
          </div>
          <div className={styles['content-item']}>
            <span>发行总量(万)</span>
            <Input
              defaultValue={issueAmount}
              onChange={e => this.handlerChange('issueAmount', e.target.value)}
            />
          </div>
          <div className={styles['content-item']}>
            <span>众筹价格</span>
            <Input
              defaultValue={crowdFundingPrice}
              onChange={e =>
                this.handlerChange('crowdFundingPrice', e.target.value)
              }
            />
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
          <section className={styles.actionBtn}>
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
