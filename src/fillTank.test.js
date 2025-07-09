'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');
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

  it('should ', () => {

  });

  it('Should fill up a full tank if there is enough money', () => {
    fillTank(customer, 50, 32); // 32 літри до повного
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(3000 - (32 * 50));
  });

  it('Should not fill up if the customer asks for less than 2 liters', () => {
    fillTank(customer, 50, 1.9);
    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(3000);
  });

  it('Fills with available amount if money is insufficient', () => {
    customer.money = 500; // цього вистачить лише на 10 літрів по 50 грн
    fillTank(customer, 50, 20);
    expect(customer.vehicle.fuelRemains).toBe(18); // 8 + 10
    expect(customer.money).toBe(0);
  });

  it('Fills to full even with extra money', () => {
    customer.vehicle.fuelRemains = 38; // 2 літри до повного
    fillTank(customer, 10, 2); // хоче 5
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(3000 - (2 * 10));
  });

  it('Should round the amount of fuel to the nearest 0.1', () => {
    customer.money = 100;
    fillTank(customer, 6.66, 100); // 100 літрів не влізе
    // max 32л до повного, але по грошах: 100 / 6.66 ≈ 15.015
    // округлено до 15.0
    expect(customer.vehicle.fuelRemains).toBe(8 + 15);
    expect(customer.money).toBeCloseTo(0, 0);
  });
});
// write tests here
