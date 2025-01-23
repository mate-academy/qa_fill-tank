'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be a function', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('should fill the tank', () => {
    const customer = {
      money: 500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    };

    const result = {
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 50, 15);

    expect(customer).toEqual(result);
  });

  it('should do nothing if balance is less then price', () => {
    const customer = {
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const result = {
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50, 5);

    expect(customer).toEqual(result);
  });

  it('should pour full tank if amount is not given', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 30,
      },
    };

    const result = {
      money: 2500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    };

    fillTank(customer, 50);

    expect(customer).toEqual(result);
  });

  it('should pour full tank if amount is greater than tank', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20,
      },
    };

    const result = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    };

    fillTank(customer, 50, 25);

    expect(customer).toEqual(result);
  });

  it('should dont do anything if poured fuel is less than 2 liters', () => {
    const customer = {
      money: 50,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20,
      },
    };

    const result = {
      money: 50,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20,
      },
    };

    fillTank(customer, 50, 1);

    expect(customer).toEqual(result);
  });

  it('should round the amount by discarding number to the tenth part.', () => {
    const customer = {
      money: 600,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 9, 10.239);
    expect(customer.vehicle.fuelRemains).toBe(15.2);
  });

  it('should round the price of fuel the to the nearest hundredth part', () => {
    const customer = {
      money: 930,
      vehicle: {
        maxTankCapacity: 30,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 36.5, 23);

    expect(customer.money).toBe(90.50);
    expect(customer.vehicle.fuelRemains).toBe(28);
  });
});
