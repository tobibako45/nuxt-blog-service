<template>
  <section class="container">
    <el-card style="flex: 1">
      <div slot="header" class="clearfix">
        <span>ログイン</span>
      </div>
      <form>
        <div class="form-content">
          <span>ユーザー ID</span>
          <el-input v-model="formData.id" placeholder="" />
        </div>
        <div class="form-content">
          <el-checkbox v-model="isCreateMode">
            アカウントを作成する
          </el-checkbox>
        </div>
        <div class="text-right">
          <el-button type="primary" @click="handleClickSubmit">
            {{ buttonText }}
          </el-button>
        </div>
      </form>
    </el-card>
  </section>
</template>

<script>
// ヘルパーをインポート
import { mapGetters, mapActions } from "vuex";
// universal-cookieをimport
import Cookies from "universal-cookie";

export default {
  asyncData({ redirect, store }) {
    if (store.getters["user"]) {
      redirect("/posts/");
    }
    return {
      isCreateMode: false,
      formData: {
        id: ""
      }
    };
  },
  computed: {
    buttonText() {
      return this.isCreateMode ? "新規登録" : "ログイン";
    },

    // オブジェクトスプレッド演算子(...)
    // storeのgettersのuserをマッピング
    // mapStateとmapGettersはcomputedに書く
    ...mapGetters(["user"])
  },
  methods: {
    async handleClickSubmit() {
      const cookies = new Cookies();

      if (this.isCreateMode) {
        try {
          await this.register({ ...this.formData });
          // 通知する
          this.$notify({
            type: "success",
            title: "アカウント作成処理",
            message: `${this.formData.id} として登録しました`,
            position: "bottom-right",
            duration: 1000 // 期間
          });

          // JavaScript の値を JSON 文字列に変換します
          cookies.set("user", JSON.stringify(this.user));

          // Vueインスタンスの内部では、$router としてルーターインスタンスにアクセスできます。
          // 従って、this.$router.push で呼ぶことができます。
          // <router-link to="/posts/"></router-link>これと一緒。スクリプトで書くと下。
          this.$router.push("/posts/");
        } catch (e) {
          this.$notify.error({
            title: "アカウント作成失敗",
            message: "すでに登録されているか、不正なユーザー ID です",
            position: "bottom-right",
            duration: 1000
          });
        }
      } else {
        try {
          await this.login({ ...this.formData });
          this.$notify({
            type: "success",
            title: "ログイン成功",
            message: `${this.formData.id} としてログインしました`,
            position: "bottom-right",
            duration: 1000
          });

          cookies.set("user", JSON.stringify(this.user));
          this.$router.push("/posts/");
        } catch (e) {
          this.$notify.error({
            title: "ログイン失敗",
            message: "不正なユーザー ID です",
            position: "bottom-right",
            duration: 1000
          });
        }
      }
    },

    // オブジェクトスプレッド演算子(...)
    // storeのactionsのloginとregisterをマッピング
    // mapMutationsとmapActionsはmethodsに書く
    ...mapActions(["login", "register"])
  }
};
</script>

<style>
.form-content {
  margin: 16px 0;
}
</style>
