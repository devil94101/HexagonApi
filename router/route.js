var express=require('express')
var router=express.Router();
var data={};
var border={
    0:3,
    1:4,
    2:5,
    3:0,
    4:1,
    5:2
}
router.post('/addall',(req,res)=>{
    for(let i of req.body){
        fun(i)
    }
    res.send(data);
})
router.get('/getall',(req,res)=>{
    res.send(data);
})
router.post('/add',(req,res)=>{
   res.send(fun(req.body));
})
router.post('/neighbour',(req,res)=>{
    if(data[req.body.name]==undefined){
        return res.send({
            err:true,
            msg:"no hexagon named "+req.body.name
        })
    }
    let ans=[];
    if(!data[req.body.name]['isCovidFree']){
        for(let i of data[req.body.name]['neighbours']){
            if(!data[i.name]['isCovidFree']){
                ans.push(i);
            }
        }
    }
    let nn=req.body.name;
    let xx={
        name:nn,
        neighbours:ans
    }
    res.send(xx);
})
router.post('/free',(req,res)=>{
    if(data[req.body.name]==undefined){
        return res.send({
            err:true,
            msg:"no hexagon named "+req.body.name
        })
    }
    data[req.body.name]['isCovidFree']=true
    let vis={},q=[];
    q.push(data[req.body.name]['neighbours'][0].name);
    vis[data[req.body.name]['neighbours'][0].name]=1;
    while(q.length!=0){
        let x=q.shift();
        for(let i of data[x]['neighbours']){
            if(!vis[i.name]&&req.body.name!=i.name){
                vis[i.name]=1;
                q.push(i.name);
            }
        }
    }
    if(Object.keys(vis).length+1==Object.keys(data).length){
       
        for(let i of data[req.body.name]['neighbours']){
            arr=data[i.name]['neighbours'].filter(item=>item.name!=req.body.name)
            data[i.name]['neighbours']=arr;
        }
        data[req.body.name]=undefined;
    }
    res.send(data);
})
function fun(x){
    if(Object.keys(data).length==0){

        data[x.par]={
            isCovidFree:false,
            neighbours:[]
        }
        data[x.par]['neighbours'].push({
            border:x.border,
            name:x.child
        });
        data[x.child]={
            isCovidFree:false,
            neighbours:[],
        };
        data[x.child]['neighbours'].push({
            border:border[x.border],
            name:x.par
        });
        return data;
    }
    if(data[x.par]==undefined){
        return ({
            err:true,
            msg:"no hexagon found named as "+x.par});
    } 
    if(x.border==undefined||x.border>5||border<0){
        return({
            err:true,
            msg:'border should be less than 5 or greaster than 0'
        });
    }
    if(data[x.child]!=undefined){
        return({err:true,msg:"hexagon already exist use another name "});
    }
    console.log('chala')
    data[x.par]['neighbours'].push({
        border:x.border,
        name:x.child
    });
    let arr=[{
        border:border[x.border],
        name:x.par
    }]
    let s=(parseInt(x.border)-1)==-1?5:parseInt(x.border)-1;
    let con=(border[parseInt(x.border)]+1)==6?0:border[parseInt(x.border)]+1;
    let x_name=x.par;
    let vis={};
    while(true){
        let flag=0;
        for(let i of data[x_name]['neighbours']){
            if(i.border==s&&vis[i.name]==undefined){
                flag=1;
                x_name=i.name;
                arr.push({
                    border:con,
                    name:x_name
                })
                vis[i.name]=i.name;
                data[i.name]['neighbours'].push({
                    border:border[con],
                    name:x.child
                })
                s=(border[con]-1)==-1?5:border[con]-1;
                con=(con+1)==6?0:con+1;
                break;
            }
        }
        if(flag==0){
            break;
        }
    }
    s=(parseInt(x.border)+1)==6?0:parseInt(x.border)+1;
    con=(border[parseInt(x.border)]-1)==-1?5:border[parseInt(x.border)]-1;
    x_name=x.par;
    console.log(s)
    while(true){
        let flag=0;
        for(let i of data[x_name]['neighbours']){
            if(i.border==s&&vis[i.name]==undefined){
                flag=1;
                x_name=i.name;
                arr.push({
                    border:con,
                    name:x_name
                })
                vis[i.name]=1;
                data[i.name]['neighbours'].push({
                    border:border[con],
                    name:x.child
                })
                s=(border[con]+1)==6?0:border[con]+1;
                con=(con-1)==-1?5:con-1;
                break;
            }
        }
        if(flag==0){
            break;
        }
    }
    data[x.child]={
        isCovidFree:false,
        neighbours:arr,
    };
    return data;
}
module.exports=router;