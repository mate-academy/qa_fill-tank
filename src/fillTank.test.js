'use strict';

const { fillTank } = require('./fillTank'); // розкоментуй та поправ шлях

describe('fillTank', () => {
  it('should fill tank correctly when there is enough money and space', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 45,
      },
    };
    const fuelPrice = 2;

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toBe(50);
    // заповнив весь вільний простір

    expect(customer.money).toBeCloseTo(90);
    // 100 - 5*2 = 90
  });

  it('should not fill tank if amount to fill is less than 2 liters', () => {
    const customer = {
      money: 5,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 49.9,
      },
    };
    const fuelPrice = 2;

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toBe(49.9);
    // не заправляє

    expect(customer.money).toBe(5);
  });

  it('should not fill more than specified amount', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 40,
      },
    };
    const fuelPrice = 2;
    const amount = 3;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(43);

    expect(customer.money).toBeCloseTo(94);
  });

  it('should not fill more than customer can afford', () => {
    const customer = {
      money: 4,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 40,
      },
    };
    const fuelPrice = 2;
    const amount = 10;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(42);

    expect(customer.money).toBeCloseTo(0);
  });

  it('should round fuel amount correctly', () => {
    const customer = {
      money: 10,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 45.05,
      },
    };
    const fuelPrice = 2;

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toBeCloseTo(49.95);

    expect(customer.money).toBeCloseTo(0.2);
  });
});
