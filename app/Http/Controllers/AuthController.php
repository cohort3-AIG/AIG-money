<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Twilio\Rest\Client;

class AuthController extends Controller
{
    public function phone(Request $request)
    {
        $fields = $request->validate(
            [
                'phone_number' => "required|string",
            ]
        );
        $sid = getenv("TWILIO_ACCOUNT_SID");
        $token = getenv("TWILIO_AUTH_TOKEN");
        $service_id = getenv('TWILIO_VERIFY_SERVICE');
        $twilio = new Client($sid, $token);
        $verification = $twilio->verify->v2->services($service_id)
            ->verifications
            ->create($fields['phone_number'], "sms");
        return [
            "verification" => $verification->status
        ];
    }
    public function verify_phone(Request $request)
    {
        $fields = $request->validate(
            [
                'code' => "numeric",
                'phone_number' => "required|string",
            ]
        );
        $sid = getenv("TWILIO_ACCOUNT_SID");
        $token = getenv("TWILIO_AUTH_TOKEN");
        $service_id = getenv('TWILIO_VERIFY_SERVICE');
        $twilio = new Client($sid, $token);
        $verification_check = $twilio->verify->v2->services($service_id)
            ->verificationChecks
            ->create(
                $fields['code'], // code
                ["to" => $fields['phone_number']]
            );
        return [
            "verification" => $verification_check->status
        ];
    }
    public function register(Request $request)
    {
        $fields = $request->validate(
            [
                'first_name' => 'required|string',
                'last_name' => 'required|string',
                'email' => 'required|string|unique:users,email',
                'phone_number' => "required|string",
                'password' => 'required|string|confirmed'
            ]
        );
        $user = User::create([
            'first_name' => $fields['first_name'],
            'last_name' => $fields['last_name'],
            'email' => $fields['email'],
            'phone_number' => $fields['phone_number'],
            'password' => bcrypt($fields['password'])
        ]);

        $token = $user->createToken('myapptoken')->plainTextToken;
        $sid = getenv("TWILIO_ACCOUNT_SID");
        $token = getenv("TWILIO_AUTH_TOKEN");
        $service_id = getenv('TWILIO_VERIFY_SERVICE');
        $twilio = new Client($sid, $token);
        $twilio->verify->v2->services($service_id)
            ->verifications
            ->create($user->phone_number, "sms");
        $response =  [
            'user' => $user,
            'token' => $token,
        ];
        return response($response, 201);
    }
    public function verify_email(Request $request)
    {
        $fields = $request->validate(
            [
                'code' => "numeric"
            ]
        );
        $sid = getenv("TWILIO_ACCOUNT_SID");
        $token = getenv("TWILIO_AUTH_TOKEN");
        $service_id = getenv('TWILIO_VERIFY_SERVICE');
        $twilio = new Client($sid, $token);
        $verification_check = $twilio->verify->v2->services($service_id)
            ->verificationChecks
            ->create(
                $fields['code'], // code
                ["to" => $request->user->email]
            );
        return [
            "verification" => $verification_check->status
        ];
    }
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return [
            'message' => 'Logged out'
        ];
    }

    public function login(Request $request)
    {
        $fields = $request->validate(
            [
                'email' => 'required|string',
                'password' => 'required|string'
            ]
        );

        $user = User::where('email', $fields['email'])->first();
        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => 'Bad creds'
            ]);
        }
        $token = $user->createToken('myapptoken')->plainTextToken;
        $response =  [
            'user' => $user,
            'token' => $token,
        ];
        return response($response, 201);
    }
}
