'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });
  
  it('should return nothing', () => {
    const money = 3000;
    const maxTankCapacity = 40;
    const fuelRemains = 8;
    const fuelPrice = 2;
    const customer = makeNewCustomer(money, maxTankCapacity, fuelRemains);

    expect(fillTank(customer, fuelPrice)).toBeUndefined();
  });

  it('amount is not given', () => {
    const money = 3000;
    const maxTankCapacity = 40;
    const fuelRemains = 8;
    const fuelPrice = 2;
    const customer = makeNewCustomer(money, maxTankCapacity, fuelRemains);

    fillTank(customer, fuelPrice);

    const leftMoney = money - fuelPrice * (maxTankCapacity - fuelRemains);

    expect(customer.money)
      .toBe(leftMoney);

    expect(customer.vehicle.fuelRemains)
      .toBe(customer.vehicle.maxTankCapacity);
  });

  it('amount is greater than can accommodate', () => {
    const money = 3000;
    const maxTankCapacity = 40;
    const fuelRemains = 8;
    const fuelPrice = 2;
    const amount = 40;
    const customer = makeNewCustomer(money, maxTankCapacity, fuelRemains);

    fillTank(customer, fuelPrice, amount);

    const leftMoney = money - fuelPrice * (maxTankCapacity - fuelRemains);

    expect(customer.money)
      .toBe(leftMoney);

    expect(customer.vehicle.fuelRemains)
      .toBe(customer.vehicle.maxTankCapacity);
  });

  it('amount is greater than can be bought', () => {
    const money = 500;
    const maxTankCapacity = 40;
    const fuelRemains = 20;
    const fuelPrice = 50;
    const amount = 20;
    const customer = makeNewCustomer(money, maxTankCapacity, fuelRemains);
    const canBuy = money / fuelPrice;
    const freeSpace = maxTankCapacity - fuelRemains;
    const requiredAmount = Math.min(amount, freeSpace, canBuy);
    const moneyLeft = money - requiredAmount * fuelPrice;

    fillTank(customer, fuelPrice, requiredAmount);

    expect(customer.money)
      .toBe(moneyLeft);

    expect(customer.vehicle.fuelRemains)
      .toBe(fuelRemains + requiredAmount);
  });

  it('amount is less than 2 liters', () => {
    const money = 500;
    const maxTankCapacity = 40;
    const fuelRemains = 20;
    const fuelPrice = 50;
    const amount = 1;
    const customer = makeNewCustomer(money, maxTankCapacity, fuelRemains);

    fillTank(customer, fuelPrice, amount);

    expect(customer.money)
      .toBe(money);

    expect(customer.vehicle.fuelRemains)
      .toBe(fuelRemains);
  });

  it('Free space is less than 2 liters', () => {
    const money = 1500;
    const maxTankCapacity = 40;
    const fuelRemains = 39;
    const fuelPrice = 50;
    const customer = makeNewCustomer(money, maxTankCapacity, fuelRemains);

    fillTank(customer, fuelPrice);

    expect(customer.money)
      .toBe(money);

    expect(customer.vehicle.fuelRemains)
      .toBe(fuelRemains);
  });

  it('Money is not enough for 2 liters', () => {
    const money = 150;
    const maxTankCapacity = 40;
    const fuelRemains = 20;
    const fuelPrice = 100;
    const customer = makeNewCustomer(money, maxTankCapacity, fuelRemains);

    fillTank(customer, fuelPrice);

    expect(customer.money)
      .toBe(money);

    expect(customer.vehicle.fuelRemains)
      .toBe(fuelRemains);
  });

  it('Poured amount is rounded to the nearest tenth part', () => {
    const money = 1500;
    const maxTankCapacity = 40;
    const fuelRemains = 10;
    const fuelPrice = 50;
    const amount = 15.75;
    const customer = makeNewCustomer(money, maxTankCapacity, fuelRemains);
    const canBuy = money / fuelPrice;
    const freeSpace = maxTankCapacity - fuelRemains;
    const requiredAmount = Math.min(amount, freeSpace, canBuy);
    const roundedAmount = Math.floor(requiredAmount * 10) / 10;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains - fuelRemains)
      .toBe(roundedAmount);
  });

  it('Price is rounded to the nearest hundredth part', () => {
    const money = 1500;
    const maxTankCapacity = 40;
    const fuelRemains = 10;
    const fuelPrice = 50.75;
    const amount = 15.5;
    const customer = makeNewCustomer(money, maxTankCapacity, fuelRemains);
    const canBuy = money / fuelPrice;
    const freeSpace = maxTankCapacity - fuelRemains;
    const requiredAmount = Math.min(amount, freeSpace, canBuy);
    const roundedAmount = Math.floor(requiredAmount * 10) / 10;
    const roundedPrice = Math.round(roundedAmount * fuelPrice * 100) / 100;

    fillTank(customer, fuelPrice, amount);

    expect(money - customer.money)
      .toBe(roundedPrice);
  });
});

function makeNewCustomer(money, maxTankCapacity, fuelRemains) {
  return {
    money,
    vehicle: {
      maxTankCapacity,
      fuelRemains,
    },
  };
}
