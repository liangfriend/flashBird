import { _decorator, Component, Node, UITransform, v2, Vec3, } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BackgroundController')
export class BackgroundController extends Component {
    private bg1:Node
    private bg2:Node
    private bg3:Node
    private speed:number
    private bgWidth:number
    private stopUpdate:Boolean=false
    start() {
        this.speed=500
        this.bgWidth=this.bg3.getComponent(UITransform).width
    }
    protected onLoad(): void {
        console.log('load')
        this.bg1=this.node.getChildByName('bg1')
        this.bg2=this.node.getChildByName('bg2')
        this.bg3=this.node.getChildByName('bg3')
        this.node.on(Node.EventType.TOUCH_START,this.touchStart,this)
    }
    touchStart(){

    }
    stopGame(){
        this.stopUpdate=true
    }
    //dt,时间间隔
    update(dt: number) {
      
        if(this.stopUpdate){
            return 
        }
    
        this.bg1.setPosition(new Vec3(this.bg1.getPosition().x-this.speed*dt));
        this.bg2.setPosition(new Vec3(this.bg2.getPosition().x-this.speed*dt));
        this.bg3.setPosition(new Vec3(this.bg3.getPosition().x-this.speed*dt));
        
        if(this.bg1.getPosition().x<=0){
            //改变序号
            let temp=this.bg1
            this.bg1=this.bg2
            this.bg2=this.bg3
            this.bg3=temp
            //改变最后一张图片坐标
            this.bg3.setPosition(new Vec3(this.bg2.getPosition().x+this.bgWidth))
          
        }
        
      
    }
}


