@echo off

:: Start XAMPP Apache and MySQL (if needed)
echo Starting XAMPP...
cd /d C:\xampp
start xampp_start.exe

:: Wait for XAMPP to fully start
timeout /t 10

:: Navigate to Laravel project and start the Laravel server
cd /d C:\Users\Nino carlo isip\source\repos\mini-app\simple app
start php artisan serve

:: Navigate to Angular project and start the Angular server
cd /d C:\Users\Nino carlo isip\source\repos\mini-app\simple-app-UI
start ng serve --open

:: Pause to keep the window open
pause
