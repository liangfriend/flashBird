import { _decorator, BoxCollider, Component, instantiate, Node, Prefab, resources, RigidBody, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ObsRootController')
export class ObsRootController extends Component {
    // @property({ type: Node })
    obstaclePrefab: Node = null; // 柱子预制体

    @property
    spawnInterval: number = 2; // 生成间隔时间（秒）

    @property
    moveSpeed: number = 100; // 移动速度
    private uitransform:UITransform;
    private obstacles: Node[] = []; // 存储当前活动的柱子节点
    private prefab:Prefab;
    private resourcesLoaded:Boolean=false
    start() {
        // 加载预制体资源
        resources.load('ferfabs/obstacle', Prefab, (err, prefab) => {
            if (err) {
                console.error('Failed to load prefab:', err);
                return;
            }

            // 实例化预制体
            this.prefab=prefab
            this.obstaclePrefab = instantiate(this.prefab);
         
        
            this.schedule(this.spawnObstacle, this.spawnInterval);

            this.uitransform=this.node.getComponent(UITransform)

            // 设置标志位，表示资源已加载完成
        this.resourcesLoaded = true;
        });
        //计时器
     
        
    }

    update(deltaTime: number) {
        //这里出现了时序问题,需要在load之后执行
        if (!this.resourcesLoaded) {
            return;
        }
            // 移动柱子
            this.moveObstacles(deltaTime);
            // 检查销毁和生成新柱子
            this.checkObstacles();
    } // 生成柱子
    private spawnObstacle() {
        // 实例化柱子预制体
        const obstacle = instantiate(this.prefab);
        const rigidBody = obstacle.getComponent(RigidBody);
if (rigidBody) {
    // 对 RigidBody 进行设置或者其他操作
}

// 重新获取 BoxCollider 组件
const boxCollider = obstacle.getComponent(BoxCollider);
if (boxCollider) {
    // 对 BoxCollider 进行设置或者其他操作
}
        this.node.addChild(obstacle);

        // 设置柱子的初始位置
        obstacle.setPosition(this.getRandomSpawnPosition());

        // 将柱子节点添加到活动柱子数组中
        this.obstacles.push(obstacle);
    }

   // 获取随机生成位置
   private getRandomSpawnPosition(): Vec3 {
    const lastObstacle = this.obstacles[this.obstacles.length - 1];
    let x = this.uitransform.width / 2; // 在根节点宽度范围内生成
    if (lastObstacle) {
        x = lastObstacle.position.x + lastObstacle.getComponent(UITransform).width + this.getGapBetweenObstacles();
    }
    const y = this.getRandomYPosition();
    return new Vec3(x, y, 0);
}
    // 获取随机 Y 轴位置
    private getRandomYPosition(): number {
        // 在一定范围内随机生成 Y 轴位置，可以根据需要调整范围
        return Math.random() * (this.uitransform.height / 2 - 100) - (this.uitransform.height / 2 - 100) / 2;
    }

    // 移动柱子
    private moveObstacles(deltaTime: number) {
        for (const obstacle of this.obstacles) {
            obstacle.setPosition(obstacle.position.x - this.moveSpeed * deltaTime, obstacle.position.y, 0);
        }
    }
// 获取柱子间隔距离
private getGapBetweenObstacles(): number {
    // 返回固定的间隔距离，可以根据需要调整
    return 200; // 例如这里设置为 200 像素
}

    // 检查销毁和生成新柱子
    private checkObstacles() {
       
        // 检查最前面的柱子是否超出屏幕左边界，如果是则销毁
        if (this.obstacles.length > 320 && this.obstacles[0].position.x < this.uitransform.width / 2) {
            const obstacleToRemove = this.obstacles.shift(); // 移除数组中的第一个柱子
            obstacleToRemove.destroy(); // 销毁节点
        }
        
        // 如果屏幕上少于一定数量的柱子，生成新的柱子
        if (this.obstacles.length < 5) { // 这里可以根据需要调整生成柱子的条件
            this.spawnObstacle();
        }
    }
    stopGame() {
        // 停止柱子的移动逻辑
        this.unschedule(this.spawnObstacle);
        this.resourcesLoaded=false
    }
}


