const input = document.getElementById("inp");
const button = document.getElementById("btn");
const showlist = document.getElementById("tasklist");
function renderTask(task) {
  const list = document.createElement("li");
  const taskText = document.createElement("span");
  taskText.textContent = `${task.title} `;
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", async function () {
    const newTitle = prompt("ਨਵਾਂ ਟਾਸਕ ਲਿਖੋ:", task.title);
       if (newTitle && newTitle.trim() !== "") {
      try {
      
        const targetId = task.id > 100 ? 1 : task.id;

        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${targetId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: task.id,
              title: newTitle.trim(),
              userId: 1,
            }),
          }
        );

        if (response.ok) {
          const updatedData = await response.json();
        
          taskText.textContent = `${newTitle.trim()} `;
          task.title = newTitle.trim();
        } else {
          alert("Update failed!");
        }
      } catch (err) {
        console.log("Error updating:", err);
      }
    }
  });

 
  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";

  delBtn.addEventListener("click", async function () {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${task.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        list.remove();
      } else {
        alert("Delete failed!");
      }
    } catch (err) {
      console.log("Error deleting:", err);
    }
  });

  list.appendChild(taskText);
  list.appendChild(editBtn);
  list.appendChild(delBtn);

  showlist.appendChild(list);
}


async function loadInitialTasks() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=5"
    );
    const posts = await response.json();

    posts.forEach((post) => {
      renderTask(post);
    });
  } catch (err) {
    console.log("Error fetching posts:", err);
  }
}


async function addTask() {
  try {
    const data = input.value.trim();
    if (data === "") {
      alert("Please Enter Anything");
      return;
    }

    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data,
        userId: 1,
      }),
    });

    const newPost = await response.json();

    renderTask(newPost);
    input.value = "";
  } catch (err) {
    console.log("Error creating post:", err);
  }
}


button.addEventListener("click", addTask);

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});


loadInitialTasks();