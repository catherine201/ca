import React, { Component } from 'react';
import { Input, Button } from 'antd';
// 引入编辑器组件
import BraftEditor from 'braft-editor';
// 引入编辑器样式
import 'braft-editor/dist/index.css';
import styles from './transactionCoinEdit.less';

// 币种编辑
export default class TransactionCoinEdit extends Component {
  constructor(props) {
    super(props);
    // 编辑行的原始数据
    this.rawData = {
      coin: null,
      nameZh: null, // 中文名
      nameFull: null, // 全称
      issueDate: null, // 发行时间
      issueQuantity: null, // 发行总量
      raisePrice: null, // 众筹价格
      whitePaperAddr: null, // 白皮书地址
      website: null, // 网站
      blockQueryAddr: null, // 区块链查询地址
      editorState: BraftEditor.createEditorState(null) // 简介
    };
    this.state = {
      editData: {
        coin: null,
        nameZh: null, // 中文名
        nameFull: null, // 全称
        issueDate: null, // 发行时间
        issueQuantity: null, // 发行总量
        raisePrice: null, // 众筹价格
        whitePaperAddr: null, // 白皮书地址
        website: null, // 网站
        blockQueryAddr: null, // 区块链查询地址
        editorState: BraftEditor.createEditorState(null) // 简介
      }, // 正在编辑的数据
      isRequest: false
    };
  }

  componentDidMount = () => {
    this.getEditData();
  };

  // 根据Id获取待编辑的数据
  getEditData = () => {
    this.rawData = {
      id: '1',
      coin: 'BTC',
      nameZh: '比特币', // 中文名
      nameFull: 'BItcoin', // 全名
      website: 'https://bitcoin.org/en', // 网址
      issueDate: '2019-01-01', // 发行时间
      issueQuantity: '100000', // 发行总量
      raisePrice: '255660', // 众筹价格
      whitePaperAddr: 'sdfdsf11215', // 白皮书地址
      blockQueryAddr: 'sdfsdfs4564646', // 区块链查询地址
      editorState: BraftEditor.createEditorState(null) // 简介
    };
    this.setState({
      editData: {
        id: '1',
        coin: 'BTC',
        nameZh: '比特币', // 中文名
        nameFull: 'BItcoin', // 全名
        website: 'https://bitcoin.org/en', // 网址
        issueDate: '2019-01-01', // 发行时间
        issueQuantity: '100000', // 发行总量
        raisePrice: '255660', // 众筹价格
        whitePaperAddr: 'sdfdsf11215', // 白皮书地址
        blockQueryAddr: 'sdfsdfs4564646', // 区块链查询地址
        editorState: BraftEditor.createEditorState(null) // 简介
      }
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

  handleEditorChange = editorState => {
    const editData = Object.assign({}, this.state.editData, { editorState });
    this.setState({ editData });
  };

  confirm = () => {
    const param = {};
    // 只收集修改项
    Object.keys(this.rawData).forEach(editKey => {
      if (
        JSON.stringify(this.state.editData[editKey]) !==
        JSON.stringify(this.rawData[editKey])
      ) {
        // 有修改
        if (editKey === 'editorState') {
          param[editKey] = this.state.editData[editKey].toHTML();
        } else {
          param[editKey] = this.state.editData[editKey];
        }
      }
    });
    console.log('param: ', param);
    // this.props.history.goBack();
  };

  render() {
    const {
      coin,
      nameZh,
      nameFull,
      issueDate,
      issueQuantity,
      raisePrice,
      whitePaperAddr,
      website,
      blockQueryAddr,
      editorState
    } = this.state.editData;

    return (
      <div className={styles.transactionCoinEdit}>
        <section className="common_title">币种编辑</section>
        <section
          className={`${styles['edit-content']} ${styles.transactionCoinEdit}`}
        >
          <div className={styles['content-item']}>
            <span>币种</span>
            <b>{coin}</b>
          </div>
          <div className={styles['content-item']}>
            <span>中文名</span>
            <Input
              defaultValue={nameZh}
              onChange={e => this.handlerChange('nameZh', e.target.value)}
            />
          </div>
          <div className={styles['content-item']}>
            <span>币全写</span>
            <Input
              defaultValue={nameFull}
              onChange={e => this.handlerChange('nameFull', e.target.value)}
            />
          </div>
          <div className={styles['content-item']}>
            <span>发行时间</span>
            <Input
              defaultValue={issueDate}
              onChange={e => this.handlerChange('issueDate', e.target.value)}
            />
          </div>
          <div className={styles['content-item']}>
            <span>发行总量(万)</span>
            <Input
              defaultValue={issueQuantity}
              onChange={e =>
                this.handlerChange('issueQuantity', e.target.value)
              }
            />
          </div>
          <div className={styles['content-item']}>
            <span>众筹价格</span>
            <Input
              defaultValue={raisePrice}
              onChange={e => this.handlerChange('raisePrice', e.target.value)}
            />
          </div>
          <div className={styles['content-item']}>
            <span>白皮书地址</span>
            <Input
              defaultValue={whitePaperAddr}
              onChange={e =>
                this.handlerChange('whitePaperAddr', e.target.value)
              }
            />
          </div>
          <div className={styles['content-item']}>
            <span>官网地址</span>
            <Input
              defaultValue={website}
              onChange={e => this.handlerChange('website', e.target.value)}
            />
          </div>
          <div className={styles['content-item']}>
            <span>区块查询地址</span>
            <Input
              defaultValue={blockQueryAddr}
              onChange={e =>
                this.handlerChange('blockQueryAddr', e.target.value)
              }
            />
          </div>
          <div className={styles['content-item']}>
            <span>简介</span>
            <BraftEditor
              className={styles.editor}
              value={editorState}
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
