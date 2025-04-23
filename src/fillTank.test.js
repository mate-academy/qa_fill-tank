'use strict';

const { fillTank } = require('./fillTank');

describe('fillTank', () => {
  it('should fill up to a full tank if amount is not specified', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };

    // Убираем третий аргумент — проверяем поведение по умолчанию
    fillTank(customer, 10);
    expect(customer.vehicle.fuelRemains).toBe(50); // должен быть полный бак
  });

  // остальные тесты оставляем как есть
  it('should not exceed max tank capacity', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 35,
      },
    };

    fillTank(customer, 10, 10);
    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('should not exceed customer\'s money', () => {
    const customer = {
      money: 50,
      vehicle: {
        maxTankCapacity: 60,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 10, 10);
    expect(customer.vehicle.fuelRemains).toBe(5);
    expect(customer.money).toBe(0);
  });

  it('should round down amount to 0.1L', () => {
    const customer = {
      money: 300,
      vehicle: {
        maxTankCapacity: 20,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 19.99, 5.567);
    expect(customer.vehicle.fuelRemains).toBe(15.5);
  });

  it('should not fill if less than 2L can be afforded', () => {
    const customer = {
      money: 19.98,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 10);
    expect(customer.vehicle.fuelRemains).toBe(10);
  });

  it('should round the price to two decimal places', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 20,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 4.567, 10);
    expect(customer.money).toBeCloseTo(54.33, 2);
  });
});
