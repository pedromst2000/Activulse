:: Check for Node.js
node -v >nul 2>&1
if errorlevel 1 (
    echo "Node.js is not installed or not in the path. Please install Node.js version 18.16.0 or above."
    exit /b 1
)

:: Check Node.js version
for /f "tokens=3" %%a in ('node -v') do (
    set NODE_VERSION=%%a
)

if %NODE_VERSION% LSS 18.16.0 (
    echo "Node.js version is too old. Please install Node.js version 18.16.0 or above."
    exit /b 1
)

:: Check for npm
npm -v >nul 2>&1
if errorlevel 1 (
    echo "npm is not installed or not in the path. Please install npm."
    exit /b 1
)

:: Check for Docker
docker -v >nul 2>&1
if errorlevel 1 (
    echo "Docker is not installed or not in the path. Please install Docker or Docker Desktop."
    exit /b 1
)

:: Go to /packages/api and execute "npm run db"
echo "Setting up the database..."
cd packages/api
npm run db
if errorlevel 1 (
		echo "Failed to start the database."
		exit /b 1
)

:: Install the api dependencies
echo "Installing the API dependencies..."
npm install
if errorlevel 1 (
    echo "Failed to install the API dependencies."
    exit /b 1
)

:: Go back to the root folder
cd ../..


:: Go to /packages/web and execute "npm install"
echo "Installing the WEB dependencies..."
cd packages/web
npm install
if errorlevel 1 (
		echo "Failed to install the WEB dependencies."
		exit /b 1
)

:: Go back to the root folder
cd ../..

:: Go to /packages/app and execute "npm install"
echo "Installing the APP dependencies..."
cd packages/app
npm install
if errorlevel 1 (
    echo "Failed to install the APP dependencies."
    exit /b 1
)

echo "Project setup completed. Create the .env files on each package sub-folder and fill using the .env.example files."