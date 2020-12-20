// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "42", "symbols": ["9", "14"]},
    {"name": "42", "symbols": ["10", "1"]},
    {"name": "9", "symbols": ["14", "27"]},
    {"name": "9", "symbols": ["1", "26"]},
    {"name": "10", "symbols": ["23", "14"]},
    {"name": "10", "symbols": ["28", "1"]},
    {"name": "1", "symbols": [{"literal":"a"}]},
    {"name": "11", "symbols": ["42", "31"]},
    {"name": "11", "symbols": ["42", "11", "31"]},
    {"name": "5", "symbols": ["1", "14"]},
    {"name": "5", "symbols": ["15", "1"]},
    {"name": "19", "symbols": ["14", "1"]},
    {"name": "19", "symbols": ["14", "14"]},
    {"name": "12", "symbols": ["24", "14"]},
    {"name": "12", "symbols": ["19", "1"]},
    {"name": "16", "symbols": ["15", "1"]},
    {"name": "16", "symbols": ["14", "14"]},
    {"name": "31", "symbols": ["14", "17"]},
    {"name": "31", "symbols": ["1", "13"]},
    {"name": "6", "symbols": ["14", "14"]},
    {"name": "6", "symbols": ["1", "14"]},
    {"name": "2", "symbols": ["1", "24"]},
    {"name": "2", "symbols": ["14", "4"]},
    {"name": "0", "symbols": ["8", "11"]},
    {"name": "13", "symbols": ["14", "3"]},
    {"name": "13", "symbols": ["1", "12"]},
    {"name": "15", "symbols": ["1"]},
    {"name": "15", "symbols": ["14"]},
    {"name": "17", "symbols": ["14", "2"]},
    {"name": "17", "symbols": ["1", "7"]},
    {"name": "23", "symbols": ["25", "1"]},
    {"name": "23", "symbols": ["22", "14"]},
    {"name": "28", "symbols": ["16", "1"]},
    {"name": "4", "symbols": ["1", "1"]},
    {"name": "20", "symbols": ["14", "14"]},
    {"name": "20", "symbols": ["1", "15"]},
    {"name": "3", "symbols": ["5", "14"]},
    {"name": "3", "symbols": ["16", "1"]},
    {"name": "27", "symbols": ["1", "6"]},
    {"name": "27", "symbols": ["14", "18"]},
    {"name": "14", "symbols": [{"literal":"b"}]},
    {"name": "21", "symbols": ["14", "1"]},
    {"name": "21", "symbols": ["1", "14"]},
    {"name": "25", "symbols": ["1", "1"]},
    {"name": "25", "symbols": ["1", "14"]},
    {"name": "22", "symbols": ["14", "14"]},
    {"name": "8", "symbols": ["42"]},
    {"name": "8", "symbols": ["42", "8"]},
    {"name": "26", "symbols": ["14", "22"]},
    {"name": "26", "symbols": ["1", "20"]},
    {"name": "18", "symbols": ["15", "15"]},
    {"name": "7", "symbols": ["14", "5"]},
    {"name": "7", "symbols": ["1", "21"]},
    {"name": "24", "symbols": ["14", "1"]}
]
  , ParserStart: "42"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
