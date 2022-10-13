
class Task{
    constructor(){
        this.taskTitle = "";
        this.taskDesc = "";
        this.taskImg = "";
        this.contents = null;
    }
}

class Content{
    constructor(){
        this.markTitle = "";
        this.markContent = [""];
        this.markImg = "";
        this.markLatitude = 0.0;
        this.markLongitude = 0.0;
    }
}

export {Task, Content};