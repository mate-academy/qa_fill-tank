'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should fill fuel tank when has not been specified', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 1.5);

    // Перевіряємо, що гроші зменшились на 30 (1.5 * 32)
    expect(customer.money).toBe(2952);
    // Перевіряємо, що fuelRemains збільшився на 32
    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('should fill only what will fill the tank', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 1.5, 50);

    // Перевіряємо, що гроші зменшились на 30 (1.5 * 32)
    expect(customer.money).toBe(2952);
    // Перевіряємо, що fuelRemains збільшився на 32
    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('should fill only what the client can pay', () => {
    const customer = {
      money: 10,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 1);

    // Перевіряємо, що гроші не змінились
    expect(customer.money).toBe(0);
    // Перевіряємо, що fuelRemains не змінився
    expect(customer.vehicle.fuelRemains).toBe(18);
  });

  it('Should fill fuel in the specified amount', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 1.5, 20);

    // Перевіряємо, що гроші зменшились на 30 (1.5 * 20)
    expect(customer.money).toBe(2970);
    // Перевіряємо, що fuelRemains збільшився на 20
    expect(customer.vehicle.fuelRemains).toBe(28);
  });

  it('should not fill if amount less 2 liters', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 1.5, 1);

    // Перевіряємо, що гроші не змінились
    expect(customer.money).toBe(3000);
    // Перевіряємо, що fuelRemains не змінився
    expect(customer.vehicle.fuelRemains).toBe(8);
  });

  it('should round poured amount down to the tenth part', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };

    // Спроба залити 12.78 літрів
    fillTank(customer, 2, 12.78);

    // fuelRemains має збільшитись на 12.7 (відкидаємо до десятої)
    expect(customer.vehicle.fuelRemains).toBe(22.7);
  });

  it('should round the price of purchased fuel', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };

    // 7.3 літрів * 2.555 = 18.747115, округлюємо до 18.75
    fillTank(customer, 2.555, 7.333);

    // money має зменшитись на 18.65
    expect(customer.money).toBeCloseTo(981.35, 2);
  });
});
