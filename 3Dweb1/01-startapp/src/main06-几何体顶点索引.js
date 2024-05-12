//导入threejs
import * as THREE from "three";
//导入轨道控制器(路径在three中)
//官网的AxesHelper有相关帮助文档
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
//导入lil.gui
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";

//创建场景
const scene = new THREE.Scene();

//创建相机(透视相机)
const camera = new THREE.PerspectiveCamera(
    45,//视角（越大，视野越大，东西多）
    window.innerWidth / window.innerHeight,//相机宽高比
    0.1,//近平面（最近可见）
    1000//远平面（最远可见）
);

//创建渲染器
const renderer = new THREE.WebGLRenderer();//创建WebGL渲染器，并连接到指定的canvas对象上
renderer.setSize(window.innerWidth, window.innerHeight);//渲染的尺寸大小
document.body.appendChild(renderer.domElement);//将canvas添加到body上

////创建几何体
//const geometry = new THREE.BoxGeometry(1, 1, 1);
////创建材质
//const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//const parentMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
//设置父子元素材质为线框模式
//parentMaterial.wireframe = true;
//material.wireframe = true;
//创建网格（即是物体，由几何体和材质构成）
//创建cube的父元素
//let parentCube = new THREE.Mesh(geometry, parentMaterial);
//const cube = new THREE.Mesh(geometry, material);
//console.log(geometry);
//parentCube.add(cube);
//设置父元素位置
//parentCube.position.set(-2, 0, 0);
//parentCube.rotation.x = Math.PI / 4;
//parentCube.scale.set(2,2,2)

//position三维向量，父元素的相对位置
//属性类型vector3
//法一：cube.position.x = 2;
//cube.position.set(2, 0, 0);
//设置立方体的放大(相对父元素)
//cube.scale.set(2,2,2);
//绕着x轴旋转(Euler:默认xyz,相对父元素)
//cube.rotation.x = Math.PI / 4;

//将网格添加到场景中
//scene.add(cube);
//scene.add(parentCube);

//创建几何体
const geometry = new THREE.BufferGeometry();
// //创建顶点数据(32位的浮点数数组)
// //顶点有顺序，点的逆时针为正面，顺时针为反面
// const vertices = new Float32Array([
//     -1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 1.0, 1.0, 0.0,
//     1.0, 1.0, 0.0, -1.0, 1.0, 0.0, -1.0, -1.0, 0.0,
// ]);
// //创建顶点属性
// geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));//3个顶点一组数据

//使用索引绘制
const vertices = new Float32Array([
    -1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 1.0, 1.0, 0.0, -1.0, 1.0, 0.0,
]);
//创建顶点属性
geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));//3个顶点一组数据
//创建一个索引
const indices = new Uint16Array([0, 1, 2, 2, 3, 0]);
//创建索引属性
geometry.setIndex(new THREE.BufferAttribute(indices,1));
console.log(geometry);
//创建材质
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    side: THREE.DoubleSide,
    wireframe: true,
})
const plane = new THREE.Mesh(geometry, material);
//将场景添加进平面
scene.add(plane);

//设置相机位置
camera.position.z = 5;//z轴
camera.position.y = 2;//y轴向上抬起来便于观察z轴
camera.position.x = 2;//x轴
camera.lookAt(0, 0, 0);//默认看向原点

//添加世界坐标辅助器
//红色x轴，绿色y轴，蓝色z轴
const axesHelper = new THREE.AxesHelper(5);//设置坐标系线段长度
scene.add(axesHelper);

//导入轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);//document.body
//设置带阻尼惯性
controls.enableDamping = true;
//设置阻尼系数（越小惯性越大）
controls.dampingFactor = 0.05;
//设置旋转速度
//controls.autoRotate = true;

//调用渲染函数
function animate() {
    controls.update();//更新轨道控制器
    requestAnimationFrame(animate);//调用请求动画帧
    //旋转
    //cube.rotation.x +=0.01;
    //cube.rotation.y +=0.01;
    //渲染
    renderer.render(scene, camera);
}
animate();

//监听窗口变化
window.addEventListener("resize", () => {
    //重置渲染器宽高比
    renderer.setSize(window.innerWidth, window.innerHeight);
    //重置相机宽高比
    camera.aspect = window.innerWidth / window.innerHeight;
    //更新相机投影矩阵
    camera.updateProjectionMatrix();
});

// //监听按钮
// //进入全屏
// var btn = document.createElement("button");
// btn.innerHTML = "点击全屏";
// btn.style.position = "absolute";
// btn.style.top = "10px";
// btn.style.left = "10px";
// btn.style.zIndex = "999";
// btn.onclick = function () {
//     //全屏
//     document.body.requestFullscreen();
//     console.log("点击全屏");
// }
// document.body.appendChild(btn);

// //退出全屏
// var exitBtn = document.createElement("button");
// exitBtn.innerHTML = "退出全屏";
// exitBtn.style.position = "absolute";
// exitBtn.style.top = "10px";
// exitBtn.style.left = "100px";
// exitBtn.style.zIndex = "999";
// exitBtn.onclick = function () {
//     //退出全屏
//     document.exitFullscreen();
//     console.log("退出全屏");
// }
// document.body.appendChild(exitBtn);

//定义全屏的事件对象
let eventObj = {
    Fullscreen: function () {
        //全屏
        document.body.requestFullscreen();
        console.log("点击全屏");
    },
    ExitFullscreen: function () {
        document.exitFullscreen();
        console.log("退出全屏");
    },
}

//创建GUI（放入创建对象）
const gui = new GUI();
//添加按钮
gui.add(eventObj, "Fullscreen").name("全屏");
gui.add(eventObj, "ExitFullscreen").name("退出全屏");
//控制立方体位置
//gui.add(cube.position,"x",-5,5).name("立方体x轴的位置");
// let folder = gui.addFolder("立方体位置");
// folder.add(cube.position, "x").min(-10).max(10).step(1).name("立方体x轴的位置").onChange((val) => {
//     console.log("立方体x轴的位置", val);
// });
// folder.add(cube.position, "y").min(-10).max(10).step(1).name("立方体y轴的位置").onFinishChange((val) => {
//     console.log("立方体y轴的位置", val);
// });
// folder.add(cube.position, "z").min(-10).max(10).step(1).name("立方体z轴的位置");

// let col = gui.addFolder("立方体样式");
// //父子元素线框模式是否勾选
// col.add(parentMaterial, "wireframe").name("父元素线框模式");
// col.add(material, "wireframe").name("子元素线框模式");
// //父子立方体的颜色选择
// let parentcolorParams = {
//     parentCubeColor: "#ff0000",
// };
// col.addColor(parentcolorParams, "parentCubeColor").name("父立方体的颜色").onChange((val) => {
//     parentCube.material.color.set(val);
// });
// let colorParams = {
//     cubeColor: "#ff0000",
// };
// col.addColor(colorParams, "cubeColor").name("子立方体的颜色").onChange((val) => {
//     cube.material.color.set(val);
// });
