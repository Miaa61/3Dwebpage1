//导入threejs
import * as THREE from "three";
//导入轨道控制器(路径在three中)
//官网的AxesHelper有相关帮助文档
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
//导入lil.gui
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
//导入hdr加载器
import {RGBELoader} from "three/examples/jsm/loaders/RGBELoader.js";


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
    //cube1.rotation.x +=0.01;
    //cube1.rotation.y +=0.01;
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

//创建长方体
const boxGeometry = new THREE.BoxGeometry(1,1,100);
const boxMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
});
const box = new THREE.Mesh(boxGeometry,boxMaterial);
scene.add(box);

//创建场景fog(线性雾)
//scene.fog = new THREE.Fog(0x999999,0.1,50);
// 创建场景指数fog
scene.fog = new THREE.FogExp2(0x999999,0.1);//0.1作为雾的密度
//设置雾的背景
scene.background = new THREE.Color(0x999999);