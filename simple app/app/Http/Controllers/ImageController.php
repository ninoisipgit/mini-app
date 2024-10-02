<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Image;
use Illuminate\Support\Facades\Storage; // Import the Storage facade
class ImageController extends Controller
{
    public function store(Request $request)
    {
        // Validate the file
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'prcID' => 'required|string',
        ]);

         // Handle file upload
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '-' . $file->getClientOriginalName();
            $filePath = $file->storeAs('prc_images', $filename, 'public'); // Save in the public/prc_images folder

            // Check if an image with the given prcID already exists
            $image = Image::where('prcID', $request->prcID)->first();

            if ($image) {
                // Delete the old image file if exists
                if (Storage::exists('public/prc_images/' . $image->image)) {
                    Storage::delete('public/prc_images/' . $image->image);
                }
                // Update the existing record
                $image->image = $filename; // Update filename
                $image->path = '/storage/' . $filePath; // Update file path
            } else {
                // Create a new record if no image exists for this prcID
                $image = new Image();
                $image->prcID = $request->prcID;
                $image->image = $filename; // Store filename
                $image->path = '/storage/' . $filePath; // Store file path as public URL
            }

            // Save the record
            $image->save();

            // Return JSON response with image path
            return response()->json([
                'success' => true,
                'imagePath' => asset('storage/' . $filePath), // Publicly accessible path
                'message' => 'Image uploaded successfully.',
            ]);
        }

        // Return JSON response in case of failure
        return response()->json([
            'success' => false,
            'message' => 'Image upload failed.',
        ], 400);
    }


    public function getImageByPrcID($prcID)
    {
        // Find the image record based on the prcID
        $image = Image::where('prcID', $prcID)->first();

        if ($image) {
            // Return the image path
            return response()->json([
                'success' => true,
                'imagePath' => asset('storage/prc_images/' . $image->image),
            ]);
        } else {
            // If no image is found, return no content
            return response()->json(null, 204); // HTTP 204 No Content
        }
    }
}
