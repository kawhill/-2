@echo off
echo ================================
echo   重新构建项目
echo ================================
echo.

cd /d "%~dp0"

echo 正在构建项目...
call npm run build

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ================================
    echo   构建成功！
    echo ================================
    echo.
    echo 接下来的步骤：
    echo 1. 访问 https://app.netlify.com
    echo 2. 登录并找到您的项目
    echo 3. 点击 "Deploys" 标签
    echo 4. 拖拽 dist 文件夹到页面上
    echo.
    echo 正在打开 dist 文件夹...
    explorer dist
    echo.
) else (
    echo.
    echo ================================
    echo   构建失败！
    echo ================================
    echo 请检查错误信息
    echo.
)

pause

