import {ComboboxModel, PermissionModel, Role,  TopMenuModel} from "@/store/model";

class ComboboxTopMenu implements ComboboxModel{
    id: Number;
    name: String;
    constructor(item:PermissionModel) {
        this.id = item.id;
        this.name = item.displayName;
    }
}

class TopMenuClass implements TopMenuModel{
    admin: ComboboxModel[] = [];
    company: ComboboxModel[] = [];
    other: ComboboxModel[] = [];
    service: ComboboxModel[] = [];
    constructor(items: PermissionModel[]) {
        items.forEach(item =>{
            if(item.admin){
                this.admin.push(new ComboboxTopMenu(item));
            }
            if(item.admin){
                this.company.push(new ComboboxTopMenu(item));
            }
            if(item.service){
                this.service.push(new ComboboxTopMenu(item));
            }
            if(item.other){
                this.other.push(new ComboboxTopMenu(item));
            }
        })
    }
}

export function getTopMenu(roles : Role[] | undefined): TopMenuModel|null{
    if(!roles){
        return null;
    }
    const listItems:PermissionModel[] = [];
    roles.forEach(role => {
        role.permissionList.forEach(permission=>{
            listItems.push(permission)
        });
    });
    return new TopMenuClass(listItems);
}

