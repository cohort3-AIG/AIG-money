<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

class BaseController extends Controller
{
    /**
     * success response method.
     *
     * @return \Illuminate\Http\Response
     */
    public function sendResponse($result = [], $message, $code = 200)
    {
        $response = [
            // 'success' => true,
            'message' => $message,
            'data' => $result,
            
        ];

        return response()->json($response, $code);
    }

    /**
     * return error response.
     *
     * @return \Illuminate\Http\Response
     */
    public function sendError($error, $errorMessages = [], $code =400)
    {
        $response = [
            // 'success' => false,
            'message' => $error,
            'errors' => [],
            
        ];

        if (!empty($errorMessages)) {
            $response['errors'] = $errorMessages;
        }

        return response()->json($response, $code);
    }

    /**
     * Upload file.
     *
     * @param mixed $file
     * @param string $storePath
     * @return bool
     */
    public function fileStore($file, $storePath)
    {
        return $file->store($storePath, 'public');
    }

    /**
     * Destroy file.
     *
     * @param string $filePath
     * @return bool
     */
    public function fileDestroy($filePath)
    {
        return unlink($filePath);
    }
}
