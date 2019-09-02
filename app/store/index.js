// state: コンポーネントでいうdata
export const state = () => ({
  isLoggedIn: false,
  user: null
})

// gettersは主にstateのデータを加工して表示したいときに使用する。
// getters: コンポーネントでいうcomputed的なもの。
export const getters = {
  isLoggedIn: (state) => state.isLoggedIn,
  user: (state) => state.user
}

// mutations は state を更新する関数を登録します。stateを唯一変更できるもの。
// mutations: コンポーネントでいうmethods（というかsetter）
// mutations内の関数の呼び出しとして、特徴的なことはストアのcommit関数を用いて発火させる。(actionsのほうで)
export const mutations = {
  setUser(state, {user}) {
    state.user = user
    state.isLoggedIn = true
  }
}

// actionsはmutationsをコミットする関数を登録します。
// actionsのcommitを使うことでmutationsを呼び出す(コンポーネントには無い懸念)
export const actions = {

  // 非同期通信の定番ライブラリ axios
  // axios.get('targetUrl') でデータを取得する
  // その際 await で axios.get を待つ必要がある
  // await を使うために、doSearch メソッドの冒頭に async をつけること
  // async が書かれた関数・メソッドの中でのみ await ができる
  // axios でデータを取得するときには async/await を使う

  async login({commit}, {id}) {
    // async awaitは非同期処理をする関数がもともとあって、それを同期処理にしたい場合につかう。
    // await は axiosの処理が終わるまで処理を待っててくれる
    const user = await this.$axios.$get('/users/${id}.json')
    // ser.idがなければError
    if (!user.id) throw new Error('Invalid user')
    // mutationsのsetUserをcommit
    commit('setUser', {user})
  },
  async register({commit}, {id}) {
    const payload = {}
    payload[id] = {id}
    await this.$axios.$get('/users.json', payload)
    const user = await this.$axios.$get('/users/${id}.json')
    if (!user.id) throw new Error('Invalid user')
    commit('setUser', {user})
  }

}


