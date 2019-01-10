import { Clock, AmbientLight, HemisphereLight, DirectionalLight, Scene, WebGLRenderer, PCFSoftShadowMap, MeshStandardMaterial, GLTFLoader, Mesh, Vector3, OrthographicCamera, PerspectiveCamera, Object3D, AnimationMixer, AnimationClip, LoopOnce, ArrayCamera, Camera, Vector4, Color, CubeTexture, CubeTextureLoader, BoxHelper, Box3, Sphere, Math, Euler, SpriteMaterial } from 'three';
import { App } from '../core-object/App';
import { CombinedCamera } from './CombinedCamera';

/*
 * @Author: kekeqy
 * @Date: 2018-12-12 12:59:36
 * @LastEditors: kekeqy
 * @LastEditTime: 2019-01-10 15:14:31
 * @Description: 对three引擎的封装
 */
export class Engine {
    private _currentFrame: number = 0;
    public readonly app: App;
    /** 定时器 */
    public readonly clock: Clock = new Clock();
    /** 场景 */
    public readonly scene: Scene = new Scene();
    /** 渲染器 */
    public readonly renderer: WebGLRenderer;
    public readonly camera: CombinedCamera;
    /** 天空盒子 */
    public readonly skyBox: CubeTexture;
    public readonly cameraP: PerspectiveCamera;
    public readonly cameraO: OrthographicCamera;

    public constructor(app: App) {
        this.app = app;
        //渲染器设置
        this.renderer = new WebGLRenderer({ antialias: true });
        this.renderer.setClearColor(0x909090, 1);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = PCFSoftShadowMap;
        this.renderer.gammaOutput = true;
        this.renderer.domElement.style.width = '100%';
        this.renderer.domElement.style.height = '100%';
        this.app.domElement.appendChild(this.renderer.domElement);
        this.renderer.setSize(this.renderer.domElement.clientWidth, this.renderer.domElement.clientHeight, false);

        //灯光初始化
        let ambient_light: AmbientLight = new AmbientLight(0x626262, 1);//环境光
        ambient_light.name = 'ambient_light';
        this.scene.add(ambient_light);
        let hemishpere_light: HemisphereLight = new HemisphereLight(0x3284ff, 0xffc87f, 0.1);//半球光
        hemishpere_light.name = 'hemishpere_light';
        this.scene.add(hemishpere_light);
        let main_light: DirectionalLight = new DirectionalLight(0xffeedd, 0.8);//主光源
        main_light.name = 'main_light';
        this.scene.add(main_light);
        let secondary_light: DirectionalLight = new DirectionalLight(0xffeedd, 0.9);//第二光源
        secondary_light.name = 'secondary_light';
        this.scene.add(secondary_light);

        //相机初始化
        this.camera = new CombinedCamera(this.renderer.domElement.clientWidth, this.renderer.domElement.clientHeight, 60, 0.1, 10000);
        this.camera.position.set(0, 10, 0);
        this.camera.lookAt(0, 0, 0);
        this.cameraP = new PerspectiveCamera(60, this.renderer.domElement.clientWidth / this.renderer.domElement.clientHeight, 0.1, 10000);
        this.cameraP.position.set(0, 1, 0);
        this.cameraP.lookAt(0, 0, 0);
        this.cameraP.view = {
            enabled: true,
            fullWidth: this.renderer.domElement.clientWidth,
            fullHeight: this.renderer.domElement.clientHeight,
            offsetX: 0,
            offsetY: 0,
            width: this.renderer.domElement.clientWidth / 2,
            height: this.renderer.domElement.clientHeight
        };

        this.cameraO = new OrthographicCamera(-this.renderer.domElement.clientWidth / 2, this.renderer.domElement.clientWidth / 2, this.renderer.domElement.clientHeight / 2, -this.renderer.domElement.clientHeight / 2, 0.1, 1000);
        this.cameraO.position.set(0, 1, 0);
        this.cameraO.lookAt(0, 0, 0);
        this.cameraO.zoom = 124;
        this.cameraO.view = {
            enabled: true,
            fullWidth: this.renderer.domElement.clientWidth,
            fullHeight: this.renderer.domElement.clientHeight,
            offsetX: this.renderer.domElement.clientWidth / 2,
            offsetY: 0,
            width: this.renderer.domElement.clientWidth / 2,
            height: this.renderer.domElement.clientHeight
        };
        this.cameraO.updateProjectionMatrix();

        let loader: GLTFLoader = new GLTFLoader();
        loader.load('asset/model/jigui.glb', gltf => {
            gltf.scene.traverse(child => {
                if (child instanceof Mesh) {
                    (child.material as MeshStandardMaterial).envMap = this.skyBox;
                }
            })
            this.root = gltf.scene.children[0]; 
            this.scene.add(this.root);

            let box: Box3 = new Box3();
            box.setFromObject(this.root);
            box.getCenter(this.center);
            box.getSize(this.size);
            this.radius = box.getBoundingSphere(new Sphere()).radius;
            let pos: Vector3 = this.center.clone();
            pos.y += this.radius * 1;
            pos.z += this.radius * 1;
            let xyz: Vector3 = new Vector3(1, 1, 0);
            xyz.applyEuler(new Euler(45 * Math.DEG2RAD, -45 * Math.DEG2RAD, 0, 'XYZ'));
            pos.add(xyz);
            // this.camera.position.set(0, 5, 0);
            // this.cameraP.lookAt(this.center);
            // this.app.camera.position = [pos.x, pos.y, pos.z];
            // this.app.camera.target = [0, 0, 0];
            // this.cameraO.position.set(0, 0, 5);
            // // this.cameraO.zoom = 100;
            // this.cameraO.lookAt(new Vector3(0,0,0));
        });



        let path: string = 'asset/skybox/';
        let format: string = '.jpg';
        this.skyBox = new CubeTextureLoader().load([
            path + 'posx' + format, path + 'negx' + format,
            path + 'posy' + format, path + 'negy' + format,
            path + 'posz' + format, path + 'negz' + format
        ]);

        window.addEventListener('resize', () => this.onResize(), false);
        window.addEventListener('keydown', e => this.onKeyDown(e), false);
        this.animate();
    }
    private center: Vector3 = new Vector3();
    private size: Vector3 = new Vector3();
    private radius: number;
    private root: Object3D;
    private mixer: AnimationMixer;
    private animations: AnimationClip[];
    private state: boolean = false;
    private onAniCompelted(e: any): void {
        e.action.getClip().name === 'close' && e.action.stop();
    }
    private onKeyDown(e: KeyboardEvent) {
        // if (e.key == "b") {
        //     console.log(this.camera);
        //     return;
        // }
        // if (!this.state) {
        //     this.camera.toOrthographic();
        // }
        // else this.camera.toPerspective();
        // this.state = !this.state;
        console.log(this.camera);
    }
    /** 当前帧率 */
    public get currentFrame(): number {
        return this._currentFrame;
    }
    private animate(): void {
        this._currentFrame++;
        // if (this.app.camera && this.app.camera.currentCamera) {
        //     this.renderer.render(this.scene, this.app.camera.currentCamera);
        // }
        // this.renderer.render(this.scene, this.cameraO);
        this.renderer.render(this.scene, this.camera);
        if (this.mixer) this.mixer.update(this.clock.getDelta());
        requestAnimationFrame(() => this.animate());
    }
    private onResize(): void {
        this.camera.aspect = this.renderer.domElement.clientWidth / this.renderer.domElement.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.renderer.domElement.clientWidth, this.renderer.domElement.clientHeight, false);
    }
}