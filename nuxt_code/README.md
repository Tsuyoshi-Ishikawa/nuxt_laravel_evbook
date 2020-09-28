# nuxt_code

## 設定
dockerfileでhostとport設定をしたので、nuxtで受け取れるように変更する

```javascript

  //nuxt.config.js
  server: {
    port: 80, // デフォルト: 3000
    host: '0.0.0.0' // デフォルト: localhost
  }
  
```

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
