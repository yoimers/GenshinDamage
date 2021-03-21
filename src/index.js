import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Chart from 'chart.js';
import 'chartjs-plugin-colorschemes';

const stat={
  name:"名前",
  a:"A%",
  ab:"基礎A",
  ac:"固定A",
  b:"B%",
  bc:"固定B",
  bb:"基礎B",
  c:"会心率%",
  d:"会心ダメ%",
  e:"元素ダメ%",
  h:"HP%",
  hc:"固定HP",
  hb:"基礎HP",

  em:"熟知",
  ema:"反応倍率",
  ea:"反応倍率加算%",
  el:"熟知倍率", //熟知倍率
  ar:"レートA",
  hr:"HPのy%をAに変換",　//A変換比率
  br:"レートB",
  ahs:"HPのx%をAに変換", //スキル
  s:"",
  n:undefined,
}
const chainitpara = [{ab:300},{hb:15000},{bb:800},{c:19.2},{d:88.4},{e:28.8},{s:0},{s:0},{s:0},{s:0},{ema:1},{em:0}];
const artinitpara = [{hc:4780},{ac:311},{a:46.6},{e:46.6},{c:31.1},{s:0},{e:15},{ea:0},{s:0},{s:0},{s:0},{s:0}];
const wepinitpara = [{ab:674},{c:22.1},{s:0},{s:0},{s:0},{ar:100},{br:0},{hr:0}];
const initpara = {cha:chainitpara,art:artinitpara,wep:wepinitpara};
let structtree= [{
        id  :"0",
        type:"cha",
        data:initpara.cha,
        children:[{
            id  :"00",
            type:"art",
            data:initpara.art,
            children:[{
              id:"000",
              data:initpara.wep,
              type:"wep"
            }]
      }]
    }
      ];

/*セレクトフォーム*/
function SelectButton(props){
  return (
      <div>
          <button type="button" className="btn btn-outline-primary inputform-button" onClick={()=>props.onClick(-10)}>-</button>
          <button type="button" className="btn btn-outline-primary inputform-button" onClick={()=>props.onClick(-1)}>-</button>
          <input className="form-control inputform-input" id={props.id} value={props.value} name={props.name} onChange={props.onChange}/>
          <button type="button" className="btn btn-outline-danger inputform-button" onClick={()=>props.onClick(1)}>+</button>
          <button type="button" className="btn btn-outline-danger inputform-button" onClick={()=>props.onClick(10)}>+</button>
      </div>
  );
}
function Textselectjudge(props){

  if(Object.keys(props.name).length === 1){
    return(<label className="form-label">{stat[Object.keys(props.name)]}</label>);
  }else{
    const option = Object.keys(props.name).map(keys => <option value={keys} key={keys}>{stat[keys]}</option> );
    return(
      <select className="form-select" value={props.value} onChange={props.onChange}>
        {option}
      </select>
      );
    }
}

class Select extends React.Component{
  constructor(props){
    super(props);
    const index = Object.keys(this.props.name);
    let indexvalue =  Object.values(this.props.name);
    this.state = {index:index[0],value:indexvalue[0]};
    this.handleChange = this.handleChange.bind(this);
    this.inputChange = this.inputChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      index: event.target.value,
      value:this.props.name[event.target.value],
    });
  }
  inputChange(event){
    this.setState({
      value:event.target.value,
    });
  }
  buttonClick(x){
    let v = Math.round( (Number(this.state.value)+x) * 100) / 100;;
    if(v<=0) v=0;
    this.setState({ value : v });
  }
  render(){
    return(
      <div className="inputform">
        <Textselectjudge name={this.props.name} value={this.state.index} onChange={this.handleChange} />
        <SelectButton id={this.props.id} value = {this.state.value} onChange={this.inputChange}
          name = {this.state.index} onClick={(x)=>this.buttonClick(x)} />
      </div>
    );
  }
}

class Rate extends React.Component{
  constructor(props){
    super(props);
    this.state = {ar:this.props.name.ar,br:this.props.name.br,hr:this.props.name.hr};
    this.inputChangear = this.inputChangear.bind(this);
    this.inputChangebr = this.inputChangebr.bind(this);
    this.inputChangehr = this.inputChangehr.bind(this);
  }
  inputChangear(event){
    this.setState({ ar : event.target.value });
  }
  inputChangebr(event){
    this.setState({ br : event.target.value });
  }
  inputChangehr(event){
    this.setState({ hr : event.target.value });
  }
  render(){
    return(
      <div className="rateform inputform">
        <label className="form-label">A-B-HP比率%</label>
        <div>
          <input className="form-control inputform-input" name="ar" value={this.state.ar} onChange={this.inputChangear}/>
          <input className="form-control inputform-input" name="br" value={this.state.br} onChange={this.inputChangebr}/>
          <input className="form-control inputform-input" name="hr" value={this.state.hr} onChange={this.inputChangehr}/>
        </div>
      </div>
    )
  }
}
class Selectname extends React.Component{
  constructor(props){
    super(props);
    this.state = {value:props.name};
    this.inputChange = this.inputChange.bind(this);
  }
  inputChange(event){
    this.setState({
      value:event.target.value,
    });
  }
  render(){
    return(
      <div className="inputnameform">
        <label className="inputNamelabel">名前</label>
        <input className="form-control inputform-input" id={this.props.id} value={this.state.value} name="name" onChange={this.inputChange}/>
        <button type="button" className="btn btn-outline-danger delete-button" onClick={this.props.framedelete}>削除</button>
      </div>
    );
  }
}

