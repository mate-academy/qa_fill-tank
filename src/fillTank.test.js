'use strict';

const { fillTank } = require('./fillTank');

describe('fillTank', () => {
  it("Shouldn't return nothing", () => {
    const customer = {
      money: 50,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 30,
      },
    };
    const result = fillTank(customer, 50, 1);

    expect(result).toEqual(undefined);
  });

  it('If the `amount` is not given, then full tank is ordered', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 50);

    expect(customer).toEqual({
      money: 1500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it('If the amount > tank can accommodate, pour only what will fit', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 30,
      },
    };

    fillTank(customer, 50, 100);

    expect(customer).toEqual({
      money: 2500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it('ALWAYS fill in only what the client can pay', () => {
    const customer = {
      money: 150,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 50, 10);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 13,
      },
    });
  });

  it('If the poured amount < 2 liters, do not pour at all.', () => {
    const customer = {
      money: 500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 30,
      },
    };
    
    fillTank(customer, 50, 1);

    expect(customer).toEqual({
      money: 500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 30,
      },
    });
  });

  it('Round the poured amount by discarding number to the tenth part', () => {
    const customer = {
      money: 1500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 20, 10.75);

    expect(customer).toEqual({
      money: 1286,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20.7,
      },
    });
  });

  it('Round the price of the purchased fuel', () => {
    const customer = {
      money: 1500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 10.566, 20);

    expect(customer).toEqual({
      money: 1288.68,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 30,
      },
    });
  });
});
