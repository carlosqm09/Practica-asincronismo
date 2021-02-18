const div= document.querySelector("#section");
const sectArray=["./pages/Products","./pages/mision","./pages/home"];
var index=0;
const btn= document.querySelector("#btn");
const content = document.querySelector("#content");

//Funcion que posibilita el cambio de contenido entre archivos Html:
const changeSection = async(val)=>{
            try {
                const res = await fetch(`${sectArray[val]}.html`)
                const data = await res.text()
                const domParse = new DOMParser();
	            const doc = domParse.parseFromString(data, 'text/html');
                const section= doc.querySelector("div");
                div.replaceChild(section,div.lastChild);
            } catch (error) {
                console.log(error)
            }
        }
        //Funcion que ejecuta un intervalo de tiempo entre el cambio de contenido:
        function change() {setInterval(function(){  
            changeSection(index);
            index=index+1
            if(index===3){index=0;}
        }, 3000);}
            
//Evento del boton:
        btn.onclick= ()=>{
            btn.disabled=true;
            content.remove();
            changeSection(2)
            alert("El contenido de cada seccion cambiara cada 3 segundos")
            change();
        }  
//Rutas:
document.querySelectorAll(".button").forEach((item)=>{
item.addEventListener('click', ()=>{
    content.remove();
    changeSection(item.value);
})
});