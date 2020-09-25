# イメージの指定
FROM node:10.14.1-alpine

# コンテナ内で cd /app しているようなもの
# これでコンテナに入った瞬間に/appにいくようになる
WORKDIR /app 

RUN apk update && \
    apk add git && \
    npm install -g npm && \
    npm install -g vue-cli

#ENVでhostに値を割り当てることで、host名がそれになる、つまりその値で叩かないといけない
#docker psしてPORTSを確認すると、どうやってつなげば良いかわかる
ENV HOST 0.0.0.0
EXPOSE 80
