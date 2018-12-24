"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = __importDefault(require("discord.js"));
var process_1 = __importDefault(require("process"));
var cheerio_1 = __importDefault(require("cheerio"));
function fetchTwitter() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, require('isomorphic-fetch')('https://twitter.com/game_knives_out').then(function (resp) { return resp.text(); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function toStrFromTweet($, elm) {
    if (elm.type == "text") {
        return elm.data;
    }
    else {
        if (elm.tagName == "a") {
            return $("s", elm).text() + $("b", elm).text();
        }
    }
}
function fetchTweets() {
    return __asyncGenerator(this, arguments, function fetchTweets_1() {
        var html, $, _i, _a, tweetElm, tweetId, tweetTextElm, tweetText;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, __await(fetchTwitter())];
                case 1:
                    html = _b.sent();
                    $ = cheerio_1.default.load(html);
                    _i = 0, _a = Array.from($(".tweet"));
                    _b.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 6];
                    tweetElm = _a[_i];
                    tweetId = tweetElm.attribs["data-tweet-id"];
                    tweetTextElm = $(".tweet-text", tweetElm)[0];
                    tweetText = tweetTextElm.children.map(function (e) { return toStrFromTweet($, e); }).join("");
                    return [4 /*yield*/, __await({
                            id: tweetId,
                            text: tweetText
                        })];
                case 3: return [4 /*yield*/, _b.sent()];
                case 4:
                    _b.sent();
                    _b.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 2];
                case 6: return [2 /*return*/];
            }
        });
    });
}
var client = new discord_js_1.default.Client();
client.on('ready', function () {
    console.log("Logged in as " + client.user.tag + "!");
});
var tweetDictionary = new Map();
function sendAllTextChannels(text) {
    for (var _i = 0, _a = Array.from(client.channels.values()); _i < _a.length; _i++) {
        var ch = _a[_i];
        if (ch instanceof discord_js_1.default.TextChannel) {
            ch.send(text);
        }
    }
}
setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
    var e_1, _a, _b, _c, tweet, e_1_1;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 5, 6, 11]);
                _b = __asyncValues(fetchTweets());
                _d.label = 1;
            case 1: return [4 /*yield*/, _b.next()];
            case 2:
                if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 4];
                tweet = _c.value;
                if (tweetDictionary.size == 0) {
                    sendAllTextChannels(tweet.text);
                    return [3 /*break*/, 4];
                }
                if (!tweetDictionary.has(tweet.id)) {
                    sendAllTextChannels(tweet.text);
                    tweetDictionary.set(tweet.id, tweet.text);
                }
                _d.label = 3;
            case 3: return [3 /*break*/, 1];
            case 4: return [3 /*break*/, 11];
            case 5:
                e_1_1 = _d.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 11];
            case 6:
                _d.trys.push([6, , 9, 10]);
                if (!(_c && !_c.done && (_a = _b.return))) return [3 /*break*/, 8];
                return [4 /*yield*/, _a.call(_b)];
            case 7:
                _d.sent();
                _d.label = 8;
            case 8: return [3 /*break*/, 10];
            case 9:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 10: return [7 /*endfinally*/];
            case 11: return [2 /*return*/];
        }
    });
}); }, 1000 * 60);
client.login(process_1.default.env["DISCORD_BOT_TOKEN"]);
