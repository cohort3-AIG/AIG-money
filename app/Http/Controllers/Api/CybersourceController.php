<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController;
use App\Http\Resources\Cybersource as CybersourceResource;
require_once __DIR__ . DIRECTORY_SEPARATOR . '../../../../vendor/autoload.php';
require_once __DIR__ . DIRECTORY_SEPARATOR . '../../../Helpers/ExternalConfiguration.php';
use App\Models\Transaction;
use App\Models\TransactionCategory;
use App\Models\User;
//use App\Models\Wallet;
use Bavix\Wallet\Models\Wallet;
use CyberSource\ApiClient;
use Cybersource\ApiException;
use CyberSource\Api\PaymentsApi;
use CyberSource\ExternalConfiguration;
use CyberSource\Model\CreatePaymentRequest;
use CyberSource\Model\Ptsv2paymentsClientReferenceInformation;
use CyberSource\Model\Ptsv2paymentsOrderInformation;
use CyberSource\Model\Ptsv2paymentsOrderInformationAmountDetails;
use CyberSource\Model\Ptsv2paymentsOrderInformationBillTo;
use CyberSource\Model\Ptsv2paymentsPaymentInformation;
use CyberSource\Model\Ptsv2paymentsPaymentInformationCard;
use CyberSource\Model\Ptsv2paymentsProcessingInformation;
use CyberSource\Model\Ptsv2paymentsProcessingInformationAuthorizationOptions;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class CybersourceController extends BaseController
{

    public function cybersource_api(Request $request)
    {

        if ($request->isMethod('post')) {

            $address2 = isset($request['address2']) ? isset($request['address2']) : null;
            $user = $request->user();
            $error_message = array();
            if (isset($user)) {

                try {
                    $validated = $this->validate($request, [
                        'number' => ['required', 'int'],
                        'expiration_month' => ['required', 'numeric'],
                        'expiration_year' => ['required', 'int'],
                        'total_amount' => ['required', 'numeric'],
                        'email' => ['required', 'email'],
                        'first_name' => ['required', 'string'],
                        'last_name' => ['required', 'string'],
                        'address1' => ['required', 'string'],
                        'locality' => ['required', 'string'],
                        'security_code' => ['required', 'numeric'],
                        'postal_code' => ['required', 'string'],
                        'administrative_area' => ['required', 'string'],
                        'country' => ['required', 'string'],

                    ]);

                } catch (ValidationException $validationException) {
                    return $this->sendError($validationException->getMessage(), $validationException->errors());
                }
                // validate the entered  card details.
                if ($this->validate_card($validated['number']) === false) {
                    array_push($error_message, ['number' => 'The entered card number is not valid']);
                }
                if (!is_numeric($validated['expiration_month']) || $validated['expiration_month'] < 1 || $validated['expiration_month'] > 12) {

                    array_push($error_message, ['expiration_month' => 'Invalid expiry month of ' . $validated['expiration_month'] . ' submitted']);
                }

                // Get the current year

                $currentYear = date('Y');

                settype($currentYear, 'integer');

                if (!is_numeric($validated['expiration_year']) || $validated['expiration_year'] < $currentYear || $validated['expiration_year'] > $currentYear + 10) {
                    array_push($error_message, ['expiration_year' => 'Invalid expiry year of ' . $validated['expiration_year'] . ' submitted']);
                }
                if ($validated['total_amount'] < 2) {
                    array_push($error_message, ['total_amount' => "The amount entered is less than the required amount"]);
                }
                if (!empty($error_message)) {
                    return $this->sendError('Invalid card details', $error_message);
                }
                try {
                
                    $capture = true;

                    $clientReferenceInformationArr = [
                        'code' => 'TC50171_3',
                    ];
                    $clientReferenceInformation = new Ptsv2paymentsClientReferenceInformation($clientReferenceInformationArr);
                    $processingInformationAuthorizationOptionsArr = [
                        "partialAuthIndicator" => false,
                        "ignoreAvsResult" => false,
                        "ignoreCvResult" => false,
                    ];
                    $processingInformationAuthorizationOptions = new Ptsv2paymentsProcessingInformationAuthorizationOptions($processingInformationAuthorizationOptionsArr);

                    $processingInformationArr = [
                        'capture' => $capture,
                        "authorizationOptions" => $processingInformationAuthorizationOptions
                    ];
                    $processingInformation = new Ptsv2paymentsProcessingInformation($processingInformationArr);

                    $paymentInformationCardArr = [
                        'number' => $validated['number'],
                        'expirationMonth' => $validated['expiration_month'],
                        'expirationYear' => $validated['expiration_year'],
                        'securityCode' => $validated['security_code'],
                    ];
                    $paymentInformationCard = new Ptsv2paymentsPaymentInformationCard($paymentInformationCardArr);

                    $paymentInformationArr = [
                        'card' => $paymentInformationCard,
                    ];
                    $paymentInformation = new Ptsv2paymentsPaymentInformation($paymentInformationArr);

                    $charge_cat = TransactionCategory::where('category', 'card to wallet')->first();
                    $charged_amount = $validated['total_amount'] + ($charge_cat->charge * $validated['total_amount']);

                    $orderInformationAmountDetailsArr = [
                        'totalAmount' => $charged_amount,
                        'currency' => 'USD',
                    ];
                    $orderInformationAmountDetails = new Ptsv2paymentsOrderInformationAmountDetails($orderInformationAmountDetailsArr);

                    $orderInformationBillToArr = [
                        "firstName" => $validated['first_name'],
                        "lastName" => $validated['last_name'],
                        // "address2" => "Address 2",
                        "address1" => $validated['address1'],
                        "postalCode" => $validated['postal_code'],
                        "locality" => $validated['locality'],
                        "administrative_area" => $validated['administrative_area'],
                        "country" => $validated['country'],
                        "email" => $validated['email'],
                    ];
                    $address2 ? array_push($orderInformationBillToArr, (object) ["address2" => $address2]) : "";
                    $orderInformationBillTo = new Ptsv2paymentsOrderInformationBillTo($orderInformationBillToArr);
                    $orderInformationArr = [
                        'amountDetails' => $orderInformationAmountDetails,
                        'billTo' => $orderInformationBillTo,
                    ];
                    $orderInformation = new Ptsv2paymentsOrderInformation($orderInformationArr);

                    $requestObjArr = [
                        'clientReferenceInformation' => $clientReferenceInformation,
                        'processingInformation' => $processingInformation,
                        'paymentInformation' => $paymentInformation,
                        'orderInformation' => $orderInformation,
                    ];
                    $requestObj = new CreatePaymentRequest($requestObjArr);

                    $commonElement = new ExternalConfiguration();
                    $config = $commonElement->ConnectionHost();
                    $merchantConfig = $commonElement->merchantConfigObject();

                    $api_client = new ApiClient($config, $merchantConfig);
                    $api_instance = new PaymentsApi($api_client);
                } catch (Exception $exception) {
                    return $this->sendError($exception->getMessage());
                }
                try {
                    $apiResponse = $api_instance->createPayment($requestObj);
                    // update the wallet
                    $result = new CybersourceResource($apiResponse[0]);
                    if ($result['status'] === 'AUTHORIZED') {
                        $new_trans = Transaction::updateOrCreate([
                            'user_id' => $user->id,
                            'amount' =>  $validated['total_amount'],
                            'status' => $result['status'],
                            'transaction_id' => bcrypt($result['processorInformation']['transactionId']),
                            'reconciliation_id' => bcrypt($result['reconciliationId']),
                            'transaction_cat_id' => 1,
                        ]);
                        $new_trans->save();

                        

                        // to be removed.
                        // if (Wallet::find($user->id) === null) {

                        //     $user_wallet = Wallet::create([
                        //         'user_id' => $user->id,
                        //         'transaction_id' => $new_trans->id,
                        //         'balance' => $charged_amount,
                        //     ]);
                        // } else {

                        $user_wallet = Wallet::find($user->id);
                        $user_wallet->user_id = $user->id;
                        $user_wallet->balance = $user_wallet->balance + $charged_amount;
                        $user_wallet->save();
                        // }

                        return $this->sendResponse(['Your wallet was updated to $' . $user_wallet->balance,"charge ".($charge_cat->charge * $validated['total_amount'])], 'Successfully.');
                    } else {
                        return $this->sendResponse($result, 'Failed');
                    }

                } catch (ApiException $e) {
                    return $this->sendError($e->getMessage(), $e->getResponseBody());
                }
            }
        }
    }

    private function validate_card($number)
    {
        global $type;

        $cardtype = array(
            'visa' => "/^4[0-9]{12}(?:[0-9]{3})?$/",
            'mastercard' => "/^5[1-5][0-9]{14}$/",
            'amex' => "/^3[47][0-9]{13}$/",
            'discover' => "/^6(?:011|5[0-9]{2})[0-9]{12}$/",
        );

        if (preg_match($cardtype['visa'], $number)) {
            $type = 'visa';
            return 'visa';

        } else if (preg_match($cardtype['mastercard'], $number)) {
            $type = 'mastercard';
            return 'mastercard';
        } else if (preg_match($cardtype['amex'], $number)) {
            $type = 'amex';
            return 'amex';

        } else if (preg_match($cardtype['discover'], $number)) {
            $type = 'discover';
            return 'discover';
        } else {
            return false;
        }

    }

}
