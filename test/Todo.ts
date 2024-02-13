import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
  import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
  import { expect } from "chai";
  import { ethers } from "hardhat";
  
  describe("Todo", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployTodoFixture() {
      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await ethers.getSigners();
  
      const Todo = await ethers.getContractFactory("Todo");
      const todo = await Todo.deploy();
  
      return { todo, owner, otherAccount };
    }
  
    describe("Deployment", function () {
      it("Should set the right owner", async function () {
        const { todo, owner } = await loadFixture(deployTodoFixture);
  
        expect(await todo.getOwner()).to.equal(owner.address);
      });
    });

    describe("Todo operations", function() {
        describe("Todo add operations", function() {
            it("should be able to add a todo", async function() {
                const { todo } = await loadFixture(deployTodoFixture);
                const numberOfTasks = await todo.getNumberOfTasks();
                await todo.addTask("Task 1", "Description 1");
                const newNumberOfTasks = await todo.getNumberOfTasks();
                expect(newNumberOfTasks).to.equal(Number(numberOfTasks) + 1);
            });
            it("should be able to get added tasks", async function() {
                const { todo } = await loadFixture(deployTodoFixture);
                await todo.addTask("Task 1", "Description 1");
                const [title, description, isDone] = await todo.getTaskAtIndex(0);
                expect(title).to.equal("Task 1");
                expect(description).to.equal("Description 1");
                expect(isDone).to.equal(false);
            });
        });
    describe("Todo update operations", function() {
        it("should be able to update a task", async function() {
            const { todo } = await loadFixture(deployTodoFixture);
            await todo.addTask("Task 1", "Description 1");
            await todo.updateTask(0, "Task 2", "Description 2", true);
            const [title, description, isDone] = await todo.getTaskAtIndex(0);
            expect(title).to.equal("Task 2");
            expect(description).to.equal("Description 2");
            expect(isDone).to.equal(true);
        });
    });
    describe("Todo delete operations", function() {
        it("should be able to delete a task", async function() {
            const { todo } = await loadFixture(deployTodoFixture);
            await todo.addTask("Task 1", "Description 1");
            const numberOfTasks = await todo.getNumberOfTasks();
            await todo.deleteTask(0);
            const newNumberOfTasks = await todo.getNumberOfTasks();
            expect(newNumberOfTasks).to.equal(Number(numberOfTasks) - 1);
        });
    });
    describe("Todo get operations", function() {
        it("should be able to get all tasks", async function() {
            const { todo } = await loadFixture(deployTodoFixture);
            await todo.addTask("Task 1", "Description 1");
            await todo.addTask("Task 2", "Description 2");
            const tasks = await todo.getTasks();
            expect(tasks.length).to.equal(2);
        });
    });
  });
});