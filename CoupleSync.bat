@echo off
title CoupleSync

:: Check if 'node_modules' directory exists to determine if dependencies are installed
if not exist "node_modules" (
    echo Dependencies not found. Installing...
    npm install
)

:: Start the program using PowerShell with the specified command
powershell -ExecutionPolicy Bypass -Command "npx ts-node ./src/app.ts"

pause
