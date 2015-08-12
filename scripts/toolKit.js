/**
 * Created by Administrator on 2015/8/3.
 */

//是否触犯事件（全局六分之一概率）
function isTriggerEvent() {
    return Math.round(Math.random() * 6 + 0.5) == 6;
}

//概率事件
function isRaiseEvent(prob) {
    return Math.round(Math.random() * prob + 0.5) == prob;
}

//检测购买、卖出数量书否合法
function checkNumber() {
    var value = $("#count").val();

    if (parseInt(value) > 0) {
        $("#btnConfirm").removeAttr("disabled");
    }
    else {
        $("#btnConfirm").attr("disabled", "disabled");
    }
}

//区间随机数
function randomRegion(under, over) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * under + 1);
        case 2:
            return parseInt(Math.random() * (over - under + 1) + under);
        default:
            return 0;
    }
}

//更新产品价格 产品名称 倍数
function updateGoodPrice(goodName, multiple, message) {

    $("#blackMarket").find("tr").each(function () {

        if ($(this).find("td").first().text() == goodName) {
            alert(message);
            $(this).find("td").first().next().text(Math.floor(multiple * parseInt($(this).find("td").first().next().text())));
        }
    });
}

/// <summary>
/// 抽取一定范围内的指定个数的随机数（不重复）
/// </summary>
/// <param name="seed">指定范围</param>
/// <param name="count">抽取个数</param>
function randomExtract(seed, count) {
    var originalArray = new Array(seed);
    var result = new Array(count);

    for (var i = 0; i < seed; i++) {
        originalArray[i] = i + 1;
    }

    originalArray.sort(function () {
        return 0.5 - Math.random();
    });

    for (var index = 0; index < count; index++) {
        result[index] = originalArray[index];
    }

    return result;
}

//创建物品列表
function goodsList() {
    var goodsList = new Array(16);

    goodsList[0] = new good("南山荔枝", 1, 100);
    goodsList[1] = new good("油画", 100, 600);
    goodsList[2] = new good("水货LV", 700, 2000);
    goodsList[3] = new good("走私奶粉", 200, 500);
    goodsList[4] = new good("未成年少女", 1000, 200000);
    goodsList[5] = new good("大保健", 200, 600);
    goodsList[6] = new good("二手手机", 1000, 6000);
    goodsList[7] = new good("高档手表", 80000, 160000);
    goodsList[8] = new good("宝妞宝典", 3000, 8000);
    goodsList[9] = new good("进口香烟", 200, 500);
    goodsList[10] = new good("太阳镜", 80, 200);
    goodsList[11] = new good("房价", 100000, 200000);
    goodsList[12] = new good("电脑", 4000, 10000);
    goodsList[13] = new good("山地车", 2000, 8000);
    goodsList[14] = new good("门票", 1, 160);
    goodsList[15] = new good("黄牛票", 300, 800);

    return goodsList;
}

//设置div居中
function setCenter(divId) {
    var left = document.body.clientWidth / 2 - $("#" + divId).width() / 2;
    document.getElementById(divId).style.left = left + "px";
}

//弹出vid
function popupDiv(divId, title, operation) {
    setCenter(divId);
    var div_obj = $("#" + divId);
    var windowHeight = document.body.clientHeight;
    var popupHeight = div_obj.height();
    var windowWidth = document.body.clientWidth;
    var popupWidth = div_obj.width();

    updatePopupTitle(title);
    document.getElementById(divId).style.left = windowWidth / 2 - popupWidth / 2;

    div_obj.css({"position": "absolute"})
        .animate({
            top: windowHeight / 2 - popupHeight / 2,
            opacity: "show"
        }, "slow");

    var confirm = $("#btnConfirm");
    confirm.unbind("click");
    confirm.click(function () {
        operation();
    });
}

//隐藏vid
function hideDiv(div_id) {
    var count = $("#count");
    count.attr("value", "0");
    count.removeAttr("readonly");
    $("#" + div_id).animate({top: 0, opacity: "hide"}, "slow");
}

//更新弹出窗体Value
function updatePopupTitle(title) {
    $("#buyTitle").text(title);
}

//强制出售
function forceSell() {
    alert("系统自动把你的物品卖掉了");

    $("#room").find("tr").each(function () {

        if ($(this).find("td").length > 0) {
            var price = parseInt($(this).find("td").first().next().text());
            var sellCount = parseInt($(this).find("td").last().text());
            user.updateMoney(price * sellCount);
            user.updateRoom(-sellCount);
            $($(this).find("td").first()).parent().remove();
        }
    });
}
//游戏结束
function gameOver() {
    user.isOver = true;
    forceSell();

    if (user.money() < 1000000) {
        alert("你在深圳虽然很努力地赚钱,但是仍不足以偿还100万元的债务和高利贷, 面对如山一样的债务, 你选择了跳楼.");
    }
    else if (user.money() < 100000000) {

        if ((user.fame() + user.fitness()) > 180) {
            alert("你在深圳赚够了还债的钱, 便骄傲自满,虽然你从此过上了小康的生活, 但是你永远也别想当一个富豪了.")
        }
        else if ((user.fame() + user.fitness()) > 150) {
            alert("你在深圳赚够了还债的钱, 但是为了赚这些钱,你每天起早贪黑同时也做了不少见不得人的事,回乡没多久,就患了多种疾病, 从此你便经常做恶梦,钱也无法让你过上快乐的生活.");
        }
        else if ((user.fame() + user.fitness()) > 100) {
            alert("用连盗贼都不耻的手段为自己赢得了财富,同时你也透支了自己的健康,你四面树敌,即使生病也不敢去医院,你就这样在老家终老.");
        }
        else {
            alert("为了还清债务,你做过许多卑鄙无耻的事情,不计一切手段的挣钱作风害人害已,就在还完债务之后,你发现自己的身体状况也已经到了强弩之末,就在你伤心之际,你永远倒了下去.");
        }
    }
    else if (user.money() < 100000000000) {

        if ((user.fame() + user.fitness()) > 180) {
            alert("不仅出色地完成了还债任务,而且堆积了巨额的财富,你的天才让所有认识你的人都叹为观止,你成了深圳最有名的富商.");
        }
        else if ((user.fame() + user.fitness()) > 150) {
            alert("你在深圳完成了资本积累, 但是当你昏倒在马路上没人救助时,你才领悟到健康和名声多么重要,再多的钱也于 事无补,你后来虽然逃过一死,但是却瘫痪在床,痛苦不已的");
        }
        else if ((user.fame() + user.fitness()) > 100) {
            alert("在赚到巨额财富的 同时,也失去了重要的健康和名声,凡是认识你的人都知道你是个无恶不做的恶魔,处处受排挤,很快你 的公司就倒闭了,你在深圳再也生存不下去,狼狈地逃回了老家,你曾经的辉煌只能在梦里重见.");
        }
        else {
            alert("做过许多卑鄙无耻的事情,在极端恶劣的条件下完成了资本积累,你的仇敌决定暗杀你,但是当他们到达你的住所时,发现你已经吐血身亡了.");
        }
    }
    else {
        alert("深圳市长: 富豪,我有个聪明伶俐的女儿,我想把她嫁给你行吗...");
    }

    location.reload();
}