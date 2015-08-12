/**
 * Created by Administrator on 2015/8/8.
 */

//触发事件
function raisedEvent() {

    if (user.isOver) {
        return;
    }

    if (isRaiseEvent(10)) {
        eventsList()[randomRegion(0, 8)]();
    }
    else if (isRaiseEvent(3)) {
        var goods = goodsEventList()[randomRegion(0, 26)];
        updateGoodPrice(goods.name, goods.multiple, goods.message);
    }
}

//创建事件列表
function eventsList() {
    var events = new Array(9);

    events[0] = beatedByCityGuard;
    events[1] = pickupMoney;
    events[2] = smashedFlowerpot;
    events[3] = helpCarline;
    events[4] = robed;
    events[5] = airPollute;
    events[6] = exercise;
    events[7] = loanInc;
    events[8] = largessProduct;

    return events;
}

function goodsEventList() {
    var list = new Array(26);

    list[0] = {name: "水货LV", multiple: 10, message: "baby手提LV出现那戛纳电影节，水货LV热销"};
    list[1] = {name: "走私奶粉", multiple: 50, message: "香港出现占中事件，走私奶粉价格飙升"};
    list[2] = {name: "黄牛车票", multiple: 20, message: "12306网站改版，黄牛车票价格上涨"};
    list[3] = {name: "大保健", multiple: 20, message: "屌丝男士热播，大保健广为人知"};
    list[4] = {name: "高档手表", multiple: 2, message: "刘强东手腕露出百达翡丽，土豪纷纷效仿"};
    list[5] = {name: "二手手机", multiple: 0.1, message: "苹果6s热销，二手手机一时间无人问津"};
    list[6] = {name: "荔枝", multiple: 100, message: "一年一度的荔枝节又到了，荔枝供不应求"};
    list[7] = {name: "山地车", multiple: 5, message: "冬运会申办成功，山地车价格上涨"};
    list[8] = {name: "电脑", multiple: 0.2, message: "智能手机越来越普及，电脑价格狂跌"};
    list[9] = {name: "门票", multiple: 100, message: "又到毕业季，门票价格上涨"};
    list[10] = {name: "泡妞宝典", multiple: 10, message: "单身男青年越来越多，泡妞宝典供不应求"};
    list[11] = {name: "平米房价", multiple: 2, message: "深圳房价稳步上升"};
    list[12] = {name: "进口香烟", multiple: 20, message: "柳岩说吸烟的男人最有魅力，进口香烟热销"};
    list[13] = {name: "太阳镜", multiple: 100, message: "深圳进入夏季，太阳镜需求增大"};
    list[14] = {name: "油画", multiple: 50, message: "深圳晚报报道,要大力扶植文化产业,文艺青年大量购买油画."};
    list[15] = {name: "进口香烟", multiple: 0.1, message: "中央出台最严禁烟令，进口香烟销量下滑"};
    list[16] = {name: "未成年少女", multiple: 0.05, message: "传说一位丢失了女儿的父亲杀了几十个倒卖未成年少女的黑商,近期无人敢倒卖未成年少女."};
    list[17] = {name: "大保健", multiple: 0.05, message: "公安局下达红头文件,治理深圳市容市貌,大保健无人敢去."};
    list[18] = {name: "黄牛车票", multiple: 0.05, message: "进出出现淡季，黄牛票无人问津"};
    list[19] = {name: "门票", multiple: 0.01, message: "深圳出现高温预警，无人出门"};
    list[20] = {name: "太阳镜", multiple: 0.01, message: "台风浮空弹登陆广东，太阳镜销量惨淡"};
    list[21] = {name: "高档手表", multiple: 0.5, message: "习总老虎苍蝇一起打，高档手表销量下降"};
    list[22] = {name: "泡妞宝典", multiple: 0.1, message: "报道称深圳男女比例1:6，泡妞宝典无人问津"};
    list[23] = {name: "二手手机", multiple: 10, message: "传言二手手机可以提炼黄金，二手手机价格暴涨"};
    list[24] = {name: "荔枝", multiple: 0.01, message: "吃荔枝上火严重，立即价格狂跌"};
    list[25] = {name: "走私奶粉", multiple: 0.02, message: "深圳规划免税区，走私奶粉无人再买"};

    return list;
}

/*被城管暴打
 影响:健康值减少5
 条件:名声小于100*/
function beatedByCityGuard() {

    if (user.fame() < 100) {
        user.updateFitness(-5);
        alert("你被城管追打,打掉一颗门牙,健康值减少了5.");
    }
    else {
        alert("你遇到城管,但是因为你人缘好,他们没有为难你.");
    }
}

//捡到1万块钱
function pickupMoney() {

    if (user.fame() == 100) {
        user.updateMoney(10000);
        alert("你走路时不慎摔倒,意外地捡到了一万元钱!");
    }
    else {
        alert("你走路时不慎摔倒,意外地发现了一万元钱,但是警察刚好路过,你只得上交,你什么也没得到.");
    }
}

//被花盆砸伤
function smashedFlowerpot() {

    if (user.fame() < 100) {
        user.updateDebt(20000);
        user.updateDay(1);
        alert("你正在乘凉,突然楼上有人扔下一盆花,你被砸晕了送进医院.你住院一天,高利贷替你垫付了20000元医药费.");
    }
    else {
        alert("你正在乘凉,突然楼上有人扔下一盆花,但是你曾经帮助过的人拼死救了你.");
    }
}

//乐于助人
function helpCarline() {

    if (user.fame() < 100) {
        user.updateFame(5);
        alert("帮助一位老太婆马路,人们都称赞你的善行.你的名声上升了5.");
    }
}

//传言
function robed() {
    user.updateFame(-5);
    alert("有谣言说你乱搞男女关系, 你的名声下降了5.");
}

//空气污染
function airPollute() {
    user.updateFitness(-5);
    alert("深圳空气污染严重! 你的健康下降了5.");
}

//锻炼身体
function exercise() {

    if (user.fitness() < 100) {
        user.updateFitness(5);
        alert("最近你天天健身! 你的健康上升了5.");
    }
}

//昏倒在路边
function loanInc() {

    if (this.fitness() == 100) {
        alert("你被人发现晕倒在路边,并没有什么大碍,虚惊一场.");
    }
    else {
        user.updateDebt(100000);
        alert("你被人发现晕倒在路边,你的债主把你送到了医院,并替你垫付了10万元的医疗费.");
    }
}

//碰到老乡
function largessProduct() {

    if (this.fitness() == 100) {
        user.updateMoney(50000);
        alert("偶然碰到老乡,一起喝酒非常高兴,老乡投资你5万块钱");
    }
    else {
        alert("偶然碰到老乡,一起喝酒非常高兴,老乡送了一起喝酒的另一个人5万块钱!你偷偷想,你要是再帅一点,兴许他就送你了.");
    }
}