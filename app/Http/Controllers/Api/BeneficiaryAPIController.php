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

    public function store(Request $request, Beneficiary $phone_number)
    {
        $userId = $request->user()->id;

        // if entered number        ...is not same as...  num of authenticated user and  this num already exists in beneficiaries in the db
        if($request->input('phone_number') !== $request->user()['phone_number'] || Beneficiary::where('phone_number', $phone_number)->exists())
        {
            $request->validate([
                'first_name'=> "required",
                'last_name'=> "required",
                'phone_number'=> "required"
            ]);
            $created = Beneficiary::create($request->all())->users()->attach($userId);
            return response()->json($created, 200, '', '');
        }
        return response()->json(['error' => '"Can\'t add self as a beneficiary"'], 500);
    }

//    public function search($name)
//    {
//        $beneficiaries = Beneficiary::whereHas('users', function ($query) {
//            $query->where('first_name', 'LIKE', "%{'name'}%");
//        })->get();
//        return [$beneficiaries];
//    }

    public function update(Request $request, Beneficiary $id)
    {
        $id->update($request->all());
        return response()->json($id, 200);
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
