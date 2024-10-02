<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Exceptions\HttpResponseException;

class BaseRequest extends FormRequest
{
    /**
     * Handle a failed validation attempt.
     *
     * @param  \Illuminate\Contracts\Validation\Validator  $validator
     * @return void
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    protected function failedValidation(Validator $validator)
    {
        $errors = $validator->errors()->toArray();

        // Flatten the errors array
        if (is_array($errors)) {
            $flattenedErrors = array_merge(...array_values($errors));
        } else {
            $flattenedErrors = $errors ? [$errors] : [];
        }

        $response = response()->json([
            'success' => false,
            'message' => 'Validation Failed',
            'errors' => $flattenedErrors,
        ], 422);

        throw new HttpResponseException($response);
    }
}