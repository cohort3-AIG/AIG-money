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

class CybersourceController extends BaseController {
    function cybersource_api( Request $request ) {

        try {
            $validated = $this->validate( $request, [
              
                
            ] );
        } catch ( ValidationException $validationException ) {
            return $this->sendError( $validationException->getMessage(), $validationException->errors() );
        }
        try {
            if ( isset( $flag ) && $flag == 'true' ) {
                $capture = true;
            } else {
                $capture = false;
            }

            $clientReferenceInformationArr = [
                'code' => 'TC50171_3'
            ];
            $clientReferenceInformation = new Ptsv2paymentsClientReferenceInformation( $clientReferenceInformationArr );

            $processingInformationArr = [
                'capture' => $capture
            ];
            $processingInformation = new Ptsv2paymentsProcessingInformation( $processingInformationArr );

            $paymentInformationCardArr = [
                'number' => '4111111111111111',
                'expirationMonth' => '12',
                'expirationYear' => '2031'
            ];
            $paymentInformationCard = new Ptsv2paymentsPaymentInformationCard( $paymentInformationCardArr );

            $paymentInformationArr = [
                'card' => $paymentInformationCard
            ];
            $paymentInformation = new Ptsv2paymentsPaymentInformation( $paymentInformationArr );

            $orderInformationAmountDetailsArr = [
                'totalAmount' => '102.21',
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
                'email' => 'test@cybs.com',
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

            return $this->sendResponse( new CybersourceResource( $apiResponse[0] ), 'Successfully.' );
        } catch ( ApiException $e ) {
            return $this->sendError( $e->getMessage(), $e->getResponseBody() );
        }
        //  return $request;

    }
}