function Charcreate(props){
      return(
        <div id={"cha"+props.inputst.id} className="charform" draggable="true" onDrop={props.onDrop} onDragOver={onDragOver} onDragStart={onDragStart}>
          <Selectname name={"name"+props.inputst.id} framedelete={props.framedelete}/>
          <Select name={props.inputst.data[0]} />
          <Select name={props.inputst.data[1]} />
          <Select name={props.inputst.data[2]} />
          <Select name={props.inputst.data[3]} />
          <Select name={props.inputst.data[4]} />
          <Select name={props.inputst.data[5]} />
          <Select name={{...props.inputst.data[6],...{a:24,b:30,h:24,ahs:1.2,ea:15,em:187},...props.inputst.data[6]}} />
          <Select name={{...props.inputst.data[7],...{a:24,b:30,h:24,ahs:1.2,ea:15,em:187},...props.inputst.data[7]}} />
          <Select name={{...props.inputst.data[8],...{a:24,b:30,h:24,ahs:1.2,ea:15,em:187},...props.inputst.data[8]}} />
          <Select name={{...props.inputst.data[9],...{a:24,b:30,h:24,ahs:1.2,ea:15,em:187},...props.inputst.data[9]}} />
          <Select name={{...props.inputst.data[10],...{ema:1},...props.inputst.data[10]}}/>
          <Select name={{...props.inputst.data[11],...{a:24,b:30,h:24,ahs:1.2,ea:15,em:187},...props.inputst.data[11]}} />
          </div>
      );
}
function Articreate(props){
      return(
          <div id={"art"+props.inputst.id} className="artiform" draggable="true" onDrop={props.onDrop} onDragOver={onDragOver} onDragStart={onDragStart}>
          <Selectname name={"arti"+props.inputst.id} framedelete={props.framedelete}/>
          <Select name={props.inputst.data[0]} />
          <Select name={props.inputst.data[1]} />
          <Select name={{...props.inputst.data[2],...{a:46.6,b:58.3,h:46.6,em:187},...props.inputst.data[2]}} />
          <Select name={{...props.inputst.data[3],...{e:46.6,a:46.6,b:58.3,h:46.6},...props.inputst.data[3]}} />
          <Select name={{...props.inputst.data[4],...{c:31.1,d:62.2,a:46.6,b:58.3,h:46.6,em:187},...props.inputst.data[4]}} />
          <Select name={{...props.inputst.data[5],...{c:31.1,d:62.2,a:46.6,b:58.3,h:46.6,e:15,em:187},...props.inputst.data[5]}} />
          <Select name={{...props.inputst.data[6],...{c:31.1,d:62.2,a:46.6,b:58.3,h:46.6,e:15,em:187,ea:15},...props.inputst.data[6]}} />
          <Select name={{...props.inputst.data[7],...{c:31.1,d:62.2,a:46.6,b:58.3,h:46.6,e:15,em:187,ea:15},...props.inputst.data[7]}} />
          <Select name={{...props.inputst.data[8],...{c:31.1,d:62.2,a:46.6,b:58.3,h:46.6,e:15,em:187,ea:15},...props.inputst.data[8]}} />
          <Select name={{...props.inputst.data[9],...{c:31.1,d:62.2,a:46.6,b:58.3,h:46.6,e:15,em:187,ea:15},...props.inputst.data[9]}} />
          <Select name={{...props.inputst.data[10],...{c:31.1,d:62.2,a:46.6,b:58.3,h:46.6,e:15,em:187,ea:15},...props.inputst.data[10]}} />
          <Select name={{...props.inputst.data[11],...{c:31.1,d:62.2,a:46.6,b:58.3,h:46.6,e:15,em:187,ea:15},...props.inputst.data[11]}} />
          </div>
      );
}
function Wepcreate(props){
      return(
          <div id={"wep"+props.inputst.id} className="wepform" draggable="true" onDrop={props.onDrop} onDragOver={onDragOver} onDragStart={onDragStart}>
            <Selectname name={"wep"+props.inputst.id} framedelete={props.framedelete}/>
            <Select name={props.inputst.data[0]} />
            <Select name={{...props.inputst.data[1],...{c:22.1,d:66.2,e:20,a:49.6,b:58.3,h:46.6,hr:1.2,em:165},...props.inputst.data[1]}} />
            <Select name={{...props.inputst.data[2],...{c:0,d:30,e:20,a:49.6,b:58.3,h:46.6,hr:1.2,em:165},...props.inputst.data[2]}} />
            <Select name={{...props.inputst.data[3],...{c:0,d:30,e:20,a:49.6,b:58.3,h:46.6,hr:1.2,em:165},...props.inputst.data[3]}} />
            <Select name={{...props.inputst.data[4],...{c:0,d:30,e:20,a:49.6,b:58.3,h:46.6,hr:1.2,em:165},...props.inputst.data[4]}} />
            <Rate name={{ar:props.inputst.data[5].ar,br:props.inputst.data[6].br,hr:props.inputst.data[7].hr}}/>
          </div>
      );
}

 // {stat:{id: , type:, data:},framedelete,onDrop}


function Inputformcreation(props){
  if(props.stat.type == "cha"){
    return(<Charcreate inputst={props.stat} framedelete={props.framedelete} onDrop={props.onDrop}/>)
  }else if(props.stat.type == "art"){
    return(<Articreate inputst={props.stat} framedelete={props.framedelete} onDrop={props.onDrop}/>)
  }else if(props.stat.type == "wep"){
    return(<Wepcreate inputst={props.stat} framedelete={props.framedelete} onDrop={props.onDrop}/>)
  }
}

