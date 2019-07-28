import cookieParser from 'cookie-parser';
import cors from 'cors';
import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';
import authRoutes from './routes/auth-routes';
import userRoutes from './routes/user-routes';
import auth from './auth';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors());

//Routes
app.use('/', authRoutes);
app.use('/users', userRoutes);

// catch 404 and forward to error handler
app.use(function (request, response, next) {
    next(createError(404));
});

// error handler
app.use(function (err, request, response, next) {
    // set locals, only providing error in development
    response.locals.message = err.message;
    response.locals.error = request.app.get('env') === 'development' ? err : {};

    // render the error page
    response.status(err.status || 500);
    response.json({'error': err});
});

module.exports = app;
