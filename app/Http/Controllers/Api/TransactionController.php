<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\TransactionCategory;
use App\Http\Controllers\Api\BaseController;


class TransactionController extends BaseController
{
    public function get_charge(){

        $result = TransactionCategory::get()->all();
        return $this->sendResponse($result,"Successful");

    }
}
