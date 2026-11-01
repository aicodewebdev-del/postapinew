const input = document.getElementById("inp");
const button = document.getElementById("btn");
const showlist = document.getElementById("tasklist");

async function fetchdata() {
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

    const showdata = await response.json();

    const list = document.createElement("li");
    list.textContent = `${showdata.title} `; 

    const DelBtn = document.createElement("button");
    DelBtn.textContent = "Delete";

  
    DelBtn.addEventListener("click", async function () {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${showdata.id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          list.remove();
        } else {
          alert("Delete failed");
        }
      }catch (e) {
        console.log(e);
      }
    });

    list.appendChild(DelBtn);
    showlist.appendChild(list);
    input.value = "";
  } catch (e) {
    console.log(e);
  }
}

button.addEventListener("click", fetchdata);