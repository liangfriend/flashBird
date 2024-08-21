import { _decorator, Component, Node } from 'cc';
import { PlayerController } from './PlayerController';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    //全局变量
    static scrollSpeed: number = 100; // 全局滚动速度

    private playerController:PlayerController
    
    start() {
        
        const gameMap= this.node.getChildByName("GameMap")
       
        this.playerController=gameMap.getChildByName("player").getComponent(PlayerController);
    }
    protected onLoad(): void {
        this.node.on(Node.EventType.TOUCH_START,function(e){
        
            this.playerController.onPlayFly()
        },this)
    }
    update(deltaTime: number) {
        
    }
}


