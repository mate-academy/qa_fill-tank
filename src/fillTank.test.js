'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should tank fully if amount is not given', () => {
    const customer = {
      money: 3000, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 30, // Remaining fuel in the tank
      },
    };

    fillTank(customer, 3);

    expect(customer).toStrictEqual({
      money: 2970, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 40, // Remaining fuel in the tank
      },
    });
  });

  it('should tank fully if amount is grater than remain capacity', () => {
    const customer = {
      money: 3000, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 30, // Remaining fuel in the tank
      },
    };

    fillTank(customer, 3, 20);

    expect(customer).toStrictEqual({
      money: 2970, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 40, // Remaining fuel in the tank
      },
    });
  });

  it('should tank only the amount cilent can pay', () => {
    const customer = {
      money: 3, // customer account balance
      vehicle: {
        maxTankCapacity: 10, // fuel tank volume
        fuelRemains: 1, // Remaining fuel in the tank
      },
    };

    fillTank(customer, 3, 5);

    expect(customer).toStrictEqual({
      money: 3, // customer account balance
      vehicle: {
        maxTankCapacity: 10, // fuel tank volume
        fuelRemains: 1, // Remaining fuel in the tank
      },
    });
  });

  it('should not tank if the amount < 2', () => {
    const customer = {
      money: 1000, // customer account balance
      vehicle: {
        maxTankCapacity: 10, // fuel tank volume
        fuelRemains: 1, // Remaining fuel in the tank
      },
    };

    fillTank(customer, 3, 1);

    expect(customer).toStrictEqual({
      money: 1000, // customer account balance
      vehicle: {
        maxTankCapacity: 10, // fuel tank volume
        fuelRemains: 1, // Remaining fuel in the tank
      },
    });
  });

  it('should round fuel down to the nearest tenth', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 45,
      },
    };

    fillTank(customer, 2, 3.11)

    expect(customer).toStrictEqual({
      money: 93.8, // customer account balance
      vehicle: {
        maxTankCapacity: 50, // fuel tank volume
        fuelRemains: 48.1, // Remaining fuel in the tank
      },
    });
  });

  it('should round price to the hundreth part', () => {
    const customer = {
      money: 50, // customer account balance
      vehicle: {
        maxTankCapacity: 10, // fuel tank volume
        fuelRemains: 1, // Remaining fuel in the tank
      },
    };

    fillTank(customer, 3.111, 5);

    expect(customer).toStrictEqual({
      money: 34.44, // customer account balance
      vehicle: {
        maxTankCapacity: 10, // fuel tank volume
        fuelRemains: 6, // Remaining fuel in the tank
      },
    });
  });
});
