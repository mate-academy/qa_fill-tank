'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should return undefined', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const result = fillTank(customer, 30);

    expect(result).toBe(undefined);
  });

  it('Full tank is ordered, if amound is not given', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 30);

    expect(customer).toEqual({
      money: 2040,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it('if amount too big, then full tank is ordered', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 30, 99999);

    expect(customer).toEqual({
      money: 2040,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it('fill in only hat the client can pay', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 300, 35);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 15,
      },
    });
  });

  it('round the poured amount by discarding number to the tenth part', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 30, 20.796);

    expect(customer).toEqual({
      money: 2379,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 28.7,
      },
    });
  });

  it('if the poured amount is less than 2 liters, do not pour at all', () => {
    const customer = {
      money: 59,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 30);

    expect(customer).toEqual({
      money: 59,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    });
  });

  it('round the price to the nearet hundredth part', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 60,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 17.989, 40);

    expect(customer).toEqual({
      money: 2280.44,
      vehicle: {
        maxTankCapacity: 60,
        fuelRemains: 50,
      },
    });
  });
});
