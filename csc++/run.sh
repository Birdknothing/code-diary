mcs 4.cs
csharp 1.cs
csharp -e 'new System.Net.WebClient ().DownloadString ("https://www.nuget.org")'
ikdasm 1.exe > 1.il
cp 4.il ./tmp
cd tmp

sn -k 1.snk
ilasm 1.il /key=1.snk

ikdasm 1.exe | findstr box