//导入threejs
import * as THREE from "three";
//导入轨道控制器(路径在three中)
//官网的AxesHelper有相关帮助文档
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
//导入lil.gui
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
//导入hdr加载器
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import {FontLoader} from "three/examples/jsm/loaders/FontLoader.js";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry.js";

//创建场景
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
//创建相机(透视相机)
const camera = new THREE.PerspectiveCamera(
    45,//视角（越大，视野越大，东西多）
    window.innerWidth / window.innerHeight,//相机宽高比
    1,//近平面（最近可见）,过小可能导致深度缓冲或者空间分割算法的失败，从而导致不正确的深度检测，片段遮挡。
    1000//远平面（最远可见）
);

//创建渲染器
const renderer = new THREE.WebGLRenderer();//创建WebGL渲染器，并连接到指定的canvas对象上
renderer.setSize(window.innerWidth, window.innerHeight);//渲染的尺寸大小
document.body.appendChild(renderer.domElement);//将canvas添加到body上


//设置相机位置
camera.position.z = 800;//z轴
camera.position.y = 0;//y轴向上抬起来便于观察z轴
camera.position.x = 0;//x轴
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

// 创建环境光
const light = new THREE.AmbientLight( 0x006699 ,15); // 柔和的白光
scene.add( light );
//方向光
var dir = new THREE.DirectionalLight(0x006699,0.8); 
scene.add(dir);
dir.position.z=20;
//创建雾
scene.fog = new THREE.Fog(0x000000,1000,1500);
//创建文字
function createFont() {
    new FontLoader().load("fonts/gentilis_bold.typeface.json",(font)=>{
        //console.log(font);
        //参数：字符串+大小
        //const shapes = font.generateShapes("THREE.js",1);
        const shapeGeo = new TextGeometry('Three.js',{
            font
        });//接收形状
        //让字体在屏幕中央
        shapeGeo.computeBoundingBox();
        let t = new THREE.Vector3();
        shapeGeo.boundingBox.getCenter(t);
        //向量取反
        t.negate();
        const material = new THREE.MeshPhongMaterial({
            side: THREE.DoubleSide,
            color: 0x006699,
            //opacity:0.4,
            //transparent:true,
        });//字体材质
        const mesh = new THREE.Mesh(shapeGeo,material);//创建网格
        mesh.position.x = t.x;
        mesh.position.y = 60;
        mesh.position.z=2*t.z;
        scene.add(mesh);
        
        const mesh1 = new THREE.Mesh(shapeGeo,material);//创建网格
        mesh1.position.x = t.x;
        mesh.position.y = 60;
        mesh1.rotateX(Math.PI);
        scene.add(mesh1);
        //console.log(shapes);
        //let lineMaterial = new THREE.LineBasicMaterial({color:0x006699});
        //let lines = new THREE.Object3D();
        //for(let i=0;i<shapes.length;i++)
        //{
            // let shape = shapes[i];
            // //console.log(shape.holes);
            // if(shape.holes.length>0){
            //     for(let j=0;j<shape.holes.length;j++){
            //         let hole = shape.holes[j];
            //         let points = hole.getPoints()//得到曲线上的一组点位
            //         let geo 
            //         if(points.length>0)
            //         geo = new THREE.BufferGeometry().setFromPoints(points);
            //         let line = new THREE.Line(geo,lineMaterial);
            //         line.position.x = t.x;
            //         lines.add(line);
            //     }
            // }
            // let points = shape.getPoints()//得到曲线上的一组点位
            // let geo 
            // if(points.length>0)
            // geo = new THREE.BufferGeometry().setFromPoints(points);
            // let line = new THREE.Line(geo,lineMaterial);
            // line.position.x = t.x;
            // lines.add(line);
        //}
        //scene.add(lines);
    });
} 
createFont();
//下方字体的虚化效果
function createPlane(){
    let plane = new THREE.PlaneGeometry(1000,1000);
    let mat = new THREE.MeshBasicMaterial({
        opacity:0.3,
        transparent:true,
    });
    let mesh =  new THREE.Mesh(plane,mat);
    mesh.rotateX(-Math.PI/2);
    scene.add(mesh);
}
createPlane();