'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('function must not return anything', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    expect(fillTank(customer)).toBe(undefined);
  });

  it('should fill the tank partially if enough money', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 5);

    expect(customer).toEqual({
      money: 2950,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 13,
      },
    });

  });

  it('should fill the full tank if enough money, and ammount is unspecified', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10);

    expect(customer).toEqual({
      money: 2680,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });

  });

  it('should fill the full tank if enough money and ammount > maxTankCapacity', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 41);

    expect(customer).toEqual({
      money: 2680,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });

  });

  it('should fill the tank as much as client can pay', () => {
    const customer = {
      money: 50,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 25, 40);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    });

  });

  it('should round the fuel order down to the nearest tenth', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 25, 2,8);

    expect(customer).toEqual({
      money: 50,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    });

  });

  it('should not fill the tank if ammount < 2', () => {
    const customer = {
      money: 50,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 25, 1);

    expect(customer).toEqual({
      money: 50,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    });

  });

  it('should round the fuel price to the nearest hundredth', () => {
    const customer = {
      money: 500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 9.999, 5);

    expect(customer).toEqual({
      money: 450,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 13,
      },
    });

  });
});
