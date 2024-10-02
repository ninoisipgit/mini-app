<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

abstract class Controller
{
    /**
     * Success response method.
     *
     * @param mixed $data
     * @param string $message
     * @param int $code
     * @return \Illuminate\Http\JsonResponse
     */
    protected $baseUrl;
    public function __construct()
    {
        $this->setBaseUrl();
    }

    // Method to set the base URL based on the environment
    protected function setBaseUrl()
    {
        $this->baseUrl = url('/storage/');
        if (app()->environment('production')) {
            $this->baseUrl = url('/public/storage/');
        }
    }

    public function sendSuccess($data, string $message = 'Success', int $code = 200): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data,
        ], $code);
    }

    /**
     * Error response method.
     *
     * @param string $message
     * @param array $errors
     * @param int $code
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendError(string $message, $errors = null, int $code = 400): JsonResponse
    {
        // Check if errors is an array
        if (is_array($errors)) {
            // Flatten the array if it's multidimensional
            $flattenedErrors = array_merge(...array_values($errors));
        } else {
            // If not an array, treat it as a single error message
            $flattenedErrors = $errors ? [$errors] : [];
        }

        return response()->json([
            'success' => false,
            'message' => $message,
            'errors' => $flattenedErrors,
        ], $code);
    }
}