function Sidemenu(props){
    return(
    <ul className="appendbox">
      <li id="charappendbutton" className="append-item appendchar" draggable="true" onDragStart={onDragStart}>
        <img className="image" src="./klee5.png" alt="グラフの画像"/>
        <p className="append-text">キャラ追加</p>
      </li>
      <li id="artiappendbutton" className="append-item appendarti" draggable="true" onDragStart={onDragStart}>
        <img className="image" src="./klee2.png" alt="グラフの画像"/>
        <p className="append-text">聖遺物追加</p>
      </li>
      <li id="wepappendbutton" className="append-item appendwep" draggable="true" onDragStart={onDragStart}>
        <img className="image" src="./klee3.png" alt="グラフの画像"/>
        <p className="append-text">武器追加</p>
      </li>
      <li className="append-item culc" draggable="true" onClick={StateCulc}>
        <img className="image" src="./klee4.png" alt="グラフの画像"/>
        <p className="append-text">計算</p>
      </li>
      <a href="https://twitter.com/share" className="twitter-share-button" data-via="よ" data-hashtags="原神">Tweet</a>
      <script>{!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs')}</script>
    </ul>
  );
}

function onDragStart(event){
  event.dataTransfer.setData("text/plain",event.target.id);
  event.stopPropagation();
}
function onDragOver(event){
  event.stopPropagation();
  event.preventDefault();
}

class Damagestracture extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      struct:structtree,
    };
    this.framedelete = this.framedelete.bind(this);
    this.frameappend = this.frameappend.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }
  framedelete(event){
    const idindex = event.target.parentElement.parentElement.id.slice(-3).replace(/[^0-9]/g, '');
    let x = this.state.struct.slice();
    for(let i=0 ; i<x.length ; i++){
      if(x[i].id == idindex){x.splice(i,1); break;}
      for(let j=0 ; j<x[i].children.length ; j++){
        if(x[i].children[j].id == idindex){x[i].children.splice(j,1); break;}
        for(let k=0 ; k<x[i].children[j].children.length; k++){
          if(x[i].children[j].children[k].id == idindex){x[i].children[j].children.splice(k,1); break;}
        }
      }
    }
    structtree=x;
    this.setState({struct:x});
  }
  fundindex(childlist){  //x=[{id:"00",**},{id:"02",**}]みたいなの　返り値は "1"
    let idlist=[];
    for(let i=0 ; i < childlist.length ; i++){
      idlist.push((childlist[i].id).slice(-1));  //idの末尾取得
    }
    if(childlist.length==0) return("empty");
    for(let i=0;i<10;i++){
      if(idlist.includes(i.toString())==false) return( childlist[0].id.slice(0,childlist[0].id.length-1) + i.toString() );
    }
    return(null);
  }
  frameappend(dropped,drop){
    let x = this.state.struct.concat();
    const button = drop.slice(-6) =="button" ? true:false; //ボタンから→true それ以外→false
    const droppedtype = dropped.id.slice(0,3);
    const droppedid = dropped.id.slice(0,6).replace(/[^0-9]/g, '');  //""→char "0"→0の子にwep "00"→00の子にwep
    const droptype  = drop.slice(0,3);
    const dropid    = drop.slice(0,6).replace(/[^0-9]/g, '');
    let minid;
    if(droppedid != dropid){
    if(droptype=="cha"){
      minid = this.fundindex(x);
      let newform = {id:minid,type:droptype,children:[],data:initpara[droptype]};
      if(!button) newform.data = Getstatedata(droptype,dropid);
      let i=0 ;
      for(i=0 ; i<x.length ; i++){if(x[i].id==droppedid) break;}
      x.splice(i+1,0,newform);
    }else{
      for(let i=0 ; i<x.length ; i++){
        for(let j=0 ; j<x[i].children.length ; j++){
          for(let k=0 ; k<x[i].children[j].children.length; k++){
            if(x[i].children[j].children[k].id == droppedid){
              if(x[i].children[j].type == droptype){
                minid = this.fundindex(x[i].children);
                if(minid==null)break;
                let newform = {id:minid,type:droptype,children:[],data:initpara[droppedtype]};
                if(!button) newform.data = Getstatedata(droptype,dropid);
                x[i].children.splice(j+1,0,newform);
                break;
              }else{
                minid = this.fundindex(x[i].children[j].children);
                if(minid==null)break;
                let newform = {id:minid,type:droptype,children:[],data:initpara[droptype]};
                if(!button) newform.data = Getstatedata(droptype,dropid);
                x[i].children[j].children.splice(k+1,0,newform);
                break;
              }
            }
          }
        if(x[i].children[j].id == droppedid){
          if(x[i].children[j].type == droptype){
            minid = this.fundindex(x[i].children);
            if(minid==null)break;
            let newform = {id:minid,type:droptype,children:[],data:initpara[droppedtype]};
            if(!button) newform.data = Getstatedata(droptype,dropid);
            x[i].children.splice(j+1,0,newform);
            break;
          }else{
            minid = this.fundindex(x[i].children[j].children)=="empty"?x[i].children[j].id+"0":this.fundindex(x[i].children[j].children);
            if(minid==null)break;
            let newform = {id:minid,type:droptype,children:[],data:initpara[droptype]};
            if(!button) newform.data = Getstatedata(droptype,dropid);
            x[i].children[j].children.push(newform);
            break;
          }
        }
        }
        if(x[i].id == droppedid){
          minid = this.fundindex(x[i].children)=="empty"?x[i].id+"0":this.fundindex(x[i].children);
          if(minid==null)break;
          let newform = {id:minid,type:droptype,children:[],data:initpara[droptype]};
          if(!button) newform.data = Getstatedata(droptype,dropid);
          x[i].children.splice(10,0,newform);
          break;
        }
      }
    }
    }
    structtree=x;
    this.setState({struct:x});
  }
  onDrop(event){
    let id = event.dataTransfer.getData( "text/plain" );
    event.preventDefault();
    let target = event.target;
    while(target.id.slice(0,3) != "cha" & target.id.slice(0,3) != "wep" & target.id.slice(0,3) != "art"){
      target = target.parentElement;
    }

    if(id!=""){this.frameappend(target,id);}
  }
  render(){
    let childchild=[];
    let child=[];
    let char=[];
    if(this.state.struct.length==0)return(null);
    for(let i=0 ; i<this.state.struct.length ; i++){
      child=[];
      for(let j=0 ; j<this.state.struct[i].children.length ; j++){
        childchild=[];
        for(let k=0 ; k<this.state.struct[i].children[j].children.length; k++){
            childchild[k] = <li key={this.state.struct[i].children[j].children[k].id}><Inputformcreation stat={this.state.struct[i].children[j].children[k]} framedelete={this.framedelete} onDrop={this.onDrop}/></li>
        }
          child[j] = <li key={this.state.struct[i].children[j].id}><Inputformcreation stat={this.state.struct[i].children[j]} framedelete={this.framedelete} onDrop={this.onDrop}/><ul className="child2">{childchild}</ul></li>
        }
      char[i] = <li key={this.state.struct[i].id}><Inputformcreation stat={this.state.struct[i]} framedelete={this.framedelete} onDrop={this.onDrop}/><ul className="child1">{child}</ul></li>
    }
    return(char);
  }
}
function Getstatedata(type,id){
  let div = document.getElementById(type+id);
  let update;
  if(type=="cha"){
      update = [{},{},{},{},{},{},{},{},{},{},{},{}];
  }else if(type=="art"){
      update = [{},{},{},{},{},{},{},{},{},{},{},{}];
  }else if(type=="wep"){
      update = [{},{},{},{},{},{},{},{}];
  }
  for(let i=1; i<div.getElementsByTagName("input").length ;i++){
    let name = div.getElementsByTagName("input")[i].name;
    let value = div.getElementsByTagName("input")[i].value;

    update[i-1][name]= value;
  }
  return(update);
}
function Getstate(id){
  let div = document.getElementById(id);
  let statob={
    name:"",
    a:0,
    ab:0,
    ac:0,
    b:0,
    bc:0,
    bb:0,
    c:0,
    d:0,
    e:0,
    h:0,
    hc:0,
    hb:0,
    em:0,
    ema:0,
    el:0, //熟知倍率
    ea:0,
    ar:0,
    hr:0,　//A変換比率
    br:0,
    ahs:0, //スキル

  }
  for(let i=0; i<div.getElementsByTagName("input").length ;i++){
    let name = div.getElementsByTagName("input")[i].name;
    let value = div.getElementsByTagName("input")[i].value;
    if(name.slice(0,4)!="name")value = value.replace(/[A-Ｚａ-ｚ０-９]/g, function(s) {return String.fromCharCode(s.charCodeAt(0) - 65248);});
    if(!isNaN(Number(value))){
      statob[name] = statob[name] + Number(value);
    } else{
      statob[name] = statob[name] + value;
    }
  }
  return(statob);
}


