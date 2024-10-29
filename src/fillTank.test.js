'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should fill tank fully an calculate amount of money', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const result = fillTank(customer, 20);

    expect(result).toEqual({
      money: 2360,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it('should fill only available space', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 30,
      },
    };

    const result = fillTank(customer, 20, 20);

    expect(result).toEqual({
      money: 2800,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it('should fill the tank if required amount less than 2', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 30,
      },
    };

    const result = fillTank(customer, 20, 1);

    expect(result).toEqual({
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 30,
      },
    });
  });

  it('should not fill the tank if customet has no money for the deal', () => {
    const customer = {
      money: 15,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    const result = fillTank(customer, 20, 10);

    expect(result).toEqual({
      money: 15,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    });
  });

  it('should fill tank fully if amout is not given', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    const result = fillTank(customer, 20);

    expect(result).toEqual({
      money: 2400,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it('should fill only available tank capacity', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 35,
      },
    };

    const result = fillTank(customer, 20, 20);

    expect(result).toEqual({
      money: 2900,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it('should round amount correctly', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    const result = fillTank(customer, 20, 29.6);

    expect(result).toEqual({
      money: 2408,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 39.6,
      },
    });
  });

  it('should round price to the nearest hundreds', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    const result = fillTank(customer, 19.99, 10);

    expect(result).toEqual({
      money: 2800.1,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20,
      },
    });
  });
});
