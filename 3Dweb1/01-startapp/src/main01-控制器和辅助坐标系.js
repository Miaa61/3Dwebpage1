//导入threejs
import * as THREE from "three";
//导入轨道控制器(路径在three中)
//官网的AxesHelper有相关帮助文档
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";

//创建场景
const scene = new THREE.Scene();

//创建相机(透视相机)
const camera = new THREE.PerspectiveCamera(
    45,//视角（越大，视野越大，东西多）
    window.innerWidth/window.innerHeight,//相机宽高比
    0.1,//近平面（最近可见）
    1000//远平面（最远可见）
);

//创建渲染器
const renderer = new THREE.WebGLRenderer();//创建WebGL渲染器，并连接到指定的canvas对象上
renderer.setSize(window.innerWidth,window.innerHeight);//渲染的尺寸大小
document.body.appendChild(renderer.domElement);//将canvas添加到body上


//创建几何体
const geometry = new THREE.BoxGeometry(1,1,1);
//创建材质
const material = new THREE.MeshBasicMaterial({color:0x00ff00});
//创建网格（即是物体，由几何体和材质构成）
const cube = new THREE.Mesh(geometry,material);

//将网格添加到场景中
scene.add(cube);

//设置相机位置
camera.position.z = 5;//z轴
camera.position.y = 2;//y轴向上抬起来便于观察z轴
camera.position.x = 2;//x轴
camera.lookAt(0,0,0);//默认看向原点

//添加世界坐标辅助器
//红色x轴，绿色y轴，蓝色z轴
const axesHelper = new THREE.AxesHelper(5);//设置坐标系线段长度
scene.add(axesHelper);

//导入轨道控制器
const controls = new OrbitControls(camera,document.body);//renderer.domElement
//设置带阻尼惯性
controls.enableDamping = true;
//设置阻尼系数（越小惯性越大）
controls.dampingFactor = 0.05;
//设置旋转速度
controls.autoRotate = true;

//调用渲染函数
function animate(){
    controls.update();//更新轨道控制器
    requestAnimationFrame(animate);//调用请求动画帧
    //旋转
    //cube.rotation.x +=0.01;
    //cube.rotation.y +=0.01;
    //渲染
    renderer.render(scene,camera);
}
animate();