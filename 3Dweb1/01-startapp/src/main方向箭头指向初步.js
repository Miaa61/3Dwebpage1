//导入threejs
import * as THREE from "three";
//导入轨道控制器(路径在three中)
//官网的AxesHelper有相关帮助文档
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
//导入lil.gui
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
//导入hdr加载器
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

//创建场景
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

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

//创建几何体
const geometry0 = new THREE.BoxGeometry(3, 2, 0.5);
const geometry = new THREE.BoxGeometry(1.5, 1.5, 0.3);
//创建材质
const material = new THREE.MeshBasicMaterial({ color: 0xffb8b8 });
const parentMaterial = new THREE.MeshBasicMaterial({ color: 0x99adff });
//设置父子元素材质为线框模式
parentMaterial.wireframe = true;
material.wireframe = true;
//创建网格（即是物体，由几何体和材质构成）
//创建cube的父元素
const parentCube = new THREE.Mesh(geometry0, parentMaterial);
const cube1 = new THREE.Mesh(geometry, material);
const cube2 = new THREE.Mesh(geometry, material);
const cube3 = new THREE.Mesh(geometry, material);
const cube4 = new THREE.Mesh(geometry, material);
const cube5 = new THREE.Mesh(geometry, material);
const cube6 = new THREE.Mesh(geometry, material);
const cube7 = new THREE.Mesh(geometry, material);
const cube8 = new THREE.Mesh(geometry, material);
const cube9 = new THREE.Mesh(geometry, material);
const cube10 = new THREE.Mesh(geometry, material);
const cube11 = new THREE.Mesh(geometry, material);
const cube12 = new THREE.Mesh(geometry, material);
const cube13 = new THREE.Mesh(geometry, material);
const cube14= new THREE.Mesh(geometry, material);
const cube15 = new THREE.Mesh(geometry, material);
//将cube添加到父元素中，再将父元素直接添加到场景即可
parentCube.add(cube1,cube2,cube3,cube4,cube5,cube6);
parentCube.add(cube7,cube8,cube9,cube10,cube11);
parentCube.add(cube12,cube13,cube14,cube15);
//设置父元素位置
parentCube.position.set(0, 4, 0);
parentCube.rotation.x = Math.PI * 3 / 2;
//parentCube.scale.set(2,2,2)

//position三维向量，父元素的相对位置
//属性类型vector3
//法一：cube.position.x = 2;
cube1.position.set(-9, 0, -2);
cube2.position.set(-3, 0, -2);
cube3.position.set(3, 0, -2);
cube4.position.set(9, 0, -2);
cube5.position.set(-3, 0, -4);
cube6.position.set(3, 0, -4);
cube7.position.set(9, 0, -4);
cube8.position.set(-3, 0, -6);
cube9.position.set(3, 0, -6);
cube10.position.set(6, 0, -6);
cube11.position.set(9, 0, -6);
cube12.position.set(12, 0, -6);
cube13.position.set(-3, 0, -8);
cube14.position.set(4.5, 0, -8);
cube15.position.set(7.5, 0, -8);
//设置立方体的放大(相对父元素)
//cube1.scale.set(2,2,2);
//绕着x轴旋转(Euler:默认xyz,相对父元素)
cube1.rotation.x = 0;//Math.PI / 4;

//将网格添加到场景中
scene.add(parentCube);

//设置相机位置
camera.position.z = 15;//z轴
camera.position.y = 2;//y轴向上抬起来便于观察z轴
camera.position.x = -2;//x轴
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
    //parentCube.rotation.x +=0.01;
    //parentCube.rotation.y +=0.01;
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
//gui.add(cube1.position,"x",-5,5).name("立方体x轴的位置");
let folder = gui.addFolder("立方体位置");
folder.add(parentCube.position, "x").min(-10).max(10).step(1).name("立方体x轴的位置").onChange((val) => {
    console.log("立方体x轴的位置", val);
});
folder.add(parentCube.position, "y").min(-10).max(10).step(1).name("立方体y轴的位置").onFinishChange((val) => {
    console.log("立方体y轴的位置", val);
});
folder.add(parentCube.position, "z").min(-10).max(10).step(1).name("立方体z轴的位置");

let col = gui.addFolder("立方体样式");
//父元素线框模式是否勾选
col.add(parentMaterial,"wireframe").name("父元素线框模式");
col.add(material,"wireframe").name("子元素线框模式");
//父子立方体的颜色选择
let parentcolorParams={
    parentCubeColor:"#ff0000",
};
col.addColor(parentcolorParams,"parentCubeColor").name("父立方体的颜色").onChange((val)=>{
    parentCube.material.color.set(val);
});
let colorParams={
    cubeColor:"#ff0000",
};
col.addColor(colorParams,"cubeColor").name("子立方体的颜色").onChange((val)=>{
    cube1.material.color.set(val);
});

//画线
//创建线条的材质
const material1 = new THREE.LineBasicMaterial({color:0x6df889});
const material2 = new THREE.LineBasicMaterial({color:0xf4ed2f});

