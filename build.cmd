@echo off

echo ��ʼ����

cd frontend
node scripts/build.js
echo ǰ�˹�����ɡ�

rd /s /Q ..\backend\public
md ..\backend\public
xcopy /E build\* ..\backend\public\ >nul
cd ..

cd backend
pyinstaller server.spec --clean --noconfirm
rd /s /Q ..\install\dist
md ..\install\dist
xcopy /E dist\server\* ..\install\dist\ >nul

cd ..\install
@REM cd install
python build.py

D:\Tools\NSIS\makensis.exe /V4 /P4 build_target.nsi
cd ..

echo ������ɡ�
pause
