'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank.js');

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('should does NOT return anything', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const result = fillTank(customer, 50, 5);

    expect(result).toBeUndefined();
  });

  it('should pour only what customer can pay when amount is omitted', () => {
    const customer = {
      money: 300,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 14,
      },
    });
  });

  it('should fills only what fits in tank when amount is bigger', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 40, 100);

    expect(customer).toEqual({
      money: 1720,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it('should fills only what customer can afford', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50, 10);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    });
  });

  it('should rounds fuel DOWN to tenths', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 23.3,
      },
    };

    fillTank(customer, 41.33, 2.343);

    expect(customer).toEqual({
      money: 904.94,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 25.6,
      },
    });
  });

  it('should does NOT fill if result is less than 2 liters', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 39,
      },
    };

    fillTank(customer, 40, 40);

    expect(customer).toEqual({
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 39,
      },
    });
  });

  it('should rounds money to nearest hundredths', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 1.999, 7.777);

    expect(customer).toEqual({
      money: 2984.61,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 15.7,
      },
    });
  });
});
