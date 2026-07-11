'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('should not return anything', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    expect(fillTank(customer, 8, 30)).toBeUndefined();
  });

  it('If the `amount` is not given, then full tank is ordered', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 8);

    expect(customer).toEqual({
      money: 2744,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  // eslint-disable-next-line
  it('If the `amount` is greater than the tank can accommodate, pour only what will fit', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 8, 49);

    expect(customer).toEqual({
      money: 2744,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it('ALWAYS fill in only what the client can pay', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 200, 25);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 23,
      },
    });
  });

  // eslint-disable-next-line
  it('should not pour and not withdraw money if amount is less than 2 liters', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 10,
        fuelRemains: 8.5,
      },
    };

    fillTank(customer, 1, 30);

    expect(customer).toEqual({
      money: 3000,
      vehicle: {
        maxTankCapacity: 10,
        fuelRemains: 8.5,
      },
    });
  });

  // eslint-disable-next-line
  it('should not pour anything if the amount the client can pay for is less than 2 liters', () => {
    const customer = {
      money: 10,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 30);

    expect(customer).toEqual({
      money: 10,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    });
  });

  it('should pour fuel when the amount is exactly 2 liters', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 10,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 1, 30);

    expect(customer).toEqual({
      money: 2998,
      vehicle: {
        maxTankCapacity: 10,
        fuelRemains: 10,
      },
    });
  });

  // eslint-disable-next-line
  it('should discard fractions smaller than a tenth of a liter when pouring', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 3, 12.345);

    expect(customer).toEqual({
      money: 3000 - 12.3 * 3,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 12.3,
      },
    });
  });
});

describe('roundFuel', () => {
  const { roundFuel } = require('./fillTank');

  it('should be declared', () => {
    expect(roundFuel).toBeInstanceOf(Function);
  });

  it('round the poured amount by discarding number to the tenth part', () => {
    expect(roundFuel(12.345)).toBe(12.3);
  });
});

describe('roundPrice', () => {
  const { roundPrice } = require('./fillTank');

  it('should be declared', () => {
    expect(roundPrice).toBeInstanceOf(Function);
  });

  // eslint-disable-next-line
  it('round the price of the purchased fuel the to the nearest hundredth part', () => {
    expect(roundPrice(12.347)).toBe(12.35);
  });
});
