const clear_board = document.querySelector(".clear.item i");
let canvas = document.querySelector("#canvas");
let ctx
let startx, starty, move = false, currdraw = "pen";
let pen_prop = {color: 'black', size: 4}, eraser_size = 4, bucket_color = 'white';
let newobj = {}, undoarr = [], undo_lazer = [];
Create(canvas);
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    Create(canvas)
    resize_obj();
    redraw();
})


let createobj_store = {
    draw_arr: [],
    h: ctx.canvas.height,
    w: ctx.canvas.width
};





//----------------------Canvas Event Listeners and Funtions--------------------
function mousepos(e){
    startx = e.clientX;
    starty = e.clientY;
    return [e.clientX, e.clientY]
}
function touchpos(e){
    startx = e.changedTouches[0].clientX;
    starty = e.changedTouches[0].clientY;
    return [e.clientX, e.clientY]
}
canvas.addEventListener("mousedown", (e)=>{
    mousepos(e);
    move = true;
    startdraw();
    
    
})
canvas.addEventListener("touchstart", (e)=>{
    touchpos(e);
    move = true;
    startdraw();
    
    
})
canvas.addEventListener("mousemove", (e)=>{
    if(move){
        draw(e);
    }
})
canvas.addEventListener("touchmove", (e)=>{
    if(move){
        draw(e.changedTouches[0]);
    }
})

canvas.addEventListener("mouseup", (e)=>{
    move = false; 
    enddraw(e);
    
})
canvas.addEventListener("touchend", (e)=>{
    move = false; 
    enddraw(e.changedTouches[0]);
    
})

function Create(canvas){
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = bucket_color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}



// ----------------------Toolbar Tools Event Listeners-------------------
pen.addEventListener("click", ()=>{
    currdraw = "pen";
    canvas.style.cursor = "url(./Images/pen.png) 3 38, auto";
})

eraser.addEventListener("click", ()=>{
    currdraw = "eraser";
    canvas.style.cursor = "url('./Images/eraser.png') 10 35, auto"
})

bucket_option.addEventListener("input", (e)=>{
    bucket_color = e.target.value;
    redraw();
   
})
pen_option.addEventListener("input", (e)=>{
    if(e.target.getAttribute("type") == 'color'){
        pen_prop.color = e.target.value;
    }
    else if(e.target.getAttribute("type") != null){
        pen_prop.size = e.target.value;
    }
})
eraser_option.addEventListener("input", (e)=>{
    currdraw = 'eraser';
    eraser_size = e.target.value;
    canvas.style.cursor = "url('./Images/eraser.png') 10 35, auto"
    
})
shapes_option.addEventListener("click", (e)=>{
    let name = e.target.getAttribute("title");
    if(name != null){
        currdraw = name;
        canvas.style.cursor = 'crosshair';
    }
    
    console.log(currdraw);
})
lines_option.addEventListener("click", (e)=>{
    let name = e.target.getAttribute("title");
    if(name != null){
        currdraw = name;
        canvas.style.cursor = 'crosshair';
    }
    
    console.log(currdraw);
})
//--------------------------Drawing Functions--------------------------
function startdraw(){
    undoarr = [];
    newobj.sx = startx; newobj.sy = starty; newobj.name = currdraw;
    ctx.lineCap = 'round';
    if(currdraw == "pen" || currdraw == 'eraser')
    {
        ctx.beginPath();
        ctx.moveTo(startx, starty);
        newobj.x = []; newobj.y = [];
    }
    else
    {
        newobj.color = pen_prop.color; newobj.size = pen_prop.size;
    }
}

