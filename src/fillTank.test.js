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

  test('fills full tank when amount not provided and customer can pay', () => {
    const price = 10;

    fillTank(customer, price);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBeCloseTo(3000 - 32 * price, 2);
  });

  test('does not pour more than free tank space when amount too large', () => {
    const price = 5;

    fillTank(customer, price, 100);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBeCloseTo(3000 - 32 * price, 2);
  });

  test('only pours what customer can afford', () => {
    customer.money = 50;

    const price = 5;

    fillTank(customer, price, 20);

    expect(customer.vehicle.fuelRemains).toBeCloseTo(8 + 10, 1);
    expect(customer.money).toBeCloseTo(0, 2);
  });

  test('rounds poured liters by discarding after first decimal', () => {
    customer.money = 100;
    customer.vehicle.fuelRemains = 0;

    const price = 3;

    fillTank(customer, price, 50);

    expect(customer.vehicle.fuelRemains).toBeCloseTo(33.3, 1);

    expect(customer.money).toBeCloseTo(
      100 - Number((33.3 * price).toFixed(2)),
      2
    );
  });

  test('does nothing if affordable amount is less than 2 liters', () => {
    customer.money = 3;

    const price = 2;

    const beforeFuel = customer.vehicle.fuelRemains;
    const beforeMoney = customer.money;

    fillTank(customer, price, 10);

    expect(customer.vehicle.fuelRemains).toBe(beforeFuel);
    expect(customer.money).toBeCloseTo(beforeMoney, 2);
  });

  test('rounds charge amount to nearest hundredth', () => {
    customer.vehicle.fuelRemains = 0;
    customer.money = 100;

    const price = 1.234;

    fillTank(customer, price, 10);

    expect(customer.vehicle.fuelRemains).toBeCloseTo(10, 1);

    expect(customer.money).toBeCloseTo(
      100 - Number((10 * price).toFixed(2)),
      2
    );
  });
});
