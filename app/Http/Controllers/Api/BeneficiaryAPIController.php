<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Beneficiary;

class BeneficiaryAPIController extends Controller
{
    /** Display a listing of the resource. */
    public function index()
    {
        $beneficicaryy = Beneficiary::all();

        return response()->json([
            'status'=> 200,
            'beneficiaries'=> $beneficicaryy,
        ]);}

    /** Store a newly created resource in storage. */
    public function store(Request $request)
    {
        $request->validate([
            'first_name'=> "required",
            'last_name'=> "required",
            'phone_number'=> "required",
        ]);

        return Beneficiary::create($request->all());
    }

    /** Display the specified resource. */
    public function show($id)
    {
        $benef = Beneficiary::find($id);

        return response()->json([
            'status'=> 200,
            'result'=> $benef,
        ]);
    }

    /** Update the specified resource in storage. */
    public function update(Request $request, $id)
    {
        $beneficiary = Beneficiary::find($id);
        $beneficiary->update($request->all());
        return $beneficiary;
    }

    /** Remove the specified resource from storage. */
    public function destroy($id)
    {
        return Beneficiary::destroy($id);
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
