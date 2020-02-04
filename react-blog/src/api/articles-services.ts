import configBase from '../../public/config';
import axios from 'axios';
import articlesUrl from '@/url/articles-url';
import { PageInfo } from '@/models/page-info';
import { CommitInfo } from '@/models/commit-info';

const BaseUrl = configBase.baseUrl;

const ArticlesServices = {
    userRegister(userInfo: any) {
        const url = `${BaseUrl}${articlesUrl.userRegister}`;
        return axios.post(url, userInfo);
    },
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
    },
    // 添加评论信息
    addCommit(commitInfo: CommitInfo) {
        const url = `${BaseUrl}${articlesUrl.addCommit}`;
        return axios.post(url, commitInfo);
    },
    // 根据文章的id获取文章的评论信息
    getCommentByArticleAndPageInfo(id: string, pageInfo: PageInfo) {
        const page = pageInfo.page;
        const size = pageInfo.size;
        const url = `${BaseUrl}${articlesUrl.getCommentByArticleAndPageInfo}?id=${id}&page=${page}&size=${size}`;
        return axios.get(url);
    }
}

export default ArticlesServices;