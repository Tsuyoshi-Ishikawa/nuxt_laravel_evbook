<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;
use App\Word;
use App\Http\Requests\WordStore;
use App\Http\DTO\Input\WordStoreInputData;
use App\Http\DTO\Input\WordUpdateInputData;
use App\Http\DTO\Input\WordDeleteInputData;
use App\Http\DTO\Input\WordFavoInputData;
use App\Http\UseCases\Interactors\WordInteractor;

class WordsController extends Controller
{
    // public function create() {
    //     return view('Words.create');
    // }


    public function store(Request $request) {

        $currentUserId = $request->userId;
        $inputData = new WordStoreInputData($currentUserId, $request->English, $request->Japanese);
        $wordInteractor = new WordInteractor();
        $wordInteractor->setValues($inputData);
        return response()->json(['response' => 'OK']);
    }

    // public function store(WordStore $request) {
    //     $currentUserId = $request->session()->get('currentUserId');
    //     $inputData = new WordStoreInputData($currentUserId, $request->English, $request->Japanese);
    //     $wordInteractor = new WordInteractor();
    //     $wordInteractor->setValues($inputData);
    //     return redirect('/home');
    // }

    public function edit(int $id) {
        $wordInteractor = new WordInteractor();
        $word = $wordInteractor->getWord($id);
        return view('Words.edit')->with('word', $word);
    }

    public function update(WordStore $request,int $wordId) {
        $currentUserId = $request->session()->get('currentUserId');
        $inputData = new WordUpdateInputData($currentUserId, $wordId, $request->English, $request->Japanese);
        $wordInteractor = new WordInteractor();
        $wordInteractor->updateValues($inputData);
        return redirect('/home');
    }

    public function destroy(Request $request) {
        $currentUserId = $request->session()->get('currentUserId');
        $inputData = new WordDeleteInputData($currentUserId, $request->id);
        $wordInteractor = new WordInteractor();
        $outputData = $wordInteractor->deleteValues($inputData);

        if ($outputData->getError()) {
            $request->session()->flash('error', $outputData->getError()->getMessage());
            return redirect('/home');
        }
    }

    public function test(Request $request) {
        $currentUserId = $request->currentUserId;
        $wordInteractor = new WordInteractor();
        $outputData = $wordInteractor->getRandWord($currentUserId);

        //validation result
        if ($outputData->getError()) {
            return response()->json(['error_message' => $outputData->getError()->getMessage()]);
        }
        return response()->json(['word' => ['Japanese' => $outputData->getJapanese(), 'English' => $outputData->getEnglish()]]);
    }

    public function index(Request $request) {
        $currentUserId = $request->session()->get('currentUserId');
        $wordInteractor = new WordInteractor();
        $outputData = $wordInteractor->getOtherWord($currentUserId);
        return view('Words.index')->with('words', $outputData->getOtherWords());
    }

    public function like(Request $request) {
        $currentUserId = $request->session()->get('currentUserId');
        $inputData = new WordFavoInputData($currentUserId, $request->type, $request->word_id);
        $wordInteractor = new WordInteractor();
        $wordInteractor->favoWord($inputData);
    }
}
