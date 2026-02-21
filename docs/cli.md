Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess -Force
netstat -ano | findstr :3000
taskkill /PID 23144 /F
setup alias add hello@monynha.com marcelo@monynha.com