//创建需要连线的三个点
const points1 = [
    new THREE.Vector2(-9,2,0),
    new THREE.Vector2(0,4,0),
];
const points2 = [
    new THREE.Vector2(-3,2,0),
    new THREE.Vector2(0,4,0),
];
const points3 = [
    new THREE.Vector2(3,2,0),
    new THREE.Vector2(0,4,0),
];
const points4 = [
    new THREE.Vector2(9,2,0),
    new THREE.Vector2(0,4,0),
];
const points5 = [
    new THREE.Vector3(-9.5,2,0),
    new THREE.Vector3(-9.5,-4,0),
    new THREE.Vector3(-3,-4,0),
];
const points6 = [
    new THREE.Vector3(-8.5,2,0),
    new THREE.Vector3(-8.5,0,0),
    new THREE.Vector3(-3,0,0),
];
const points7 = [
    new THREE.Vector2(-3,2,0),
    new THREE.Vector2(-3,0,0),
];
const points8 = [
    new THREE.Vector2(-3,0,0),
    new THREE.Vector2(-3,-2,0),
];
const points9 = [
    new THREE.Vector2(-3,-2,0),
    new THREE.Vector2(-3,-4,0),
];
const points10 = [
    new THREE.Vector2(3,2,0),
    new THREE.Vector2(3,0,0),
];
const points11 = [
    new THREE.Vector2(3,0,0),
    new THREE.Vector2(3,-2,0),
];
const points12 = [
    new THREE.Vector4(3,0,0),
    new THREE.Vector4(1,0,0),
    new THREE.Vector4(1,-4,0),
    new THREE.Vector4(4.5,-4,0),
];
const points13 = [
    new THREE.Vector3(3,0,0),
    new THREE.Vector3(5.5,0,0),
    new THREE.Vector3(5.5,-2,0),
];
const points14 = [
    new THREE.Vector2(9,2,0),
    new THREE.Vector2(9,0,0),
];
const points15 = [
    new THREE.Vector2(9,0,0),
    new THREE.Vector2(9,-2,0),
];
const points16 = [
    new THREE.Vector2(9,0,0),
    new THREE.Vector2(6,-2,0),
];
const points17 = [
    new THREE.Vector2(9,0,0),
    new THREE.Vector2(12,-2,0),
];
const points18 = [
    new THREE.Vector2(6,-2,0),
    new THREE.Vector2(4.5,-4,0),
];
const points19 = [
    new THREE.Vector2(6,-2,0),
    new THREE.Vector2(7.5,-4,0),
];

//创建函数将点连起来
const geometry1 = new THREE.BufferGeometry().setFromPoints(points1);
const geometry2 = new THREE.BufferGeometry().setFromPoints(points2);
const geometry3 = new THREE.BufferGeometry().setFromPoints(points3);
const geometry4 = new THREE.BufferGeometry().setFromPoints(points4);
const geometry5 = new THREE.BufferGeometry().setFromPoints(points5);
const geometry6 = new THREE.BufferGeometry().setFromPoints(points6);
const geometry7 = new THREE.BufferGeometry().setFromPoints(points7);
const geometry8 = new THREE.BufferGeometry().setFromPoints(points8);
const geometry9 = new THREE.BufferGeometry().setFromPoints(points9);
const geometry10 = new THREE.BufferGeometry().setFromPoints(points10);
const geometry11 = new THREE.BufferGeometry().setFromPoints(points11);
const geometry12 = new THREE.BufferGeometry().setFromPoints(points12);
const geometry13 = new THREE.BufferGeometry().setFromPoints(points13);
const geometry14 = new THREE.BufferGeometry().setFromPoints(points14);
const geometry15 = new THREE.BufferGeometry().setFromPoints(points15);
const geometry16 = new THREE.BufferGeometry().setFromPoints(points16);
const geometry17 = new THREE.BufferGeometry().setFromPoints(points17);
const geometry18 = new THREE.BufferGeometry().setFromPoints(points18);
const geometry19 = new THREE.BufferGeometry().setFromPoints(points19);

//创建线条
const line1 = new THREE.Line(geometry1,material1);
const line2 = new THREE.Line(geometry2,material1);
const line3 = new THREE.Line(geometry3,material1);
const line4 = new THREE.Line(geometry4,material1);
const line5 = new THREE.Line(geometry5,material2);
const line6 = new THREE.Line(geometry6,material2);
const line7 = new THREE.Line(geometry7,material1);
const line8 = new THREE.Line(geometry8,material1);
const line9 = new THREE.Line(geometry9,material1);
const line10 = new THREE.Line(geometry10,material1);
const line11 = new THREE.Line(geometry11,material1);
const line12 = new THREE.Line(geometry12,material2);
const line13 = new THREE.Line(geometry13,material2);
const line14 = new THREE.Line(geometry14,material1);
const line15 = new THREE.Line(geometry15,material1);
const line16 = new THREE.Line(geometry16,material1);
const line17 = new THREE.Line(geometry17,material1);
const line18 = new THREE.Line(geometry18,material1);
const line19 = new THREE.Line(geometry19,material1);

//scene.add(line1,line2,line3,line4,line7,line8,line9,line10);
//scene.add(line5,line6,line12,line13);
//scene.add(line11,line14,line15,line16,line17,line18,line19);


//创建射线
const raycaster = new THREE.Raycaster();
//创建鼠标向量(保存鼠标点在画布的何处)
const mouse = new THREE.Vector2();

