/**
 * Created by Administrator on 2015/7/27.
 */
var selectedBuyGood;
var selectedSellGood;
var canSellGoods = new Array(6);
var sellGoodName;

function initial() {
    ko.applyBindings(user);
    registerEvent();
    initialGoods(1, $(".address")[0]);
}

function clearValue() {
    selectedBuyGood = null;
    selectedSellGood = null;
    $("#btnBuy").attr("disabled", "disabled");
    $("#btnSell").attr("disabled", "disabled");
    $("#btnThrow").attr("disabled", "disabled");
}

function callback() {
    selectedSellGood = null;
}

function registerEvent() {

    $("#btnBuy").click(function () {
            var selectedProductPrice = parseInt($(selectedBuyGood).find("td").last().text());
            var canBuyCount = Math.floor(user.money() / selectedProductPrice);
            canBuyCount = canBuyCount > user.getRoomCount() ? user.getRoomCount() : canBuyCount;
            $("#count").attr("value", canBuyCount);

            if (canBuyCount == 0) {
                $("#btnConfirm").attr("disabled", "disabled");
            }
            else {
                $("#btnConfirm").removeAttr("disabled");
            }

            popupDiv("divBuy", "购买数量", buy);
        }
    );

    $("#btnSell").click(function () {
        var sellCount = parseInt($(selectedSellGood).find("td").last().text());
        $("#count").attr("value", sellCount);
        popupDiv("divBuy", "卖出数量", sell);
    });

    $("#btnThrow").click(function () {
        $("#count").attr("value", parseInt($(selectedSellGood).find("td").last().text()));
        popupDiv("divBuy", "扔出数量", throwGoods);
    });

    $("#btnBank").click(function () {
        $("#count").attr("value", user.debt() > user.money() ? user.money() : user.debt());
        $("#btnConfirm").removeAttr("disabled");
        popupDiv("divBuy", "还款金额", bank);
    });

    $("#btnHospital").click(function () {

        if (user.fitness() == 100) {
            alert("你又没病, 来医院干什么? 出去出去.");
            return;
        }

        $("#count").attr("value", 100 - user.fitness());
        $("#btnConfirm").removeAttr("disabled");
        popupDiv("divBuy", "5000/点", hospital);
    });

    $("#btnRealtor").click(function () {
        $("#count").attr("value", 10).attr("readonly", "readonly");
        $("#btnConfirm").removeAttr("disabled");
        var text = ((user.roomTotal() - 90) / 10) * 5 + "万拿来";
        popupDiv("divBuy", text, home);
    });

    $("#btnCharity").click(function () {
        $("#count").attr("value", 100 - user.fame());
        $("#btnConfirm").removeAttr("disabled");
        popupDiv("divBuy", "10万/点", fame);
    });
}

function buy() {
    updateRoomList();
    selectedTable("room", true);
    hideDiv('divBuy');
}

function updateRoomList() {
    var flag = false;
    var selectedProductName = $(selectedBuyGood).find("td").first().text();
    var selectedProductPrice = $(selectedBuyGood).find("td").first().next().text();
    var buyCount = parseInt($("#count").val());
    var bill = -selectedProductPrice * buyCount;

    if (user.checkRoom(buyCount) == false) {
        alert("您的屋里以及放不下了.");
        return;
    }

    if (user.checkMoney(Math.abs(bill)) == false) {
        alert("走开走开, 没钱买就别在这儿凑热闹.");
        return;
    }

    user.updateMoney(bill);
    user.updateRoom(buyCount);

    $("#room").find("tr").each(function () {
        var td = $(this).find("td");

        if (td.first().text() == selectedProductName) {
            var currentCount = parseInt(td.last().text());
            var currentPrice = parseInt(td.first().next().text());
            td.last().text(currentCount + buyCount);
            td.first().next().text(Math.floor((currentCount * currentPrice + (-bill)) / (buyCount + currentCount)));
            flag = true;
        }
    });

    if (!flag) {
        $("#room").append("<tr>" + selectedBuyGood.innerHTML + "<td>" + $("#count").val() + "</td></tr>");
    }
}

function selectedTable(tableId, isRoom) {
    var blackMarket = $("#" + tableId).find("tr");

    for (var i = 0; i < blackMarket.length; i++) {

        if (i != 0) {
            blackMarket[i].onmousedown = function () {
                changeTableColor(this, tableId, isRoom);
            }
        }
    }
}

function changeTableColor(item, tableId, isRoom) {

    $("#" + tableId).find("tr").each(function () {

        if (this == item) {
            $(item).css({"background-color": "#6C7B8B"});

            if (isRoom) {
                selectedSellGood = item;
                var selectSellGoodName = $(selectedSellGood).find("td").first().text();
                $("#btnThrow").removeAttr("disabled");

                $(canSellGoods).each(function () {

                    if (this.name == selectSellGoodName) {
                        $("#btnSell").removeAttr("disabled");
                        sellGoodName = selectSellGoodName;
                    }
                });
            }
            else {
                selectedBuyGood = item;
                $("#btnBuy").removeAttr("disabled");
            }
        }
        else {
            $(this).css({"background-color": "#334"});
        }
    });
}

function createTable(goodsList) {

    if (goodsList instanceof Array
        && $("#blackMarket") != null) {
        $("#blackMarket").empty();
        var length = goodsList.length;
        $("#blackMarket").append("<tr><th>物品</th><th>价格</th></tr>");
        canSellGoods.splice(0, canSellGoods.length);

        try {
            for (var i = 0; i < length; i++) {
                $("#blackMarket").append("<tr><td>" + goodsList[i].goodsName + "</td><td>" + goodsList[i].price() + "</td></tr>");
                canSellGoods[i] = {"name": goodsList[i].goodsName, "price": goodsList[i].price()};
            }
        }
        catch (err) {
            alert(err.message);
        }

        selectedTable("blackMarket", false);
    }
}

function initialGoods(number, sender) {
    user.updateDay(1);
    var operations = $(".address");

    if (selectedSellGood != null) {
        $(selectedSellGood).css({"background-color": "#334"});
    }

    clearValue();

    for (var index = 0; index < operations.length; index++) {

        if (operations[index] == sender) {
            sender.setAttribute("disabled", "disabled");
        }
        else {
            operations[index].removeAttribute("disabled");
        }
    }

    createTable(getGoodsList(number));
    raisedEvent();
    user.triggerEvent();
}

function getGoodsList(number) {
    var goodsIndex = randomExtract(15, 6);
    var list = goodsList();
    var goods = new Array(6);
    var flag = false;

    for (var i = 0; i < goodsIndex.length; i++) {
        goods[i] = list[goodsIndex[i]];

        if (goodsIndex[i] == number) {
            flag = true;
        }
    }

    if (!flag) {
        goods[0] = list[number];
    }

    return goods;
}