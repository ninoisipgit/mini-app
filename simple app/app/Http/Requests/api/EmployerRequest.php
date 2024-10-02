<?php

namespace App\Http\Requests\api;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Http\FormRequest;

class EmployerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'userId' => 'required',
            'companyName' => 'required|string|max:255',
            'companyType' => 'required|string|max:255',
            'same_as' => 'nullable|url', //URL of the employer's website
            'logo' => 'nullable|url', // URL of the employer's logo
            'industry' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'mission' => 'nullable|string',
            'vision' => 'nullable|string',
            'addressID' => 'nullable|integer',
        ];
    }
    // Optional: Customize the response for failed validation
    public function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        $errors = $validator->errors()->toArray();
        // Check if errors is an array
        if (is_array($errors)) {
            // Flatten the array if it's multidimensional
            $flattenedErrors = array_merge(...array_values($errors));
        } else {
            // If not an array, treat it as a single error message
            $flattenedErrors = $errors ? [$errors] : [];
        }
        $code = 422;
        return response()->json([
            'success' => false,
            'message' => 'Validation Failed',
            'errors' => $flattenedErrors,
        ], $code);
        throw new \Illuminate\Validation\ValidationException($validator, $response);
    }
}
