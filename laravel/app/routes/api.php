<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['cors'])->group(function () {
    //プリフライとリクエスト(サーバがメソッドとヘッダをチェック)ではoptionをつけて受け取る準備をする必要あり
    Route::options('/register', function () {
        return response()->json();
    });
    Route::options('/login', function () {
        return response()->json();
    });
    Route::options('/home', function () {
        return response()->json();
    });
    Route::options('/words', function () {
        return response()->json();
    });

    Route::post('/register', 'UsersController@registerConfirm')->name('Users.registerConfirm');
    Route::post('/login', 'UsersController@loginConfirm')->name('Users.loginConfirm');

    //middlewareを二重にしたcors_authを使用しようとしたが、うまくいかなかったのでauth(ログイン済かの判定はcontrollerで行う)
    Route::post('/home', 'UsersController@home')->name('Users.home');
    Route::post('/words', 'WordsController@store')->name('Words.store');
});
