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
        Schema::table('delivery_persons', function (Blueprint $table) {
            $table->string('address')->after('user_id')->nullable();
            $table->string('gender')->after('address');
            $table->string('age')->after('gender');
            $table->string('vehicle')->after('age');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('delivery_personnel', function (Blueprint $table) {
            $table->dropColumn('address');
            $table->dropColumn('gender');
            $table->dropColumn('age');
            $table->dropColumn('vehicle');
        });
    }
};
