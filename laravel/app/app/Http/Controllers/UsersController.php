<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\UserRegister;
use App\Http\Requests\UserLogin;
use App\Word;
use App\User;
use App\Http\DTO\Input\UserRegisterInputData;
use App\Http\DTO\Input\UserLoginInputData;
use App\Http\UseCases\Interactors\UserInteractor;

class UsersController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function registerConfirm(Request $request) {
        $userInfo = new UserRegisterInputData($request->name, $request->email, $request->password);
        $userInteractor = new UserInteractor();
        $outputData = $userInteractor->register($userInfo);

        //validation result
        if ($outputData->getError()) {
            return response()->json(['error_message' => $outputData->getError()->getMessage()]);
        }
        $currentUserId = $outputData->getId();
        return response()->json(['currentUserId' => $currentUserId]);
    }

    public function loginConfirm(Request $request) {
        clock("loginConfirmのrequest is {$request}");
        $userInfo = new UserLoginInputData($request->email, $request->password);
        $userInteractor = new UserInteractor();
        $outputData = $userInteractor->login($userInfo);

        //validation result
        if ($outputData->getError()) {
            return response()->json(['error_message' => $outputData->getError()->getMessage()]);
        }
        $currentUserId = $outputData->getId();
        return response()->json(['currentUserId' => $currentUserId]);
    }

    public function home(Request $request) {
        if ($authResult = $this->auth($request)) return $authResult;

        $currentUserId = $request->currentUserId;
        $userInteractor = new UserInteractor();
        $outputData = $userInteractor->getAllWords($currentUserId);
        $words = $outputData->getAllWords();
        return response()->json(['words' => $words]);

        // return view('Users.home')->with([
        //     'currentUserId' => $currentUserId,
        //     'words' => $words,
        // ]);
    }

    // public function home(Request $request) {
    //     $currentUserId = $request->session()->get('currentUserId');
    //     $userInteractor = new UserInteractor();
    //     $outputData = $userInteractor->getAllWords($currentUserId);
    //     $words = $outputData->getAllWords();
    //     return view('Users.home')->with([
    //         'currentUserId' => $currentUserId,
    //         'words' => $words,
    //     ]);
    // }

    //ユーザー検索機能(cleanArcでは未実装)
    // public function search() {
    //     return view('Users.search');
    // }

    // public function searchUser(Request $request) {
    //     if ($keyWord = $request->search_word) {
    //         User::searchUser($keyWord);
    //     }
    // }

    // public function show(int $id) {
    //     $user = User::selectUser($id);
    //     if ($user) {
    //         $words = $user->getAllWords();
    //         return view('Users.show')->with([
    //             'user' => $user,
    //             'words' => $words,
    //         ]);
    //     }
    //     return view('Users.search');
    // }
}
