'use strict';

const { fillTank } = require('./fillTank');

describe('fillTank', () => {
  let customer;

  beforeEach(() => {
    customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
  });

  it('fills full tank if amount not given', () => {
    fillTank(customer, 10);

    const fuel = customer.vehicle.fuelRemains;
    const money = customer.money;
    const expectedFuel = 40;
    const expectedMoney = 3000 - 320;

    expect(fuel).toBe(expectedFuel);
    expect(money).toBeCloseTo(expectedMoney, 2);
  });

  it('fills up to requested amount within space and money', () => {
    fillTank(customer, 10, 20);

    const fuel = customer.vehicle.fuelRemains;
    const money = customer.money;
    const expectedFuel = 28;
    const expectedMoney = 3000 - 200;

    expect(fuel).toBe(expectedFuel);
    expect(money).toBeCloseTo(expectedMoney, 2);
  });

  it('fills only available space if amount too large', () => {
    fillTank(customer, 10, 50);

    const fuel = customer.vehicle.fuelRemains;
    const money = customer.money;
    const expectedFuel = 40;
    const expectedMoney = 3000 - 320;

    expect(fuel).toBe(expectedFuel);
    expect(money).toBeCloseTo(expectedMoney, 2);
  });

  it('fills only what customer can afford', () => {
    customer.money = 50;

    fillTank(customer, 10, 10);

    const fuel = customer.vehicle.fuelRemains;
    const money = customer.money;
    const expectedFuel = 13;
    const expectedMoney = 0;

    expect(fuel).toBe(expectedFuel);
    expect(money).toBeCloseTo(expectedMoney, 2);
  });

  it('discards tenths in fuel amount', () => {
    customer.money = 100;

    fillTank(customer, 3, 20);

    const fuel = customer.vehicle.fuelRemains;
    const money = customer.money;
    const expectedFuel = 28;
    const expectedMoney = 40;

    expect(fuel).toBe(expectedFuel);
    expect(money).toBeCloseTo(expectedMoney, 2);
  });

  it('does not pour if amount < 2 liters', () => {
    fillTank(customer, 1000, 1.5);

    const fuel = customer.vehicle.fuelRemains;
    const money = customer.money;
    const expectedFuel = 8;
    const expectedMoney = 3000;

    expect(fuel).toBe(expectedFuel);
    expect(money).toBeCloseTo(expectedMoney, 2);
  });

  it('rounds price to nearest hundredth', () => {
    fillTank(customer, 3.333, 10);

    const fuel = customer.vehicle.fuelRemains;
    const money = customer.money;
    const expectedFuel = 18;
    const expectedMoney = 3000 - 33.33;

    expect(fuel).toBe(expectedFuel);
    expect(money).toBeCloseTo(expectedMoney, 2);
  });

  it('respects all constraints together', () => {
    customer.money = 25;

    fillTank(customer, 10, 5);

    const fuel = customer.vehicle.fuelRemains;
    const money = customer.money;
    const expectedFuel = 10.5;
    const expectedMoney = 0;

    expect(fuel).toBe(expectedFuel);
    expect(money).toBeCloseTo(expectedMoney, 2);
  });
});