function draw(e){
    // console.log(createobj_store.draw_arr);
    let rad = (Math.sqrt(Math.pow(e.clientX-startx, 2)+Math.pow(e.clientY-starty, 2)));
    ctx.lineCap = 'round';
    if(currdraw == "pen" || currdraw == "eraser"){
        
        ctx.lineWidth = newobj.size;
        
        if(currdraw == 'eraser')
        {
            newobj.color = ctx.strokeStyle = bucket_color;
            newobj.size = ctx.lineWidth = eraser_size;
        }
        else
        {
            newobj.color = ctx.strokeStyle = pen_prop.color;
            newobj.size = ctx.lineWidth = pen_prop.size;
        }
        ctx.lineTo(e.clientX, e.clientY);
        newobj.x.push(e.clientX); newobj.y.push(e.clientY);
        ctx.stroke();
    }
    else if(currdraw == "border_rectangle"){
        redraw();
        ctx.lineWidth = newobj.size;
        ctx.strokeStyle = newobj.color;
        ctx.strokeRect(startx, starty, e.clientX-startx, e.clientY-starty);
    }
    else if(currdraw == "fill_rectangle"){
        
        redraw();
        ctx.lineWidth = newobj.size;
        ctx.fillStyle = newobj.color;
        ctx.fillRect(startx, starty, e.clientX-startx, e.clientY-starty);
        
    }
    else if(currdraw == "border_circle"){
        redraw();
        ctx.lineWidth = newobj.size;
        ctx.strokeStyle = newobj.color;
        ctx.beginPath();
        ctx.arc(startx, starty, rad, 0, 2*Math.PI);
        ctx.stroke();
    }
    else if(currdraw == "fill_circle"){
        redraw();
        ctx.lineWidth = newobj.size;
        ctx.fillStyle = newobj.color;
        ctx.beginPath();
        ctx.arc(startx, starty, rad, 0, 2*Math.PI);
        ctx.fill();
    }
    else if(currdraw == "Line"){
        redraw();
        ctx.lineWidth = newobj.size;
        ctx.strokeStyle = newobj.color;
        ctx.beginPath();
        ctx.moveTo(newobj.sx, newobj.sy);
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
    }
    else if(currdraw == "Dashed Line"){
        redraw();
        ctx.lineWidth = newobj.size;
        ctx.strokeStyle = newobj.color;
        ctx.setLineDash([20, 10]);
        ctx.beginPath();
        ctx.moveTo(newobj.sx, newobj.sy);
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
    }
    else if(currdraw == "Dot Line"){
        redraw();
        ctx.lineWidth = newobj.size;
        ctx.strokeStyle = newobj.color;
        ctx.setLineDash([1, 10]);
        ctx.beginPath();
        ctx.moveTo(newobj.sx, newobj.sy);
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
    }
    else if(currdraw == "Dash & Dot Line"){
        redraw();
        ctx.lineWidth = newobj.size;
        ctx.strokeStyle = newobj.color;
        ctx.setLineDash([20, 10, 1, 10]);
        ctx.beginPath();
        ctx.moveTo(newobj.sx, newobj.sy);
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
    }
    
}

function enddraw(e){
    ctx.setLineDash([]);
    if(Object.keys(newobj).length != 0){
        if(currdraw != 'pen' && currdraw != 'eraser')
        {
            let [fx, fy] = [e.clientX, e.clientY];
            newobj.fx = fx, newobj.fy = fy;
            if(fx != newobj.sx || fy != newobj.sy)createobj_store.draw_arr.push(newobj);
            
        }
        else if(newobj.x.length != 0){
            createobj_store.draw_arr.push(newobj);
        }
        newobj = {};
    }
}


