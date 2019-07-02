export class Helper {
    static statusText(status: number): string {
        let str = 'unknown';
        switch (status) {
            case 100:
                str = 'Continue';
                break;
            case 101:
                str = 'Switching Protocols';
                break;
            case 102:
                str = 'Processing';
                break;
            case 200:
                str = 'OK';
                break;
            case 201:
                str = 'Created';
                break;
            case 202:
                str = 'Accepted';
                break;
            case 203:
                str = 'Non-Authoritative Information';
                break;
            case 204:
                str = 'No Content';
                break;
            case 205:
                str = 'Reset Content';
                break;
            case 206:
                str = 'Partial Content';
                break;
            case 207:
                str = 'Multi-Status';
                break;
            case 208:
                str = 'Already Reported';
                break;
            case 226:
                str = 'IM Used';
                break;
            case 300:
                str = 'Multiple Choices';
                break;
            case 301:
                str = 'Moved Permanently';
                break;
            case 302:
                str = 'Found';
                break;
            case 303:
                str = 'See Other';
                break;
            case 304:
                str = 'Not Modified';
                break;
            case 305:
                str = 'Use Proxy';
                break;
            case 306:
                str = 'Switch Proxy';
                break;
            case 307:
                str = 'Temporary Redirect';
                break;
            case 308:
                str = 'Permanent Redirect/Resume Incomplete';
                break;
            case 400:
                str = 'Bad Request';
                break;
            case 401:
                str = 'Unauthorized';
                break;
            case 402:
                str = 'Payment Required';
                break;
            case 403:
                str = 'Forbidden';
                break;
            case 404:
                str = 'Not Found';
                break;
            case 405:
                str = 'Method Not Allowed';
                break;
            case 406:
                str = 'Not Acceptable';
                break;
            case 407:
                str = 'Proxy Authentication Required';
                break;
            case 408:
                str = 'Request Timeout';
                break;
            case 409:
                str = 'Conflict';
                break;
            case 410:
                str = 'Gone';
                break;
            case 411:
                str = 'Length Required';
                break;
            case 412:
                str = 'Precondition Failed';
                break;
            case 413:
                str = 'Request Entity Too Large';
                break;
            case 414:
                str = 'Request-URI Too Long';
                break;
            case 415:
                str = 'Unsupported Media Type';
                break;
            case 416:
                str = 'Requested Range Not Satisfiable';
                break;
            case 417:
                str = 'Expectation Failed';
                break;
            case 418:
                str = 'I’m a teapot';
                break;
            case 419:
                str = 'Authentication Timeout';
                break;
            case 420:
                str = 'Method Failure (Spring Framework)/Enhance Your Calm (Twitter)';
                break;
            case 421:
                str = 'Misdirected Request';
                break;
            case 422:
                str = 'Unprocessable Entity';
                break;
            case 423:
                str = 'Locked';
                break;
            case 424:
                str = 'Failed Dependency';
                break;
            case 426:
                str = 'Upgrade Required';
                break;
            case 428:
                str = 'Precondition Required';
                break;
            case 429:
                str = 'Too Many Requests';
                break;
            case 431:
                str = 'Request Header Fields Too Large';
                break;
            case 440:
                str = 'Login Timeout (Microsoft)';
                break;
            case 444:
                str = 'No Response (Nginx)';
                break;
            case 449:
                str = 'Retry With (Microsoft)';
                break;
            case 450:
                str = 'Blocked by Windows Parental Controls (Microsoft)';
                break;
            case 451:
                str = 'Unavailable For Legal Reasons (Draft)/Redirect (Microsoft)';
                break;
            case 494:
                str = 'Request Header Too Large (Nginx)';
                break;
            case 495:
                str = 'Cert Error (Nginx)';
                break;
            case 496:
                str = 'No Cert (Nginx)';
                break;
            case 497:
                str = 'HTTP to HTTPS (Nginx)';
                break;
            case 498:
                str = 'Token Expired/Invalid (Esri)';
                break;
            case 499:
                str = 'Token Required (Esri)/Client Closed Request (Nginx)';
                break;
            case 500:
                str = 'Internal Server Error';
                break;
            case 501:
                str = 'Not Implemented';
                break;
            case 502:
                str = 'Bad Gateway';
                break;
            case 503:
                str = 'Service Unavailable';
                break;
            case 504:
                str = 'Gateway Timeout';
                break;
            case 505:
                str = 'HTTP Version Not Supported';
                break;
            case 506:
                str = 'Variant Also Negotiates';
                break;
            case 507:
                str = 'Insufficient Storage (WebDAV; RFC 4918)';
                break;
            case 508:
                str = 'Loop Detected';
                break;
            case 509:
                str = 'Bandwidth Limit Exceeded (Apache)';
                break;
            case 510:
                str = 'Not Extended';
                break;
            case 511:
                str = 'Network Authentication Required';
                break;
            case 520:
                str = 'Unknown Error';
                break;
            case 598:
                str = 'Network Read Timeout Error (Microsoft)';
                break;
            case 599:
                str = 'Network Connect Timeout Error (Microsoft)';
                break;

        }

        return str;
    }

    static pureUrl(url: string): string {
        const replaced = url.replace('http://', '').replace('https://', '');
        const arr = replaced.split('/');
        return arr[0];
    }
}