//创建点击事件
//监听窗口
window.addEventListener("click", (event) => {
    //监听鼠标点击位置(像素屏)
    console.log(event.clientX, event.clientY);
    //设置鼠标向量的x,y值
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - ((event.clientY / window.innerHeight) * 2 - 1);

    //监听鼠标的点击事件（坐标系）
    //console.log(mouse.x,mouse.y);

    //通过摄像机和鼠标位置更新射线
    raycaster.setFromCamera(mouse,camera);

    //计算物体和射线的交点
    //检测射线有没有碰到物体对象(scene.children)
    const intersects1 = raycaster.intersectObjects([cube1]);

    //如果有碰到物体则进行画线
    if(intersects1.length>0){
        //判断是否被选中,选中则恢复原来没有线条的形状
        if(intersects1[0].object._isSelect){
            scene.remove(line1); //删除线段
            intersects1[0].object._isSelect = false;
            return ;
        }
        //添加自定义属性_isSelect等
        intersects1[0].object._isSelect = true;
        //存储原本的颜色再改色
        //getHex()获取颜色的十六进制值
        intersects1[0].object.material._originColor = intersects1[0].object.material.color.getHex();
        scene.add(line1);
    }
    //    console.log(intersects);


    const intersects2 = raycaster.intersectObjects([cube2]);
    if(intersects2.length>0){
        if(intersects2[0].object._isSelect){
            scene.remove(line2); 
            intersects2[0].object._isSelect = false;
            return ;
        }
        intersects2[0].object._isSelect = true;
        intersects2[0].object.material._originColor = intersects2[0].object.material.color.getHex();
        scene.add(line2);
    }

    const intersects3 = raycaster.intersectObjects([cube3]);
    if(intersects3.length>0){
        if(intersects3[0].object._isSelect){
            scene.remove(line3); 
            intersects3[0].object._isSelect = false;
            return ;
        }
        intersects3[0].object._isSelect = true;
        intersects3[0].object.material._originColor = intersects3[0].object.material.color.getHex();
        scene.add(line3);
    }


    const intersects4 = raycaster.intersectObjects([cube4]);
    if(intersects4.length>0){
        if(intersects4[0].object._isSelect){
            scene.remove(line4); 
            intersects4[0].object._isSelect = false;
            return ;
        }
        intersects4[0].object._isSelect = true;
        intersects4[0].object.material._originColor = intersects4[0].object.material.color.getHex();
        scene.add(line4);
    }

    const intersects5 = raycaster.intersectObjects([cube5]);
    if(intersects5.length>0){
        if(intersects5[0].object._isSelect){
            scene.remove(line1,line2,line6,line7); 
            intersects5[0].object._isSelect = false;
            return ;
        }
        intersects5[0].object._isSelect = true;
        intersects5[0].object.material._originColor = intersects5[0].object.material.color.getHex();
        scene.add(line1,line2,line6,line7);
    }

    const intersects6 = raycaster.intersectObjects([cube6]);
    if(intersects6.length>0){
        if(intersects6[0].object._isSelect){
            scene.remove(line3,line10,line13); 
            intersects6[0].object._isSelect = false;
            return ;
        }
        intersects6[0].object._isSelect = true;
        intersects6[0].object.material._originColor = intersects6[0].object.material.color.getHex();
        scene.add(line3,line10,line13);
    }

    const intersects7 = raycaster.intersectObjects([cube7]);
    if(intersects7.length>0){
        if(intersects7[0].object._isSelect){
            scene.remove(line4,line14); 
            intersects7[0].object._isSelect = false;
            return ;
        }
        intersects7[0].object._isSelect = true;
        intersects7[0].object.material._originColor = intersects7[0].object.material.color.getHex();
        scene.add(line4,line14);
    }

    const intersects8 = raycaster.intersectObjects([cube8]);
    if(intersects8.length>0){
        if(intersects8[0].object._isSelect){
            scene.remove(line2,line7,line8); 
            intersects8[0].object._isSelect = false;
            return ;
        }
        intersects8[0].object._isSelect = true;
        intersects8[0].object.material._originColor = intersects8[0].object.material.color.getHex();
        scene.add(line2,line7,line8);
    }

    const intersects9 = raycaster.intersectObjects([cube9]);
    if(intersects9.length>0){
        if(intersects9[0].object._isSelect){
            scene.remove(line3,line10,line11); 
            intersects9[0].object._isSelect = false;
            return ;
        }
        intersects9[0].object._isSelect = true;
        intersects9[0].object.material._originColor = intersects9[0].object.material.color.getHex();
        scene.add(line3,line10,line11);
    }

    const intersects10 = raycaster.intersectObjects([cube10]);
    if(intersects10.length>0){
        if(intersects10[0].object._isSelect){
            scene.remove(line4,line14,line16); 
            intersects10[0].object._isSelect = false;
            return ;
        }
        intersects10[0].object._isSelect = true;
        intersects10[0].object.material._originColor = intersects10[0].object.material.color.getHex();
        scene.add(line4,line14,line16);
    }

    const intersects11 = raycaster.intersectObjects([cube11]);
    if(intersects11.length>0){
        if(intersects11[0].object._isSelect){
            scene.remove(line4,line14,line15); 
            intersects11[0].object._isSelect = false;
            return ;
        }
        intersects11[0].object._isSelect = true;
        intersects11[0].object.material._originColor = intersects11[0].object.material.color.getHex();
        scene.add(line4,line14,line15);
    }

    const intersects12 = raycaster.intersectObjects([cube12]);
    if(intersects12.length>0){
        if(intersects12[0].object._isSelect){
            scene.remove(line4,line14,line17); 
            intersects12[0].object._isSelect = false;
            return ;
        }
        intersects12[0].object._isSelect = true;
        intersects12[0].object.material._originColor = intersects12[0].object.material.color.getHex();
        scene.add(line4,line14,line17);
    }

    const intersects13 = raycaster.intersectObjects([cube13]);
    if(intersects13.length>0){
        if(intersects13[0].object._isSelect){
            scene.remove(line1,line2,line5,line7,line8,line9); 
            intersects13[0].object._isSelect = false;
            return ;
        }
        intersects13[0].object._isSelect = true;
        intersects13[0].object.material._originColor = intersects13[0].object.material.color.getHex();
        scene.add(line1,line2,line5,line7,line8,line9);
    }

    const intersects14 = raycaster.intersectObjects([cube14]);
    if(intersects14.length>0){
        if(intersects14[0].object._isSelect){
            scene.remove(line4,line12,line14,line16,line18); 
            intersects14[0].object._isSelect = false;
            return ;
        }
        intersects14[0].object._isSelect = true;
        intersects14[0].object.material._originColor = intersects14[0].object.material.color.getHex();
        scene.add(line4,line12,line14,line16,line18);
    }

    const intersects15 = raycaster.intersectObjects([cube15]);
    if(intersects15.length>0){
        if(intersects15[0].object._isSelect){
            scene.remove(line4,line14,line16,line19); 
            intersects15[0].object._isSelect = false;
            return ;
        }
        intersects15[0].object._isSelect = true;
        intersects15[0].object.material._originColor = intersects15[0].object.material.color.getHex();
        scene.add(line4,line14,line16,line19);
    }

});


