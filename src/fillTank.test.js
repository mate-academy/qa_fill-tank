'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it("doesn't return anything", () => {
    const customer = {
      money: 3000, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 8, // Remaining fuel in the tank
      },
    };

    expect(fillTank(customer)).toBe(undefined);
  });

  it('full tank is ordered if amount is not passed', () => {
    const customer = {
      money: 3000, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 8, // Remaining fuel in the tank
      },
    };

    fillTank(customer, 50);

    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('', () => {});

  it('', () => {});

  it('', () => {});
});
