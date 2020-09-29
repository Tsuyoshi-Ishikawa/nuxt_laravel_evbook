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
      const messages = error.response.data.message;
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
        console.log(res.currentUserId)
        this.$router.push('/users/home')
      }
    } catch (error) {
      const messages = error.response.data.message;
    }
  },
  async logout({ commit }) {
    commit('resetCurrentUserId')
    this.$router.push('/')
  }
}

//mutationを介さないとstateの値を変更できない
export const mutations = {
  setErrorMsg(state, error_message) {
    state.error_message = error_message
  },

  setCurrentUserId(state, current_user_id) {
    state.current_user_id = current_user_id
  },

  resetCurrentUserId(state) {
    state.current_user_id = 0
  }
}

export const state = () => ({
  error_message: "",
  current_user_id: 0,
})
