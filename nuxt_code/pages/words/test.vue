<template>
  <div>
    <p @click="getHome()">戻る</p>
    <h1></h1>
    <p>{{ error_message }}</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapState } from 'vuex'

export default {
  computed: mapState({
    //これで`state => state.count` と同じ意味になる
    //mapState内では、state === this.$store.state となる
    error_message: "error_message"
  }),
  methods: {
    //mapActionsとすることで、index.jsの定数actionで定義されているメソッドloginを駆動?
    ...mapActions(["getHome"])
  }
}
</script>
