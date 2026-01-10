'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it(`should update 'money' and 'fuelRemains' of the 'customer'`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 20);

    expect(customer).toEqual(
      {
        money: 2800,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 28,
        },
      }
    );
  });

  it(`fill the tank to max capacity if 'amount' wasn't provided`, () => {
    const customer = {
      money: 500,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 30,
      },
    };

    fillTank(customer, 15);

    expect(customer).toEqual(
      {
        money: 200,
        vehicle: {
          maxTankCapacity: 50,
          fuelRemains: 50,
        },
      }
    );
  });

  it(`fill the tank to max capacity if the customer
    wants to buy more fuel than the tank can hold`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 60,
        fuelRemains: 50,
      },
    };

    fillTank(customer, 20, 20);

    expect(customer).toEqual(
      {
        money: 800,
        vehicle: {
          maxTankCapacity: 60,
          fuelRemains: 60,
        },
      }
    );
  });

  it('fill the tank with as much fuel as the customer can afford', () => {
    const customer = {
      money: 360,
      vehicle: {
        maxTankCapacity: 45,
        fuelRemains: 2,
      },
    };

    fillTank(customer, 10, 43);

    expect(customer)
      .toEqual({
        money: 0,
        vehicle: {
          maxTankCapacity: 45,
          fuelRemains: 38,
        },
      });
  });

  it('decline to fill if the amount is less than 2 liters', () => {
    const customer = {
      money: 50,
      vehicle: {
        maxTankCapacity: 20,
        fuelRemains: 18,
      },
    };

    fillTank(customer, 5, 1.5);

    expect(customer)
      .toEqual({
        money: 50,
        vehicle: {
          maxTankCapacity: 20,
          fuelRemains: 18,
        },
      });
  });

  it('decline to fill if the customer cannot afford at least 2 liters', () => {
    const customer = {
      money: 7,
      vehicle: {
        maxTankCapacity: 25,
        fuelRemains: 20,
      },
    };

    fillTank(customer, 4);

    expect(customer)
      .toEqual({
        money: 7,
        vehicle: {
          maxTankCapacity: 25,
          fuelRemains: 20,
        },
      });
  });

  it(`decline to fill if
    there is less than 2 liters of free tank capacity`, () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 30,
        fuelRemains: 29,
      },
    };

    fillTank(customer, 3);

    expect(customer)
      .toEqual({
        money: 100,
        vehicle: {
          maxTankCapacity: 30,
          fuelRemains: 29,
        },
      });
  });

  it('should round fuel to 1 decimal place', () => {
    const customer = {
      money: 140,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 14,
      },
    };

    fillTank(customer, 10, 9.47);

    expect(customer)
      .toEqual({
        money: 46,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 23.4,
        },
      });
  });

  it('should round price to 2 decimal places', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 15,
      },
    };

    fillTank(customer, 5.555, 10.1);

    expect(customer)
      .toEqual({
        money: 943.89,
        vehicle: {
          maxTankCapacity: 50,
          fuelRemains: 25.1,
        },
      });
  });
});
