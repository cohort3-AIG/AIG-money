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
                'first_name'=> "required",
                'last_name'=> "required",
                'phone_number'=> "required"
            ]);
            Beneficiary::create($request->all())->users();
            return ["Success!"];
        }
        return "Can't add self as a beneficiary";
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

    public function add_to_my_beneficiaries(Request $request, User $beneficiary_id){
        $user = $request->user();
        return $user->add_beneficiary($request->input('beneficiary_id'));
    }

    public function bless_new_beneficiary(Request $request, User $beneficiary_id){
        $senderWallet = $request->user()->wallet; // works
        $beneficiaryWallet = $request->user()->beneficiaries->find($request->input('beneficiary_id'))->wallet;  // beneficiary wallet
        return $senderWallet->transfer($beneficiaryWallet, $request->input('amount'));

//        return $beneficiaryWallet;

//        $beneficiaryWallet = User::firstWhere(User, $phone)->users->wallet;
////        $beneficiaryWallet = Beneficiary::with($request->user()->beneficiaries->phone_number, $request->input('phone_number'))->first()->wallet;
////        return $senderWallet->transfer($beneficiaryWallet, $request->input('amount'));
    }

    public function check_beneficiary_wallet(Request $request){
        return User::find($request->input('beneficiary_id'))->get()->wallet->balance;
    }
}
