//유저가 값을 입력한다
//+버튼을 누르면 할일 추가
//delete누르면 할일 삭제
//check누르면 할일 끝나면서 밑줄이 간다
//1.check 버튼 클릭하는 순간 true<->false
//2.true면 끝난걸로 간주하고 밑줄보여주기
//3.false이면 안끝난걸로 간주하고 그대로

//진행중 끝난 탬을 누르면,언더바가 이동한다
//끝난탭은, 끝난 아이템만, 진행중인 아이템만
//전체 탭 누르면 다시 전체 아이템으로 돌아옴


let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList =[]
addButton.addEventListener("click",addTask);

function addTask(){
    let task = {
        id:randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete:false
    }
taskList.push(task);
console.log(taskList);
render()
}

function render(){
    let resultHTML = '<a href="#"></a>';
    for(let i=0; i<taskList.length;i++){
        if(taskList[i].isComplete == true){
            resultHTML+=`<div class="task">
            <div class="task-done">
                ${taskList[i].taskContent}
            </div>
            <div>
                <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
                <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
            </div>  
        </div>`;
        } else{
            resultHTML += `<div class="task">
        <div>
            ${taskList[i].taskContent}
        </div>
        <div>
            <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
            <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
        </div>
        </div>`;
        }
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
    console.log(taskList);
}

function deleteTask(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i,1)
            break;
        }
    }
    render();
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}