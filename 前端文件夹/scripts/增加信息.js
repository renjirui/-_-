
// 点击查看学生信息页面跳转开始
var searchSystemOne=document.getElementById("search-system-1")
// 使用DOMContentLoaded事件来确保在尝试获取元素之前，DOM已经完全加载。
document.addEventListener('DOMContentLoaded', (event) => {  
  var searchSystemOne = document.getElementById("search-system-1");  
  if (searchSystemOne) {  
    searchSystemOne.onclick = function() {  
      window.location.href="http://101.200.73.250/search-student.html"
    };  
  } else {  
    console.error("元素未找到");  
  }  
});
// 点击查看学生信息页面跳转结束

// 点击管理学生页面跳转设置开始
var searchSystemTwo=document.getElementById("search-system-2")
// 使用DOMContentLoaded事件来确保在尝试获取元素之前，DOM已经完全加载。
document.addEventListener('DOMContentLoaded', (event) => {  
  var searchSystemTwo = document.getElementById("search-system-2");  
  if (searchSystemTwo) {  
    searchSystemTwo.onclick = function() {  
      window.location.href="http://101.200.73.250/charge-students-menu.html"
    };  
  } else {  
    console.error("元素未找到");  
  }  
});
// 点击管理学生页面跳转设置结束

document.addEventListener("DOMContentLoaded", function () {
  var items = document.querySelectorAll(".search-system-item");

  items.forEach(function (item) {
    item.addEventListener("click", function () {
      // 移除其他元素的active类
      items.forEach(function (otherItem) {
        otherItem.classList.remove("active");
      });
      //  给被点击的元素添加active类
      this.classList.add("active");
    });
  });
});
let input1 = document.getElementsByTagName("input")[0];
let input2 = document.getElementsByTagName("input")[1];
let input3 = document.getElementsByTagName("input")[2];
let input4 = document.getElementsByTagName("input")[3];
let input5 = document.getElementsByTagName("input")[4];
let input6 = document.getElementsByTagName("input")[5];
let input7 = document.getElementsByTagName("input")[6];
let button1 = document.getElementsByClassName('show')[0];
let button2 = document.getElementsByTagName('button')[0];
console.log(button1.src);
input1.onclick = function () {
    if (input1.value =='请输入学生账号') {
      input1.value = "";
      input1.style.color = "black";
};
}
input2.onclick = function () {
    if (input2.value == '请输入姓名') {
      input2.value = "";
      input2.style.color = "black";
}
}
input3.onclick = function () {
    if (input3.value == '请输入学生期数') {
      input3.value = '';
      input3.style.color = "black";
}
}
input4.onclick = function () {
    if (input4.value == '请输入方向') {
      input4.value = "";
      input4.style.color = "black";
}
}
input5.onclick = function () {
    if (input5.value == '请输入职位') {
      input5.value = "";
      input5.style.color = "black";
}
}
input6.onclick = function () {
    if (input6.value == '请输入获奖名称') {
      input6.value = "";
      input6.style.color = "black";
}
}
input7.onclick = function () {
    if (input7.value == '请输入密码') {
        input7.value = "";
      input7.type = "password";
      input7.style.color = "black";
}
}
button1.onclick = () => {
  if (input7.value != "请输入密码") {
    if (input7.type == "password") {
      input7.type = "text";
      button1.src = 'https://renjirui.oss-cn-beijing.aliyuncs.com/%E7%9C%BC%E7%9D%9B_%E9%9A%90%E8%97%8F_o.png';
    }
    else if (input7.type == 'text') {
      input7.type = "password";
      button1.src = "https://renjirui.oss-cn-beijing.aliyuncs.com/%E7%9C%BC%E7%9D%9B_%E6%98%BE%E7%A4%BA_o.png";
    }
  }
}

button2.onclick = function () {
    const data = {
    name: input2.value,
    position: input5.value,
    award: input6.value,
    account: input1.value,
        pwd: input7.value,
        periodNum: input3.value,
    department:input4.value
    
    }
  console.log(data);
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

    axios.post("http://101.200.73.250:31111/students/",data)
    .then(function (response) {
      // 处理成功情况
      alert("添加信息成功");
        
    })
    .catch(function (error) {
      // 处理错误情况
      console.log(error);
      alert("添加信息失败");
    })
    .finally(function () {
      // 总是会执行
    });


}






