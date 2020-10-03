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
      if (res.error_message) {
        //commitでmutationを発動、第二引数にmutationで使う引数
        commit('setErrorMsg', res.error_message)
        if (res.isNotLogin) this.$router.push('/users/register');
      } else {
        commit('setWords', res.words)
      }
    } catch (error) {
      commit('setErrorMsg', error.message)
    }
  },
  async createWord() {
    this.$router.push('/words/create')
  },
  async editWord({ commit }, data) {
    // this.$router.push({ path: '/word/edit', params: { userId } })
  },
  async favoWord({ commit }, data) {
  },
  async deleteWord({ commit }, data) {
  },
  async testWords() {
    this.$router.push('/words/test')
  },
  async indexWords() {
    this.$router.push('/words/index')
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

  resetCurrentUserId(state) {
    state.current_user_id = 0
  }
}

export const state = () => ({
  error_message: "",
  current_user_id: 0,
  words: {}
})