ReactDOM.render(<Sidemenu/>, document.getElementById("sidemenu"));
ReactDOM.render(<Damagestracture/>, document.getElementById("statframe"));
//ReactDOM.render(<Inputformcreation stat={structtree[0]} onDrop={onDrop}/>, document.getElementById("statframe"));

//StateCulc();
function Childappend(culctree){// 自動で下の兄弟の子を追加
  for(let i=0 ; i<culctree.length ; i++){
    for(let j=0 ; j<culctree[i].children.length ; j++){
      if(culctree[i].children[j].children.length == 0){
        for(let k=j;k<culctree[i].children.length ; k++){
          if(culctree[i].children[k].children.length != 0){
            culctree[i].children[j].children = culctree[i].children[k].children.concat();
          }
        }
      }
    }
  for(let i=0 ; i<culctree.length ; i++){
    if(culctree[i].children.length == 0){
      for(let k=i;k<culctree.length ; k++){
        if(culctree[k].children.length != 0){
          culctree[i].children = culctree[k].children.concat();
        }
      }
    }
  }
}
}
function StateCulc(){
  const startTime = Date.now(); // 開始時間
  let optresult = [];
  let count = 1;
  let culctree = JSON.parse(JSON.stringify(structtree));
  Childappend(culctree);
  for(let i=0 ; i<culctree.length ; i++){
    for(let j=0 ; j<culctree[i].children.length ; j++){
      for(let k=0 ; k<culctree[i].children[j].children.length; k++){
        let thirdst  = Getstate(culctree[i].children[j].children[k].type+culctree[i].children[j].children[k].id);
        let secondst = Getstate(culctree[i].children[j].type+culctree[i].children[j].id);
        let firstst  = Getstate(culctree[i].type+culctree[i].id);
        let statetotal = {};
        for(let key in stat){
          if(key != "name"){
            statetotal[key] = firstst[key] + secondst[key] + thirdst[key];
            statetotal[key] = Math.round(10*statetotal[key])/10;
          }else{
            statetotal[key] = firstst[key] + secondst[key] + thirdst[key];
          }
        }
        statetotal.el = 25/9*statetotal.em/(1400+statetotal.em);
        optresult[count++] = optimize(statetotal);
      }
    }
  }
  optresult[0]={"rate": [] };
  for(let index=optresult.length-1; index>=1 ;index--){
    optresult[0].rate[index-1]=[];
    for(let p=0; p < optresult[1].a.length;p++){
      optresult[0].rate[index-1][p] = Math.round(1000*optresult[index].damage[p]/optresult[1].damage[p])/1000;
    }
  }
  console.log(optresult);
  createchart(optresult);
  culctree.splice(0);
  const endTime = Date.now(); // 終了時間
  console.log(endTime - startTime); // 何ミリ秒かかったかを表示する
}

