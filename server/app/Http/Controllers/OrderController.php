<?php

namespace App\Http\Controllers;

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
    public function deliveryStats(string $id){
        try {
            $delivered = Order::where('delivery_person_id', $id)->where('status', 'delivered')->count();
            $pending = Order::where('delivery_person_id', $id)->where('status', 'pending')->count();
            $cancelled = Order::where('delivery_person_id', $id)->where('status', 'cancelled')->count();
            return response()->json(['delivered' => $delivered, 'pending' => $pending, 'cancelled' => $cancelled], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error fetching delivery stats', 'error' => $e->getMessage()], 500);
        }

    }
    public function changeStatus(string $id, Request $request){
        try {
            $order = Order::find($id);
            if (!$order) {
                return response()->json(['message' => 'Order not found'], 404);
            }
            $order->update([
                'status' => $request->status,
            ]);
            return response()->json(['message' => 'Order status updated successfully', 'order' => $order], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error updating order status', 'error' => $e->getMessage()], 500);
        }
    }
    public function myOrders(string $id)
    {
        try {
            $orders = Order::where('buyer_id', $id)->with(['user', 'listing', 'deliveryPersonnel'])->get();
            return response()->json($orders, 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error fetching orders', 'error' => $e->getMessage()], 500);
        }
    }
    public function Deliveries(string $id)
    {
        try {
            $orders = Order::where('delivery_person_id', $id)->with(['user', 'listing', 'deliveryPersonnel'])->get();
            return response()->json($orders, 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error fetching orders', 'error' => $e->getMessage()], 500);
        }
    }

    public function index()
    {
        try {
            $orders = Order::with(['user', 'listing', 'deliveryPersonnel'])->get();
            return response()->json($orders, 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error fetching orders', 'error' => $e->getMessage()], 500);
        }
    }


    public function store(Request $request)
    {
        try {

            $validator = Validator::make($request->all(), [
                'buyer_id' => 'required|exists:users,id',
                'listing_id' => 'required|exists:listings,id',
                'delivery_person_id' => 'required|exists:users,id',
                'full_name' => 'required|string',
                'additional_info' => 'nullable|string',
                'street' => 'required|string',
                'city' => 'required|string',
                'phone' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors(), 400);
            }


            $order = Order::create([

                'buyer_id' => $request->buyer_id,
                'listing_id' => $request->listing_id,
                'delivery_person_id' => $request->delivery_person_id,
                'full_name' => $request->full_name,
                'additional_info' => $request->additional_info,
                'street' => $request->street,
                'city' => $request->city,
                'phone' => $request->phone,
            ]);

            return response()->json(['message' => 'Order created successfully', 'order' => $order], 201);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error creating order', 'error' => $e->getMessage()], 500);
        }
    }


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


    public function update(Request $request, $id)
    {
        try {

            $validator = Validator::make($request->all(), [

                'buyer_id' => 'required|exists:users,id',
                'listing_id' => 'required|exists:listings,id',
                'delivery_person_id' => 'required|exists:delivery_personnel,id',
                'full_name' => 'required|string',
                'additional_info' => 'nullable|string',
                'street' => 'required|string',
                'city' => 'required|string',
                'phone' => 'required|string',
                'status' => 'nullable|string',
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors(), 400);
            }


            $order = Order::find($id);

            if (!$order) {
                return response()->json(['message' => 'Order not found'], 404);
            }

            $order->update([

                'buyer_id' => $request->buyer_id,
                'listing_id' => $request->listing_id,
                'delivery_person_id' => $request->delivery_person_id,
                'full_name' => $request->full_name,
                'additional_info' => $request->additional_info,
                'street' => $request->street,
                'city' => $request->city,
                'phone' => $request->phone,
                'status' => $request->status,
            ]);
            return response()->json(['message' => 'Order updated successfully', 'order' => $order], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error updating order', 'error' => $e->getMessage()], 500);
        }
    }


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
