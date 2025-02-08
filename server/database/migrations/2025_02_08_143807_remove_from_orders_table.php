<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {

            $table->string('full_name')->after('id');
            $table->string('additional_info')->nullable()->after('full_name');
            $table->string('street')->after('additional_info');
            $table->string('city')->after('street');
            $table->string('phone')->after('city');
            $table->string('status')->default('Pending')->after('city');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn('street');
            $table->dropColumn('city');
            $table->dropColumn('full_name');
            $table->dropColumn('additional_info');
            $table->dropColumn('phone');
            $table->dropColumn('status');

        });
    }
};