let damagecomp=[];
let damageerr =[];
let damage1=[];
function createwep(x,i){
  if(!document.getElementById("myChart"+(i+1))){
    let canvas =  document.createElement("canvas");
    canvas.id = "myChart"+(i+1);
    canvas.height = "300";
    canvas.width = "400";
    let div = document.getElementById("chartmain");
    div.appendChild(canvas);
  }
  let ctx = document.getElementById("myChart"+(i+1));
  if(typeof damagecomp[i+1] !== 'undefined' && damagecomp[i+1]){
    damagecomp[i+1].destroy();
  }
  /*
  damagecomp[i+1] = new Chart(ctx, {
    type:'line',
    data:{
      labels:x[i+1].t,
      datasets:[{
        label:'A%',
        data:x[i+1].a,
        fill : "false",
        pointRadius: 0,
      },{
        label:"A% error",
        data:x[i+1].error.a,
        fill : "false",
        pointRadius: 0,
      },{
        label:'B%',
        data:x[i+1].b,
        fill : "false",
        pointRadius: 0,
      },{
        label:"B% error", //b
        data:x[i+1].error.b,
        fill : "false",
        pointRadius: 0,
      },{
        label:'HP%',
        data:x[i+1].h,
        fill : "false",
        pointRadius: 0,
      },{
        label:"HP% error",
        data:x[i+1].error.h,
        fill : "false",
        pointRadius: 0,
      },{
        label:'会心%',
        data:x[i+1].c,
        fill : "false",
        pointRadius: 0,
      },{
        label:"会心% error",
        data:x[i+1].error.c,
        fill : "false",
        pointRadius: 0,
      },{
        label:'会心ダメ%',
        data:x[i+1].d,
        fill : "false",
        pointRadius: 0,
      },{
        label:"会心ダメ% error",
        data:x[i+1].error.d,
        fill : "false",
        pointRadius: 0,
      }]
    },
    options:{
      tooltips: {
          mode: 'index',
          intersect: false,

      },
      legend: {
        labels: {
            fontColor: 'rgb(195, 195, 195)',
            fontsize:40,
            filter: function(items) {
                    return items.text != 'A% error' && items.text != "HP% error" && items.text != "会心% error" && items.text != "B% error" && items.text != "会心ダメ% error";
                    // return items.datasetIndex != 2;
            },
        }
      },
      plugins: {
         colorschemes: {
           scheme: 'tableau.Classic10'
         }
       },
      title:{
        display:true,
        fontColor: 'rgb(195, 195, 195)',
        fontSize: 18,
        text:["名前:"+x[i+1].name ,' 基礎A:' + x[i+1].init.ab + " 固定A:"+x[i+1].init.ac+" 初期A%:"+x[i+1].init.a,
            ' 基礎HP:'+x[i+1].init.hb+" 固定HP:"+x[i+1].init.hc+" 初期HP%:"+x[i+1].init.h,
            ' 基礎B:' + x[i+1].init.bb + " 固定B:" + x[i+1].init.bc + " 初期B%:"+x[i+1].init.b,
            ' 会心%:' + x[i+1].init.c + " 会心ダメ%:" + x[i+1].init.d],
      },
      scales:{
        yAxes:[{
          gridLines: {
            //color: "rgba(0, 0, 0, )",
          },
          scaleLabel: {                 //軸ラベル設定
             display: true,             //表示設定
             labelString: 'A% B% HP% 率% ダメ%',  //ラベル
            fontColor: 'rgb(195, 195, 195)',
             fontSize: 18               //フォントサイズ
          },
          ticks: {
            fontColor: 'rgb(195, 195, 195)',
            fontSize:18,
            beginAtZero: true,
            max: 220,
            min: 0,
            stepSize: 20,
          }
        }],
        xAxes:[{
          scaleLabel: {                 //軸ラベル設定
             display: true,             //表示設定
             labelString: '装備スコア',  //ラベル
             fontColor: 'rgb(195, 195, 195)',
             fontSize: 20               //フォントサイズ
          },
          ticks: {
            fontColor: 'rgb(195, 195, 195)',
            fontSize:15,
            stepSize: 10,
          }
        }],
      },
      layout: {                             //レイアウト
        padding: {                          //余白設定
          left: 20,
          right: 40,
          top: 10,
          bottom: 10,
        }
      }
    },
  });
  */
  damagecomp[i+1] = new Chart(ctx, {
    type:'line',
    data:{
      labels:x[i+1].t,
      datasets:[{
        label:'A%',
        data:x[i+1].a,
        fill : "false",
        pointRadius: 0,
      },{
        label:'B%',
        data:x[i+1].b,
        fill : "false",
        pointRadius: 0,
      },{
        label:'HP%',
        data:x[i+1].h,
        fill : "false",
        pointRadius: 0,
      },{
        label:'会心%',
        data:x[i+1].c,
        fill : "false",
        pointRadius: 0,
      },{
        label:'会心ダメ%',
        data:x[i+1].d,
        fill : "false",
        pointRadius: 0,
      }]
    },
    options:{
      tooltips: {
          mode: 'index',
          intersect: false,

      },
      legend: {
        labels: {
            fontColor: 'rgb(195, 195, 195)',
            fontsize:40,
        }
      },
      plugins: {
         colorschemes: {
           scheme: 'tableau.Classic10'
         }
       },
      title:{
        display:true,
        fontColor: 'rgb(195, 195, 195)',
        fontSize: 18,
        text:["名前:"+x[i+1].name ,' 基礎A:' + x[i+1].init.ab + " 固定A:"+x[i+1].init.ac+" 初期A%:"+x[i+1].init.a,
            ' 基礎HP:'+x[i+1].init.hb+" 固定HP:"+x[i+1].init.hc+" 初期HP%:"+x[i+1].init.h,
            ' 基礎B:' + x[i+1].init.bb + " 固定B:" + x[i+1].init.bc + " 初期B%:"+x[i+1].init.b,
            ' 会心%:' + x[i+1].init.c + " 会心ダメ%:" + x[i+1].init.d],
      },
      scales:{
        yAxes:[{
          gridLines: {
            //color: "rgba(0, 0, 0, )",
          },
          scaleLabel: {                 //軸ラベル設定
             display: true,             //表示設定
             labelString: 'A% B% HP% 率% ダメ%',  //ラベル
            fontColor: 'rgb(195, 195, 195)',
             fontSize: 18               //フォントサイズ
          },
          ticks: {
            fontColor: 'rgb(195, 195, 195)',
            fontSize:18,
            beginAtZero: true,
            max: 220,
            min: 0,
            stepSize: 20,
          }
        }],
        xAxes:[{
          scaleLabel: {                 //軸ラベル設定
             display: true,             //表示設定
             labelString: '装備スコア',  //ラベル
             fontColor: 'rgb(195, 195, 195)',
             fontSize: 20               //フォントサイズ
          },
          ticks: {
            fontColor: 'rgb(195, 195, 195)',
            fontSize:15,
            stepSize: 10,
          }
        }],
      },
      layout: {                             //レイアウト
        padding: {                          //余白設定
          left: 20,
          right: 40,
          top: 10,
          bottom: 10,
        }
      }
    },
  });
  if(!document.getElementById("MyChart"+(i+1))){  //error
    let canvas =  document.createElement("canvas");
    canvas.id = "MyChart"+(i+1);
    canvas.height = "300";
    canvas.width = "400";
    let div = document.getElementById("chartmain");
    div.appendChild(canvas);
  }
  let ctx1 = document.getElementById("MyChart"+(i+1));  //error
  if(typeof damageerr[i+1] !== 'undefined' && damageerr[i+1]){ //error
    damageerr[i+1].destroy();//error
  }
  damageerr[i+1] = new Chart(ctx1, {
    type:'line',
    data:{
      labels:x[i+1].t,
      datasets:[{
        label:"A%",
        data:x[i+1].error.a,
        fill : "false",
        pointRadius: 0,
      },{
        label:"B%", //b
        data:x[i+1].error.b,
        fill : "false",
        pointRadius: 0,
      },{
        label:"H%",
        data:x[i+1].error.h,
        fill : "false",
        pointRadius: 0,
      },{
        label:"会心%",
        data:x[i+1].error.c,
        fill : "false",
        pointRadius: 0,
      },{
        label:"会心ダメ%",
        data:x[i+1].error.d,
        fill : "false",
        pointRadius: 0,
      },{
        label:"元素ダメ%",
        data:x[i+1].error.e,
        fill : "false",
        pointRadius: 0,
      },{
        label:"熟知",
        data:x[i+1].error.em,
        fill : "false",
        pointRadius: 0,
      },]
    },
    options:{
      tooltips: {
          mode: 'index',
          intersect: false,
      },
      legend: {
        labels: {
            fontColor: 'rgb(195, 195, 195)',
            fontsize:40,
        }
      },
      plugins: {
         colorschemes: {
           scheme: 'tableau.Classic10'
         }
       },
      title:{
        display:true,
        fontColor: 'rgb(195, 195, 195)',
        fontSize: 18,
        text:"名前:"+x[i+1].name + " 10単位増加時の増加率",
      },
      scales:{
        yAxes:[{
          gridLines: {
            //color: "rgba(0, 0, 0, )",
          },
          scaleLabel: {                 //軸ラベル設定
             display: true,             //表示設定
             labelString: 'A% B% HP% 率% ダメ%',  //ラベル
            fontColor: 'rgb(195, 195, 195)',
             fontSize: 18               //フォントサイズ
          },
          ticks: {
            fontColor: 'rgb(195, 195, 195)',
            fontSize:18,
            beginAtZero: true,
            max:1.12,
            min: 1,
            stepSize: 0.01,
          }
        }],
        xAxes:[{
          scaleLabel: {                 //軸ラベル設定
             display: true,             //表示設定
             labelString: '装備スコア',  //ラベル
             fontColor: 'rgb(195, 195, 195)',
             fontSize: 20               //フォントサイズ
          },
          ticks: {
            fontColor: 'rgb(195, 195, 195)',
            fontSize:15,
            stepSize: 10,
          }
        }],
      },
      layout: {                             //レイアウト
        padding: {                          //余白設定
          left: 20,
          right: 40,
          top: 10,
          bottom: 10,
        }
      }
    },
  });
}

