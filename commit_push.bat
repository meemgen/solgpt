@echo off

:: Check if there are any changes to commit
git diff-index --quiet HEAD --
if %ERRORLEVEL% equ 0 (
    echo No changes to commit. Exiting.
    exit /b 0
)

:: Stage all changes
echo Staging all changes...
git add .

:: Generate a generic commit message with the current date and time
for /f "tokens=*" %%i in ('powershell -Command "Get-Date -Format \"yyyy-MM-dd HH:mm:ss\""') do set COMMIT_MESSAGE=Auto-commit on %%i

:: Commit the changes
echo Committing changes...
git commit -m "%COMMIT_MESSAGE%"

:: Push to the current branch
echo Pushing changes to remote repository...
git push

echo Done!