//--------------------------------Redraw------------------------
function redraw(){
    Create(canvas);
    let len = createobj_store.draw_arr.length, i = 0;
    let arr = createobj_store.draw_arr;
    ctx.lineCap = 'round';
    // console.log(arr);
    while(i<len)
    {
        if(currdraw == 'lazer')continue;
        ctx.lineWidth = arr[i].size;
        ctx.strokeStyle = arr[i].color;
        ctx.fillStyle = arr[i].color;
        ctx.setLineDash([]);
        let rad;
        if(arr[i].fx){
            rad = (Math.sqrt(Math.pow(arr[i].fx-arr[i].sx, 2)+Math.pow(arr[i].fy-arr[i].sy, 2)));
        }
        if(arr[i].name == 'pen' || arr[i].name == 'eraser')
        {
            
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(arr[i].sx, arr[i].sy);
            if(arr[i].name == 'eraser')ctx.strokeStyle = bucket_color;
            let lent = arr[i].x.length, j =0;
            while(j < lent)
            {
                ctx.lineTo(arr[i].x[j], arr[i].y[j]);
                j++;
            }
            ctx.stroke();
        }
        else if(arr[i].name == "border_rectangle"){
            
            ctx.strokeRect(arr[i].sx, arr[i].sy, arr[i].fx-arr[i].sx, arr[i].fy-arr[i].sy);
        }
        else if(arr[i].name == "fill_rectangle"){
            
            ctx.fillRect(arr[i].sx, arr[i].sy, arr[i].fx-arr[i].sx, arr[i].fy-arr[i].sy);
        }
        else if(arr[i].name == "border_circle"){
            ctx.beginPath();
            ctx.arc(arr[i].sx, arr[i].sy, rad, 0, 2*Math.PI);
            ctx.stroke();
        }
        else if(arr[i].name == "fill_circle"){
            ctx.beginPath();
            ctx.arc(arr[i].sx, arr[i].sy, rad, 0, 2*Math.PI);
            ctx.fill();
        }
        else if(arr[i].name == "Line"){
            ctx.beginPath();
            ctx.moveTo(arr[i].sx, arr[i].sy);
            ctx.lineTo(arr[i].fx, arr[i].fy);
            ctx.stroke();
        }
        else if(arr[i].name == "Dashed Line"){
            ctx.setLineDash([20, 10]);
            ctx.beginPath();
            ctx.moveTo(arr[i].sx, arr[i].sy);
            ctx.lineTo(arr[i].fx, arr[i].fy);
            ctx.stroke();
        }
        else if(arr[i].name == "Dot Line"){
            ctx.setLineDash([1, 10]);
            ctx.beginPath();
            ctx.moveTo(arr[i].sx, arr[i].sy);
            ctx.lineTo(arr[i].fx, arr[i].fy);
            ctx.stroke();
        }
        else if(arr[i].name == "Dash & Dot Line"){
            ctx.setLineDash([20, 10, 1, 10]);
            ctx.beginPath();
            ctx.moveTo(arr[i].sx, arr[i].sy);
            ctx.lineTo(arr[i].fx, arr[i].fy);
            ctx.stroke();
        }
        i++;
    }
    ctx.setLineDash([]);
}





//----------------------Recreating Drawing Due to Resize-------------
function resize_obj(){
    const oldw = createobj_store.w, oldh = createobj_store.h;
    const neww = ctx.canvas.width, newh = ctx.canvas.height;
    const ratiow = neww/(oldw*1.0), ratioh = newh/(oldh*1.0);
    createobj_store.w = neww; createobj_store.h =newh;
    for(obj of createobj_store.draw_arr)
    {
        obj.sx*=ratiow;
        obj.sy*=ratioh;
        if(obj.name == 'pen' || obj.name == 'eraser')
        {
            const len = obj.x.length;
            for(let j = 0; j<len; j++)
            {
                obj.x[j]*=ratiow;
                obj.y[j]*=ratioh;
            }
            
        }
        else
        {
            obj.fx*=ratiow; obj.fy*=ratioh;
        }
    }
}






//-----------------------------NavBar and Toolbar Event Listeners----------------------
document.addEventListener("mouseup", ()=>{
    clear_board.style.fontSize = "3rem";
    undo.firstElementChild.style.width = "4rem";
    redo.firstElementChild.style.width = "4rem";
    tools.forEach((elem)=>{
        elem.style.boxShadow = "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -5px 0px inset"
    })
})
clear_board.addEventListener("mousedown", ()=>{
    clear_board.style.fontSize = "2.8rem";
})
clear_board.addEventListener("click", ()=>{
    Create(canvas);
    createobj_store.draw_arr = [];
})


function redofunc(){
    if(undoarr.length != 0){
        createobj_store.draw_arr.push(undoarr.pop());
    }
    redraw();

}
function undofunc(){
    let arr = createobj_store.draw_arr;
    if(arr.length != 0){
        let obj = arr.pop();
        undoarr.push(obj);
    }
    redraw();
}



undo.addEventListener("mousedown", ()=>{
    undo.firstElementChild.style.width = "3.6rem";
})
undo.addEventListener("click", ()=>{
    undofunc();
})

redo.addEventListener("mousedown", ()=>{
    redo.firstElementChild.style.width = "3.6rem";
})
redo.addEventListener("click", ()=>{
    redofunc();
})


document.addEventListener("keydown",function (e) {
    if (e.which === 90 && (e.ctrlKey || e.metaKey) && e.shiftKey) {
        redofunc();
    }
    else if (e.which === 90 && (e.ctrlKey || e.metaKey)) {
        undofunc();
    }
});
