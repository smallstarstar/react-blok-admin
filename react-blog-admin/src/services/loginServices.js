import axios from 'axios';

import UserInfoUrl from '../url/user';
import httpLink from '../common/business-config';

const BaseUrl = httpLink.baseUrl;

const loginServices = {
    // 用户信息登录
    oginByUserNameAndPassword(userName, password) {
        const url = `${BaseUrl}${UserInfoUrl.userLoginUserNameAndPassword}?userName${userName}&password${password}`;
        return axios.get(url);
    },
    // 获取用户信息分页
    getUserInfoListByPageAndSize(page: number, size: number) {
        const url = `${BaseUrl}${UserInfoUrl.getUserInfoList}?page=${page}&size=${size}`;
        return axios.get(url);
    }
}
export default loginServices;