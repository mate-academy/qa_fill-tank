'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  let customer;
  let fuelPrice;

  beforeEach(() => {
    fuelPrice = 1.5;

    customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };
  });

  it(`should be declared`, () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it(`should not return anything`, () => {
    expect(fillTank(customer, fuelPrice, 60)).toBeUndefined();
  });

  it(`should fill the tank to the maximum when the amount is not given`, () => {
    customer.money = 100;
    customer.vehicle.fuelRemains = 10;

    const initialFuel = customer.vehicle.fuelRemains;
    const initialMoney = customer.money;

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toBe(initialFuel + 40);
    expect(customer.money).toBeCloseTo(initialMoney - 40 * fuelPrice, 2);
  });

  it(
    `should pour only what will fill ` +
      `if the amount is greater than the tank can accommodate`,
    () => {
      customer.money = 100;
      customer.vehicle.fuelRemains = 20;

      const initialFuel = customer.vehicle.fuelRemains;
      const initialMoney = customer.money;

      fillTank(customer, fuelPrice, 50);

      expect(customer.vehicle.fuelRemains).toBe(initialFuel + 30);
      expect(customer.money).toBeCloseTo(initialMoney - 30 * fuelPrice, 2);
    }
  );

  it(`should round the price to the nearest hundredth part`, () => {
    customer.money = 100;
    customer.vehicle.fuelRemains = 10;

    fillTank(customer, fuelPrice, 25.5);

    expect(customer.money).toBeCloseTo(100 - 38.25, 2);
  });

  it(`should not fill the tank if poured amount is less then 2 liters`, () => {
    const initialFuel = customer.vehicle.fuelRemains;
    const initialMoney = customer.money;

    fillTank(customer, fuelPrice, 1);

    expect(customer.vehicle.fuelRemains).toBe(initialFuel);
    expect(customer.money).toBe(initialMoney);
  });

  it(`should round the poured amount by discarding number to the tenth part`, () => {
    const initialFuel = customer.vehicle.fuelRemains;
    const initialMoney = customer.money;

    fillTank(customer, fuelPrice, 7.345);

    expect(customer.vehicle.fuelRemains).toBeCloseTo(initialFuel + 7.3, 1);
    expect(customer.money).toBeCloseTo(initialMoney - 7.3 * fuelPrice, 2);
  });

  it(`should fill the tank only if the client can pay for it`, () => {
    customer.money = 20;
    customer.vehicle.fuelRemains = 10;
    customer.maxTankCapacity = 50;

    fuelPrice = 2;

    const amount = Infinity;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(20);
    expect(customer.money).toBe(0);
  });
});
