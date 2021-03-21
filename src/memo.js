
for(let i=0 ; i<this.state.struct.length ; i++){
  child="";
  for(let j=0 ; j<this.state.struct[i].children.length ; j++){
    childchild="";
    for(let k=0 ; k<this.state.struct[i].children[j].children.length; k++){

      if(this.state.struct[i].children[j].children[k].type=="wep"){
        childchild = <>{childchild}<Wepcreate id={this.state.struct[i].children[j].children[k].id} framedelete={this.framedelete} class={this.state.mask.includes(this.state.struct[i].children[j].children[k].id) ? "none" : undefined}/></>
      }else{
        childchild = <>{childchild}<Articreate id={this.state.struct[i].children[j].children[k].id} framedelete={this.framedelete} class={this.state.mask.includes(this.state.struct[i].children[j].children[k].id) ? "none" : undefined}/></>
      }
    }
    if(this.state.struct[i].children[j].type=="wep"){
      child = <>{child}<div className={this.state.mask.includes(this.state.struct[i].children[j].id) ? "none" : undefined}><Wepcreate id={this.state.struct[i].children[j].id} framedelete={this.framedelete}/><div className="child2">{childchild}</div></div></>
    }else{
      child = <>{child}<div className={this.state.mask.includes(this.state.struct[i].children[j].id) ? "none" : undefined}><Articreate id={this.state.struct[i].children[j].id} framedelete={this.framedelete}/><div className="child2">{childchild}</div></div></>
    }
  }
    char = <>{char}<div className={this.state.mask.includes(this.state.struct[i].id) ? "none" : undefined}><Charcreate id={this.state.struct[i].id} framedelete={this.framedelete}/><div className="child1">{child}</div></div></>
  }


  framedelete(event){
    const idindex = event.target.parentElement.parentElement.id.slice(-3).replace(/[^0-9]/g, '');
    let x = this.state.mask.slice();
    x.push(idindex);
    console.log(x);
    this.setState({mask:x});
  }
  framedelete(event){
    let idindex=event.target.parentElement.parentElement.id.slice(-3).replace(/[^0-9]/g, '');  //""→char "0"→0の子にwep "00"→00の子にwep
    const type = "char";
    idindex ="";
    let x = this.state.struct.concat();
    if(idindex.length==0){
      x[x.length]={id:x.length.toString(),type:type,children:[]};
    }
    console.log(idindex);
    /*if(idindex.length==1){
      let i=0;
      for(i=0;i<x.length;i++){
          if(x[i].id==idindex)break;
      }
      x[i].children[x[i].children.length].id = x[i].children.length;
      x[i].children[x[i].children.length].type = type;
      x[i].children[x[i].children.length].childlen = [];
    }*/
    console.log(x);
    this.setState({struct:x});
  }

  for(let i=0 ; i<this.state.struct.length ; i++){
    child="";
    for(let j=0 ; j<this.state.struct[i].children.length ; j++){
      childchild="";
      for(let k=0 ; k<this.state.struct[i].children[j].children.length; k++){

        if(this.state.struct[i].children[j].children[k].type=="wep"){
          childchild = <>{childchild}<li key={this.state.struct[i].children[j].children[k].id}><Wepcreate id={this.state.struct[i].children[j].children[k].id} framedelete={this.framedelete}/></li></>
        }else{
          childchild = <>{childchild}<li key={this.state.struct[i].children[j].children[k].id}><Articreate id={this.state.struct[i].children[j].children[k].id} framedelete={this.framedelete}/></li></>
        }
      }
      if(this.state.struct[i].children[j].type=="wep"){
        child = <>{child}<li key={this.state.struct[i].children[j].id}><Wepcreate id={this.state.struct[i].children[j].id} framedelete={this.framedelete}/><ul className="child2">{childchild}</ul></li></>
      }else{
        child = <>{child}<li key={this.state.struct[i].children[j].id}><Articreate id={this.state.struct[i].children[j].id} framedelete={this.framedelete}/><ul className="child2">{childchild}</ul></li></>
      }
    }
      char = <>{char}<li key={this.state.struct[i].id}><Charcreate id={this.state.struct[i].id} framedelete={this.framedelete}/><ul className="child1">{child}</ul></li></>
    }


    function optimize(init,t){
      let x = {
        a:50,
        b:50,
        h:50,
        c:10,
        d:50,
        t:t,
        damage:0,
      }
      let epp = 0.01;
      let d = 10;
      for(let i=0 ; d > 0.15  ; i++){
        epp = 0.1/Math.sqrt(i+1); //71.04857996845486 142.09715991818928 80.20426010867575 0 0
        di = dif(init,x);
        x.a = x.a - epp * di.a;
        x.b = x.b - epp * di.b;
        x.h = x.h - epp * di.h;
        x.c = x.c - epp * di.c;
        x.d = x.d - epp * di.d;
        x = cons(init,x);
        d = epp * Math.sqrt( di.a**2 + di.b**2 + di.h**2 + di.c**2 + di.d**2 );
        if(i>50000)break;
      }
      x.damage = damage(init,x);
      x.a = x.a + init.a;
      x.b = x.b + init.b;
      x.c = x.c + init.c;
      x.d = x.d + init.d;
      x.h = x.h + init.h;
      x.a = Math.round( x.a );
      x.b = Math.round( x.b );
      x.h = Math.round( x.h );
      x.c = Math.round( x.c );
      x.d = Math.round( x.d );
      return(x);
    }

    function damage(init,x){
      let a1 = init.ar*( init.ab*(1 + init.a/100 + x.a/100 ) + init.ac ); //A
      let a2 = init.hr*( init.hb*(1 + init.h/100 + x.h/100 ) + init.hc ); //HP
      let a3 = init.br*( init.bb*(1 + init.b/100 + x.b/100 ) + init.bc ); //B
      let a4 = init.ahs/100*( init.hb*(1 + init.h/100 + x.h/100 ) + init.hc ); //HP→A
      if(a4 >= init.ab*4) a4 = init.ab*4;
      let damage = (a1+a2+a3+a4)*( 1 + ( init.c + x.c)*( init.d + x.d )/10000 )* ( 1 + init.e/100 )*( 1+ init.ec/100 * init.ema * ( 1+init.ea/100 + init.el));
      return(-damage);
    }
    function dif(init,x){
      let diff ={
        a:0,
        b:0,
        h:0,
        c:0,
        d:0,
      };
      const h = 0.0001;
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





    function optimize(state){
      const maxT = 150;
      const loopnum = 50;
      let epp = 0.01;
      let d = 10;
      let optimizeresult = {a:[], b:[], h:[], c:[], d:[],t:[],damage:[]};
      for(let p=0 ; p<=loopnum ; p++){
        let x = {a:50,b:50,h:50,c:10,d:50,t: maxT/loopnum*p,damage:0};
        for(let i=0 ; d > 0.15  ; i++){
          epp = 0.1/Math.sqrt(i+1);
          let di = diff(state,x);
          x.a = x.a - epp * di.a;
          x.b = x.b - epp * di.b;
          x.h = x.h - epp * di.h;
          x.c = x.c - epp * di.c;
          x.d = x.d - epp * di.d;
          x = cons(state,x);
          d = epp * Math.sqrt( di.a**2 + di.b**2 + di.h**2 + di.c**2 + di.d**2 );
          if(i>50000)break;
        }
        optimizeresult.a.push( Math.round(x.a+state.a) );
        optimizeresult.b.push( Math.round(x.b+state.b) );
        optimizeresult.c.push( Math.round(x.c+state.c) );
        optimizeresult.d.push( Math.round(x.d+state.d) );
        optimizeresult.h.push( Math.round(x.h+state.h) );
        optimizeresult.t.push( maxT/loopnum * p);
        optimizeresult.damage.push( -damage(state,x) );
      }
      return(optimizeresult);
    }
    damagecomp[i+1] = new Chart(ctx, {
      type:'line',
      data:{
        labels:x[i+1].t,
        datasets:[{
          label:'A%',
          data:x[i+1].a,
          borderColor: "rgba(255,0,0,0.8)",
          backgroundColor: "rgba(255,0,0,0.2)",
          fill : "false",
          pointRadius: 0,
        },{
          label:'B%',
          data:x[i+1].b,
          borderColor: "rgba(0,0,255,0.8)",
          backgroundColor: "rgba(0,0,255,0.2)",
          fill : "false",
          pointRadius: 0,
        },{
          label:'HP%',
          data:x[i+1].h,
          borderColor: "rgba(153,50,204,0.8)",
          backgroundColor: "rgba(153,50,204,0.2)",
          fill : "false",
          pointRadius: 0,
        },{
          label:'会心%',
          data:x[i+1].c,
          borderColor: "rgba(50,205,50,0.8)",
          backgroundColor: "rgba(50,205,50,0.2)",
          fill : "false",
          pointRadius: 0,
        },{
          label:'会心ダメ%',
          data:x[i+1].d,
          borderColor: "rgba(255,140,0,0.8)",
          backgroundColor: "rgba(255,140,0,0.2)",
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
            scaleLabel: {                 //軸ラベル設定
               display: true,             //表示設定
               labelString: 'A% B% HP% 率% ダメ%',  //ラベル
              fontColor: 'rgb(195, 195, 195)',
               fontSize: 18               //フォントサイズ
            },
            ticks: {
              fontColor: 'rgb(195, 195, 195)',
              fontSize:18,
              suggestedMax: 40,
              suggestedMin: 0,
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

  }
