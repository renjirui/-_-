window.onload =function (){
  var fanhui=document.getElementById("fanhui")
  fanhui.addEventListener("click",function(){
    window.location.href="http://101.200.73.250/direction_number.html"
  })
}
function updataData(account, psli, a) {
  axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('token')) {
      // 如果后台要token这么写：
      config.headers.token = localStorage.getItem('token')
      // 如果后台要Authorization 这么写：config.headers.Authorization = `Bearer ` + localStorage.getItem('token')
    }
        return config
    },
    error =>{
        return Promise.reject(error)
    }
)

    axios({
      method: "put",
      url: `http://101.200.73.250:31111/students/changepwd/${account}`,

    }).then(function () {
    axios
      .get("http://101.200.73.250:31111/students/getinfo_all/")
      .then(function (response) {
        // 处理成功情况
        console.log(response.data[a].student_Model.pwd);
        psli[a].innerHTML = "密码：" + response.data[a].student_Model.pwd;
      })
      .catch(function (error) {
        // 处理错误情况
        console.log(error);
      })
      .finally(function () {
        // 总是会执行
      })
  });
}
function fn(b,element) {
  for (let a = 0; a < b; a++){
    element.style.display='none'
  }
};

function search_student(name,element,a,recall){
  if (recall.length == 1) {
    if (name.slice(0, 1) == recall) {
      element[a].style.display = 'block';
    }
  }
  if (recall.length == 2) {
    if (name.slice(0, 2) == recall) {
      element[a].style.dsiplay = 'block';
    }
  }
  if (recall.length == 3) {
    if (name.slice(0, 3) == recall) {
      element[a].style.display = 'block';
    }
  }

};
function getData() {
  axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('token')) {
      // 如果后台要token这么写：
      config.headers.token = localStorage.getItem('token')
      // 如果后台要Authorization 这么写：config.headers.Authorization = `Bearer ` + localStorage.getItem('token')
    }
        return config
    },
    error =>{
        return Promise.reject(error)
    }
)

  return axios
    .get("http://101.200.73.250:31111/students/getinfo_all/")
    .then((response) => {
      // 处理成功情况
      return response.data;
    })
    .catch(function (error) {
      // 处理错误情况
      console.log(error);
    })
    .finally(function () {
      // 总是会执行
    });
}

