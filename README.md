# todo_next.js
## required
yarn
## getting started
### server

```
cd server/src
yarn
```

### client

```
cd client
yarn
```

## how to run
### server
VSCodeにRemote Containerをインストール
```
cd server 
docker-compose up
```
VSCodeの画面左下の><アイコンをクリックし、Remote-Contaoners: Attatch to Running Container...を選択する

server_api_1を選択
```
cd src
yarn prisma:dev　\\\DBの初期データ作成
yarn dev         \\\APIサーバーが起動
```
### client
```
cd client
yarn dev でWebサーバーが起動
```
http://localhost:3000 に接続
