//유저가 값을 입력한다
//+버튼을 누르면 할일 추가
//delete누르면 할일 삭제
//check누르면 할일 끝나면서 밑줄이 간다
//진행중 끝난 탬을 누르면,언더바가 이동한다
//끝난탭은, 끝난 아이템만, 진행중인 아이템만
//전체 탭 누르면 다시 전체 아이템으로 돌아옴


let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList =[]
addButton.addEventListener("click",addTask);

function addTask(){
    let taskContent = taskInput.value
    taskList.push(taskContent)
    render()
}

function render(){
    let resultHTML = '<a href="#"></a>';
    for(let i=0; i<taskList.length;i++){
        resultHTML += `<div class="task">
        <div>
            ${taskList[i]}
        </div>
        <div>
            <button>Check</button>
            <button>Delete</button>

        </div>

    </div>`;
    
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}