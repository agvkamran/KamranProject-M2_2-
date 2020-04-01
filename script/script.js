class Application {
   constructor() {
      let button = document.getElementById("button");
      button.addEventListener('click', this.calc);
   }
   calc() {
      this.bankProducts = [];
      for (let i = 0; i < res.length; i++) {
         this.bankProducts.push(new BankProduct(res[i].bankName, res[i].investName, res[i].currency, res[i].incomeType, res[i].sumMin, res[i].sumMax, res[i].termMin, res[i].termMax, res[i].canDeposit));
      }
      // Создаем переменные и записываемм в них данные которые в них ввел пользователь.
      let initialAmount = document.getElementById("initialAmount").value;
      initialAmount = parseInt(initialAmount);
      let monthlyReplenishment = document.getElementById("monthlyReplenishment").value;
      monthlyReplenishment = parseInt(monthlyReplenishment);
      let depositTerm = document.getElementById("depositTerm").value;
      depositTerm = parseInt(depositTerm);
      let depositCurrency = document.getElementById("depositCurrency").value;
      // Добавляем объекты класса BankProduct в пустой массив с массива res[].
      // Фильтруем банки из массива, чтобы исключить те банки которые не подходят по условиям.
      // 
      if (depositCurrency != 'RUB' && 'USD') {
         alert('Error')
      }
      let currentBankProducts = this.bankProducts.filter(function (element) {
         if (element.currency === depositCurrency) {
            return true
         }
         else {
            return false
         }
      });

      currentBankProducts = currentBankProducts.filter(function (element) {
         if (monthlyReplenishment > 0) {
            if (element.canDeposit === true) {
               return true;
            } else {
               return false;
            }
         } else {
            return true;
         }
      });

      currentBankProducts = currentBankProducts.filter(function (element) {
         if (depositTerm >= element.termMin && depositTerm <= element.termMax) {
            return true;
         }
         else {
            return false;
         }

      })

      currentBankProducts = currentBankProducts.filter(function (element) {
         if (initialAmount >= element.sumMin && (initialAmount <= element.sumMax || element.sumMax === null)) {
            return true;
         }
         else {
            return false;
         }
      })
      console.log(currentBankProducts);
      let results = [];
      for (let i = 0; i < currentBankProducts.length; i++) {
         let calculator = new Calculator(currentBankProducts[i].incomePercent, depositTerm, initialAmount, monthlyReplenishment);
         let result = calculator.calculate();
         if (results.length == 0 || results[0]['sum'] == result) {
            results.push({ 'bank': currentBankProducts[i], 'sum': result });
         }
         else if (results[0]['sum'] < result) {
            results = [{ 'bank': currentBankProducts[i], 'sum': result }];
         }
      }
      console.log(results);
      let new_tbody = document.createElement("tbody");
      new_tbody.id = "tbody";
      let old_tbody = document.getElementById("tbody");

      let header = new_tbody.insertRow();

      let th = document.createElement("th"); th.innerHTML = "Название банка";
      header.appendChild(th);
      th = document.createElement("th"); th.innerHTML = "Вклад";
      header.appendChild(th);
      th = document.createElement("th"); th.innerHTML = "Процент";
      header.appendChild(th);
      th = document.createElement("th"); th.innerHTML = "Итоговая сумма";
      header.appendChild(th);

      for (let i = 0; i < results.length; i++) {
         let row = new_tbody.insertRow();
         for (let j = 0; j < 4; j++) {
            row.insertCell(j);
         }
         row.cells[0].appendChild(document.createTextNode(results[i]["bank"].bankName));
         row.cells[1].appendChild(document.createTextNode(initialAmount));
         row.cells[2].appendChild(document.createTextNode(results[i]["bank"].incomePercent));
         row.cells[3].appendChild(document.createTextNode(results[i]["sum"].toFixed(2)));
      }

      old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
   }
}

