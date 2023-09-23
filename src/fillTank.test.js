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

    expect(fillTank(customer, 1, 1)).toBe(undefined);
  });

  it('should fill full tank if amount is not provided', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10);

    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('should fill full tank if amount is more than tank can accept', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 33);

    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('should pour only amount that can be purchased', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 30);

    expect(customer.vehicle.fuelRemains).toBe(18);
  });

  it('should round to tenth poured amount', () => {
    let customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8.631,
      },
    };

    fillTank(customer, 10);

    expect(customer.vehicle.fuelRemains).toBe(39.931);

    customer = {
      money: 500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 35);

    expect(customer.vehicle.fuelRemains).toBe(22.2);

    customer = {
      money: 500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 12.534);

    expect(customer.vehicle.fuelRemains).toBe(20.5);
  });

  it('should not pour if required amount is less than 2 liters', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 39,
      },
    };

    fillTank(customer, 10);

    expect(customer.vehicle.fuelRemains).toBe(39);

    customer.vehicle.fuelRemains = 10;

    fillTank(customer, 10, 1);

    expect(customer.vehicle.fuelRemains).toBe(10);
  });

  it('should round the fuel cost to the hundredth', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 105.8794, 10);

    expect(customer.money).toBe(1941.21);

    customer.money = 2000;

    fillTank(customer, 105.8796, 10);

    expect(customer.money).toBe(941.2);
  });

  it('should calculate proper money balance if amount was not provided', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10);

    expect(customer.money).toBe(2680);
  });

  it(
    'should calculate proper money balance if amount is'
      + 'more than tank can accept',
    () => {
      const customer = {
        money: 3000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };

      fillTank(customer, 10, 33);

      expect(customer.money).toBe(2680);
    }
  );

  it(
    'should calculate proper money balance if amount is'
    + 'more than customer can buy',
    () => {
      const customer = {
        money: 100,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };

      fillTank(customer, 10, 30);

      expect(customer.money).toBe(0);

      customer.money = 100;

      fillTank(customer, 15, 30);

      expect(customer.money).toBe(1);
    }
  );

  it('should not take money if required amount is less than 2 liters', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 39,
      },
    };

    fillTank(customer, 10);

    expect(customer.money).toBe(3000);

    customer.vehicle.fuelRemains = 10;

    fillTank(customer, 10, 1);

    expect(customer.money).toBe(3000);
  });
});
