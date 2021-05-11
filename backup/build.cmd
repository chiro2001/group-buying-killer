@echo off

echo 开始构建

cd frontend
node scripts/build.js
echo 前端构建完成。

rd /s /Q ..\backend\public
md ..\backend\public
xcopy /E build\* ..\backend\public\ >nul
cd ..

cd backend
pyinstaller server.spec --clean --noconfirm
echo 后端打包完成。

rd /s /Q ..\install\dist
md ..\install\dist
xcopy /E dist\server\* ..\install\dist\ >nul

cd ..\install
@REM cd install
python build.py

.\NSIS\makensis.exe /V4 /P4 build_target.nsi
cd ..

echo 构建完成。
pause
