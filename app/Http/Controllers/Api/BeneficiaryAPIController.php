<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Beneficiary;

class BeneficiaryAPIController extends Controller
{
    public function index(Request $request)
    {
        return $request->user()->beneficiaries;
    }

    public function store(Request $request)
    {
        $userId = $request->user()->id;
        $request->validate([
            'first_name'=> "required",
            'last_name'=> "required",
            'phone_number'=> "required",
        ]);
        Beneficiary::create($request->all())->users()->attach($userId);

        return ["Success!"];
    }

    public function destroy(Request $request)
    {
        $user = $request->user();
        $beneficiary = Beneficiary::find($request->input('id'));
        return $user->beneficiaries()->detach($beneficiary);
    }

    public function destroyAll(Request $request)
    {
        return $request->user()->beneficiaries()->detach();
    }
}
