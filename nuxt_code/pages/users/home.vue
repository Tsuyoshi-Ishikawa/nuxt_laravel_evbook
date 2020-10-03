<template>
  <div>
    <h1>home</h1>
    <table border="1">
      <tr v-for="word in words" :key="word.id">
        <td>{{ word.English }}</td>
        <td>{{ word.Japanese}}</td>
        <td v-if="word.user_id === isLogin.currentUserId"><span @click="editWord(word)">編集</span></td>
        <td v-if="word.user_id != isLogin.currentUserId"><span @click="favoWord(word)">お気に入り</span></td>
        <td v-if="word.user_id === isLogin.currentUserId"><span @click="deleteWord(word)">X</span></td>
        <td v-if="word.user_id != isLogin.currentUserId"></td>
      </tr>
    </table>

    <div>
      <p><span @click="createWord()">英単語登録ページ</span></p>
      <p><span @click="testWords()">英単語テストページ</span></p>
      <p><span @click="indexWords()">英単語投稿一覧</span></p>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapState } from 'vuex'

export default {
  data() {
    return{
      isLogin: {
        currentUserId: this.$store.state.current_user_id
      },
    }
  },

  computed: mapState({
    //これで`state => state.count` と同じ意味になる
    //mapState内では、state === this.$store.state となる
    words: "words"
  }),


  //初期化的な内容、ページ読み込み時に発動するので便利
  //初期の値をとって表示させる
  created() {
    this.getHomeInfo(this.isLogin)
  },
  methods: {
    //mapActionsとすることで、index.jsの定数actionで定義されているメソッドloginを駆動?
    ...mapActions(["getHomeInfo","createWord", "editWord", "favoWord", "deleteWord", "testWords", "indexWords"])
  }
}
</script>
