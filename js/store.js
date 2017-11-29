var dobjd;

//printDesings(getDesings());
getDesings();
getTypes();
//console.log(dobjd);

function getDesings(){

  ajax=nuevoAjax();
  ajax.open("GET","http://127.0.0.1:3000/diseno/" ,true);
  ajax.setRequestHeader("Content-type", "application/json");
  ajax.setRequestHeader("Connection", "close");
  ajax.onreadystatechange=function() {
    if (ajax.readyState==4 && ajax.status==200) {
      var dobj
      try{
         dobj = JSON.parse(ajax.responseText);
         dobjd=dobj['data'];
        printDesings(dobj['data']);
      }

      catch(e){
        console.log("error: "+e);
      }
    }
  }
  ajax.send();
}

function printDesings(desings){
  var divContent = document.getElementById('desingsContainer');
  var modalContent = document.getElementById('modal-content');
  var rg = document.getElementById('rowsGalery');
  //var modalContent = document.getElementsByClassName('modal-content')[0];
  var cont=0;
  var rows=[];
  var rowsGalery=[];
  for (var i = 0; i < desings.length; i++) {
  //  desings[i]
    if (cont==0) {

      var row = document.createElement('div');
      row.className='row';
      rows.push(row);
      var rowg = document.createElement('div');
      rowg.className='row';
      rowsGalery.push(rowg);
    }
    var slyde = document.createElement('div');
    slyde.className="mySlides";
    if (i==0) {
      slyde.style.display = "block";
    }else {
      slyde.style.display = "none";
    }
    slyde.innerHTML='<div class="numbertext">'+i+' / '+desings.length+'</div><img src="http://127.0.0.1:3000/'+desings[i]['imagen']+'" style="width:100%">';
    //console.log(slyde);
    modalContent.appendChild(slyde);
    var columng = document.createElement('div');
    columng.className='column';
    columng.innerHTML='<img class="demo cursor" src="http://127.0.0.1:3000/'+desings[i]['imagen']+'" style="width:100%" onclick="currentSlide('+desings[i]['id_disenno']+')" alt="'+desings[i]['nombre']+'">';
    rowsGalery[rowsGalery.length-1].appendChild(columng);

    var column = document.createElement('div');
    column.className='column';
    column.innerHTML='<img src="http://127.0.0.1:3000/'+desings[i]['imagen']+'" style="width:100%" onclick="openModal();currentSlide('+desings[i]['id_disenno']+')" class="hover-shadow cursor">'
    +'<div class="trans text-center"> <button name="botonDiseno'+desings[i]['id_disenno']+'" value="Diseño '+desings[i]['id_disenno']+'" onclick="capturarDiseno(this)">Seleccionar</button> </div> ';
    //console.log(rows[rows.length-1]);
    rows[rows.length-1].appendChild(column);
    cont++;
    if (cont==4) {
      rg.appendChild(rowsGalery[rowsGalery.length-1]);
      divContent.appendChild(rows[rows.length-1]);
      cont=0;
    }

  }
  if (cont!=0) {
    rg.appendChild(rowsGalery[rowsGalery.length-1]);
    divContent.appendChild(rows[rows.length-1]);
  }
}

function getTypes(){
  ajax2=nuevoAjax();
  ajax2.open("GET","http://127.0.0.1:3000/tipoCam/" ,true);
  ajax2.setRequestHeader("Content-type", "application/json");
  ajax2.setRequestHeader("Connection", "close");
  ajax2.onreadystatechange=function() {
    if (ajax2.readyState==4 && ajax2.status==200) {
      var dobj2;
      try{
         dobj2 = JSON.parse(ajax2.responseText);
         dobjTypes=dobj2['data'];
        printTypes(dobj2['data']);
      }

      catch(e){
        console.log("error: "+e);
      }
    }
  }
  ajax2.send();
}
function printTypes(types){
  var selTypes = document.getElementById('tipoC');
  for (var i = 0; i < types.length; i++) {
    var opt=document.createElement('option');
    opt.value=types[i]["id_tipocam"];
    opt.innerHTML=types[i]["nombre"];
    selTypes.appendChild(opt);
  }
  getColor(selTypes.value);

}

function getColor(type){
  ajax3=nuevoAjax();
  ajax3.open("GET","http://127.0.0.1:3000/colorTipoCam/"+type ,true);
  ajax3.setRequestHeader("Content-type", "application/json");
  ajax3.setRequestHeader("Connection", "close");
  ajax3.onreadystatechange=function() {
    if (ajax3.readyState==4 && ajax3.status==200) {
      //var colors;
      try{
         var colors = JSON.parse(ajax3.responseText);
         //dobjd=dobj['data'];
        // console.log(colors['data']);
        printColors(colors['data']);
      }

      catch(e){
        console.log("error: "+e);
      }
    }
  }
  ajax3.send();
}


function printColors(colors){
  var colorSel=document.getElementById('colorCamisa');
  colorSel.innerHTML='';
  for (var i = 0; i < colors.length; i++) {
    var optC=document.createElement('option');
    optC.value=colors[i]["color"];
    optC.innerHTML=colors[i]["color"];
    colorSel.appendChild(optC);
  }
  getDisponible();
}

function getDisponible(){
  var idTipo =document.getElementById("tipoC").value;
  var color = document.getElementById("colorCamisa").value;
  var talla = document.getElementById('talla').value;
  ajax4=nuevoAjax();
  ajax4.open("GET","http://127.0.0.1:3000/available/"+idTipo+"/"+color+"/"+talla ,true);
  ajax4.setRequestHeader("Content-type", "application/json");
  ajax4.setRequestHeader("Connection", "close");
  ajax4.onreadystatechange=function() {
    if (ajax4.readyState==4 && ajax4.status==200) {
    //  var dobj
      try{
         var disp = JSON.parse(ajax4.responseText);
         //dobjd=dobj['data'];
        printDisponible(disp['data']);
      }

      catch(e){
        console.log("error: "+e);
      }
    }
  }
  ajax4.send();



}

function printDisponible(data) {
  var dis = document.getElementById('disponible');
  dis.innerHTML=data["cantidad"];
  var can =document.getElementById("cantidad")
  can.innerHTML="";
  if (dis.innerHTML>9) {
    for (var i = 0; i < 10; i++) {
      var optCa=document.createElement('option');
      optCa.value=i+1;
      optCa.innerHTML=i+1;
      can.appendChild(optCa);
    }
    }else {
      for (var i = 0; i < dis.innerHTML; i++) {
        var optCa=document.createElement('option');
        optCa.value=i+1;
        optCa.innerHTML=i+1;
        can.appendChild(optCa);
      }
  }
}