function createchart(x){
  let data = [];
  let damage =[];
  for(let i=0 ; i < x[0].rate.length; i++){ //ダメージ比較部分
    createwep(x,i);
    let dataset = {
      label:x[i+1].init.name,
      data:x[0].rate[i],
      backgroundColor: "rgba(0,0,0,0)",
      fill : "false",
      pointRadius: 0,
    };
    data.push(dataset);
  }
  let ctx = document.getElementById("myChart0").getContext('2d');;
  if(typeof damagecomp[0] !== 'undefined' && damagecomp[0]){
    damagecomp[0].destroy();
  }
  let ob = {
    type:'line',
    data:{
      labels:x[1].t,
    },
    options:{
      tooltips: {
          mode: 'index',
          intersect: false,
      },
      legend: {
        labels: {
            fontColor: 'rgb(195, 195, 195)',
            fontsize:40,
        }
      },
      title:{
        display:true,
        fontColor: 'rgb(195, 195, 195)',
        fontSize: 18,
        text:"比較",
      },
      plugins: {
         colorschemes: {
           scheme: 'brewer.SetOne9'
         }
       },
       scales:{
         yAxes:[{
           scaleLabel: {                 //軸ラベル設定
              display: true,             //表示設定
              labelString: "比率",  //ラベル
             fontColor: 'rgb(195, 195, 195)',
              fontSize: 22               //フォントサイズ
           },
           ticks: {
             fontColor: 'rgb(195, 195, 195)',
             fontSize:18,
             suggestedMax: 1.1,
             suggestedMin: 0.9,
             //stepSize: 20,
           }
         }],
         xAxes:[{
           scaleLabel: {                 //軸ラベル設定
              display: true,             //表示設定
              labelString: '装備スコア',  //ラベル
              fontColor: 'rgb(195, 195, 195)',
              fontSize: 20               //フォントサイズ
           },
           ticks: {
             fontColor: 'rgb(195, 195, 195)',
             fontSize:15,
             stepSize: 10,
           }
         }],
       },
      layout: {                             //レイアウト
        padding: {                          //余白設定
          left: 20,
          right: 40,
          top: 10,
          bottom: 10,
        }
      },
    }
  };
  ob.data.datasets = data;
  damagecomp[0] = new Chart(ctx,ob);

  for(let i=0 ; i < x[0].rate.length; i++){ //ダメージ比較部分
    createwep(x,i);
    let dataset = {
      label:x[i+1].init.name,
      data:x[i+1].damage,
      backgroundColor: "rgba(0,0,0,0)",
      fill : "false",
      pointRadius: 0,
    };
    damage.push(dataset);
  }
  let ctx1 = document.getElementById("myChart").getContext('2d');;
  if(typeof damage1[0] !== 'undefined' && damage1[0]){
    damage1[0].destroy();
  }
  let obb = {
    type:'line',
    data:{
      labels:x[1].t,
    },
    options:{
      tooltips: {
          mode: 'index',
          intersect: false,
      },
      legend: {
        labels: {
            fontColor: 'rgb(195, 195, 195)',
            fontsize:40,
        }
      },
      title:{
        display:true,
        fontColor: 'rgb(195, 195, 195)',
        fontSize: 18,
        text:"比較",
      },
      plugins: {
         colorschemes: {
           scheme: 'brewer.SetOne9'
         }
       },
       scales:{
         yAxes:[{
           scaleLabel: {                 //軸ラベル設定
              display: true,             //表示設定
              labelString: "比率",  //ラベル
             fontColor: 'rgb(195, 195, 195)',
              fontSize: 22               //フォントサイズ
           },
           ticks: {
             fontColor: 'rgb(195, 195, 195)',
             fontSize:18,
             suggestedMax: 1.1,
             suggestedMin: 0.9,
             //stepSize: 20,
           }
         }],
         xAxes:[{
           scaleLabel: {                 //軸ラベル設定
              display: true,             //表示設定
              labelString: '装備スコア',  //ラベル
              fontColor: 'rgb(195, 195, 195)',
              fontSize: 20               //フォントサイズ
           },
           ticks: {
             fontColor: 'rgb(195, 195, 195)',
             fontSize:15,
             stepSize: 10,
           }
         }],
       },
      layout: {                             //レイアウト
        padding: {                          //余白設定
          left: 20,
          right: 40,
          top: 10,
          bottom: 10,
        }
      },
    }
  };
  obb.data.datasets = damage;
  damage1[0] = new Chart(ctx1,obb);
}


