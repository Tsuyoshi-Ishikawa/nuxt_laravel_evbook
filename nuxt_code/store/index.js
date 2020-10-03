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
  async getHome() {
    this.$router.push('/users/home')
  },
  async createWord({ commit }, data) {
    try {
      const res = await this.$axios.$post('http://0.0.0.0:23450/api/words', data);
      console.log(res)
      if (res.error_message) {
        commit('setErrorMsg', res.error_message)
      } else {
        this.$router.push('/users/home')
      }
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

  resetCurrentUserId(state) {
    state.current_user_id = 0
  }
}

export const state = () => ({
  error_message: "",
  current_user_id: 0,
  words: {}
})