getData().then((data) => {
  var usernumber = data.length;

  for (a = 0; a < usernumber; a++) {
    let nameli = document.createElement("li");
    let name = document.getElementsByClassName("name")[0];
    nameli.className = 'nameli';
    name.appendChild(nameli);
    let div = document.createElement("div");
    let span = document.createElement("span");
    div.className = "photo";
    let name1li = document.getElementById("name1").children[a];
    nameli.appendChild(div);
    nameli.appendChild(span);
    let information =
      data[a].student_Model.periodNum + "-" + data[a].student_Model.department + "-" + data[a].student_Model.name;
    span.innerHTML = information;
  }

  for (a = 0; a < usernumber; a++) {
    let passwordli = document.createElement("li");
    let password = document.getElementsByClassName("password")[0];
    passwordli.className = "psli";
    password.appendChild(passwordli);
    let b = data[a].student_Model.pwd;
    console.log(typeof b);
    let c = String(b);
    if (c.length == 3) {
      passwordli.innerHTML =
        "密码：" + c.slice(0, 1) + "*" + c.slice(c.length - 1);
    } else if (c == '123456') {
      passwordli.innerHTML = "密码：123456";
    }
    else if (c.length > 3) {
      passwordli.innerHTML =
        "密码：" + c.slice(0, 1) + "**" + c.slice(c.length - 3);
    } else if (c.length == 1) {
      passwordli.innerHTML = "密码：" + "*";
    }
    
  }
  var restore = document.getElementsByClassName("restore")[0];
  for (let a = 0; a < usernumber; a++) {
    let index_restore = a;
    var restoreli = document.createElement("li");
    restoreli.className = 'restoreli';
    const button = document.createElement("button");
    button.className = "return";
    restore.appendChild(restoreli);
    restoreli.appendChild(button);
    button.innerHTML = "密码重置";

    button.addEventListener("click", (event) => {
      let currentIndex = index_restore; // 保存当前按钮的索引值
      prompt.style.display = "block";
      console.log(currentIndex);
      yes.addEventListener("click", () => {
        prompt.style.display = "none";
        console.log(data[currentIndex].student_Model.account);
        updataData(data[currentIndex].student_Model.account, psli, currentIndex);
      });

      cancel.onclick = function () {
        prompt.style.display = "none";
      };
    });
  }

  var btn = document.getElementsByClassName("return");
  var prompt = document.getElementById("prompt1");
  var yes = document.getElementsByClassName("yes")[0];
  var cancel = document.getElementsByClassName("cancel")[0];
  var psli = document.getElementsByClassName("psli");

  var img = document.getElementById('s1');
  var recall = document.getElementsByClassName('recall')[0];
  var nameli1 = document.getElementsByClassName('nameli');
  var restoreli = document.getElementsByClassName('restoreli');
  
  recall.onclick = function () {
    if (recall.value == '请输入姓名') {
      recall.value = '';
    }
    
  };
  for (let b = 0; b < usernumber; b++) {
            // if (b != a) {
              nameli1[b].style.display = 'none';
              psli[b].style.display = 'none';
              restoreli[b].style.display = 'none';
            // }
            
          }
  for (a = 0; a < usernumber; a++){
    
    if (data[a].student_Model.department == '设计') {
      nameli1[a].style.display = 'block';
          nameli1[a].style.display = 'flex';
          psli[a].style.display = 'block';
          psli[a].style.display = 'flex';
          restoreli[a].style.display = 'block';
          restoreli[a].style.display = 'flex';
    }
  }
  img.onclick = function () {
    for (let b = 0; b < usernumber; b++) {
            // if (b != a) {
            nameli1[b].style.display = 'none';
            psli[b].style.display = 'none';
            restoreli[b].style.display = 'none';
            // }
            
          }
    for (let a = 0; a < usernumber; a++) {
      if (recall.value.length == 1) {
        console.log(recall.value);
        if (data[a].student_Model.name.slice(0, 1) == recall.value) {

          
          
          if (data[a].student_Model.department == '设计') { 
            
          nameli1[a].style.display = 'block';
          nameli1[a].style.display = 'flex';
          psli[a].style.display = 'block';
          psli[a].style.display = 'flex';
          restoreli[a].style.display = 'block';
          restoreli[a].style.display = 'flex';
        }
        }
      }
     else if (recall.value.length == 2) {
        if (data[a].student_Model.name.slice(0, 2) == recall.value) {
         if (data[a].student_Model.department == '设计') { 
          nameli1[a].style.display = 'block';
          nameli1[a].style.display = 'flex';
          psli[a].style.display = 'block';
          psli[a].style.display = 'flex';
          restoreli[a].style.display = 'block';
          restoreli[a].style.display = 'flex';
        }
        }
      }
      else if (recall.value.length == 3) {
        if (data[a].student_Model.name.slice(0, 3) == recall.value) {
         if (data[a].student_Model.department == '设计'){ 
          nameli1[a].style.display = 'block';
          nameli1[a].style.display = 'flex';
          psli[a].style.display = 'block';
          psli[a].style.display = 'flex';
          restoreli[a].style.display = 'block';
          restoreli[a].style.display = 'flex';
        }
        }
      }
    }

  };
  // if (recall.value.length == 0) {
  //   for (a = 0; a < usernumber; a++){
  //             nameli1[a].style.display = 'block';
  //             psli[a].style.display = 'block';
  //             restoreli[a].style.display = 'block';
  //   }
  // }


  console.log(data, btn,data[0].student_Model.name.slice(0,1));
});
