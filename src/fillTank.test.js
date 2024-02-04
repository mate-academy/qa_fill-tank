'use strict';

describe('fillTank Function', () => {
  const { fillTank } = require('./fillTank');

  it('should fill the tank to full capacity if the amount is not given', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 80,
        fuelRemains: 15,
      },
    };

    fillTank(customer, 15);

    expect(customer)
      .toEqual({
        money: 25,
        vehicle: {
          maxTankCapacity: 80,
          fuelRemains: 80,
        },
      });
  });

  it('should pour only what will fit if the amount'
  + 'is greater than the tank capacity', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 80,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 10, 900);

    expect(customer)
      .toEqual({
        money: 300,
        vehicle: {
          maxTankCapacity: 80,
          fuelRemains: 80,
        },
      });
  });

  it('should ALWAYS fill in only what the client can pay', () => {
    const customer = {
      money: 200,
      vehicle: {
        maxTankCapacity: 80,
        fuelRemains: 20,
      },
    };

    fillTank(customer, 20, 150);

    expect(customer)
      .toEqual({
        money: 0,
        vehicle: {
          maxTankCapacity: 80,
          fuelRemains: 30,
        },
      });
  });

  it('should round the poured amount'
  + 'by discarding to the tenth part', () => {
    const customer = {
      money: 4000,
      vehicle: {
        maxTankCapacity: 80,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 25, 5.89);

    expect(customer)
      .toEqual({
        money: 3855,
        vehicle: {
          maxTankCapacity: 80,
          fuelRemains: 15.8,
        },
      });
  });

  it('should not pour at all if the poured amount'
  + 'is less than 2 liters', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 80,
        fuelRemains: 20,
      },
    };

    fillTank(customer, 10, 1);

    expect(customer)
      .toEqual({
        money: 1000,
        vehicle: {
          maxTankCapacity: 80,
          fuelRemains: 20,
        },
      });
  });

  it('should round the price of the purchased'
  + 'fuel to the nearest hundredth part', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 80,
        fuelRemains: 20,
      },
    };

    fillTank(customer, 15.578, 20);

    expect(customer)
      .toEqual({
        money: 688.44,
        vehicle: {
          maxTankCapacity: 80,
          fuelRemains: 40,
        },
      });
  });
});
