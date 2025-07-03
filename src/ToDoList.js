import { Task } from "./Task.js";
export class ToDoList{
     constructor(){
        //this is a list of Tasks
        this.taskList=[];

    }

    addTask(newTask){
        this.taskList.push(newTask);
    }

    removeTask(taskToRemoveIndex){
        this.taskList.remove(taskToRemoveIndex);
    }
}