<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
        $categories = Category::all();
        return response()->json($categories);
        }catch(\Exception $e){
            return response()->json([
                "message" => $e->getMessage()
            ],500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{
        $request->validate(
            [
                'name'=>['required', 'string', 'max:255'],
                'image'=>['required','image', 'mimes:jpeg,png,jpg,gif,svg', 'max:5000'],
            ]
            );
        $imageName = time().'.'.$request->image->extension();
        $request->image->move(public_path('images'), $imageName);

        $category = Category::create([
            'name'=>$request->name,
            'image'=>"images/$imageName",
        ]);
        return response()->json([
            "message" => "Created Successfully",
            "category" => $category
        ]);
        }catch(\Exception $e){
            return response()->json([
                "message" => $e->getMessage()
            ],500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
{
    try {
        $category = Category::findOrFail($id);
        return response()->json($category);
    } catch (\Exception $e) {
        return response()->json([
            "message" => "Category not found"
        ], 404);
    }
}


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try{
            $category = Category::findOrFail($id);

            $imagePath = public_path($category->image);

            if (file_exists($imagePath)) {
                unlink($imagePath);
            }

            $category->delete();
            return response()->json([
                "message" => "Deleted Successfully"
            ]);
        }
        catch(\Exception $e){
            return response()->json([
                "message" => $e->getMessage()
            ],500);
        }
    }
}
