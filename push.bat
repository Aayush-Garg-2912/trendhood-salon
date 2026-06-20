@echo off
echo Committing and pushing changes to GitHub...
git add .
git commit -m "Automated production update - %date% %time%"
git push origin master
echo Done! Changes are now live on GitHub.
pause