import Vue from "vue";
import {Inject, Watch} from "vue-property-decorator";
import {FastWebWS} from "@/components/api/ws/fastWebWS";
import Component from "vue-class-component";
import {FastWebApi} from "@/components/api/fastWebApi";
import {ComboboxModel, NotificationModel, PermissionModel} from "@/store/model";

class NotificationItem {
    name: string;
    permission: string;
    count : number = 0;
    data: Array<NotificationModel> = new Array<NotificationModel>();

    constructor(item: NotificationModel) {
        this.name = item.name;
        this.permission = item.permission;
        this.addItem(item);
    }

    public addItem(item: NotificationModel){
        this.data.push(item);
        this.count +=1;
    }

}

@Component({
    components: {
    }
})
export default class BottomMenu extends Vue {
    @Inject('api') api: FastWebApi | undefined;
    @Inject('socket') socketMain: FastWebWS | undefined;
    @Watch('connect')
    socketConnect(val: boolean, oldVal: boolean) {
        this.socket?.subscribe('/b2b/user/b2b/message/notifications', message => {
            this.checkNotifications(<NotificationModel>JSON.parse(message.body));
        });
    }

    private notificationItems : Array<NotificationItem> = new Array<NotificationItem>();

    mounted() {
        const notificationsPromise : Promise<Array<NotificationModel>> = <Promise<Array<NotificationModel>>>this.api?.getApi<Array<NotificationModel>>("/notification/get/my");
        notificationsPromise.then((items: Array<NotificationModel>) => {
            items.forEach(item =>{
                this.checkNotifications(item);
            });
        });
    }

    get connect() {
        return this.socketMain?.isConnect;
    }

    get socket() {
        return this.socketMain?.socket
    }

    get notifications(){
        return this.notificationItems;
    }

    private checkNotifications(item : NotificationModel){
        let createNewItem = true;
        this.notificationItems.forEach(notification =>{
            if(notification.permission === item.permission){
                notification.addItem(item);
                createNewItem = false;
            }
        });
        if(createNewItem){
            this.notificationItems.push(new NotificationItem(item));
        }
    }

    public selectTop(index : number){
        const slice = <NotificationItem>this.notificationItems.splice(index,1).pop();
        slice.data.forEach(notification =>{
            notification.shown = true;
        });
        this.$store.commit('setCurrentMenuItem',{
            name: slice.name,
            permission : slice.permission
        });
    }

}