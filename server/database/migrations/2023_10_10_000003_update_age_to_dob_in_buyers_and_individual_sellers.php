<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class UpdateAgeToDobInBuyersAndIndividualSellers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('buyers', function (Blueprint $table) {
            // $table->dropColumn('age');
            // $table->date('dob')->nullable()->after('address');
        });

        Schema::table('individual_sellers', function (Blueprint $table) {
            $table->dropColumn('age');
            $table->date('dob')->nullable()->after('address');
        });

        // Update existing records with a valid date
        DB::table('buyers')->update(['dob' => '2000-01-01']);
        DB::table('individual_sellers')->update(['dob' => '2000-01-01']);

        // Make the dob column non-nullable
        Schema::table('buyers', function (Blueprint $table) {
            $table->date('dob')->nullable(false)->change();
        });

        Schema::table('individual_sellers', function (Blueprint $table) {
            $table->date('dob')->nullable(false)->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('buyers', function (Blueprint $table) {
            $table->integer('age')->after('address');
            $table->dropColumn('dob');
        });

        Schema::table('individual_sellers', function (Blueprint $table) {
            $table->integer('age')->after('address');
            $table->dropColumn('dob');
        });
    }
}
