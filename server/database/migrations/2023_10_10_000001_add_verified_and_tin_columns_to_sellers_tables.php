<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddVerifiedAndTinColumnsToSellersTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('company_sellers', function (Blueprint $table) {
            $table->boolean('is_verified')->default(false)->after('description');
            $table->string('tin')->nullable()->after('is_verified');
        });

        Schema::table('individual_sellers', function (Blueprint $table) {
            $table->boolean('is_verified')->default(false)->after('address');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('company_sellers', function (Blueprint $table) {
            $table->dropColumn('is_verified');
            $table->dropColumn('tin');
        });

        Schema::table('individual_sellers', function (Blueprint $table) {
            $table->dropColumn('is_verified');
        });
    }
}
