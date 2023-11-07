'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be defined', () => {
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

    expect(typeof fillTank(customer, 10)).toEqual('undefined');
  });

  it('shoud refills fuel and withdraws money', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 30);

    expect(customer).toEqual({
      money: 2700,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 38,
      },
    });
  });

  it(`should fill full tank, if the 'amount' is not given`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 10);

    expect(customer).toEqual({
      money: 2700,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it(`should fill full tank`
    + `if 'amount' is greater than the tank can accommodate`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 10, 50);

    expect(customer).toEqual({
      money: 2700,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it(`should fill in only what the client can pay`, () => {
    const customer = {
      money: 300,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 10, 50);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 35,
      },
    });
  });

  it(`should round the poured amount`
    + `by discarding number to the tenth part`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 5, 12.35);

    expect(customer).toEqual({
      money: 2938.5,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 17.3,
      },
    });
  });

  it(`should round the price of the purchased fuel`
  + `to the nearest hundredth part`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 5.331, 12);

    expect(customer).toEqual({
      money: 2936.03,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 17,
      },
    });
  });

  it(`should decline an operation`
    + `if the amount of ordered fuel is less than 2 liters`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20,
      },
    };

    fillTank(customer, 10, 1.5);

    expect(customer)
      .toEqual({
        money: 3000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 20,
        },
      });
  });

  it(`should decline an operation`
    + `if the customer can buy less then 2 liters`, () => {
    const customer = {
      money: 18,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 35,
      },
    };

    fillTank(customer, 10, 20);

    expect(customer)
      .toEqual({
        money: 18,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 35,
        },
      });
  });

  it(`should decline an operation`
    + `if the tank can accomodate less then 2 literst`, () => {
    const customer = {
      money: 810,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 39,
      },
    };

    fillTank(customer, 10, 20);

    expect(customer)
      .toEqual({
        money: 810,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 39,
        },
      });
  });
});
