// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Write a todo smart Contract that makes use of struct and arrays.
// This contract has nothing to do with mapping.
// A user can create a todo
// See all todos they create.
// Add a status of isDone using a boolean.
// One function should toggle the isDone status.
// Users should be able to update title, description, isdone status and delete todo.
// Finally, write and test with remix and hardhat.

// calldata, memory, storage


contract Todo {
    struct Task {
        string title;
        string description;
        bool isDone;
    }

    Task[] tasks;

    address _owner;

    constructor() {
        _owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == _owner);
        _;
    }

    function getOwner() external view returns (address) {
        return _owner;
    }

    function addTask(string memory _title, string memory _description) external onlyOwner {
        Task memory _newTask = Task({title: _title, description: _description, isDone: false});
        tasks.push(_newTask);
    }

    function getNumberOfTasks() external view returns (uint) {
        return tasks.length;
    }

    function getTasks() external view onlyOwner returns (Task[] memory) {
        return tasks;
    }

    function getTaskAtIndex(uint32 _index) external view onlyOwner returns (string memory, string memory, bool) {
        require(_index < tasks.length, "task does not exist");
        Task memory _task = tasks[_index];
        return (_task.title, _task.description, _task.isDone);
    }

    function updateTitle(uint32 _index, string memory _newTitle) external onlyOwner {
        require(_index < tasks.length, "task does not exist");
        Task storage _task = tasks[_index];
        _task.title = _newTitle;
    }

    function updateDescription(uint32 _index, string memory _newDescription) external onlyOwner {
        require(_index < tasks.length, "task does not exist");
        // Task storage _task = tasks[_index];
        tasks[_index].description = _newDescription;
    }

    function updateIsDone(uint32 _index) external onlyOwner {
        require(_index < tasks.length, "task does not exist");
        Task storage _task = tasks[_index];
        _task.isDone = !_task.isDone;
    }

    function updateTask(uint32 _index, string memory _title, string memory _description, bool _isDone) external onlyOwner {
        require(_index < tasks.length, "task does not exist");
        Task storage _task = tasks[_index];
        _task.title = _title;
        _task.description = _description;
        _task.isDone = _isDone;
    }

    function deleteTask(uint _index) external {
        require(_index < tasks.length, "task does not exist");
        //take last item and replace item at _index
        // tasks[_index] = tasks[tasks.length - 1];

        // // 9 8 7 6 5
        // // 0 1 2 3 4
        // // pop last item from array
        // tasks.pop();
        // delete tasks[_index];
        for (uint i = _index; i < tasks.length - 1; i++) {
            tasks[i] = tasks[i + 1];
        }
        tasks.pop();
    }
}