'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it(
    'should fill the specified amount of fuel' +
      ' decrease customer money accordingly',
    () => {
      const customer = {
        money: 3000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };

      fillTank(customer, 40, 10);

      expect(customer.money).toBe(2600);
      expect(customer.vehicle.fuelRemains).toBe(18);
    },
  );

  it('should fill the tank to full capacity if amount is not provided', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 40);

    expect(customer.money).toBe(1720);
    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it(`shouldn't exceed tank capacity even if request amount is larger`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 40, 50);

    expect(customer.money).toBe(1720);
    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('should not buy more fuel than customer can afford', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 1000, 10);

    expect(customer.money).toBe(0);
    expect(customer.vehicle.fuelRemains).toBe(11);
  });

  it('should correctly round fuel amount down to one decimal place', () => {
    const customer = {
      money: 200,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 30, 10);

    expect(customer.money).toBe(2);
    expect(customer.vehicle.fuelRemains).toBe(14.6);
  });

  it(`shouldn't fill fuel if the calculated amount is less than 2 liters`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 2000, 10);

    expect(customer.money).toBe(3000);
    expect(customer.vehicle.fuelRemains).toBe(8);
  });

  it('should correctly round the total price to two decimal places', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 3.4444, 5);

    expect(customer.money).toBe(2982.78);
    expect(customer.vehicle.fuelRemains).toBe(13);
  });

  it('should do nothing if requested amount is 0', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 0);

    expect(customer.money).toBe(3000);
    expect(customer.vehicle.fuelRemains).toBe(8);
  });

  it('should allow filling exactly 2 liters', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 50, 2);

    expect(customer.vehicle.fuelRemains).toBe(12);
  });

  it('should do nothing if tank is already full', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    };

    fillTank(customer, 10, 10);

    expect(customer.money).toBe(1000);
    expect(customer.vehicle.fuelRemains).toBe(40);
  });
});