function optimize(state){
  const maxT = 140;
  const loopnum = 70;
  let maxdivloop = maxT/loopnum;
  const optimizeresult = {a:[], b:[], h:[], c:[], d:[],t:[],damage:[],error:{a:[],b:[],h:[],c:[],d:[],e:[],em:[]}};
  for(let p=0 ; p<=loopnum ; p++){
    let epp = 0.1;
    let da = 10;
    let db = 5;
    let x = {a:50,b:50,h:50,c:10,d:50,t: maxdivloop*p,damage:0};
    if(p==0){
      x = {a:50,b:50,h:50,c:10,d:50,t:0,damage:0};
    }else{
      x = {a:optimizeresult.a[p-1]-state.a,b:optimizeresult.b[p-1]-state.b,h:optimizeresult.h[p-1]-state.h,c:optimizeresult.c[p-1]-state.c,d:optimizeresult.d[p-1]-state.d,t:maxdivloop*p,damage:0};
    }
    let di;
    epp = 0.1;
    for(let i=0 ; Math.abs((db-da)/db) >  1e-10 ; i++){
      di = diff(state,x);
      x.a = x.a - epp * di.a;
      x.b = x.b - epp * di.b;
      x.h = x.h - epp * di.h;
      x.c = x.c - epp * di.c;
      x.d = x.d - epp * di.d;
      x = cons(state,x);
      db = da;
      da = ( Math.abs(di.a)+Math.abs(di.b)+Math.abs(di.h)+Math.abs(di.c)+Math.abs(di.d) );
      if(i>50000)break;
    }
    //console.log(x.t,di);
    optimizeresult.a.push( Math.round(10*(x.a+state.a))/10 );
    optimizeresult.b.push( Math.round(10*(x.b+state.b))/10 );
    optimizeresult.c.push( Math.round(10*(x.c+state.c))/10 );
    optimizeresult.d.push( Math.round(10*(x.d+state.d))/10 );
    optimizeresult.h.push( Math.round(10*(x.h+state.h))/10 );
    optimizeresult.t.push( maxT/loopnum * p);
    optimizeresult.damage.push( -Math.round(10*(damage(state,x)))/10);

    let y = Object.assign({},x);
    let i = 10;
    y.a = y.a + 1.5*i;
    di.a = damage(state,y)/damage(state,x);
    y = Object.assign({},x);
    y.b = y.b + 1.8*i;
    di.b = damage(state,y)/damage(state,x);
    y = Object.assign({},x);
    y.h = y.h + 1.5*i;
    di.h = damage(state,y)/damage(state,x);
    y = Object.assign({},x);
    y.c = y.c + 1*i;
    di.c = damage(state,y)/damage(state,x);
    y = Object.assign({},x);
    y.d = y.d + 2*i;
    di.d = damage(state,y)/damage(state,x);

    y = Object.assign({},state);
    y.e = y.e + 1.5*i;
    di.e = damage(y,x)/damage(state,x);

    y = Object.assign({},state);
    y.em = y.em + 6*i;
    y.el = 25/9*y.em/(1400+y.em);
    di.em = damage(y,x)/damage(state,x);
    /*
    di.d = di.d*2;
    di.a = di.a*1.5/di.d;
    di.b = di.b*1.8/di.d;
    di.h = di.h*1.5/di.d;
    di.c = di.c*1/di.d;
    di.d = 1;*/
    let r = 100000;
    optimizeresult.error.a.push(Math.round(r*di.a)/r);
    optimizeresult.error.b.push(Math.round(r*di.b)/r);
    optimizeresult.error.h.push(Math.round(r*di.h)/r);
    optimizeresult.error.c.push(Math.round(r*di.c)/r);
    optimizeresult.error.d.push(Math.round(r*di.d)/r);
    optimizeresult.error.e.push(Math.round(r*di.e)/r);
    optimizeresult.error.em.push(Math.round(r*di.em)/r);
    /*
    let er=0.02;
    let y = Object.assign({},x);
    y.a = x.a + 2*er*damage(state,x)/di.a;
    optimizeresult.error.a.up.push(Math.round(10*(y.a+state.a))/10);
    y.a = x.a - 2*er*damage(state,x)/di.a;
    optimizeresult.error.a.down.push(Math.round(10*(y.a+state.a))/10);
    y = Object.assign({},x);
    y.b = x.b + 2*er*damage(state,x)/di.b;
    optimizeresult.error.b.up.push(Math.round(10*(y.b+state.b))/10);
    y.b = x.b - 2*er*damage(state,x)/di.b;
    optimizeresult.error.b.down.push(Math.round(10*(y.b+state.b))/10);

    y = Object.assign({},x);
    y.h = x.h + 2*er*damage(state,x)/di.h;
    optimizeresult.error.h.up.push(Math.round(10*(y.h+state.h))/10);
    y.h = x.h - 2*er*damage(state,x)/di.h;
    optimizeresult.error.h.down.push(Math.round(10*(y.h+state.h))/10);

    y = Object.assign({},x);
    y.c = x.c + 2*er*damage(state,x)/di.c;
    optimizeresult.error.c.up.push(Math.round(10*(y.c+state.c))/10);
    y.c = x.c - 2*er*damage(state,x)/di.c;
    optimizeresult.error.c.down.push(Math.round(10*(y.c+state.c))/10);

    y = Object.assign({},x);
    y.d = x.d + 2*er*damage(state,x)/di.d;
    optimizeresult.error.d.up.push(Math.round(10*(y.d+state.d))/10);
    y.d = x.d - 2*er*damage(state,x)/di.d;
    optimizeresult.error.d.down.push(Math.round(10*(y.d+state.d))/10);
    if(Math.abs(di.a)<0.01){
      optimizeresult.error.a.up.pop();
      optimizeresult.error.a.down.pop();
      optimizeresult.error.a.up.push(state.a);
      optimizeresult.error.a.down.push(state.a);
    }
    if(Math.abs(di.b)<0.01){
      optimizeresult.error.b.up.pop();
      optimizeresult.error.b.down.pop();
      optimizeresult.error.b.up.push(state.b);
      optimizeresult.error.b.down.push(state.b);
    }
    if(Math.abs(di.h)<0.01){
      optimizeresult.error.h.up.pop();
      optimizeresult.error.h.down.pop();
      optimizeresult.error.h.up.push(state.h);
      optimizeresult.error.h.down.push(state.h);
    }
    if(Math.abs(di.c)<0.01){
      optimizeresult.error.c.up.pop();
      optimizeresult.error.c.down.pop();
      optimizeresult.error.c.up.push(state.c);
      optimizeresult.error.c.down.push(state.c);
    }
    if(Math.abs(di.d)<0.01){
      optimizeresult.error.d.up.pop();
      optimizeresult.error.d.down.pop();
      optimizeresult.error.d.up.push(state.d);
      optimizeresult.error.d.down.push(state.d);
    }
    */
  }
  optimizeresult.name = state.name;
  optimizeresult.init = state;
  return(optimizeresult);
}
function damage(init,x){
  let a1 = init.ar /100 * ( init.ab * (1 + init.a/100 + x.a/100 ) + init.ac ); //A
  let a2 = init.hr /100 * ( init.hb * (1 + init.h/100 + x.h/100 ) + init.hc ); //HP
  let a3 = init.br /100 * ( init.bb * (1 + init.b/100 + x.b/100 ) + init.bc ); //B
  let a4 = init.ahs/100 * ( init.hb * (1 + init.h/100 + x.h/100 ) + init.hc ); //HP→A skill
  if(a4 >= init.ab*4) a4 = init.ab*4;
  if(init.ema-1<0.01){
    let damage = 0.9*0.5*(a1+a2+a3+a4)*( 1 + ( init.c + x.c)*( init.d + x.d )/10000 )*( 1 + init.e/100 );
    return(-damage);
  }else{
    let damage = 0.9*0.5*(a1+a2+a3+a4)*( 1 + ( init.c + x.c)*( init.d + x.d )/10000 )*( 1 + init.e/100 )*(init.ema*(1 + init.ea/100 + init.el) );
    return(-damage);
  }
}
function diff(init,x){
  let diff = {a:0,b:0,h:0,c:0,d:0};
  const h = 0.001;
  let y = Object.assign({},x);
  let z = Object.assign({},x);
  y.a = y.a + h;
  z.a = z.a - h;
  diff.a = ( damage(init,y)-damage(init,z) ) / h;
  y = Object.assign({},x);
  z = Object.assign({},x);
  y.h = y.h + h;
  z.h = z.h - h;
  diff.h = ( damage(init,y)-damage(init,z) ) / h;
  y = Object.assign({},x);
  z = Object.assign({},x);
  y.b = y.b + h;
  z.b = z.b - h;
  diff.b = ( damage(init,y)-damage(init,z) ) / h;
  y = Object.assign({},x);
  z = Object.assign({},x);
  y.c = y.c + h;
  z.c = z.c - h;
  diff.c = ( damage(init,y)-damage(init,z) ) / h;
  y = Object.assign({},x);
  z = Object.assign({},x);
  y.d = y.d + h;
  z.d = z.d - h;
  diff.d = ( damage(init,y)-damage(init,z) ) / h;
  return(diff);
}
function cons(init,x){
  let tproj = (x) => {
    let p = (x.t-x.a/1.5-x.b/1.8-x.h/1.5-x.c-x.d/2) / ( 1/(1.5*1.5)+ 1/(1.8*1.8)+ 1/(1.5*1.5)+ 1+ 1/4);
    x.a = x.a + p / 1.5;
    x.b = x.b + p / 1.8;
    x.h = x.h + p / 1.5;
    x.c = x.c + p;
    x.d = x.d + p / 2;
  };
  let nproj = (init,x) =>{
    if(x.a<0) x.a=0;
    if(x.b<0) x.b=0;
    if(x.h<0) x.h=0;
    if(x.c<0) x.c=0;
    if(x.c+init.c>100){
      x.c=100-init.c;
    }
    if(x.d<0) x.d=0;
  };
  for(let i=0; i<20;i++){
    tproj(x);
    nproj(init,x);
  }
  return(x);
}
