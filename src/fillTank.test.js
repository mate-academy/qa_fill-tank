'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');
  let customer;
  let fuelPrice;
  let amount;

  beforeEach(() => {
    customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fuelPrice = 10;

    amount = 7;
  });

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('should fill in the tank', () => {
    const expectedFuelRemains = customer.vehicle.fuelRemains + amount;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toEqual(expectedFuelRemains);
  });

  it('should withdraw money', () => {
    const expectedPayment = fuelPrice * amount;
    const expectedFuelRemains = customer.money - expectedPayment;

    fillTank(customer, fuelPrice, amount);

    expect(customer.money).toEqual(expectedFuelRemains);
  });

  it('should fill full tank when no amount', () => {
    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains)
      .toEqual(customer.vehicle.maxTankCapacity);
  });

  it('should withdraw money when no anount', () => {
    const expectedPayment = (customer.vehicle.maxTankCapacity
      - customer.vehicle.fuelRemains) * fuelPrice;
    const moneyRemain = customer.money - expectedPayment;

    fillTank(customer, fuelPrice);

    expect(customer.money).toEqual(moneyRemain);
  });

  it('should fill full tank when amount is too big', () => {
    amount = customer.vehicle.maxTankCapacity + 1;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains)
      .toEqual(customer.vehicle.maxTankCapacity);
  });

  it('should withdraw money when anount is too big', () => {
    const expectedPayment = (customer.vehicle.maxTankCapacity
      - customer.vehicle.fuelRemains) * fuelPrice;
    const moneyRemain = customer.money - expectedPayment;

    amount = customer.vehicle.maxTankCapacity + 1;

    fillTank(customer, fuelPrice, amount);

    expect(customer.money).toEqual(moneyRemain);
  });

  it('should fill only affordable amount', () => {
    fuelPrice = 100;

    const affordableAmount = Math.floor(customer.money / fuelPrice * 10) / 10;
    const expectedFuelRemains = customer.vehicle.fuelRemains
      + affordableAmount;

    fillTank(customer, fuelPrice);
    expect(customer.vehicle.fuelRemains).toEqual(expectedFuelRemains);
  });

  it('should withdraw money for affordable amount', () => {
    fuelPrice = 99;

    const affordableAmount = Math.floor((customer.money / fuelPrice) * 10) / 10;
    const expectedMoneyWithdraw = Math.round(
      (affordableAmount * fuelPrice) * 100
    ) / 100;
    const expectedMoneyRemains = customer.money - expectedMoneyWithdraw;

    fillTank(customer, fuelPrice);
    expect(customer.money).toEqual(expectedMoneyRemains);
  });

  it('fuel rounded down to tenths', () => {
    amount = 5.559;

    const expectedFuelRemains = customer.vehicle.fuelRemains
      + Math.floor(amount * 10) / 10;

    fillTank(customer, fuelPrice, amount);
    expect(customer.vehicle.fuelRemains).toEqual(expectedFuelRemains);
  });

  it('payment rounded to the nearest hundredth', () => {
    fuelPrice = 5.559;

    const expectedPayment = Math.round((fuelPrice * amount) * 100) / 100;
    const expectedMoneyRemains = customer.money - expectedPayment;

    fillTank(customer, fuelPrice, amount);
    expect(customer.money).toEqual(expectedMoneyRemains);
  });

  it("shouldn't fill in the tank when amount less than 2 l", () => {
    customer.vehicle.fuelRemains = customer.vehicle.maxTankCapacity - 1;

    const expectedFuelRemains = customer.vehicle.fuelRemains;

    fillTank(customer, fuelPrice);
    expect(customer.vehicle.fuelRemains).toEqual(expectedFuelRemains);
  });

  it("shouldn't withdraw money when amount less than 2 l", () => {
    customer.vehicle.fuelRemains = customer.vehicle.maxTankCapacity - 1;

    const expectedMoneyRemains = customer.money;

    fillTank(customer, fuelPrice);
    expect(customer.money).toEqual(expectedMoneyRemains);
  });
});
