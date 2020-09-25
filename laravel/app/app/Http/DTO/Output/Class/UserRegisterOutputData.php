<?php

namespace App\Http\DTO\Output;

use App\Http\DTO\Output\UserRegisterOutputCons;
use App\Http\UseCases\Entity\User;

class UserRegisterOutputData implements UserRegisterOutputCons {
    private $userId;

    public function __construct(User $user) {
        $this->userId = $user->getUserId();
    }

    public function getId() {
        return $this->userId;
    }
}
