/** 
* trace.js 
* Displays the arguments in a trace window in the top left of the screen 
* 
* @version 1.0.1 
* @author Emre Koc <emre.koc@wearejust.com> 
*/
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TraceWindow = function () {
    function TraceWindow() {
        _classCallCheck(this, TraceWindow);

        this.element = document.createElement('div');
        this.element.id = 'trace-window';
        this.element.style.cssText = 'background-color: #fff; border: solid 1px black; color: #000; font-family: Arial; font-size: 12px; left: 0; max-width: 70vw; position: fixed; top: 0; white-space: nowrap; z-index: 9999999;';

        this.content = document.createElement('div');
        this.content.id = 'trace-content';
        this.content.style.cssText = 'max-height: 100vh; padding: 5px 25px 5px 5px; overflow: auto;';
        this.element.appendChild(this.content);

        var close = document.createElement('div');
        close.id = 'trace-close';
        close.onclick = this.hide.bind(this);
        close.style.cssText = 'color: #fff; content: ""; cursor: pointer; font-size: 16px; left: 100%; line-height: 1; padding: 4px 6px; position: absolute; top: 0; z-index: 1;';
        close.innerHTML = '×';
        this.element.appendChild(close);
    }

    TraceWindow.prototype.parse = function parse(args) {
        var type = Object.prototype.toString.call(args);

        if (type == '[object Arguments]') {
            args = Array.prototype.slice.call(args);
        } else if (type != '[object Array]') {
            args = [args];
        }

        return args;
    };

    TraceWindow.prototype.add = function add(args) {
        var line = document.createElement('p');
        line.style.cssText = 'margin: 0; padding: 0;';
        line.innerHTML = this.parse(args).join(', ');
        this.content.appendChild(line);
        this.content.scrollTop = this.content.scrollHeight;
    };

    TraceWindow.prototype.recursive = function recursive(args, indent) {
        if (!indent) {
            args = this.parse(args);
            indent = 0;
        }

        var a = void 0,
            arg = void 0;
        for (a in args) {
            arg = args[a];
            if ((typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) == 'object') {
                this.add('<span style="padding-left: ' + indent * 2 + 'em;"><b>+ [' + a + ']</b> <span style="color:#999;">' + Object.prototype.toString.call(arg) + '</span>');
                this.recursive(arg, indent + 1);
            } else {
                this.add('<span style="padding-left: ' + indent * 2 + 'em;"><b>- ' + a + ':</b> ' + arg + '</span>');
            }
        }
    };

    TraceWindow.prototype.show = function show() {
        this.element.style.display = 'block';
        if (!this.element.parentElement) {
            document.body.appendChild(this.element);
        }
    };

    TraceWindow.prototype.hide = function hide() {
        this.element.style.display = 'none';
        while (this.content.firstChild) {
            this.content.removeChild(this.content.firstChild);
        }
    };

    return TraceWindow;
}();

window.traceWindow = new TraceWindow();

window.trace = function () {
    if (arguments.length) {
        window.traceWindow.add(arguments);
        window.traceWindow.show();
    } else {
        window.traceWindow.hide();
    }
};

window.trace_r = function () {
    window.traceWindow.recursive(arguments);
    window.traceWindow.show();
};

window.trace_ms = function (limit) {
    if (limit || !window.trace_ms_time) {
        window.trace_ms_limit = limit && !isNaN(parseInt(limit)) ? limit : false;
        window.trace_ms_time = new Date().getTime();
        window.trace_ms_index = 0;
    } else {
        window.trace_ms_index++;
        var ms = new Date().getTime() - window.trace_ms_time;
        if (window.trace_ms_limit && ms > window.trace_ms_limit) ms = '<span style="color:red;">' + ms + '</span>';
        trace('[' + window.trace_ms_index + '] <b>' + ms + '</b> ms');
    }
};