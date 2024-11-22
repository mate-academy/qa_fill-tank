'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('fillTank function should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('should fill the tank to full if amount is not specified', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 50;

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(1400);
  });

  it('should only fill the amount specified if it fits in the tank', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };
    const fuelPrice = 60;
    const amount = 5;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(15);
    expect(customer.money).toBe(2700);
  });

  it('should only pour up to the tank’s max capacity if amount is too large',
    () => {
      const customer = {
        money: 5000,
        vehicle: {
          maxTankCapacity: 30,
          fuelRemains: 20,
        },
      };
      const fuelPrice = 55;
      const amount = 15;

      fillTank(customer, fuelPrice, amount);

      expect(customer.vehicle.fuelRemains).toBe(30);
      expect(customer.money).toBe(4450);
    });

  it('should only fill what the customer can afford', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };
    const fuelPrice = 45;
    const amount = 10;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(12.2);
    expect(customer.money).toBe(1);
  });

  it('should round down the poured amount to the nearest tenth', () => {
    const customer = {
      money: 1500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 35,
      },
    };
    const fuelPrice = 70;

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(1150);
  });

  it('should not pour fuel if the calculated amount is less than 2 liters',
    () => {
      const customer = {
        money: 60,
        vehicle: {
          maxTankCapacity: 20,
          fuelRemains: 19,
        },
      };
      const fuelPrice = 30;

      fillTank(customer, fuelPrice);

      expect(customer.vehicle.fuelRemains).toBe(19);
      expect(customer.money).toBe(60);
    });

  it('should round the fuel price to the nearest hundredth', () => {
    const customer = {
      money: 500,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 45,
      },
    };
    const fuelPrice = 33.333;

    fillTank(customer, fuelPrice, 4);

    expect(customer.vehicle.fuelRemains).toBe(49);
    expect(customer.money).toBeCloseTo(366.67, 2);
  });
});
