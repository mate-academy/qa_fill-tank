'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should full tank if amount is not defined.', () => {
    const customer = {
      money: 4000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 49);

    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('should puor only what fit if amount > free space in tank', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 49, 40);

    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('should fill in only customer.money / fuelPrice', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 1,
      },
    };

    fillTank(customer, 999, 44);

    expect(customer.vehicle.fuelRemains).toBe(4);
  });

  it('should round down to tenth part poured amount', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 1,
      },
    };

    fillTank(customer, 300);

    expect(customer.vehicle.fuelRemains).toBe(4.3);
  });

  it('should do nothing if poured amount < 2 liters', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 1,
      },
    };

    fillTank(customer, 600);

    expect(customer.vehicle.fuelRemains).toBe(1);
  });

  it('should round fuel price', () => {
    const customer = {
      money: 5000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 2,
      },
    };

    fillTank(customer, 60.29223);

    expect(customer.money).toBe(2708.9);
  });
});
