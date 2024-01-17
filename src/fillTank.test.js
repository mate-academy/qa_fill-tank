'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank)
      .toBeInstanceOf(Function);
  });

  it(`fill the tank fully if the 'amoumt' is not provided`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 2,
      },
    };

    fillTank(customer, 10);

    expect(customer)
      .toEqual({
        money: 520,
        vehicle: {
          maxTankCapacity: 50,
          fuelRemains: 50,
        },
      });
  });

  it(`fill the tank fully if the 'amount' of fuel `
     + `exceeds the tank capacity`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 45,
      },
    };

    fillTank(customer, 10, 33);

    expect(customer)
      .toEqual({
        money: 2950,
        vehicle: {
          maxTankCapacity: 50,
          fuelRemains: 50,
        },
      });
  });

  it('pour not more fuel than client can buy', () => {
    const customer = {
      money: 200,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 10, 45);

    expect(customer)
      .toEqual({
        money: 0,
        vehicle: {
          maxTankCapacity: 50,
          fuelRemains: 25,
        },
      });
  });

  it('round fuel amount down to tenth', () => {
    const customer = {
      money: 200,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 15,
      },
    };

    fillTank(customer, 10, 9.76);

    expect(customer)
      .toEqual({
        money: 103,
        vehicle: {
          maxTankCapacity: 50,
          fuelRemains: 24.7,
        },
      });
  });

  it(`decline an operation if the customer can buy < 2 liters of fuel`, () => {
    const customer = {
      money: 12,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 25,
      },
    };

    fillTank(customer, 10, 25);

    expect(customer)
      .toEqual({
        money: 12,
        vehicle: {
          maxTankCapacity: 50,
          fuelRemains: 25,
        },
      });
  });

  it(`decline an operation if the tank `
     + `can accomodate < 2 liters of fuel`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 49,
      },
    };

    fillTank(customer, 10, 25);

    expect(customer)
      .toEqual({
        money: 1000,
        vehicle: {
          maxTankCapacity: 50,
          fuelRemains: 49,
        },
      });
  });

  it(`decline an operation if the amount of ordered fuel is < 2 liters`, () => {
    const customer = {
      money: 500,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 30,
      },
    };

    fillTank(customer, 10, 1);

    expect(customer)
      .toEqual({
        money: 500,
        vehicle: {
          maxTankCapacity: 50,
          fuelRemains: 30,
        },
      });
  });

  it(`round the total price of fuel to nearest hundredth`, () => {
    const customer = {
      money: 1050,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 13,
      },
    };

    fillTank(customer, 15.558, 10);

    expect(customer)
      .toEqual({
        money: 894.42,
        vehicle: {
          maxTankCapacity: 50,
          fuelRemains: 23,
        },
      });
  });

  it(`should update money and fuelRemains of the customer`, () => {
    const customer = {
      money: 2500,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 25,
      },
    };

    fillTank(customer, 10, 22);

    expect(customer)
      .toEqual({
        money: 2280,
        vehicle: {
          maxTankCapacity: 50,
          fuelRemains: 47,
        },
      });
  });
});
