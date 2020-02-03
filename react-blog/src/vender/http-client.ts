import axios from 'axios';
import rxEvent from 'pubsub-js';
import Eventkeys from '@/common/event-keys';

/**
 * 请求相应拦截
 */

axios.interceptors.response.use((res: any) => {
    return res.data;
}, (error: any) => {
    // 服务器错误
    if(error.response === 'undefined' || error.response.status === 500) {
        rxEvent.publish(Eventkeys.SERVICES_ERROR, true);
    }
    // 参数错误
    if(error.response.status === 400) {
        rxEvent.publish(Eventkeys.SERVICES_PARAM_ERROR, true);
    }
    // 用户不存在
    if(error.response.status === 404) {
        rxEvent.publish(Eventkeys.SERVICES_NOT_FOUND, true);
    }
});

/**
 * 请求参数的拦截
 *
 */
axios.interceptors.request.use((config: any) => {
    const { data, method } = config;
     //  在 node.js的服务中是使用的/在java的服务中不需要，此项目本人启用的是spring boot;
    // if (method.toLowerCase() === 'post' && typeof data === 'object')
        // config.data = qs.stringify(data);
        // console.log(config.data, '========================');
        // console.log(config)
        return config;
})
