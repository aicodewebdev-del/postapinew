const input = document.getElementById('inp');
const button = document.getElementById('btn');
const showlist = document.getElementById('tasklist');

async function postapi() {
  try {
    const inpudata = input.value.trim();
    if (inpudata === "") {
      alert("Please enter any value");
      return;
    }

    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: inpudata,
        userId: 1
      })
    });

    const data = await response.json();

    const li = document.createElement('li');
    li.textContent = data.title + " "; 

    const delBtn = document.createElement('button');
    delBtn.textContent = "Delete";

    delBtn.addEventListener('click', async function() {
      await deleteItem(data.id, li);
    });

    li.appendChild(delBtn);            
    showlist.appendChild(li);          

    input.value = "";
  } catch (e) {
    console.log(e);
  }
}

async function deleteItem(id, listElement) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE"
    });

    if (response.ok) {
      listElement.remove();
    } else {
      alert("Cannot delete");
    }
  } catch (e) {
    console.log(e);
  }
}

button.addEventListener('click', postapi);