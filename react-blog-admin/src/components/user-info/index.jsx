import React, { Component } from 'react';
import { Table, Button, Modal, Pagination } from 'antd';
import './index.less';
import loginServices from '../../services/loginServices';
import { roleChange } from '../../utils/util-services';


export default class UserInfoComponent extends Component {
    render() {
        return (
            <div>
                <div>
                    <Table bordered dataSource={this.state.typeList} columns={this.state.columns}
                        pagination={false}
                        rowKey="id"
                        loading={this.state.loading} />
                    <div className="page_size">
                        <Pagination
                            total={this.state.total}
                            showTotal={total => `总数 ${total} 条`}
                            pageSize={this.state.currentSize}
                            defaultCurrent={1}
                            showSizeChanger
                            onChange={this.onShowPageChange}
                            onShowSizeChange={this.onShowSizeChange}
                        />
                    </div>
                </div>
            </div>
        )
    }
    constructor(props) {
        super(props)
        this.state = {
            total: 0,
            currentPage: 1,
            currentSize: 10,
            typeList: [],
            columns: [
                { title: '姓名', dataIndex: 'userName' },
                { title: '角色', dataIndex: 'roleId', render: (item, index) => roleChange(item) },
                { title: '操作', dataIndex: 'operate', width: 200, render: (item, index) => this.getColoum(item, index) },
            ]
        }
    }
    async componentDidMount() {
        await this.getInit(this.state.currentPage, this.state.currentSize);
    }
    async getInit(page, size) {
        let data = await loginServices.getUserInfoListByPageAndSize(page, size);
        if (data) {
            this.setState({
                typeList: [...data.list],
                total: data.total
            })
        }
    }
    getColoum = (item, index) => {
        return <span>
            <Button type="primary" onClick={this.openModal.bind(item, index)}>编辑</Button>
            <Button type="danger" className="button_delete" onClick={this.deleteUserInfo.bind(item, index)}>删除</Button>
        </span>
    }
    deleteUserInfo = (item, index) => {
        console.log(item)
        Modal.confirm({
            title: '确认删除',
            onOk: async () => {
                console.log('---------------')
            },
            onCancel() {
                // todo
            },
        });
    }
    openModal = (item, index) => {
        console.log(item);
    }
    onShowSizeChange = async (current, pageSize) => {
        this.setState({ currentSize: pageSize })
        await this.getInit(current, pageSize);
    }
    onShowPageChange = async (current, pageSize) => {
        await this.getInit(current, pageSize);
    }
}
