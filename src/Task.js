export class Task{

    constructor(taskName){
        this.taskName = taskName;
        this.isCompleted = false;
        this.isPriority = false;

    }

    //setters + getters here ->add later-> can do INPUT VALIDATION HERE as u set the new value of attirubtes 
    /*set taskName(newName){
        if(newName.length>0){
            //NOTE:using _ here means property is private:
            this._taskName = newName;
        } else{
            console.error('name must be a non empty string');
        }

    }*/
   formatTask(){
    return `Task:${this.taskName}\n Status: ${this.isCompleted ? 'Completed' : 'Unfinished'}
    \n Priority: ${this.isPriority ? 'High': 'Low'}`;
   }
}