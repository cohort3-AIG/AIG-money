<?php

namespace App\Http\Controllers\Api;

use App\Models\Beneficiary;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class BeneficiaryAPIController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $beneficiaries = Beneficiary::all();

        return response()->json([
            'status'=> 200,
            'beneficiaries'=> $beneficiaries,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            "user_id"=> "required",
            "first_name"=> "required",
            "last_name"=> "required",
            "phone_number"=> "required",
        ]);

        return Beneficiary::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Beneficiary::find($id);     // return resource of id 'id'
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $product = Beneficiary::find($id);
        $product->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Beneficiary::destroy($id);
    }

    /** Search the specified resource from storage. */
    public function where($name)
    {
        return Beneficiary::where("name", "like", "%" .$name. "%")->get();
    }

    /** Edit the specified resource from storage. */
    public function edit($id)
    {
        return Beneficiary::edit($id);
    }
}
