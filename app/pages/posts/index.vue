<template>
  <sectoin class="container" posts="page">
    <el-card>
      <div slot="header" class="clearfix">
        <span>新規投稿</span>
      </div>
      <el-table :data="showPosts" style="width: 100%" class="table">
        <el-table-column prop="id" label="ID" width="50"></el-table-column>
        <el-table-column prop="title" label="タイトル" width="200"></el-table-column>
        <el-table-column prop="user.id" label="投稿者" width="100"></el-table-column>
        <el-table-column prop="body" label="内容"></el-table-column>
        <el-table-column prop="created_at" label="投稿日時" width="240"></el-table-column>
      </el-table>
    </el-card>
  </sectoin>
</template>

<script>
    export default {
        // 入力される値の型チェック、未入力チェック（バリデーション）とかにcomputed。
        computed: {

            // 両方同じ
            // showPosts: function() {

            // こうも書ける
            showPosts() {
                return [
                    {
                        id: '001',
                        title: 'Nuxt.jsアプリケーションの開発方法',
                        body: '内容内容内容内容内容内容内容内容',
                        created_at: '2018/08/10 12:00:00',
                        user: {
                            id: 'shogo'
                        }
                    },
                    {
                        id: '002',
                        title: '開発nuxt.js Herokuへの適用',
                        body: '内容内容内容内容内容内容内容内容',
                        created_at: '2018/08/10 13:00:00',
                        user: {
                            id: 'shogo'
                        }
                    }
                ]
            }
        }

    }
</script>

<style>
  .posts-page .el-table__row {
    cursor: pointer;
  }
</style>
