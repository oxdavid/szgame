/**
 * Created by Administrator on 2015/8/8.
 */

//扔出
function throwGoods() {
    var name = $(selectedSellGood).find("td").first().text();
    var count = parseInt($(selectedSellGood).find("td").last().text());
    var throwCount = parseInt($("#count").val());

    if (throwCount > count) {
        alert("跟我开玩笑吗,你哪有这么多东西可仍!");
        return;
    }

    if (confirm("确定扔掉这些东西?")) {

        $("#room").find("tr").each(function () {
            var td = $(this).find("td");

            if (td.first().text() == name) {

                if (throwCount < count) {
                    td.last().text(parseInt(td.last().text()) - throwCount);
                }
                else {
                    $(td[0]).parent().remove();
                    $("#btnThrow").attr("disabled", "disabled");
                    $("#btnSell").attr("disabled", "disabled");
                    callback();
                }
            }
        });

        hideDiv('divBuy');
    }
}

//出售
function sell() {
    var name = $(selectedSellGood).find("td").first().text();
    var price = 0;
    var count = parseInt($(selectedSellGood).find("td").last().text());
    var sellCount = parseInt($("#count").val());

    if (sellCount > count) {
        alert("跟我开玩笑吗,你哪有这么多东西可卖!");
        return;
    }

    $("#blackMarket").find("tr").each(function () {

        if ($(this).find("td").first().text() == sellGoodName) {
            price = parseInt($(this).find("td").first().next().text());
        }
    });

    $("#room").find("tr").each(function () {
        if ($(this).find("td").first().text() == name) {

            if (name == "未成年少女") {
                user.updateFame(-(sellCount * 7));
            }

            if (sellCount < count) {
                $(this).find("td").last().text(parseInt($(this).find("td").last().text()) - sellCount);
            }
            else {
                $($(this).find("td").first()).parent().remove();

                $("#btnSell").attr("disabled", "disabled");
                $("#btnThrow").attr("disabled", "disabled");
                callback();
            }
        }
    });

    user.updateMoney(price * sellCount);
    user.updateRoom(-sellCount);
    hideDiv('divBuy');
}

//银行
function bank() {
    var amount = parseInt($("#count").val());

    if (amount > user.money()) {
        alert("你那有那么多钱!");
        return;
    }

    user.updateMoney(-amount);
    user.updateDebt(-amount);

    $("#btnConfirm").attr("disabled", "disabled");
    hideDiv('divBuy');
}

//医院
function hospital() {
    var count = parseInt($("#count").val());
    var amount = count * 5000;

    if (amount > user.money()) {
        alert("没钱怎么看病，看你真病的不轻!");
        return;
    }

    user.updateMoney(-amount);
    user.updateFitness(count);
    $("#btnConfirm").attr("disabled", "disabled");
    hideDiv('divBuy');
}

//房间
function home() {
    var amount = ((user.roomTotal() - 90) / 10) * 50000;

    if (amount > user.money()) {
        alert("没钱就装傻,你脸皮可真够,滚远点!");
        return;
    }

    user.updateMoney(-amount);
    user.updateHomeTotal(10);
    $("#count").removeAttr("readonly");
    $("#btnConfirm").attr("disabled", "disabled");
    hideDiv('divBuy');
}

//慈善基金会
function fame() {
    var count = parseInt($("#count").val());
    var amount = count * 100000;

    if (count == 0) {
        alert("多少捐点啊!");
        return;
    }

    if (amount > user.money()) {
        alert("没钱装什么土豪!");
        return;
    }

    if (user.fame() == 100) {
        alert("土豪，我们做朋友吧!");
    }

    user.updateMoney(-amount);
    user.updateFame(count);
    $("#btnConfirm").attr("disabled", "disabled");
    hideDiv('divBuy');
}