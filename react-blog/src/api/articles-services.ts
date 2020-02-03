import configBase from '../../public/config';
import axios from 'axios';
import articlesUrl from '@/url/articles-url';
import { PageInfo } from '@/models/page-info';


const BaseUrl = configBase.baseUrl;

const ArticlesServices = {
    getArticlesBypageAndSize(pageInfo: PageInfo) {
        const page = pageInfo.page;
        const size = pageInfo.size;
        const url = `${BaseUrl}${articlesUrl.getArticlesInfo}?page=${page}&size=${size}`;
        return axios.get(url);
    },
    userLogin(userName: string, password: string) {
        const url = `${BaseUrl}${articlesUrl.userLogin}?userName=${userName}&password=${password}`;
        return axios.get(url);
    },
    getArticleTypeList() {
        const url = `${BaseUrl}${articlesUrl.getArticleTypeList}`;
        return axios.get(url);
    },
    saveArticles(info: any) {
        const url = `${BaseUrl}${articlesUrl.saveArticles}`;
        return axios.post(url, info);
    },
    // 获取个人的博客信息
    getOwnArticleOfBlok(personId: any, pageInfo: PageInfo) {
        const page = pageInfo.page;
        const size = pageInfo.size;
        const url = `${BaseUrl}${articlesUrl.getOwnArticleBlok}?id=${personId}&page=${page}&size=${size}`;
        return axios.get(url);
    },
    // 删除自己的bolk
    deletePersonBlok(blok: string, personId: string) {
        const url = `${BaseUrl}${articlesUrl.deletePersonBlok}?id=${blok}&personId=${personId}`;
        return axios.delete(url);
    }
}

export default ArticlesServices;