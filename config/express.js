var express = require('express'),
    load = require('express-load'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    morgan = require('morgan');


module.exports = function() {
    var app = express();
    app.use(morgan('dev'));
    app.use(cors());

    app.set('port', 3000);

    app.use(express.static('./public'));

    app.set('view engine', 'ejs');
    app.set('views', './app/views');


    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(require('method-override')());

    load('models', {
            cwd: 'app'
        })
        .then('controllers')
        .then('routes')
        .into(app);

    return app;
};
