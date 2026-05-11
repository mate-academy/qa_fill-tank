'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should not return value', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    expect(fillTank(customer, 10, 10)).toBe(undefined);
  });

  it('should not pour less than 2 liters', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 1);

    expect(customer).toEqual({
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    });

    const customer2 = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 39,
      },
    };

    fillTank(customer2, 10);

    expect(customer2).toEqual({
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 39,
      },
    });
  });

  it('should pour full tank if the `amount` is not given', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 30,
      },
    };

    fillTank(customer, 10);

    expect(customer).toEqual({
      money: 2900,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it('should pour only what will fit', () => {
    const customer = {
      money: 50,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 30,
      },
    };

    fillTank(customer, 10, 10);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 35,
      },
    });
  });

  it('should round the amount by discarding number to the tenth part', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 10, 10.59);

    expect(customer).toEqual({
      money: 2895,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20.5,
      },
    });

    const customer2 = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 10,
        fuelRemains: 0.45,
      },
    };

    fillTank(customer2, 10);

    expect(customer2).toEqual({
      money: 905,
      vehicle: {
        maxTankCapacity: 10,
        fuelRemains: 9.95,
      },
    });

    const customer3 = {
      money: 677.25,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 1,
      },
    };

    fillTank(customer3, 10);

    expect(customer3).toEqual({
      money: 0.25,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 68.7,
      },
    });
  });

  it('should round the fuel price to the nearest hundredth part', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 200,
        fuelRemains: 60,
      },
    };

    fillTank(customer, 7.99, 137.4);

    expect(customer).toEqual({
      money: 1902.17,
      vehicle: {
        maxTankCapacity: 200,
        fuelRemains: 197.4,
      },
    });
  });
});
