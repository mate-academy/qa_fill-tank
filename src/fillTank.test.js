'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should not return anything', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const fuelPrice = 40;
    const amount = 38;

    expect(fillTank(customer, fuelPrice, amount)).toBeUndefined();
  });

  it('should fill tank and update customer', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const fuelPrice = 40;
    const amount = 15;

    fillTank(customer, fuelPrice, amount);

    expect(customer).toEqual({
      money: 2400,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 23,
      },
    });
  });

  it('should full tank is ordered, if the amount is not given', () => {
    const customer = {
      money: 4000,
      vehicle: {
        maxTankCapacity: 30,
        fuelRemains: 2,
      },
    };

    const fuelPrice = 15;

    fillTank(customer, fuelPrice);

    expect(customer).toEqual({
      money: 3580,
      vehicle: {
        maxTankCapacity: 30,
        fuelRemains: 30,
      },
    });
  });

  it('should fill tank if amount not specified', () => {
    const customer = {
      money: 2500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 7,
      },
    };

    const fuelPrice = 30;
    const amount = 50;

    fillTank(customer, fuelPrice, amount);

    expect(customer).toEqual({
      money: 1510,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it('should fill in only what the client can pay', () => {
    const customer = {
      money: 500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 9,
      },
    };

    const fuelPrice = 50;
    const amount = 31;

    fillTank(customer, fuelPrice, amount);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 19,
      },
    });
  });

  it('should round poured amount to nearest tenth', () => {
    const customer = {
      money: 5000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 25,
      },
    };

    const fuelPrice = 50;
    const amount = 20.556;

    fillTank(customer, fuelPrice, amount);

    expect(customer).toEqual({
      money: 3975,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 45.5,
      },
    });
  });

  it('should not pour at all if amount < 2 liters', () => {
    const customer = {
      money: 600,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 3,
      },
    };

    const fuelPrice = 45;
    const amount = 1;

    fillTank(customer, fuelPrice, amount);

    expect(customer).toEqual({
      money: 600,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 3,
      },
    });
  });

  it('should round price to nearest cent', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 30,
        fuelRemains: 6,
      },
    };

    const fuelPrice = 44.755;
    const amount = 20;

    fillTank(customer, fuelPrice, amount);

    expect(customer).toEqual({
      money: 104.9,
      vehicle: {
        maxTankCapacity: 30,
        fuelRemains: 26,
      },
    });
  });
});
