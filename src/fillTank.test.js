'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be a function', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('should fill a full tank without amount', () => {
    const customer = {
      money: 3000, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 8, // Remaining fuel in the tank
      },
    };

    fillTank(customer, 20);

    const resultCustomer = {
      money: 2360,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    };

    const returnValue = fillTank(customer, 20);
    expect(returnValue).toBeUndefined();

    expect(customer).toEqual(resultCustomer);
  });

  it('only free volume is filled if requested amount > tank capacity', () => {
    const customer = {
      money: 2000, // customer account balance
      vehicle: {
        maxTankCapacity: 30, // fuel tank volume
        fuelRemains: 5, // Remaining fuel in the tank
      },
    };

    fillTank(customer, 15, 40);

    const resultCustomer = {
      money: 1625,
      vehicle: {
        maxTankCapacity: 30,
        fuelRemains: 30,
      },
    };

    expect(customer).toEqual(resultCustomer);
  });

  it('if the customer can only pay for part of the requested amount', () => {
    const customer = {
      money: 500, // customer account balance
      vehicle: {
        maxTankCapacity: 50, // fuel tank volume
        fuelRemains: 3, // Remaining fuel in the tank
      },
    };

    fillTank(customer, 15, 43);

    const resultCustomer = {
      money: 0.5,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 36.3,
      },
    };

    expect(customer).toEqual(resultCustomer);
  });

  it('if less than 2 liters are added, nothing changes', () => {
    const customer = {
      money: 1000, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 39, // Remaining fuel in the tank
      },
    };

    fillTank(customer, 15, 1);

    const resultCustomer = {
      money: 1000, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 39, // Remaining fuel in the tank
      },
    };

    expect(customer).toEqual(resultCustomer);
  });

  it('should round correctly fuelRemains and money', () => {
    const customer = {
      money: 1000, // customer account balance
      vehicle: {
        maxTankCapacity: 50, // fuel tank volume
        fuelRemains: 46.544, // Remaining fuel in the tank
      },
    };

    fillTank(customer, 1.5, 10);

    expect(customer.vehicle.fuelRemains).toBeCloseTo(49.944, 3);
    expect(customer.money).toBeCloseTo(994.9, 2);
  });

  it('should round round the total price to the nearest hundredth', () => {
    const customer = {
      money: 1000, // customer account balance
      vehicle: {
        maxTankCapacity: 50, // fuel tank volume
        fuelRemains: 10.044, // Remaining fuel in the tank
      },
    };

    fillTank(customer, 1.23456, 40);

    expect(customer.vehicle.fuelRemains).toBeCloseTo(49.944, 3);
    expect(customer.money).toBeCloseTo(950.75, 1);
  });
});
