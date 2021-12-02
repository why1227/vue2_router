import request from '@/Utils/request.js';

// 服务器还没提供/user这个接口
export const getUserInfoAPI = function () {
  return request.get('/user');
};
