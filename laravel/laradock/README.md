## .envの作成
cp env-example .env

## .envの編集
APP_CODE_PATH_HOST=../app
DATA_PATH_HOST=../data
NGINX_HOST_HTTP_PORT=23450

## 環境構築
- コンテナを立てる
docker-compose up -d nginx mysql
- コンテナに入る
docker-compose exec --user=laradock workspace bash
- コンテナない作業
composer install
php artisan key:generate
php artisan config:cache
php artisan serve
php artisan migrate
php artisan db:seed

- アクセス
docker psでコンテナを見て2345のportのhostを叩く


## 参考
https://blog.proglearn.com/2019/11/21/%E3%80%902019%E5%B9%B411%E6%9C%88%E3%80%91laradock%E3%81%A7laravel%E3%82%92%E6%A7%8B%E7%AF%89%E3%81%99%E3%82%8B%E3%81%BE%E3%81%A7%E3%81%AE%E5%85%A8%E6%89%8B%E9%A0%86/

