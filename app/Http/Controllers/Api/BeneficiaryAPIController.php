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
        $beneficiaries = $request->user()->beneficiaries;
        return ['beneficiaries'=> $beneficiaries];
    }

    public function store(Request $request)
    {
        $userId = $request->user()->id;
        
        // let's make sure a logged in user can't add themselves as a beneficiary
        if($request->input('phone_number') !== $request->user()['phone_number']){
            $request->validate([
                'phone_number'=> "required"
            ]);
            Beneficiary::create($request->all())->users()->attach($userId);
            return ["Success!"];
        }
        return "You can't add yourself as a beneficiary";
    }

//    public function search($name)
//    {
//        $beneficiaries = Beneficiary::whereHas('users', function ($query) {
//            $query->where('first_name', 'LIKE', "%{'name'}%");
//        })->get();
//        return [$beneficiaries];
//    }

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
