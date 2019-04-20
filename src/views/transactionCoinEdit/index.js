import React, { Component } from 'react';
import { Input, Button } from 'antd';
// 引入编辑器组件
import BraftEditor from 'braft-editor';
// 引入编辑器样式
import 'braft-editor/dist/index.css';
import styles from './transactionCoinEdit.less';

// 提币审核配置
export default class TransactionCoinEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowData: {
        coin: null,
        nameZh: null,
        nameFull: null,
        issueDate: null,
        issueQuantity: null,
        raisePrice: null,
        whitePaperAddr: null,
        website: null,
        blockQueryAddr: null
      }, // 编辑行的数据
      editorState: BraftEditor.createEditorState(null),
      isRequest: false
    };
  }

  componentDidMount = async () => {
    this.setState({
      rowData: {
        id: '1',
        coin: 'BTC',
        nameZh: '比特币', // 中文名
        nameFull: 'BItcoin',
        website: 'https://bitcoin.org/en',
        issueDate: '2019-01-01', // 发行时间
        issueQuantity: '100000', // 发行总量
        raisePrice: '255660', // 众筹价格
        whitePaperAddr: 'sdfdsf11215', // 白皮书地址
        blockQueryAddr: 'sdfsdfs4564646', // 区块链查询地址
        info: 'bitcoinbitcoinbitcoinbitcoinbitcoin' // 简介
      }
    });
    // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
    this.setState({
      editorState: BraftEditor.createEditorState(this.state.rowData.info)
    });
  };

  handleEditorChange = editorState => {
    this.setState({ editorState });
  };

  confirm = () => {
    this.props.history.goBack();
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
      blockQueryAddr
    } = this.state.rowData;

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
            <Input defaultValue={nameZh} />
          </div>
          <div className={styles['content-item']}>
            <span>币全写</span>
            <Input defaultValue={nameFull} />
          </div>
          <div className={styles['content-item']}>
            <span>发行时间</span>
            <Input defaultValue={issueDate} />
          </div>
          <div className={styles['content-item']}>
            <span>发行总量(万)</span>
            <Input defaultValue={issueQuantity} />
          </div>
          <div className={styles['content-item']}>
            <span>众筹价格</span>
            <Input defaultValue={raisePrice} />
          </div>
          <div className={styles['content-item']}>
            <span>白皮书地址</span>
            <Input defaultValue={whitePaperAddr} />
          </div>
          <div className={styles['content-item']}>
            <span>官网地址</span>
            <Input defaultValue={website} />
          </div>
          <div className={styles['content-item']}>
            <span>区块查询地址</span>
            <Input defaultValue={blockQueryAddr} />
          </div>
          <div className={styles['content-item']}>
            <span>简介</span>
            <BraftEditor
              className={styles.editor}
              value={this.state.editorState}
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
