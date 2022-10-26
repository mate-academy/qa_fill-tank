'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank)
      .toBeInstanceOf(Function);
  });

  it(`shouldn't return anything`, () => {
    const mockCustomer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const result = fillTank(mockCustomer, 40, 7);

    expect(result).toBeUndefined();
  });

  it(`should fill a full tank if 'amount' is not passed`, () => {
    const mockCustomer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(mockCustomer, 40);

    expect(mockCustomer.vehicle.fuelRemains).toBe(40);
  });

  it(`should fill a full tank if the amount is greater`
    + ` than the tank holds`, () => {
    const mockCustomer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(mockCustomer, 40, 50);

    expect(mockCustomer.vehicle.fuelRemains).toBe(40);
  });

  it('should fill in as much fuel as there are enough money', () => {
    const mockCustomer = {
      money: 150,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(mockCustomer, 50, 5);

    expect(mockCustomer.vehicle.fuelRemains).toBe(11);
  });

  it('should not necessary to refuel if less than 2 liters', () => {
    const mockCustomer = {
      money: 150,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(mockCustomer, 50, 1);

    expect(mockCustomer.vehicle.fuelRemains).toBe(8);
  });

  it(`should not to refuel if the money are enough`
   + ` for less than 2 liters`, () => {
    const mockCustomer = {
      money: 150,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(mockCustomer, 100);

    expect(mockCustomer.vehicle.fuelRemains).toBe(8);
  });

  it(`The fuel to be poured into the tank should`
    + ` be rounded to the nearest tenth`, () => {
    const mockCustomer = {
      money: 200,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(mockCustomer, 15.14);

    expect(mockCustomer.vehicle.fuelRemains).toBe(21.2);
  });

  it(`The remaining money should be rounded to the nearest hundredth`, () => {
    const mockCustomer = {
      money: 200,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(mockCustomer, 15.57, 5);

    expect(mockCustomer.money).toBe(122.15);
  });
});
