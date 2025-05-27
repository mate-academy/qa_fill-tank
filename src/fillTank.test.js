'use strict';

const { fillTank } = require('./fillTank');

describe('fillTank', () => {
  test('повна заправка при достатньо грошей', () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 40, fuelRemains: 10,
      },
    };

    fillTank(customer, 50);
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(500);
  });

  test('заправка заданої кількості пального', () => {
    const customer = {
      money: 300,
      vehicle: {
        maxTankCapacity: 60, fuelRemains: 20,
      },
    };

    fillTank(customer, 10, 5);
    expect(customer.vehicle.fuelRemains).toBe(25);
    expect(customer.money).toBe(250);
  });

  test('не заправляє, якщо в баку мало місця (<2л)', () => {
    const customer = {
      money: 500,
      vehicle: {
        maxTankCapacity: 35, fuelRemains: 34,
      },
    };

    fillTank(customer, 10, 10);
    expect(customer.vehicle.fuelRemains).toBe(34);
    expect(customer.money).toBe(500);
  });

  test('не заправляє, якщо грошей вистачає <2л', () => {
    const customer = {
      money: 15,
      vehicle: {
        maxTankCapacity: 50, fuelRemains: 10,
      },
    };

    fillTank(customer, 10, 5);
    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(15);
  });

  test('правильне округлення пального і ціни', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 30, fuelRemains: 5,
      },
    };

    fillTank(customer, 3.333, 10);
    expect(customer.vehicle.fuelRemains).toBe(15);
    expect(customer.money).toBeCloseTo(66.67, 2);
  });
});
