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

    set id(id){
        this.#id = id;
    }

    get taskImgURL(){
        return this.#taskImgURL;
    }

    set taskImgURL(url){
        this.#taskImgURL = url;
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
            this.markTitle = contents.markTitle;
            this.markContent = contents.markContent;
            this.markImg = contents.markImg;
            this.markLatitude = contents.markLatitude;
            this.markLongitude = contents.markLongitude;
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