//创建文字
function createFont() {
    new FontLoader().load("fonts/FangSong_Regular.json",(font)=>{
        //console.log(font);
        //参数：字符串+大小
        const shapes = font.generateShapes("ACM竞赛课程地图",0.5);
        //接收形状
        const shapeGeo = new THREE.ShapeGeometry(shapes);
        //让字体在屏幕中央
        // shapeGeo.computeBoundingBox();
        // let t = new THREE.Vector3();
        // shapeGeo.boundingBox.getCenter(t);
        //向量取反
        //t.negate();
        //字体材质
        const material = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            color: 0x006699,
            opacity:0.5,
            transparent:true,
        });
        //创建网格
        const mesh = new THREE.Mesh(shapeGeo,material);
        mesh.position.x = -2.5;
        mesh.position.y = 4.5;
        mesh.position.z=-0.5;
        scene.add(mesh);
        
        //前端字体颜色console.log(shapes);
        let lineMaterial = new THREE.LineBasicMaterial({color:0x006699});
        let lines = new THREE.Object3D();
        for(let i=0;i<shapes.length;i++)
        {
            let shape = shapes[i];
            //console.log(shape.holes);
            if(shape.holes.length>0){
                for(let j=0;j<shape.holes.length;j++){
                    let hole = shape.holes[j];
                    let points = hole.getPoints()//得到曲线上的一组点位
                    let geo 
                    if(points.length>0)
                    geo = new THREE.BufferGeometry().setFromPoints(points);
                    let line = new THREE.Line(geo,lineMaterial);
                    line.position.x = -2.5;
                    line.position.y = 4.5;
                    lines.add(line);
                }
            }
            //得到曲线上的一组点位
            let points = shape.getPoints()
            let geo 
            if(points.length>0)
            geo = new THREE.BufferGeometry().setFromPoints(points);
            let line = new THREE.Line(geo,lineMaterial);
            line.position.x = -2.5;
            line.position.y = 4.5;
            lines.add(line);
        }
        scene.add(lines);


        const shapes1 = font.generateShapes("线性代数A",0.4);
        //接收形状
        const shapeGeo1 = new THREE.ShapeGeometry(shapes1);
        //创建网格
        const mesh1 = new THREE.Mesh(shapeGeo1,material);
        mesh1.position.x = -10.3;
        mesh1.position.y = 2.5;
        mesh1.position.z=-0.5;
        scene.add(mesh1);
        
        for(let i=0;i<shapes1.length;i++)
        {
            let shape = shapes1[i];
            //console.log(shape.holes);
            if(shape.holes.length>0){
                for(let j=0;j<shape.holes.length;j++){
                    let hole = shape.holes[j];
                    //得到曲线上的一组点位
                    let points = hole.getPoints()
                    let geo 
                    if(points.length>0)
                    geo = new THREE.BufferGeometry().setFromPoints(points);
                    let line = new THREE.Line(geo,lineMaterial);
                    line.position.x = -10.3;
                    line.position.y = 2.5;
                    lines.add(line);
                }
            }
            //得到曲线上的一组点位
            let points = shape.getPoints()
            let geo 
            if(points.length>0)
            geo = new THREE.BufferGeometry().setFromPoints(points);
            let line = new THREE.Line(geo,lineMaterial);
            line.position.x = -10.3;
            line.position.y = 2.5;
            lines.add(line);
        }
        scene.add(lines);


        const shapes2 = font.generateShapes("高等数学A",0.4);
        //接收形状
        const shapeGeo2 = new THREE.ShapeGeometry(shapes2);
        //创建网格
        const mesh2 = new THREE.Mesh(shapeGeo2,material);
        mesh2.position.x = -4.3;
        mesh2.position.y = 2.5;
        mesh2.position.z=-0.5;
        scene.add(mesh2);
        
        for(let i=0;i<shapes2.length;i++)
        {
            let shape = shapes2[i];
            //console.log(shape.holes);
            if(shape.holes.length>0){
                for(let j=0;j<shape.holes.length;j++){
                    let hole = shape.holes[j];
                    //得到曲线上的一组点位
                    let points = hole.getPoints()
                    let geo 
                    if(points.length>0)
                    geo = new THREE.BufferGeometry().setFromPoints(points);
                    let line = new THREE.Line(geo,lineMaterial);
                    line.position.x = -4.3;
                    line.position.y = 2.5;
                    lines.add(line);
                }
            }
            //得到曲线上的一组点位
            let points = shape.getPoints()
            let geo 
            if(points.length>0)
            geo = new THREE.BufferGeometry().setFromPoints(points);
            let line = new THREE.Line(geo,lineMaterial);
            line.position.x = -4.3;
            line.position.y = 2.5;
            lines.add(line);
        }
        scene.add(lines);


        const shapes3 = font.generateShapes("离散数学",0.4);
        //接收形状
        const shapeGeo3 = new THREE.ShapeGeometry(shapes3);
        //创建网格
        const mesh3 = new THREE.Mesh(shapeGeo3,material);
        mesh3.position.x = 1.9;
        mesh3.position.y = 2.5;
        mesh3.position.z=-0.5;
        scene.add(mesh3);
        
        for(let i=0;i<shapes3.length;i++)
        {
            let shape = shapes3[i];
            //console.log(shape.holes);
            if(shape.holes.length>0){
                for(let j=0;j<shape.holes.length;j++){
                    let hole = shape.holes[j];
                    //得到曲线上的一组点位
                    let points = hole.getPoints()
                    let geo 
                    if(points.length>0)
                    geo = new THREE.BufferGeometry().setFromPoints(points);
                    let line = new THREE.Line(geo,lineMaterial);
                    line.position.x = 1.9;
                    line.position.y = 2.5;
                    lines.add(line);
                }
            }
            //得到曲线上的一组点位
            let points = shape.getPoints()
            let geo 
            if(points.length>0)
            geo = new THREE.BufferGeometry().setFromPoints(points);
            let line = new THREE.Line(geo,lineMaterial);
            line.position.x = 1.9;
            line.position.y = 2.5;
            lines.add(line);
        }
        scene.add(lines);


        const shapes4 = font.generateShapes("计算机科学导论",0.4);
        //接收形状
        const shapeGeo4 = new THREE.ShapeGeometry(shapes4);
        //创建网格
        const mesh4 = new THREE.Mesh(shapeGeo4,material);
        mesh4.position.x = 7;
        mesh4.position.y = 2.5;
        mesh4.position.z=-0.5;
        scene.add(mesh4);
        
        for(let i=0;i<shapes4.length;i++)
        {
            let shape = shapes4[i];
            //console.log(shape.holes);
            if(shape.holes.length>0){
                for(let j=0;j<shape.holes.length;j++){
                    let hole = shape.holes[j];
                    //得到曲线上的一组点位
                    let points = hole.getPoints()
                    let geo 
                    if(points.length>0)
                    geo = new THREE.BufferGeometry().setFromPoints(points);
                    let line = new THREE.Line(geo,lineMaterial);
                    line.position.x = 7;
                    line.position.y = 2.5;
                    lines.add(line);
                }
            }
            //得到曲线上的一组点位
            let points = shape.getPoints()
            let geo 
            if(points.length>0)
            geo = new THREE.BufferGeometry().setFromPoints(points);
            let line = new THREE.Line(geo,lineMaterial);
            line.position.x = 7;
            line.position.y = 2.5;
            lines.add(line);
        }
        scene.add(lines);


        const shapes5 = font.generateShapes("概率论与数理统计",0.4);
        //接收形状
        const shapeGeo5 = new THREE.ShapeGeometry(shapes5);
        //创建网格
        const mesh5 = new THREE.Mesh(shapeGeo5,material);
        mesh5.position.x = -5.3;
        mesh5.position.y = 0.5;
        mesh5.position.z=-0.5;
        scene.add(mesh5);
        
        for(let i=0;i<shapes5.length;i++)
        {
            let shape = shapes5[i];
            //console.log(shape.holes);
            if(shape.holes.length>0){
                for(let j=0;j<shape.holes.length;j++){
                    let hole = shape.holes[j];
                    //得到曲线上的一组点位
                    let points = hole.getPoints()
                    let geo 
                    if(points.length>0)
                    geo = new THREE.BufferGeometry().setFromPoints(points);
                    let line = new THREE.Line(geo,lineMaterial);
                    line.position.x = -5.3;
                    line.position.y = 0.5;
                    lines.add(line);
                }
            }
            //得到曲线上的一组点位
            let points = shape.getPoints()
            let geo 
            if(points.length>0)
            geo = new THREE.BufferGeometry().setFromPoints(points);
            let line = new THREE.Line(geo,lineMaterial);
            line.position.x = -5.3;
            line.position.y = 0.5;
            lines.add(line);
        }
        scene.add(lines);


        const shapes6 = font.generateShapes("数据结构",0.4);
        //接收形状
        const shapeGeo6 = new THREE.ShapeGeometry(shapes6);
        //创建网格
        const mesh6 = new THREE.Mesh(shapeGeo6,material);
        mesh6.position.x = 1.9;
        mesh6.position.y = 0.5;
        mesh6.position.z=-0.5;
        scene.add(mesh6);
        
        for(let i=0;i<shapes6.length;i++)
        {
            let shape = shapes6[i];
            //console.log(shape.holes);
            if(shape.holes.length>0){
                for(let j=0;j<shape.holes.length;j++){
                    let hole = shape.holes[j];
                    //得到曲线上的一组点位
                    let points = hole.getPoints()
                    let geo 
                    if(points.length>0)
                    geo = new THREE.BufferGeometry().setFromPoints(points);
                    let line = new THREE.Line(geo,lineMaterial);
                    line.position.x = 1.9;
                    line.position.y = 0.5;
                    lines.add(line);
                }
            }
            //得到曲线上的一组点位
            let points = shape.getPoints()
            let geo 
            if(points.length>0)
            geo = new THREE.BufferGeometry().setFromPoints(points);
            let line = new THREE.Line(geo,lineMaterial);
            line.position.x = 1.9;
            line.position.y = 0.5;
            lines.add(line);
        }
        scene.add(lines);


        const shapes7 = font.generateShapes("程序设计基础",0.4);
        //接收形状
        const shapeGeo7 = new THREE.ShapeGeometry(shapes7);
        //创建网格
        const mesh7 = new THREE.Mesh(shapeGeo7,material);
        mesh7.position.x = 7.5;
        mesh7.position.y = 0.5;
        mesh7.position.z=-0.5;
        scene.add(mesh7);
        
        for(let i=0;i<shapes7.length;i++)
        {
            let shape = shapes7[i];
            //console.log(shape.holes);
            if(shape.holes.length>0){
                for(let j=0;j<shape.holes.length;j++){
                    let hole = shape.holes[j];
                    //得到曲线上的一组点位
                    let points = hole.getPoints()
                    let geo 
                    if(points.length>0)
                    geo = new THREE.BufferGeometry().setFromPoints(points);
                    let line = new THREE.Line(geo,lineMaterial);
                    line.position.x = 7.5;
                    line.position.y = 0.5;
                    lines.add(line);
                }
            }
            //得到曲线上的一组点位
            let points = shape.getPoints()
            let geo 
            if(points.length>0)
            geo = new THREE.BufferGeometry().setFromPoints(points);
            let line = new THREE.Line(geo,lineMaterial);
            line.position.x = 7.5;
            line.position.y = 0.5;
            lines.add(line);
        }
        scene.add(lines);


        const shapes8 = font.generateShapes("数论与组合数学",0.4);
        //接收形状
        const shapeGeo8 = new THREE.ShapeGeometry(shapes8);
        //创建网格
        const mesh8 = new THREE.Mesh(shapeGeo8,material);
        mesh8.position.x = -5;
        mesh8.position.y = -1.5;
        mesh8.position.z=-0.5;
        scene.add(mesh8);
        
        for(let i=0;i<shapes8.length;i++)
        {
            let shape = shapes8[i];
            //console.log(shape.holes);
            if(shape.holes.length>0){
                for(let j=0;j<shape.holes.length;j++){
                    let hole = shape.holes[j];
                    //得到曲线上的一组点位
                    let points = hole.getPoints()
                    let geo 
                    if(points.length>0)
                    geo = new THREE.BufferGeometry().setFromPoints(points);
                    let line = new THREE.Line(geo,lineMaterial);
                    line.position.x = -5;
                    line.position.y = -1.5;
                    lines.add(line);
                }
            }
            //得到曲线上的一组点位
            let points = shape.getPoints()
            let geo 
            if(points.length>0)
            geo = new THREE.BufferGeometry().setFromPoints(points);
            let line = new THREE.Line(geo,lineMaterial);
            line.position.x = -5;
            line.position.y = -1.5;
            lines.add(line);
        }
        scene.add(lines);


        const shapes9 = font.generateShapes("编译原理",0.4);
        //接收形状
        const shapeGeo9 = new THREE.ShapeGeometry(shapes9);
        //创建网格
        const mesh9 = new THREE.Mesh(shapeGeo9,material);
        mesh9.position.x = 2;
        mesh9.position.y = -1.5;
        mesh9.position.z=-0.5;
        scene.add(mesh9);
        
        for(let i=0;i<shapes9.length;i++)
        {
            let shape = shapes9[i];
            //console.log(shape.holes);
            if(shape.holes.length>0){
                for(let j=0;j<shape.holes.length;j++){
                    let hole = shape.holes[j];
                    //得到曲线上的一组点位
                    let points = hole.getPoints()
                    let geo 
                    if(points.length>0)
                    geo = new THREE.BufferGeometry().setFromPoints(points);
                    let line = new THREE.Line(geo,lineMaterial);
                    line.position.x = 2;
                    line.position.y = -1.5;
                    lines.add(line);
                }
            }
            //得到曲线上的一组点位
            let points = shape.getPoints()
            let geo 
            if(points.length>0)
            geo = new THREE.BufferGeometry().setFromPoints(points);
            let line = new THREE.Line(geo,lineMaterial);
            line.position.x = 2;
            line.position.y = -1.5;
            lines.add(line);
        }
        scene.add(lines);


        const shapes10 = font.generateShapes("ACM/ICPC",0.4);
        //接收形状
        const shapeGeo10 = new THREE.ShapeGeometry(shapes10);
        //创建网格
        const mesh10 = new THREE.Mesh(shapeGeo10,material);
        mesh10.position.x = 4.9;
        mesh10.position.y = -1.0;
        mesh10.position.z=-0.5;
        scene.add(mesh10);
        
        for(let i=0;i<shapes10.length;i++)
        {
            let shape = shapes10[i];
            //console.log(shape.holes);
            if(shape.holes.length>0){
                for(let j=0;j<shape.holes.length;j++){
                    let hole = shape.holes[j];
                    //得到曲线上的一组点位
                    let points = hole.getPoints()
                    let geo 
                    if(points.length>0)
                    geo = new THREE.BufferGeometry().setFromPoints(points);
                    let line = new THREE.Line(geo,lineMaterial);
                    line.position.x = 4.9;
                    line.position.y = -1.0;
                    lines.add(line);
                }
            }
            //得到曲线上的一组点位
            let points = shape.getPoints()
            let geo 
            if(points.length>0)
            geo = new THREE.BufferGeometry().setFromPoints(points);
            let line = new THREE.Line(geo,lineMaterial);
            line.position.x = 4.9;
            line.position.y = -1.0;
            lines.add(line);
        }
        scene.add(lines);


        const shapes11 = font.generateShapes("程序设计方法与实践",0.25);
        //接收形状
        const shapeGeo11 = new THREE.ShapeGeometry(shapes11);
        //创建网格
        const mesh11 = new THREE.Mesh(shapeGeo11,material);
        mesh11.position.x = 4.4;
        mesh11.position.y = -1.5;
        mesh11.position.z=-0.5;
        scene.add(mesh11);
        
        for(let i=0;i<shapes11.length;i++)
        {
            let shape = shapes11[i];
            //console.log(shape.holes);
            if(shape.holes.length>0){
                for(let j=0;j<shape.holes.length;j++){
                    let hole = shape.holes[j];
                    //得到曲线上的一组点位
                    let points = hole.getPoints()
                    let geo 
                    if(points.length>0)
                    geo = new THREE.BufferGeometry().setFromPoints(points);
                    let line = new THREE.Line(geo,lineMaterial);
                    line.position.x = 4.4;
                    line.position.y = -1.5;
                    lines.add(line);
                }
            }
            //得到曲线上的一组点位
            let points = shape.getPoints()
            let geo 
            if(points.length>0)
            geo = new THREE.BufferGeometry().setFromPoints(points);
            let line = new THREE.Line(geo,lineMaterial);
            line.position.x = 4.4;
            line.position.y = -1.5;
            lines.add(line);
        }
        scene.add(lines);


        const shapes12 = font.generateShapes("程序设计实训",0.32);
        //接收形状
        const shapeGeo12 = new THREE.ShapeGeometry(shapes12);
        //创建网格
        const mesh12 = new THREE.Mesh(shapeGeo12,material);
        mesh12.position.x = 7.7;
        mesh12.position.y = -1.5;
        mesh12.position.z=-0.5;
        scene.add(mesh12);
        
        for(let i=0;i<shapes12.length;i++)
        {
            let shape = shapes12[i];
            //console.log(shape.holes);
            if(shape.holes.length>0){
                for(let j=0;j<shape.holes.length;j++){
                    let hole = shape.holes[j];
                    //得到曲线上的一组点位
                    let points = hole.getPoints()
                    let geo 
                    if(points.length>0)
                    geo = new THREE.BufferGeometry().setFromPoints(points);
                    let line = new THREE.Line(geo,lineMaterial);
                    line.position.x = 7.7;
                    line.position.y = -1.5;
                    lines.add(line);
                }
            }
            //得到曲线上的一组点位
            let points = shape.getPoints()
            let geo 
            if(points.length>0)
            geo = new THREE.BufferGeometry().setFromPoints(points);
            let line = new THREE.Line(geo,lineMaterial);
            line.position.x = 7.7;
            line.position.y = -1.5;
            lines.add(line);
        }
        scene.add(lines);


        const shapes13 = font.generateShapes("高级语言",0.32);
        //接收形状
        const shapeGeo13 = new THREE.ShapeGeometry(shapes13);
        //创建网格
        const mesh13 = new THREE.Mesh(shapeGeo13,material);
        mesh13.position.x = 11;
        mesh13.position.y = -1;
        mesh13.position.z=-0.5;
        scene.add(mesh13);
        
        for(let i=0;i<shapes13.length;i++)
        {
            let shape = shapes13[i];
            //console.log(shape.holes);
            if(shape.holes.length>0){
                for(let j=0;j<shape.holes.length;j++){
                    let hole = shape.holes[j];
                    //得到曲线上的一组点位
                    let points = hole.getPoints()
                    let geo 
                    if(points.length>0)
                    geo = new THREE.BufferGeometry().setFromPoints(points);
                    let line = new THREE.Line(geo,lineMaterial);
                    line.position.x = 11;
                    line.position.y = -1;
                    lines.add(line);
                }
            }
            //得到曲线上的一组点位
            let points = shape.getPoints()
            let geo 
            if(points.length>0)
            geo = new THREE.BufferGeometry().setFromPoints(points);
            let line = new THREE.Line(geo,lineMaterial);
            line.position.x = 11;
            line.position.y = -1;
            lines.add(line);
        }
        scene.add(lines);


        const shapes14 = font.generateShapes("程序实践(python)",0.3);
        //接收形状
        const shapeGeo14 = new THREE.ShapeGeometry(shapes14);
        //创建网格
        const mesh14 = new THREE.Mesh(shapeGeo14,material);
        mesh14.position.x = 10.5;
        mesh14.position.y = -1.5;
        mesh14.position.z=-0.5;
        scene.add(mesh14);
        
        for(let i=0;i<shapes14.length;i++)
        {
            let shape = shapes14[i];
            //console.log(shape.holes);
            if(shape.holes.length>0){
                for(let j=0;j<shape.holes.length;j++){
                    let hole = shape.holes[j];
                    //得到曲线上的一组点位
                    let points = hole.getPoints()
                    let geo 
                    if(points.length>0)
                    geo = new THREE.BufferGeometry().setFromPoints(points);
                    let line = new THREE.Line(geo,lineMaterial);
                    line.position.x = 10.5;
                    line.position.y = -1.5;
                    lines.add(line);
                }
            }
            //得到曲线上的一组点位
            let points = shape.getPoints()
            let geo 
            if(points.length>0)
            geo = new THREE.BufferGeometry().setFromPoints(points);
            let line = new THREE.Line(geo,lineMaterial);
            line.position.x = 10.5;
            line.position.y = -1.5;
            lines.add(line);
        }
        scene.add(lines);



        const shapes15 = font.generateShapes("计算方法",0.4);
        //接收形状
        const shapeGeo15 = new THREE.ShapeGeometry(shapes15);
        //创建网格
        const mesh15 = new THREE.Mesh(shapeGeo15,material);
        mesh15.position.x = -4.1;
        mesh15.position.y = -3.5;
        mesh15.position.z=-0.5;
        scene.add(mesh15);
        
        for(let i=0;i<shapes15.length;i++)
        {
            let shape = shapes15[i];
            //console.log(shape.holes);
            if(shape.holes.length>0){
                for(let j=0;j<shape.holes.length;j++){
                    let hole = shape.holes[j];
                    //得到曲线上的一组点位
                    let points = hole.getPoints()
                    let geo 
                    if(points.length>0)
                    geo = new THREE.BufferGeometry().setFromPoints(points);
                    let line = new THREE.Line(geo,lineMaterial);
                    line.position.x = -4.1;
                    line.position.y = -3.5;
                    lines.add(line);
                }
            }
            //得到曲线上的一组点位
            let points = shape.getPoints()
            let geo 
            if(points.length>0)
            geo = new THREE.BufferGeometry().setFromPoints(points);
            let line = new THREE.Line(geo,lineMaterial);
            line.position.x = -4.1;
            line.position.y = -3.5;
            lines.add(line);
        }
        scene.add(lines);


        const shapes16 = font.generateShapes("算法设计与分析",0.3);
        //接收形状
        const shapeGeo16 = new THREE.ShapeGeometry(shapes16);
        //创建网格
        const mesh16 = new THREE.Mesh(shapeGeo16,material);
        mesh16.position.x = 2.9;
        mesh16.position.y = -3.5;
        mesh16.position.z=-0.5;
        scene.add(mesh16);
        
        for(let i=0;i<shapes16.length;i++)
        {
            let shape = shapes16[i];
            //console.log(shape.holes);
            if(shape.holes.length>0){
                for(let j=0;j<shape.holes.length;j++){
                    let hole = shape.holes[j];
                    //得到曲线上的一组点位
                    let points = hole.getPoints()
                    let geo 
                    if(points.length>0)
                    geo = new THREE.BufferGeometry().setFromPoints(points);
                    let line = new THREE.Line(geo,lineMaterial);
                    line.position.x = 2.9;
                    line.position.y = -3.5;
                    lines.add(line);
                }
            }
            //得到曲线上的一组点位
            let points = shape.getPoints()
            let geo 
            if(points.length>0)
            geo = new THREE.BufferGeometry().setFromPoints(points);
            let line = new THREE.Line(geo,lineMaterial);
            line.position.x = 2.9;
            line.position.y = -3.5;
            lines.add(line);
        }
        scene.add(lines);

        
        const shapes17 = font.generateShapes("面向对象",0.3);
        //接收形状
        const shapeGeo17 = new THREE.ShapeGeometry(shapes17);
        //创建网格
        const mesh17 = new THREE.Mesh(shapeGeo17,material);
        mesh17.position.x = 6.5;
        mesh17.position.y = -3;
        mesh17.position.z=-0.5;
        scene.add(mesh17);
        
        for(let i=0;i<shapes17.length;i++)
        {
            let shape = shapes17[i];
            //console.log(shape.holes);
            if(shape.holes.length>0){
                for(let j=0;j<shape.holes.length;j++){
                    let hole = shape.holes[j];
                    //得到曲线上的一组点位
                    let points = hole.getPoints()
                    let geo 
                    if(points.length>0)
                    geo = new THREE.BufferGeometry().setFromPoints(points);
                    let line = new THREE.Line(geo,lineMaterial);
                    line.position.x = 6.5;
                    line.position.y = -3;
                    lines.add(line);
                }
            }
            //得到曲线上的一组点位
            let points = shape.getPoints()
            let geo 
            if(points.length>0)
            geo = new THREE.BufferGeometry().setFromPoints(points);
            let line = new THREE.Line(geo,lineMaterial);
            line.position.x = 6.5;
            line.position.y = -3;
            lines.add(line);
        }
        scene.add(lines);


        const shapes18 = font.generateShapes("程序设计(C++)",0.3);
        //接收形状
        const shapeGeo18 = new THREE.ShapeGeometry(shapes18);
        //创建网格
        const mesh18 = new THREE.Mesh(shapeGeo18,material);
        mesh18.position.x = 6.1;
        mesh18.position.y = -3.5;
        mesh18.position.z=-0.5;
        scene.add(mesh18);
        
        for(let i=0;i<shapes18.length;i++)
        {
            let shape = shapes18[i];
            //console.log(shape.holes);
            if(shape.holes.length>0){
                for(let j=0;j<shape.holes.length;j++){
                    let hole = shape.holes[j];
                    //得到曲线上的一组点位
                    let points = hole.getPoints()
                    let geo 
                    if(points.length>0)
                    geo = new THREE.BufferGeometry().setFromPoints(points);
                    let line = new THREE.Line(geo,lineMaterial);
                    line.position.x = 6.1;
                    line.position.y = -3.5;
                    lines.add(line);
                }
            }
            //得到曲线上的一组点位
            let points = shape.getPoints()
            let geo 
            if(points.length>0)
            geo = new THREE.BufferGeometry().setFromPoints(points);
            let line = new THREE.Line(geo,lineMaterial);
            line.position.x = 6.1;
            line.position.y = -3.5;
            lines.add(line);
        }
        scene.add(lines);
    });
} 
createFont();


// 创建线条路径
let curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-9.5,2,0),
    new THREE.Vector3(-9.5,-4,0),
    new THREE.Vector3(-3,-4,0),
  ]);
  
  //依据线条路径创建管道几何体
  let tubeGeometry = new THREE.TubeGeometry(curve, 80, 0.2);
  //加载纹理
  const flowingLineTexture = new THREE.TextureLoader().load('./texture/picture/lb.jpg')
  
  flowingLineTexture.wrapS = THREE.RepeatWrapping;
  flowingLineTexture.wrapT = THREE.RepeatWrapping;
  flowingLineTexture.repeat.set(20, 1); //水平重复20次
  flowingLineTexture.needsUpdate = true;
  
  //创建纹理贴图材质
  let material0 = new THREE.MeshBasicMaterial({
    map: flowingLineTexture,
    side: THREE.BackSide, //显示背面
    transparent: true
  });
  
  let mesh = new THREE.Mesh(tubeGeometry, material0);
  mesh.position.z = 0;
  scene.add(mesh);


  