let res = [{ "bankName": "Газпромбанк", "investName": "Ваш успех", "currency": "RUB", "incomeType": 6.22, "sumMin": 50000, "sumMax": null, "termMin": 12, "termMax": 12, "canDeposit": false },
{ "bankName": "Кредит Европа Банк", "investName": "Оптимальный на 2 года", "currency": "RUB", "incomeType": 6.45, "sumMin": 100000, "sumMax": null, "termMin": 24, "termMax": 24, "canDeposit": false },
{ "bankName": "Банк Зенит", "investName": "Праздничный 500+", "currency": "RUB", "incomeType": 6, "sumMin": 30000, "sumMax": null, "termMin": 17, "termMax": 17, "canDeposit": false },
{ "bankName": "Еврофинанс Моснарбанк", "investName": "Классический", "currency": "RUB", "incomeType": 6.95, "sumMin": 30000, "sumMax": null, "termMin": 12, "termMax": 24, "canDeposit": false },
{ "bankName": "Джей энд Ти Банк", "investName": "Магнус-Онлайн", "currency": "RUB", "incomeType": 6.8, "sumMin": 100000, "sumMax": null, "termMin": 6, "termMax": 6, "canDeposit": false },
{ "bankName": "МТС Банк", "investName": "В вашу пользу", "currency": "RUB", "incomeType": 6.75, "sumMin": 50000, "sumMax": null, "termMin": 12, "termMax": 12, "canDeposit": true },
{ "bankName": "Эс-Би-Ай Банк", "investName": "Свои правила Онлайн", "currency": "RUB", "incomeType": 6.7, "sumMin": 30000, "sumMax": 30000000, "termMin": 24, "termMax": 24, "canDeposit": false },
{ "bankName": "Банк Уралсиб", "investName": "Прогноз отличный", "currency": "RUB", "incomeType": 6.7, "sumMin": 100000, "sumMax": null, "termMin": 37, "termMax": 37, "canDeposit": false },
{ "bankName": "Инвестторгбанк", "investName": "ИТБ-Постоянный доход", "currency": "RUB", "incomeType": 6.6, "sumMin": 50000, "sumMax": null, "termMin": 37, "termMax": 37, "canDeposit": false },
{ "bankName": "Транскапиталбанк", "investName": "ТКБ.Постоянный доход", "currency": "RUB", "incomeType": 6.6, "sumMin": 50000, "sumMax": null, "termMin": 37, "termMax": 37, "canDeposit": false },
{ "bankName": "Совкомбанк", "investName": "Зимний праздник с Халвой", "currency": "RUB", "incomeType": 5.6, "sumMin": 50000, "sumMax": null, "termMin": 2, "termMax": 2, "canDeposit": true },
{ "bankName": "Агророс", "investName": "Медовый месяц", "currency": "RUB", "incomeType": 5.51, "sumMin": 20000, "sumMax": null, "termMin": 1, "termMax": 1, "canDeposit": true },
{ "bankName": "Росдорбанк", "investName": "Онлайн-1", "currency": "RUB", "incomeType": 5.1, "sumMin": 100000, "sumMax": 150000000, "termMin": 1, "termMax": 1, "canDeposit": true },
{ "bankName": "Национальный Стандарт", "investName": "Сберегательный стандарт", "currency": "RUB", "incomeType": 5.1, "sumMin": 100000, "sumMax": null, "termMin": 1, "termMax": 3, "canDeposit": true },
{ "bankName": "Россия", "investName": "Морозные узоры", "currency": "RUB", "incomeType": 5, "sumMin": 100000, "sumMax": null, "termMin": 1, "termMax": 1, "canDeposit": true },
{ "bankName": "Кузнецкий Мост", "investName": "Накопительный", "currency": "RUB", "incomeType": 4.85, "sumMin": 50000, "sumMax": null, "termMin": 1, "termMax": 3, "canDeposit": true },
{ "bankName": "Тексбанк", "investName": "Универсальный", "currency": "RUB", "incomeType": 4.6, "sumMin": 10000, "sumMax": null, "termMin": 1, "termMax": 1, "canDeposit": true },
{ "bankName": "Морской Банк", "investName": "Правильным курсом +", "currency": "RUB", "incomeType": 4.55, "sumMin": 100000, "sumMax": null, "termMin": 1, "termMax": 3, "canDeposit": true },
{ "bankName": "Норвик Банк", "investName": "Лаконичный", "currency": "RUB", "incomeType": 4.5, "sumMin": 500, "sumMax": 50000000, "termMin": 1, "termMax": 1, "canDeposit": true },
{ "bankName": "Промсельхозбанк", "investName": "Конструктор", "currency": "RUB", "incomeType": 4.5, "sumMin": 10000, "sumMax": null, "termMin": 1, "termMax": 3, "canDeposit": true },
{ "bankName": "Акибанк", "investName": "Онлайн", "currency": "RUB", "incomeType": 6.5, "sumMin": 1000, "sumMax": null, "termMin": 6, "termMax": 6, "canDeposit": true },
{ "bankName": "Банк БКФ", "investName": "Ключевой стандарт", "currency": "RUB", "incomeType": 6.5, "sumMin": 100000, "sumMax": null, "termMin": 6, "termMax": 13, "canDeposit": true },
{ "bankName": "Экспобанк", "investName": "Специальный (в конце срока)", "currency": "RUB", "incomeType": 6.35, "sumMin": 50000, "sumMax": 10000000, "termMin": 6, "termMax": 6, "canDeposit": true },
{ "bankName": "Инвестторгбанк", "investName": "ИТБ-Пополняемый", "currency": "RUB", "incomeType": 6.15, "sumMin": 50000, "sumMax": 30000000, "termMin": 6, "termMax": 6, "canDeposit": true },
{ "bankName": "Транскапиталбанк", "investName": "ТКБ.Пополняемый", "currency": "RUB", "incomeType": 6.15, "sumMin": 50000, "sumMax": 30000000, "termMin": 6, "termMax": 6, "canDeposit": true },
{ "bankName": "Евроазиатский Инвестиционный Банк", "investName": "Классика", "currency": "RUB", "incomeType": 6.1, "sumMin": 100000, "sumMax": null, "termMin": 6, "termMax": 12, "canDeposit": true },
{ "bankName": "Тимер Банк", "investName": "Надежный выбор", "currency": "RUB", "incomeType": 6, "sumMin": 10000, "sumMax": null, "termMin": 6, "termMax": 6, "canDeposit": true },
{ "bankName": "Евразийский Банк", "investName": "TURBO MAXIMUM", "currency": "RUB", "incomeType": 6, "sumMin": 30000, "sumMax": 299999, "termMin": 6, "termMax": 6, "canDeposit": true },
{ "bankName": "Таврический Банк", "investName": "Достижимый (онлайн)", "currency": "RUB", "incomeType": 6, "sumMin": 50000, "sumMax": null, "termMin": 6, "termMax": 6, "canDeposit": true },
{ "bankName": "Экспобанк", "investName": "Юбилейный 25 (в конце срока)", "currency": "RUB", "incomeType": 6.5, "sumMin": 100000, "sumMax": 20000000, "termMin": 12, "termMax": 12, "canDeposit": true },
{ "bankName": "Крокус-Банк", "investName": "Ежемесячный доход", "currency": "RUB", "incomeType": 6.35, "sumMin": 50000, "sumMax": null, "termMin": 12, "termMax": 12, "canDeposit": true },
{ "bankName": "Промсельхозбанк", "investName": "Ваш выбор", "currency": "RUB", "incomeType": 6.3, "sumMin": 10000, "sumMax": null, "termMin": 12, "termMax": 12, "canDeposit": true },
{ "bankName": "Нацинвестпромбанк", "investName": "Прибыльный", "currency": "RUB", "incomeType": 6.3, "sumMin": 50000, "sumMax": null, "termMin": 12, "termMax": 12, "canDeposit": true },
{ "bankName": "Ишбанк", "investName": "Накопительный", "currency": "RUB", "incomeType": 6.25, "sumMin": 100000, "sumMax": null, "termMin": 12, "termMax": 12, "canDeposit": true },
{ "bankName": "Примсоцбанк", "investName": "Новогодний чулок (333 дня)", "currency": "RUB", "incomeType": 6.2, "sumMin": 10000, "sumMax": null, "termMin": 11, "termMax": 11, "canDeposit": true },
{ "bankName": "Еврофинанс Моснарбанк", "investName": "Пополняемый", "currency": "RUB", "incomeType": 6.75, "sumMin": 1000000, "sumMax": null, "termMin": 12, "termMax": 24, "canDeposit": true },
{ "bankName": "Евроазиатский Инвестиционный Банк", "investName": "VIP", "currency": "RUB", "incomeType": 6.35, "sumMin": 1000000, "sumMax": null, "termMin": 9, "termMax": 12, "canDeposit": true },
{ "bankName": "Российская Финансовая Корпорация", "investName": "Универсальный", "currency": "RUB", "incomeType": 6, "sumMin": 5000, "sumMax": null, "termMin": 3, "termMax": 3, "canDeposit": true },
{ "bankName": "Московский Кредитный Банк", "investName": "МЕГА Онлайн", "currency": "RUB", "incomeType": 5.8, "sumMin": 1000, "sumMax": null, "termMin": 3, "termMax": 5, "canDeposit": true },
{ "bankName": "Александровский", "investName": "Черника 19/20", "currency": "RUB", "incomeType": 5.6, "sumMin": 20000, "sumMax": null, "termMin": 3, "termMax": 3, "canDeposit": true },
{ "bankName": "Финанс Бизнес Банк", "investName": "Мандариновый!", "currency": "RUB", "incomeType": 5.6, "sumMin": 50000, "sumMax": null, "termMin": 3, "termMax": 3, "canDeposit": true },
{ "bankName": "ЦентроКредит", "investName": "Доход Плюс", "currency": "USD", "incomeType": 1.15, "sumMin": 5000, "sumMax": null, "termMin": 3, "termMax": 3, "canDeposit": true },
{ "bankName": "Совкомбанк", "investName": "Удобный (в долларах)", "currency": "USD", "incomeType": 1, "sumMin": 500, "sumMax": null, "termMin": 3, "termMax": 6, "canDeposit": true },
{ "bankName": "Веста", "investName": "Веста - Копилка", "currency": "USD", "incomeType": 1, "sumMin": 10000, "sumMax": null, "termMin": 3, "termMax": 6, "canDeposit": true },
{ "bankName": "Славия", "investName": "Славный Капитал", "currency": "USD", "incomeType": 0.85, "sumMin": 5000, "sumMax": null, "termMin": 3, "termMax": 4, "canDeposit": true },
{ "bankName": "Роскосмосбанк", "investName": "Комфортный", "currency": "USD", "incomeType": 0.8, "sumMin": 500, "sumMax": null, "termMin": 3, "termMax": 6, "canDeposit": true },
{ "bankName": "ФорБанк", "investName": "Срочный накопительный", "currency": "USD", "incomeType": 0.8, "sumMin": 10000, "sumMax": 500000, "termMin": 3, "termMax": 3, "canDeposit": true },
{ "bankName": "Московский Областной Банк", "investName": "Гарантированный доллар", "currency": "USD", "incomeType": 0.75, "sumMin": 50, "sumMax": null, "termMin": 4, "termMax": 4, "canDeposit": true },
{ "bankName": "Объединенный Резервный Банк", "investName": "ОРБ-Накопительный (в конце срока)", "currency": "USD", "incomeType": 1.6, "sumMin": 1000, "sumMax": null, "termMin": 12, "termMax": 12, "canDeposit": true },
{ "bankName": "Банк Агора", "investName": "Срочный", "currency": "USD", "incomeType": 1.5, "sumMin": 1000, "sumMax": null, "termMin": 12, "termMax": 12, "canDeposit": true },
{ "bankName": "Тинькофф Банк", "investName": "СмартВклад (с повышенной ставкой)", "currency": "USD", "incomeType": 1.5, "sumMin": 1000, "sumMax": null, "termMin": 12, "termMax": 12, "canDeposit": true },
{ "bankName": "Первый Инвестиционный Банк", "investName": "Закон сохранения", "currency": "USD", "incomeType": 1.5, "sumMin": 1000, "sumMax": null, "termMin": 12, "termMax": 12, "canDeposit": true },
{ "bankName": "Новый Век", "investName": "Сберегательный", "currency": "USD", "incomeType": 1.5, "sumMin": 5000, "sumMax": 20000, "termMin": 12, "termMax": 12, "canDeposit": true }
];





class BankProduct {
   constructor(bankName, investName, currency, incomePercent, sumMin, sumMax, termMin, termMax, canDeposit) {
      this.bankName = bankName;
      this.investName = investName;
      this.currency = currency;
      this.incomePercent = incomePercent;
      this.sumMin = sumMin;
      this.sumMax = sumMax;
      this.termMin = termMin;
      this.termMax = termMax;
      this.canDeposit = canDeposit;
   }

}

class Deposit {
   constructor(userCurrency, userDeposit, userTerm, userSumm) {
      this.userCurrency = userCurrency;
      this.userDeposit = userDeposit;
      this.userTerm = userTerm;
      this.userSumm = userSumm;

   }
}




class Calculator {
   constructor(interest, term, deposit, monthlyAddition) {
      this.interest = interest;
      this.term = term;
      this.deposit = deposit;
      this.monthlyAddition = monthlyAddition;
   }

   calculate() {
      let summ = this.deposit;
      for (let i = 0; i < this.term; i++) {
         summ *= (1 + this.interest / 100 / 12);
         summ += this.monthlyAddition;
      }
      summ -= this.monthlyAddition;
      return summ;
   }
}

let app = new Application();

