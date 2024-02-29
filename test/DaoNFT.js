const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DaoNFT Contract", function () {
  let daoNFT;
  let owner;
  let employee1;
  let employee2;

  beforeEach(async function () {
    [owner, employee1, employee2] = await ethers.getSigners();

    // Deploy DaoNFT contract
    const DaoNFT = await ethers.getContractFactory("DaoNFT");
    daoNFT = await DaoNFT.deploy("DAOName", "D");
    await daoNFT.deployed();

    // Set employee tokens
    await daoNFT.connect(owner).setTokenForStaff(employee1.address, "John", "Developer");
  });

  it("should set the DAO name and symbol correctly", async function () {
    expect(await daoNFT.name()).to.equal("DAOName");
    expect(await daoNFT.symbol()).to.equal("D");
  });

  it("should set tokens for staff correctly", async function () {
    const employeeRole = await daoNFT.getEmployeeRole(employee1.address);
    const employeeName = await daoNFT.getEmployeeName(employee1.address);

    expect(employeeRole).to.equal("Developer");
    expect(employeeName).to.equal("John");
  });

  it("should set tokens for multiple staff correctly", async function () {
    const employee2Role = await daoNFT.getEmployeeRole(employee2.address);
    const employee2Name = await daoNFT.getEmployeeName(employee2.address);

    expect(employee2Role).to.equal("");
    expect(employee2Name).to.equal("");
    
    // Set tokens for the second employee
    await daoNFT.connect(owner).setTokenForStaff(employee2.address, "Jane", "Designer");

    const updatedEmployee2Role = await daoNFT.getEmployeeRole(employee2.address);
    const updatedEmployee2Name = await daoNFT.getEmployeeName(employee2.address);

    expect(updatedEmployee2Role).to.equal("Designer");
    expect(updatedEmployee2Name).to.equal("Jane");
  });

  it("should not set tokens for the same employee more than once", async function () {
    // Try setting tokens for the first employee again
    await expect(
      daoNFT.connect(owner).setTokenForStaff(employee1.address, "John", "Developer")
    ).to.be.revertedWith("This employee already has token.");
  });
});
