export const actions = {
  async register({ commit }, data) {
    try {
      const res = await this.$axios.$post('http://0.0.0.0:23450/api/register', data);
      if (res.error_message) {
        //commitでmutationを発動、第二引数にmutationで使う引数
        commit('setErrorMsg', res.error_message)
      } else {
        commit('setCurrentUserId', res.currentUserId)
        this.$router.push('/users/home')
      }
    } catch (error) {
      commit('setErrorMsg', error.message)
    }
  },
  async login({ commit }, data) {
    try {
      console.log(data)
      const res = await this.$axios.$post('http://0.0.0.0:23450/api/login', data);
      if (res.error_message) {
        //commitでmutationを発動、第二引数にmutationで使う引数
        commit('setErrorMsg', res.error_message)
      } else {
        commit('setCurrentUserId', res.currentUserId)
        this.$router.push('/users/home')
      }
    } catch (error) {
      commit('setErrorMsg', error.message)
    }
  },
  async logout({ commit }) {
    commit('resetCurrentUserId')
    this.$router.push('/')
  },
  async getHomeInfo({ commit }, data) {
    try {
      const res = await this.$axios.$post('http://0.0.0.0:23450/api/home', data);
      commit('setWords', res.words)
    } catch (error) {
      commit('setErrorMsg', error.message)
    }
  },
  async getTestInfo({ commit }, data) {
    try {
      const res = await this.$axios.$post('http://0.0.0.0:23450/api/words/test', data);
      console.log(res)
      if (res.error_message) {
        commit('setErrorMsg', res.error_message)
        this.$router.push('/users/home')
      } else {
        commit('setTestWord', res.word)
      }
    } catch (error) {
      commit('setErrorMsg', error.message)
    }
  },
  async resetError({ commit }) {
    commit('resetErrorMsg')
  },
  async isSession({ commit }) {
    commit('isLogin')
  },
  async getHome() {
    this.$router.push('/users/home')
  },
  async createWord({ commit }, data) {
    try {
      const res = await this.$axios.$post('http://0.0.0.0:23450/api/words', data);
      this.$router.push('/users/home')
    } catch (error) {
      commit('setErrorMsg', error.message)
    }
  },
  async editWord({ commit }, data) {
    // this.$router.push({ path: '/word/edit', params: { userId } })
  },
  async favoWord({ commit }, data) {
  },
  async deleteWord({ commit }, data) {
  },
}

//mutationを介さないとstateの値を変更できない
export const mutations = {
  setErrorMsg(state, error_message) {
    state.error_message = error_message
  },

  setCurrentUserId(state, current_user_id) {
    state.current_user_id = current_user_id
  },

  setWords(state, words) {
    state.words = words
  },

  setTestWord(state, word) {
    state.test_word = word
  },

  resetCurrentUserId(state) {
    state.current_user_id = 0
  },

  resetErrorMsg(state) {
    state.error_message =""
  },

  isLogin(state) {
    if (state.current_user_id === 0) {
      state.error_message = "You need register or login"
      this.$router.push('/users/login')
    }
  }
}

export const state = () => ({
  error_message: "",
  current_user_id: 0,
  words: {},
  test_word: {}
})
