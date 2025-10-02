'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should fill full tank', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 10, 200);

    expect(customer.vehicle.fuelRemains).toBe(100);
    expect(customer.money).toBe(0);
  });

  it('should fill full tank if amount is not provided', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 10);

    expect(customer.vehicle.fuelRemains).toBe(100);
    expect(customer.money).toBe(0);
  });

  it('should fill until money ends', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 10, 200);

    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(0);
  });

  it('should fill until amount limit', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 10, 50);

    expect(customer.vehicle.fuelRemains).toBe(50);
    expect(customer.money).toBe(500);
  });

  it('should round fuel down', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 9.99, 200);

    expect(customer.vehicle.fuelRemains).toBe(100.0);
    expect(customer.money).toBeCloseTo(1, 2);
  });

  it('should floor poured liters to 0.1', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 27.27);

    expect(customer.vehicle.fuelRemains).toBe(3.6);
    expect(customer.money).toBeCloseTo(1.83, 2);
  });

  it('should round price to cents', () => {
    const customer = {
      money: 999.99,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 10, 200);

    expect(customer.vehicle.fuelRemains).toBe(99.9);
    expect(customer.money).toBeCloseTo(0.99, 2);
  });

  it('should round price down to cents', () => {
    const customer = {
      money: 50,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 12.34, 4);

    expect(customer.vehicle.fuelRemains).toBe(4);
    expect(customer.money).toBeCloseTo(0.64, 2);
  });

  it('should round price up to cents', () => {
    const customer = {
      money: 50,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 12.345, 4);

    expect(customer.vehicle.fuelRemains).toBe(4);
    expect(customer.money).toBeCloseTo(0.62, 2);
  });

  it('should skip when less than 2 liters', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 99,
      },
    };

    fillTank(customer, 10, 200);

    expect(customer.vehicle.fuelRemains).toBe(99);
    expect(customer.money).toBe(1000);
  });

  it('should pour exactly 2.0 liters', () => {
    const customer = {
      money: 20,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 10, 2);

    expect(customer.vehicle.fuelRemains).toBe(2.0);
    expect(customer.money).toBe(0);
  });

  it('should update fuel and money', () => {
    const customer = {
      money: 250,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 10, 200);

    expect(customer.vehicle.fuelRemains).toBe(25);
    expect(customer.money).toBe(0);
  });

  it('should handle exact money match', () => {
    const customer = {
      money: 200,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 10, 20);

    expect(customer.vehicle.fuelRemains).toBe(20);
    expect(customer.money).toBe(0);
  });

  it('should handle exact space match', () => {
    const customer = {
      money: 500,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 20,
      },
    };

    fillTank(customer, 10, 200);

    expect(customer.vehicle.fuelRemains).toBe(50);
    expect(customer.money).toBe(200);
  });

  it('should do nothing if tank is already full', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 50,
      },
    };

    fillTank(customer, 10, 10);

    expect(customer.vehicle.fuelRemains).toBe(50);
    expect(customer.money).toBe(100);
  });

  it('should do nothing if amount = 0', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 10, 0);

    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(100);
  });

  it('should skip if money < 2 liters worth', () => {
    const customer = {
      money: 15,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 10, 10);

    expect(customer.vehicle.fuelRemains).toBe(0);
    expect(customer.money).toBe(15);
  });

  it('should fill remaining capacity '
    + 'if amount not provided and tank partially filled', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 30,
      },
    };

    fillTank(customer, 10);

    expect(customer.vehicle.fuelRemains).toBe(100);
    expect(customer.money).toBe(300);
  });

  it('should round price correctly on half-cent tie', () => {
    const customer = {
      money: 10,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 3.335, 3);

    expect(customer.vehicle.fuelRemains).toBe(2.9);
    expect(customer.money).toBeCloseTo(10 - 2.9 * 3.335, 2);
  });
});
