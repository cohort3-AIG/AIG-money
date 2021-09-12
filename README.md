The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

# AIG-money  
* (The ED Web App)

### Seeding guide

You can generate sample data in each of the following respective tables like so...

#### User model forexample has got a seeder class UserSeeder and the seed artisan command would be

* php artisan db:seed --class=UserSeeder
* php artisan db:seed --class=AgentSeeder
* ...

You could also run 'php artisan db:seed' but it'd be prone to longer to trace Exceptions as the Seeder class utiles the Faker class that has got lots of randomIntegers meaning that on fields where there's a unique identifier, the same random int could raise very irritating errors.

##### NB: SINCE THIS IS ALL DUMMY DATA, DON'T WORRY ABOUT EXCEPTIONS ABOUT DUPLICATE ENTRIES.
IGNORE THEM AND SEED OTHER TABLES.

##### THE ROW THAT RAISES AN ERROR WILL NOT BE ENTERED BUT WHEN YOU CHECK IN THE TABLE, YOU WILL BE ABLE TO SEE SOME DATA THERE.

But as you run all of the above, it's important to call them in order as is declared in the 'DatabaseSeeder' class



### Full list of artisan commands for the seeder classes is as below...

* php artisan db:seed --class=UserSeeder
* php artisan db:seed --class=AgentSeeder
* php artisan db:seed --class=BeneficiarySeeder
* php artisan db:seed --class=CountrySeed
* php artisan db:seed --class=CurrencySeeder
* php artisan db:seed --class=ForeignExchangeSeeder
* php artisan db:seed --class=LogSeeder
* php artisan db:seed --class=PaymentTypeSeeder
* php artisan db:seed --class=TransactionCategorySeeder
* php artisan db:seed --class=TransactionTypeSeeder
* php artisan db:seed --class=TransactionChargeSeeder
* php artisan db:seed --class=TransactionSeeder
* php artisan db:seed --class=TransferSeeder
* php artisan db:seed --class=WalletSeeder




#
#