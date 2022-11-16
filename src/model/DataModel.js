class Task {
    #id = undefined;
    #taskImgURL = undefined;
    #taskImgBlob = undefined;
    taskTitle = "";
    taskImg = "";
    taskDesc = "";
    contents = "";
    constructor(task){
        if(task !== undefined){
            this.#id = task.id;
            this.taskTitle = task.taskTitle;
            this.taskImg = task.taskImg;
            this.taskDesc = task.taskDesc;
            this.contents = task.contents;
            this.#taskImgURL = task.taskImgURL;
            this.#taskImgBlob = task.taskImgBlob;
        }
    }

    get id(){
        return this.#id;
    }

    get taskImgURL(){
        return this.#taskImgURL;
    }
    
    get taskImgBlob(){
        return this.#taskImgBlob;
    }
}

class Content {
    #markImgURL = undefined;
    #markImgBlob = undefined;
    markTitle = "";
    markContent = [''];
    markImg = "";
    markLatitude = 0.0;
    markLongitude = 0.0;
    constructor(contents){
        if (contents !== undefined){
        }
    }

    get markImgURL(){
        return this.#markImgURL;
    }

    set markImgURL(url){
        this.#markImgURL = url;
    }

    get markImgBlob(){
        return this.#markImgBlob;
    }

    set markImgBlob(blob){
        this.#markImgBlob = blob
    }
}
export { Task , Content}