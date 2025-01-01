<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Listing;
use App\Models\User;
use App\Models\DeliveryPerson;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Exception;

class OrderController extends Controller
{
    // Fetch all orders
    public function index()
    {
        try {
            $orders = Order::with(['user', 'listing', 'deliveryPersonnel'])->get();
            return response()->json($orders, 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error fetching orders', 'error' => $e->getMessage()], 500);
        }
    }

    // Create a new order
    public function store(Request $request)
    {
        try {
            // Validate input
            $validator = Validator::make($request->all(), [
                'order_number' => 'required|unique:orders',
                'quantity' => 'required|integer|min:1',
                'buyer_id' => 'required|exists:users,id',
                'listing_id' => 'required|exists:listings,id',
                'delivery_person_id' => 'required|exists:delivery_personnel,id',
                'delivery_date' => 'required|date',
                'status' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors(), 400);
            }

            // Create the order
            $order = Order::create([
                'order_number' => $request->order_number,
                'quantity' => $request->quantity,
                'buyer_id' => $request->buyer_id,
                'listing_id' => $request->listing_id,
                'delivery_person_id' => $request->delivery_person_id,
                'delivery_date' => $request->delivery_date,
                'status' => $request->status,
            ]);

            return response()->json(['message' => 'Order created successfully', 'order' => $order], 201);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error creating order', 'error' => $e->getMessage()], 500);
        }
    }

    // Show a specific order
    public function show($id)
    {
        try {
            $order = Order::with(['user', 'listing', 'deliveryPersonnel'])->find($id);

            if (!$order) {
                return response()->json(['message' => 'Order not found'], 404);
            }

            return response()->json($order, 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error fetching order', 'error' => $e->getMessage()], 500);
        }
    }

    // Update an existing order
    public function update(Request $request, $id)
    {
        try {
            // Validate input
            $validator = Validator::make($request->all(), [
                'order_number' => 'required|unique:orders,order_number,' . $id,
                'quantity' => 'required|integer|min:1',
                'buyer_id' => 'required|exists:users,id',
                'listing_id' => 'required|exists:listings,id',
                'delivery_person_id' => 'required|exists:delivery_personnel,id',
                'delivery_date' => 'required|date',
                'status' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors(), 400);
            }

            // Find and update the order
            $order = Order::find($id);

            if (!$order) {
                return response()->json(['message' => 'Order not found'], 404);
            }

            $order->update([
                'order_number' => $request->order_number,
                'quantity' => $request->quantity,
                'buyer_id' => $request->buyer_id,
                'listing_id' => $request->listing_id,
                'delivery_person_id' => $request->delivery_person_id,
                'delivery_date' => $request->delivery_date,
                'status' => $request->status,
            ]);
            return response()->json(['message' => 'Order updated successfully', 'order' => $order], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error updating order', 'error' => $e->getMessage()], 500);
        }
    }

    // Delete an order
    public function destroy($id)
    {
        try {
            $order = Order::find($id);

            if (!$order) {
                return response()->json(['message' => 'Order not found'], 404);
            }

            $order->delete();
            return response()->json(['message' => 'Order deleted successfully'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error deleting order', 'error' => $e->getMessage()], 500);
        }
    }
}
