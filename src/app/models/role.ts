export class Role {
    roleId:string="";
    tenantSubId : string ="";
    roleCode : string ="";    
    roleName:string="";
    status:number=1;
    remarks:string="";
    allowSelfRegister:boolean=true;
    createdBy:string="";
    createdDate:Date=new Date();
    lastUpdatedBy:string="";
    lastUpdatedDate:Date = new Date();
}
