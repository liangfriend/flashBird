import {
    _decorator,
    animation,
    AnimationClip,
    CircleCollider2D,
    Collider,
    Collider2D,
    Component,
    Contact2DType,
    ERigidBody2DType,
    find,
    IPhysics2DContact,
    Node,
    RigidBody,
    RigidBody2D,
    Vec2,
    Vec3,
} from 'cc';
import { ObsRootController } from './ObsRootController';
import { BackgroundController } from './BackgroundController';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    private body: RigidBody2D | null = null;
    private ObsRootController: ObsRootController | null = null;
    private BackgroundController: BackgroundController | null = null;
    start() {
        const n = find('/Canvas/GameMap/ObsRoot');
        const back = find('/Canvas/Background');
        this.ObsRootController = n.getComponent(ObsRootController);
        this.BackgroundController = back.getComponent(BackgroundController);
        let collider = this.node.getComponent(CircleCollider2D);

        collider.on(Contact2DType.BEGIN_CONTACT, this.onCollisionEnter, this);
    }
    protected onLoad(): void {
        this.body = this.node.getComponent(RigidBody2D);
        // this.playerAnimation();
    }
    //动画播放
    // playerAnimation() {
    //     const animationComponent = this.node.getComponent(Animation);
    //     // 获取动画组件上的动画剪辑
    //     const [idleClip, runClip] = animationComponent.clips;

    //     // 获取 idleClip 的动画状态
    //     const idleState = animationComponent.getState(idleClip.name);
    //     idleState.play();
    // }
    onCollisionEnter(
        selfCollider: Collider2D,
        otherCollider: Collider2D,
        contact: IPhysics2DContact | null
    ) {
        // 碰撞发生后的逻辑处理
        console.log('Collision Enter:');

        // 停止游戏或者执行其他操作

        this.gameOver();
    }
    gameOver() {
        // 游戏结束逻辑
        console.log('Game Over');

        // 可以在这里停止背景滚动、播放游戏结束动画等操作
        //小鸟静止
        this.body.linearVelocity = new Vec2(0, 0);
        //柱子停止滚动
        this.ObsRootController.stopGame();
        //背景停止滚动
        this.BackgroundController.stopGame();
    }
    onPlayFly() {
        console.log('触发fly');
        if (this.body) {
            // 获取当前速度
            const velocity = this.body.linearVelocity;
            // 增加竖直方向速度
            velocity.y += 20;
            // 设置修改后的速度
            this.body.linearVelocity = velocity;
        }
    }
    update(deltaTime: number) {}
}
