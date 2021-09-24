<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Beneficiary;

class BeneficiaryAPIController extends Controller
{
    /** Display a listing of the resource. */
    public function index(Request $request)
    {
        $my_beneficiaries = $request->user()->beneficiaries;
        return $my_beneficiaries;
//        return response()->json([
//            'status'=> 200,
//            'my_beneficiaries'=> $my_beneficiaries
//        ]);
    }

    /** Store a newly created resource in storage. */
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

    /** Display the specified resource. */
    public function show(Request $request)
    {
        $user = $request->user();
        $my_beneficiaries = $request->user()->beneficiaries;
        $some_beneficiary = $my_beneficiaries->search('user_id')->$request->input('id');
//        $some_beneficiary = Beneficiary::find($request->input('id'));
        return response()->json([
            'status'=> 200,
            'result'=> $some_beneficiary,
        ]);
    }

    /** Remove the specified resource from storage. */
    public function destroy(Request $request)
    {
        $user = $request->user();
        $beneficiary = Beneficiary::find($request->input('id'));
        return $user->beneficiaries()->detach($beneficiary);
    }

    /** Remove the specified resource from storage. */
    public function destroyAll(Request $request)
    {
        return $request->user()->beneficiaries()->detach();
    }

    /** Search the specified resource from storage. */
    public function where($name)
    {
        return Beneficiary::query()
            ->where('first_name', 'LIKE', "%{$name}%")
            ->orWhere('last_name', 'LIKE', "%{$name}%")
            ->get();
    }
}



//    public function store(Request $request)
//    {
//        $user = $request->user();
//        $user->beneficiaries()->attach($beneficiary_id);
//        $user$beneficiaries
//
//        $request->validate([
//            'user_id'=> "required",
//            'first_name'=> "required",
//            'last_name'=> "required",
//            'phone_number'=> "required",
//        ]);
//
//        return Beneficiary::create($request->all());
//    }




