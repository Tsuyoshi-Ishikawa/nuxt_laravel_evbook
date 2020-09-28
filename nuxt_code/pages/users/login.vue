<template>
  <div class="container">
    <div>
      <h1>login</h1>
        <v-form>
          <v-text-field label="メールアドレス" v-model="registerPostData.email" :rules="[rules.required, rules.mail]"></v-text-field>
          <v-text-field label="パスワード" v-model="registerPostData.password" :rules="[rules.required, rules.min]" :append-icon="registerConfig.passShow ? 'mdi-eye': 'mdi-eye-off'" :type="registerConfig.passShow ? 'text': 'password'" @click:append="registerConfig.passShow = !registerConfig.passShow"></v-text-field>
          <v-btn @click="register(registerPostData)">ボタン</v-btn>
        </v-form>
    </div>
  </div>
</template>
