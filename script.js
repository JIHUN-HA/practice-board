


let datas = [];
let beforClickElement = 0;
function loadWriter() {
  const numOfWriter = 10;
  const selectQuery = document.getElementById("writerId");
  console.log('d');
  for (let i = 1; i <= numOfWriter; i++) {
    if (selectQuery) {
      const newOption = document.createElement('option');
      newOption.value = i;
      newOption.textContent = i;
      selectQuery.appendChild(newOption);
    } else {
      console.log('1');
    }
  }
}

function loadPoster(allPosts, filter) {

  const postArea = document.getElementById('list-post');
  postArea.innerHTML='';



  if (filter !== 0) {
    console.log(allPosts)
    let newPost = [];
    let index = 0;
    for (let i = 0; i < allPosts.length; i++) {
      if (allPosts[i].userId === filter) {
        console.log(allPosts[i].userId)
        newPost[index++] = allPosts[i];
      }
    }
    allPosts = newPost;
    console.log(allPosts)
  }

  for (let i = 0; i < allPosts.length; i++) {
    
    const sector = document.createElement('div');
    
    const newTr = document.createElement('tr');
    newTr.id=allPosts[i].id;

    const userid = document.createElement('td');
    userid.textContent = allPosts[i].userId;
    newTr.appendChild(userid);

    const title = document.createElement('td');
    title.innerHTML=`<span>${allPosts[i].title}</span>`
    newTr.appendChild(title);

    const body = document.createElement('tr');
    body.innerHTML = `
    <td colspan="2" id="post-body${allPosts[i].id}" class="hidden post-body">
    <h3>${allPosts[i].title} </h3>
    <div></div>
    ${allPosts[i].body}
    </td>
    `
    
    postArea.appendChild(newTr);
    postArea.appendChild(body);

   
  }
  addEvent()
}

function handleEvent(e) {
  console.log('datas', datas);
  loadPoster(datas, parseInt(e.target.value));
}

function addEvent() {
  document.querySelectorAll('td span').forEach(element => {element.addEventListener("click", (e) => {
    const clean = document.getElementById(`post-body${beforClickElement}`);
    const view = e.target.closest('tr').id;
    console.log(clean)
    clean?.classList.add('hidden');
    
    if(clean !== view){
    const viewElement = document.getElementById(`post-body${view}`);
    viewElement.classList.remove('hidden');
    }
    
  
    beforClickElement = view;
    
  })})

}
async function init() {

  await fetch("./data/input/posts.json")
    .then(response => response.json()
      .then((data) => {
        datas = data;
        loadWriter();
        loadPoster(datas,0);

        
      
        document.getElementById('writerId').addEventListener("change", (e) => {
          console.log('datas', datas);
          loadPoster(datas, parseInt(e.target.value));
        })

        addEvent()

      }))


}


init() 