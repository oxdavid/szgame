/**
 * Created by Administrator on 2015/8/3.
 */
var user =
{
    "day": ko.observable(0),//天数
    "money": ko.observable(2000),//金钱
    "debt": ko.observable(5000),//高利贷
    "fame": ko.observable(100),//名声值
    "fitness": ko.observable(100),//健康值
    "room": ko.observable(0),//已用房间数量
    "roomTotal": ko.observable(100),//房间总量
    "isOver": false
};

//得到剩余房间数量
user.getRoomCount = function () {
    return user.roomTotal() - user.room();
};

//更新当前天数
user.updateDay = function (count) {
    this.updateDebtByDay(count);
    this.day(this.day() + count);

    if (this.day() == 90) {
        alert("再有10天你就要回家了.");
    }
    else if (this.day() == 99) {
        alert("明天就要回家了,快把东西全部卖掉.");
    }
    else if (this.day() >= 100) {
        gameOver();
    }
};

//更新剩余房间数量
user.updateRoom = function (amount) {
    this.room(this.room() + amount);
};

//更新房间总量
user.updateHomeTotal = function (amount) {
    this.roomTotal(this.roomTotal() + amount);
};

//跟新金钱数
user.updateMoney = function (amount) {
    this.money(this.money() + amount);
};

//高利贷，每天增加10%
user.updateDebtByDay = function (dayCount) {

    if (this.debt() == 0) {
        return;
    }

    for (var index = 0; index < dayCount; index++) {
        this.debt(this.debt() + Math.round(this.debt() * 0.1));
    }
};

//更新高利贷
user.updateDebt = function (amount) {
    this.debt(this.debt() + amount);

    if (this.debt() < 0) {
        this.debt(0);
    }
};

//跟新名声值
user.updateFame = function (amount) {
    this.fame(this.fame() + amount);

    if (this.fame() > 100) {
        this.fame(100);
    }

    if (this.fame() < 0) {
        alert("丧尽天良,不知祸害了多少幸福的家庭,愤怒的人群冲进了你的出租屋,将你碎尸万段.你就这样结束了在深圳的求生生涯");
        gameOver();
    }
};

//更新健康值
user.updateFitness = function (amount) {
    this.fitness(this.fitness() + amount);

    if (this.fitness() > 100) {
        this.fitness(100);
    }
    if (this.fitness() < 0) {
        alert("由于不注意身体,终于倒在了深圳街头,三天后,清洁工发现了你的尸体,由于你在深圳没有亲人朋友, 所以你的尸体被扔进了臭河沟, 可怜的你就这样草草收场了.");
        gameOver();
    }
};

user.triggerEvent = function () {
    this.debtEvent();
    this.fameEvent();
    this.fitnessEvent();
};

user.debtEvent = function () {

    if (isTriggerEvent()) {

        if (this.debt() > 10000000) {
            this.updateDay(50);
            this.updateFitness(-90);
            alert("由于你欠钱过多,债主找了一百多人打了你一顿, 你被送进医院五十天, 健康减少了90.");
        }
        else if (this.debt() > 1000000) {
            this.updateDay(20);
            this.updateFitness(-50);
            alert("由于你欠钱太多,债主找了五十多人打了你一顿,你被送进医院二十天,健康减少50");
        }
        else if (this.debt() > 500000) {
            this.updateDay(5);
            this.updateFitness(-30);
            alert("由于你欠钱太多,债主找了三十多人打了你一顿,你被送进医院五天,健康减少30");
        }
        else if (this.debt > 100000) {
            alert("由于你欠钱太多,债主找了二十多人打了你一顿,你被送进医院两天,健康减少20");
            this.updateDay(2);
            this.updateFitness(-20);
        }
    }
};

user.fameEvent = function () {

    if (isTriggerEvent()) {
        if (this.fame() < 50) {
            this.updateDebt(8000000);
            alert("由于你名声太差, 你在回家的路上被人打晕, 银行为你垫付了800万元医疗费.");
        }
        else if (this.fame() < 70) {
            this.updateDebt(5000000);
            alert("由于你名声太差, 你在回家的路上被人打晕, 银行为你垫付了500万元医疗费.");
        }
        else if (this.fame() < 81) {
            this.updateDebt(1000000);
            alert("由于你名声太差, 你在回家的路上被人打晕, 银行为你垫付了100万元医疗费.");
        }
    }
};

user.fitnessEvent = function () {

    if (isTriggerEvent()) {
        if (this.fitness() < 51) {
            this.updateDebt(5000000);
            this.updateDay(20);
            this.updateFitness(50);
            alert("由于你忽视健康,你在回家的路上晕倒了,有人把你送进了医院住院一天, 银行为你垫付了500万元医疗费.");
        }
        else if (this.fitness() < 71) {
            this.updateDebt(1000000);
            this.updateDay(5);
            this.updateFitness(30);
            alert("由于你忽视健康,你在回家的路上晕倒了,有人把你送进了医院住院一天, 银行为你垫付了100万元医疗费.");
        }
        else if (this.fitness() < 90) {
            this.updateDebt(100000);
            this.updateDay(1);
            this.updateFitness(10);
            alert("由于你忽视健康,你在回家的路上晕倒了,有人把你送进了医院住院一天, 银行为你垫付了10万元医疗费.");
        }
    }
};

//检测游戏是否结束
user.checkGame = function () {
    return this.day() > 100 || this.fitness() < 0 || this.fame() < 0;
};

//检测是否还有剩余房间
user.checkRoom = function (amount) {
    return (this.room() + amount) < this.roomTotal() + 1;
};

//检测余额
user.checkMoney = function (amount) {
    return this.money() >= amount;
};

//定义good数据对象
function good(name, minPrice, maxPrice) {
    this.goodsName = name;
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;

    this.price = function () {
        return randomRegion(this.minPrice, this.maxPrice);
    };
}
