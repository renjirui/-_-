let searchOne=document.getElementById("search-system-1")
let searchThree=document.getElementById("search-system-3")
let searchFour=document.getElementById("search-system-4")
let menuThree=document.getElementById("menu-3")
let menuFour=document.getElementById("menu-4")
// 跳转到增加信息
searchFour.addEventListener("click",function(){
    window.location.href="http://101.200.73.250/增加信息.html"
    })
//跳转到查找学生
searchOne.addEventListener("click",function(){
        window.location.href="http://101.200.73.250/search-student.html"
        })
// 跳转到密码重置
let u=0
menuThree.addEventListener("click",function(){
    window.location.href="http://101.200.73.250/direction_number.html"
    localStorage.setItem("u",u)
    })
// 跳转到信息管理
menuFour.addEventListener("click",function(){
    window.location.href="http://101.200.73.250/direction_number.html"
    u=1
    localStorage.setItem("u",u)
    // o=localStorage.getItem("u")
    // console.log(o)
    }) 
//search颜色改变函数
document.addEventListener("DOMContentLoaded", function () {
    var items = document.querySelectorAll(".search-system-item");
  
    items.forEach(function (item) {
      item.addEventListener("click", function () {
        // 移除其他元素的active类
        items.forEach(function (otherItem) {
          otherItem.classList.remove("active");
        });
        // 给被点击的元素添加active类
        this.classList.add("active");
      });
    });
  });
  

let number=document.getElementById("number")
// 获取canvas元素  
const canvas = document.getElementById('myChart');  
const ctx = document.getElementById('myChart').getContext('2d');  
canvas.width = 900; // 宽度500像素  
canvas.height = 700; // 高度300像素  
var accountOne=0
var accountTwo=0
var accountThree=0
var accountFour=0
var accountFive=0
var accountSix=0
axios({
    url:"http://101.200.73.250:31111/students/getinfo_all/"
}).then((result)=>{
    console.log("获取所有的信息",result)
    number.innerHTML=result.data.length
    // 计算全栈的人数
    for (var i = 0;i<result.data.length;i++){
        if(result.data[i].student_Model.department=="全栈")
        accountOne++
    }
    console.log("全栈的人数",accountOne)
    // 计算CPU&OS的人数
    for (var i = 0;i<result.data.length;i++){
        if(result.data[i].student_Model.department=="CPU&OS")
        accountTwo++
    }
    console.log("CPU&OS的人数",accountTwo)
    // 计算JAVA的人数
    for (var i = 0;i<result.data.length;i++){
        if(result.data[i].student_Model.department=="JAVA")
        accountThree++
    }
    console.log("JAVA的人数",accountThree)
    // 计算数据科学的人数
    for (var i = 0;i<result.data.length;i++){
        if(result.data[i].student_Model.department=="数据科学")
        accountFour++
    }
    console.log("数据科学的人数",accountFour)
    // 计算设计的人数
    for (var i = 0;i<result.data.length;i++){
        if(result.data[i].student_Model.department=="设计")
        accountFive++
    }
    console.log("设计的人数",accountFive)
    // 计算秘书处的人数
    for (var i = 0;i<result.data.length;i++){
        if(result.data[i].student_Model.department=="秘书处")
        accountSix++
    }
    console.log("秘书处的人数",accountSix)
}).catch((error)=>{error})
// 定义图表的配置和数据  
setTimeout(()=>{
    const myChart = new Chart(ctx, {  
        type: 'bar', // 指定图表类型为条形图  
        data: {  
            labels: ['全栈', 'CPU&OS', 'JAVA', '数据科学', '秘书处', '设计'], // X轴的标签  
            datasets: [{  
                label: '人数', // 数据集的标签  
                data: [accountOne, accountTwo, accountThree, accountFour, accountFive, accountSix], // 数据值，这些值将决定条形柱的高度  
                backgroundColor: [  
                    '#00C2FF',  
                    '#00C2FF',  
                    '#00C2FF',  
                    '#00C2FF',  
                    '#00C2FF',  
                    '#00C2FF'  
                ],  
                
                borderWidth: 1  
            }]  
        },  
        options: {  
            responsive:false,
            scales: {  
                x: {  
                    ticks: {  
                        font: {  
                            size: 25,  
                            weight: 'bold'  
                        }  ,
                        color:"black"
                    }  
                }  ,
                y: {  
                    beginAtZero: true ,// Y轴从0开始  
                    ticks: {  
                        font: {  
                            size: 16,  
                            weight: '700'  
                        }  ,
                        color:"black"
                    }  
                }  
            }  
        }  
    });
},4000)

