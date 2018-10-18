
#instalacion

1. En el frontend ejecutar el comando <br>
	npm install<br>
	yarn install .

2.En el  backend ejecutar los comando <br>
	composer install<br>
    php artisan key:generate<br>
    php artisan migrate --seed<br>
    php artisan passport:install<br>
3.despues de ejecutar passport:install arroja dos key<br>
	hay que tomar la segunda key y ponerla en frontend/enviroments/environment.ts y frontend/enviroments/environment.prod.ts <br>
	despues en el backend url ex: http://localhost:8000	<br>
    <br>
4.En fronetend ejecutar ng serve in en el backend run php artisan serve 
    
