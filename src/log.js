const log4js = require('log4js');

const levels = {
    'trace': log4js.levels.TRACE,
    'debug': log4js.levels.DEBUG,
    'warn': log4js.levels.WARN,
    'error': log4js.levels.ERROR,
    'fatal': log4js.levels.FATAL
}

const Path = process.cwd();
const infoPath = Path+'/log/info/info';
const errorPath = Path+'/log/error/error';
const responsePath =  Path+'/log/response/response';

log4js.configure({
    appenders: {
        console: {type: 'console'},
        info: {
            type: 'file',
            filename: infoPath,
            alwaysIncludePattern:true, 
            pattern: "-yyyy-MM-dd-hh.log"
        },
        error: {
            type: 'file',
            filename: errorPath,
            alwaysIncludePattern:true, 
            pattern: "-yyyy-MM-dd-hh.log"
        }
    },
    categories:{
        default: {
            appenders: ['console'],
            level: 'debug'
        },
        info:{
            appenders: ['info'],
            level: 'info'
        },
        error: {
            appenders: ['error'],
            level: 'error'
        }
    }
});

exports.debug = (content) => {
    let logger = log4js.getLogger('debug');
    logger.level = levels.debug
    logger.debug(content)
}

exports.info = ( ctx, time ) => {
    let logger = log4js.getLogger('info')
    logger.level = levels.info
    logger.info(formatRes(ctx, time))
}

/**
 * 日志输出 level为error
 * @param { string } content
 */
 exports.error = ( content ) => {
    let logger = log4js.getLogger('error')
    logger.level = levels.error
    logger.error(content)
}


///格式化响应日志
var formatRes = function (ctx, resTime) {
    var logText = new String();

    //响应日志开始
    logText += "\n" + "*************** response log start ***************" + "\n";

    //添加请求日志
    logText += formatReqLog(ctx.request, resTime);

    //响应状态码
    logText += "response status: " + ctx.status + "\n";

    //响应内容
    logText += "response body: " + "\n" + JSON.stringify(ctx.body) + "\n";

    //响应日志结束
    logText += "*************** response log end ***************" + "\n";

    return logText;

}

//格式化错误日志
var formatError = function (ctx, err, resTime) {
    var logText = new String();

    //错误信息开始
    logText += "\n" + "*************** error log start ***************" + "\n";

    //添加请求日志
    logText += formatReqLog(ctx.request, resTime);

    //错误名称
    logText += "err name: " + err.name + "\n";
    //错误信息
    logText += "err message: " + err.message + "\n";
    //错误详情
    logText += "err stack: " + err.stack + "\n";

    //错误信息结束
    logText += "*************** error log end ***************" + "\n";

    return logText;
};



//格式化请求日志
var formatReqLog = function (req, resTime) {

    var logText = new String();

    var method = req.method;
    //访问方法
    logText += "request method: " + method + "\n";

    //请求原始地址
    logText += "request originalUrl:  " + req.originalUrl + "\n";

    //客户端ip
    logText += "request client ip:  " + req.ip + "\n";
    

    //开始时间
    var startTime;
    //请求参数
    if (method === 'GET') {
        logText += "request query:  " + JSON.stringify(req.query) + "\n";
        // startTime = req.query.requestStartTime;
    } else {
        logText += "request body: " + "\n" + JSON.stringify(req.body) + "\n";
        // startTime = req.body.requestStartTime;
    }
    //服务器响应时间
    logText += "response time: " + resTime + "\n";

    return logText;
}
