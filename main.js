const { app, BrowserWindow, Menu } = require('electron');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
        icon: 'src/img/icon.png' // Substitua pelo caminho do seu ícone
    });

    win.loadFile('src/index.html');

    // Menu personalizado
    const menu = Menu.buildFromTemplate([
        {
            label: 'Arquivo',
            submenu: [
                { label: 'Sair', role: 'quit' }
            ]
        },
        {
            label: 'Visualizar',
            submenu: [
                { label: 'Recarregar', role: 'reload' },
                { label: 'Ferramentas de Desenvolvedor', role: 'toggleDevTools' }
            ]
        },
        {
            label: 'Ajuda',
            submenu: [
                { label: 'Sobre', click() { /* Mostrar uma janela ou diálogo sobre o aplicativo */ } }
            ]
        }
    ]);
    Menu.setApplicationMenu(menu);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
