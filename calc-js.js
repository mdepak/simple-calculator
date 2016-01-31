//Javascript file for calculator operations
var lastOp = -1;

function isNumber(data) {
    var pattern = /[0-9]/g;
    if ((data.match(pattern) != null))
        return true;
    else
        return false;
}


function btnClk(element) {
    var data = element.innerHTML;
    var pattern = /[0-9]/g;

    if (isNumber(data)) {
        var resultElement = document.getElementById('result');
        if (!isNumber(resultElement.value))
            resultElement.value = data;
        else if (resultElement.value != 0)
            resultElement.value = resultElement.value + data;
        else
            resultElement.value = data;

    } else {
        var resultElement = document.getElementById('result');
        var storeElement = document.getElementById('store');

        if (data == ".") {
            if (!isNumber(resultElement.value.charAt(resultElement.value.length - 1)) && resultElement.value.charAt(resultElement.value.length - 1) != ".")
                resultElement.value = resultElement.value + "0.";
            else {
                var array = resultElement.value.split(/[\+\-\*/]/);

                if (array.pop().match(/[.]/) == null) {

                    resultElement.value += ".";
                }
            }
        } else if (data == "+" || data == "-" || data == "*" || data == "/") {
            if (isNumber(resultElement.value.charAt(resultElement.value.length - 1)))
                resultElement.value = resultElement.value + data;
            else
                resultElement.value = resultElement.value.substr(0, resultElement.value.length - 1) + data;

        } else if (data == "CE") {
            console.log("backpress button");
            resultElement.value = resultElement.value.substr(0, resultElement.value.length - 1);
        } else if (data == "C") {
            console.log("Clear");
            resultElement.value = "0";
        } else if (data == "%")
            resultElement.value = "0";
        else if (data = '=') {
            var expression = resultElement.value.split('');

            var operands = [];
            var operator = [];
            var lastOperator = 0;
            var num;
            var result = 0;
            for (var i = 0; i < expression.length; i++) {
                if (!isNumber(expression[i]) && expression[i] !== ".") {
                    num = parseFloat(expression.slice(lastOperator, i).join(''));
                    lastOperator = i + 1;
                    operands.push(num);
                    operator.push(expression[i]);

                }
            }
            operands.push(parseFloat(expression.slice(lastOperator, i).join('')));

            for (var i = 0; i < operator.length; i++) {
                var num1 = operands.shift();
                var num2 = operands.shift();

                if (!isNumber(num1.toString()) || !isNumber(num2.toString())) {
                    resultElement.value = "Error";
                    break;
                } else {
                    console.log("operands -->" + num1 + "\t" + num2);
                    var symbol = operator[i];
                    if (symbol == "+")
                        operands.unshift(num1 + num2);
                    else if (symbol == "-")
                        operands.unshift(num1 - num2);
                    else if (symbol == "*")
                        operands.unshift(num1 * num2);
                    else if (symbol == "/")
                        operands.unshift(num1 / num2);

                }
            }

            if (operands.length == 1) {
                var result = operands.pop();
                if (!isNumber(result.toString()))
                    resultElement.value = "Error";
                else
                    resultElement.value = result;
            }
        }
    }
}
