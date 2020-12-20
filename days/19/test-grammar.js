// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "0", "symbols": ["4", "1", "5"]},
    {"name": "1", "symbols": ["2", "3"]},
    {"name": "1", "symbols": ["3", "2"]},
    {"name": "2", "symbols": ["4", "4"]},
    {"name": "2", "symbols": ["5", "5"]},
    {"name": "3", "symbols": ["4", "5"]},
    {"name": "3", "symbols": ["5", "4"]},
    {"name": "4", "symbols": [{"literal":"a"}]},
    {"name": "5", "symbols": [{"literal":"b"}]}
]
  , ParserStart: "0"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
