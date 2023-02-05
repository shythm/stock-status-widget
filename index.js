const ejs = require('ejs');
const fs = require('fs');

const status = JSON.parse(fs.readFileSync('./data/status.json', 'utf8'));
const stocks = JSON.parse(fs.readFileSync('./data/stocks.json', 'utf8'));

const widgetTemplate = ejs.compile(fs.readFileSync('./src/widget.ejs').toString());

if (fs.existsSync('./build') == false) {
    fs.mkdirSync('./build');
}

if (fs.existsSync('./build/stocks') == false) {
    fs.mkdirSync('./build/stocks');
}

stocks.forEach(stock => {
    fs.writeFileSync(`./build/stocks/${stock.id}.html`, widgetTemplate({ status, stock }));
});

const indexTemplate = ejs.compile(fs.readFileSync('./src/index.ejs').toString());

fs.writeFileSync(`./build/index.html`, indexTemplate({ stocks }));