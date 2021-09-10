<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
require_once __DIR__ . DIRECTORY_SEPARATOR . '../../../../vendor/autoload.php';
require_once __DIR__ . DIRECTORY_SEPARATOR . '../../../Helpers/ExternalConfiguration.php';
use CyberSource\Model\Ptsv2paymentsClientReferenceInformation;
use CyberSource\Model\Ptsv2paymentsProcessingInformation;
use CyberSource\Model\Ptsv2paymentsPaymentInformationCard;
use CyberSource\Model\Ptsv2paymentsPaymentInformation;
use CyberSource\Model\Ptsv2paymentsOrderInformationAmountDetails;
use CyberSource\Model\Ptsv2paymentsOrderInformationBillTo;
use CyberSource\Model\Ptsv2paymentsOrderInformation;
use CyberSource\Model\CreatePaymentRequest;
use CyberSource\ExternalConfiguration;
use CyberSource\ApiClient;
use CyberSource\Api\PaymentsApi;
use Cybersource\ApiException;
use App\Http\Resources\Cybersource as CybersourceResource;
use App\Http\Controllers\Api\BaseController;
use App\Models\Wallet;
use App\Models\Transaction;
use Illuminate\Support\Facades\Hash;

class CybersourceController extends BaseController {

    function cybersource_api( Request $request ) {

        $user = $request->user();
        $error_message = array();

        try {
            $validated = $this->validate( $request, [
                'number' => ['required', 'int'],
                'expiration_month' => ['required', 'numeric'],
                'expiration_year' => ['required', 'int'],
                'total_amount' => ['required', 'numeric'],
                'currency' => ['required', 'string'],
                'security_code'=>['required', 'numeric']
            ] );

        } catch ( ValidationException $validationException ) {
            return $this->sendError( $validationException->getMessage(), $validationException->errors() );
        }
        // validate the entered  card details.
        if ( $this->validate_card( $validated['number'] ) === false ) {
            array_push( $error_message, ['number'=>'The entered card number is not valid'] );
        }
        if ( !is_numeric( $validated['expiration_month'] ) || $validated['expiration_month'] < 1 || $validated['expiration_month'] > 12 ) {

            array_push( $error_message, ['expiration_month'=>'Invalid expiry month of '.$validated['expiration_month'].' submitted'] ) ;
        }

        // Get the current year

        $currentYear = date( 'Y' );

        settype( $currentYear, 'integer' );

        if ( !is_numeric( $validated['expiration_year'] ) || $validated['expiration_year'] < $currentYear || $validated['expiration_year'] > $currentYear + 10 ) {
            array_push( $error_message, ['expiration_year'=>'Invalid expiry year of '. $validated['expiration_year'].' submitted'] ) ;
        }

        if ( !empty( $error_message ) ) {
            return $this->sendError( 'Invalid card details', $error_message );
        }
        try {
            // if ( isset( $flag ) && $flag == 'true' ) {
            $capture = true;
            // } else {
            //     $capture = false;
            // }

            $clientReferenceInformationArr = [
                'code' => 'TC50171_3'
            ];
            $clientReferenceInformation = new Ptsv2paymentsClientReferenceInformation( $clientReferenceInformationArr );

            $processingInformationArr = [
                'capture' => $capture
            ];
            $processingInformation = new Ptsv2paymentsProcessingInformation( $processingInformationArr );

            $paymentInformationCardArr = [
                'number' => $validated['number'],
                'expirationMonth' => $validated['expiration_month'],
                'expirationYear' => $validated['expiration_year'],
                'securityCode' => $validated['security_code']
            ];
            $paymentInformationCard = new Ptsv2paymentsPaymentInformationCard( $paymentInformationCardArr );

            $paymentInformationArr = [
                'card' => $paymentInformationCard
            ];
            $paymentInformation = new Ptsv2paymentsPaymentInformation( $paymentInformationArr );

            $orderInformationAmountDetailsArr = [
                'totalAmount' => $validated['total_amount'],
                'currency' => 'USD'
            ];
            $orderInformationAmountDetails = new Ptsv2paymentsOrderInformationAmountDetails( $orderInformationAmountDetailsArr );

            $orderInformationBillToArr = [
                'firstName' => 'John',
                'lastName' => 'Doe',
                'address1' => '1 Market St',
                'locality' => 'san francisco',
                'administrativeArea' => 'CA',
                'postalCode' => '94105',
                'country' => 'US',
                'email' => 'lwangaaksam@gmail.com',
                'phoneNumber' => '4158880000'
            ];
            $orderInformationBillTo = new Ptsv2paymentsOrderInformationBillTo( $orderInformationBillToArr );
            $orderInformationArr = [
                'amountDetails' => $orderInformationAmountDetails,
                'billTo' => $orderInformationBillTo
            ];
            $orderInformation = new Ptsv2paymentsOrderInformation( $orderInformationArr );

            $requestObjArr = [
                'clientReferenceInformation' => $clientReferenceInformation,
                'processingInformation' => $processingInformation,
                'paymentInformation' => $paymentInformation,
                'orderInformation' => $orderInformation
            ];
            $requestObj = new CreatePaymentRequest( $requestObjArr );

            $commonElement = new ExternalConfiguration();
            $config = $commonElement->ConnectionHost();
            $merchantConfig = $commonElement->merchantConfigObject();

            $api_client = new ApiClient( $config, $merchantConfig );
            $api_instance = new PaymentsApi( $api_client );
        } catch ( Exception $exception ) {
            return $this->sendError( $exception->getMessage() );
        }
        try {
            $apiResponse = $api_instance->createPayment( $requestObj );
            // update the wallet
            $result = new CybersourceResource( $apiResponse[0] );
            if ( $result['status'] === 'AUTHORIZED' ) {
                $new_trans = Transaction::updateOrCreate( [
                    'user_id'=>$user->id,
                    'authorizedAmount'=>$result['orderInformation']['amountDetails']['authorizedAmount'],
                    'status'=>$result['status'],
                    'transactionId'=>bcrypt( $result['processorInformation']['transactionId'] ),
                    'reconciliationId'=>bcrypt( $result['reconciliationId'] ),
                ] );
                $new_trans->save();
                $charged_amount = $result['orderInformation']['amountDetails']['authorizedAmount']-( 0.05*( $result['orderInformation']['amountDetails']['authorizedAmount'] ) );
                if ( Wallet::find( $user->id ) === null ) {

                    $user_wallet =  Wallet::create( [
                        'user_id' => $user->id,
                        'transaction_id' => $new_trans->id,
                        'balance' => $charged_amount
                    ] );
                } else {

                    $user_wallet =  Wallet::find( $user->id );
                    $user_wallet->user_id = $user->id ;
                    $user_wallet->transaction_id = $new_trans->id;
                    $user_wallet->balance = $user_wallet->balance + $charged_amount;
                    $user_wallet->save();
                }

                return $this->sendResponse( ['Your wallet was updated to '.$user_wallet->balance ], 'Successfully.' );
            }

        } catch ( ApiException $e ) {
            return $this->sendError( $e->getMessage(), $e->getResponseBody() );
        }

    }

    private function validate_card( $number ) {
        global $type;

        $cardtype = array(
            'visa'       => "/^4[0-9]{12}(?:[0-9]{3})?$/",
            'mastercard' => "/^5[1-5][0-9]{14}$/",
            'amex'       => "/^3[47][0-9]{13}$/",
            'discover'   => "/^6(?:011|5[0-9]{2})[0-9]{12}$/",
        );

        if ( preg_match( $cardtype['visa'], $number ) ) {
            $type = 'visa';
            return 'visa';

        } else if ( preg_match( $cardtype['mastercard'], $number ) ) {
            $type = 'mastercard';
            return 'mastercard';
        } else if ( preg_match( $cardtype['amex'], $number ) ) {
            $type = 'amex';
            return 'amex';

        } else if ( preg_match( $cardtype['discover'], $number ) ) {
            $type = 'discover';
            return 'discover';
        } else {
            return false;
        }

    }

}
