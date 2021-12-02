<template>
  <div>
    <h1>User</h1>
  </div>
</template>

<script>
// 按需导入API接口
import { getArticleListAPI } from '@/api/articleAPI.js';

export default {
  name: 'User',
  data() {
    return {
      page: 0,
      limite: 5,
    };
  },
  created() {
    this.initArticleList();
  },
  methods: {
    // 封装获取文章列表数据的方法
    async initArticleList() {
      const { data: res } = await getArticleListAPI(this.page, this.limite);
      console.log(res);
    },
  },
};
</script>

<style lang="less" scoped></style>
