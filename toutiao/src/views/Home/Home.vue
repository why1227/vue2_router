<template>
  <div class="home-container">
    <!-- <van-nav-bar title="Why头条" :fixed="true" /> -->
    <van-nav-bar title="Why头条" fixed />
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      :disabled="finished"
    >
      <!-- 触发load事件，请求第二页数据，同时loading的值变成了true
    在这期间，如果用户反复上拉加载，此时，不会多次调用load事件
    因为loading为true时不会反复触发load事件 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="我也是有底线滴～"
        @load="onLoad"
      >
        <ArticleInfo
          v-for="item in artlist"
          :key="item.id"
          :title="item.title"
          :author="item.aut_name"
          :comm_count="item.comm_count"
          :pubdate="item.pubdate"
          :cover="item.cover"
        ></ArticleInfo>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleListAPI } from '@/api/articleAPI.js';
import ArticleInfo from '@/components/Article/ArticleInfo.vue';

// 鲁大师，提供了很多牛逼的函数：
// 节流，防抖，操作数组的一系列函数，操作对象的一系列函数（深拷贝，浅拷贝）
// import _ from 'lodash';
import _ from 'lodash';
let fn = null;

export default {
  name: 'Home',
  data() {
    return {
      page: 1,
      limite: 10,
      artlist: [],
      // 是否正在加载下一页数据，如果loading为true则不会反复触发load事件
      // 每当下一页数据请求回来之后，记得要把loading从true改为false
      loading: true,
      // 所有数据是否加载完毕，如果没有更多数据，改true
      finished: false,
      // 是否正在下拉刷新
      refreshing: false,
    };
  },
  components: { ArticleInfo },
  created() {
    this.initArticleList();
  },
  activated() {
    fn = this.recordTopHandler();
    window.addEventListener('scroll', fn);
  },
  deactivated() {
    window.removeEventListener('scroll', fn);
  },
  methods: {
    // 封装获取文章列表数据的方法
    async initArticleList(isRefresh) {
      const { data: res } = await getArticleListAPI(this.page, this.limite);
      if (res.length === 0) {
        // 证明没有下一页数据了，直接把finished改为true，表示数据加载完了
        this.finished = true;
      }
      if (isRefresh) {
        this.artlist = [...res, ...this.artlist];
        this.refreshing = false;
      } else {
        this.artlist = [...this.artlist, ...res];
      }
      this.loading = false;
    },
    // 只要被调用，就应该请求下一页数据
    onLoad() {
      this.page++;
      this.initArticleList();
    },
    onRefresh() {
      this.page++;
      this.initArticleList(true);
    },
    recordTopHandler() {
      return _.debounce(
        () => {
          this.$route.meta.top = window.scrollY;
        },
        50,
        { trailing: true }
      );
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  padding: 46px 0 50px 0;
  // .van-nav-bar {
  //   background-color: #007bff;
  // }
  // /deep/.van-nav-bar__title {
  //   color: aliceblue;
  // }
}
</style>
