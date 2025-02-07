'use strict';

describe('fillTank', () => {
  const fillTank = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('should fill tank with provided amount if there is enough money ', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 93.75, 32);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it('should fill only the amount a client can pay', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 100, 32);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 38,
      },
    });
  });

  it('should fill the full tank if there is enough money', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 93.75, 32);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it('should fill max fuel a client can pay for if there is no amount', () => {
    const customer = {
      money: 330,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10);

    expect(customer).toEqual({
      money: 10,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it('should not fill if the tank is full', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    };

    fillTank(customer, 10);

    expect(customer).toEqual({
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it('should fill only what a tank can fit', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 38,
      },
    };

    fillTank(customer, 10, 1000);

    expect(customer).toEqual({
      money: 980,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it('should not pour fuel if "amount" < 2', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 39,
      },
    };

    fillTank(customer, 10);

    expect(customer).toEqual({
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 39,
      },
    });
  });

  it('should round the poured amount to the tenth part', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 30,
      },
    };

    fillTank(customer, 10, 3.25);

    expect(customer).toEqual({
      money: 68,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 33.2,
      },
    });
  });

  it('should round the price to the nearest hundredth part', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 30,
      },
    };

    fillTank(customer, 1.11111111, 3);

    expect(customer).toEqual({
      money: 96.67,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 33,
      },
    });
  });
});
