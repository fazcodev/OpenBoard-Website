const toolbtn = document.querySelector(".tools-burger");
const toolbar = document.querySelector(".toolbar");
const tools = document.querySelectorAll(".tool");
const bucket = document.querySelector(".bucket.tool");
const pen = document.querySelector(".pen.tool");
const eraser = document.querySelector(".eraser.tool");
const shapes = document.querySelector(".shapes.tool");
const lines = document.querySelector(".lines.tool");
const text_box = document.querySelector(".textbox.tool");
const bucket_option = document.querySelector(".bucket.option");
const pen_option  = document.querySelector(".pen.option");
const eraser_option  = document.querySelector(".eraser.option");
const shapes_option  = document.querySelector(".shapes.option");
const lines_option = document.querySelector(".lines.option");
const undo = document.querySelector(".undo");
const redo = document.querySelector(".redo");
const notes = document.querySelector(".notes.option-item");
const more_box = document.querySelector(".more-options");
const morebtn = document.querySelector(".moreoptions.item");



toolbtn.addEventListener("click", function(e){
    const elem = e.target;
    elem.classList.toggle("fa-bars");
    elem.classList.toggle("fa-xmark");
    if(elem.classList.contains("fa-bars")){
        elem.style.color = 'rgb(196, 196, 196)';
        elem.style.fontSize = '3rem';
        const option = document.querySelectorAll(".option");
        option.forEach(element => {
            if(!element.classList.contains("minimizer")){
                element.classList.add("minimizer");
            }
        });
        setTimeout(()=>{
            toolbar.style.transform = "translate(-10rem, 0)";
        }, 300)
        
    }
    else{
        elem.style.color = '#2db6ec';
        elem.style.fontSize = '4rem';
        setTimeout(()=>{
            toolbar.style.transform = "";
        }, 1)
        toolbar.style.display = "flex";
    }
})


tools.forEach((elem)=>{
    elem.addEventListener("mousedown", (e)=>{
        elem.style.boxShadow = "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -2px 0px inset";
        
    })
})



bucket.addEventListener("click", ()=>{
    bucket_option.classList.toggle("minimizer");
    if(bucket_option.classList.contains("minimizer")){
        bucket.firstElementChild.style.color = "#6dc0e4";
    }
    else{
        bucket.firstElementChild.style.color = "#0dabf8";
    }
})


pen.addEventListener("click", ()=>{
    pen_option.classList.toggle("minimizer");
    if(pen_option.classList.contains("minimizer")){
        pen.firstElementChild.style.color = "#6dc0e4";
    }
    else{
        pen.firstElementChild.style.color = "#0dabf8";
    }
})


eraser.addEventListener("click", ()=>{
    eraser_option.classList.toggle("minimizer");
    if(eraser_option.classList.contains("minimizer")){
        eraser.firstElementChild.style.color = "#6dc0e4";
    }
    else{
        eraser.firstElementChild.style.color = "#0dabf8";
    }
})


shapes.addEventListener("click", ()=>{
    shapes_option.classList.toggle("minimizer");
    if(shapes_option.classList.contains("minimizer")){
        shapes.firstElementChild.style.color = "#6dc0e4";
    }
    else{
        shapes.firstElementChild.style.color = "#0dabf8";
    }
})


lines.addEventListener("click", ()=>{
    lines_option.classList.toggle("minimizer");
    if(lines_option.classList.contains("minimizer")){
        lines.firstElementChild.style.color = "#6dc0e4";
    }
    else{
        lines.firstElementChild.style.color = "#0dabf8";
    }
})




//-------------------------------------Creating new note----------------------------------------------------
notes.addEventListener("click", ()=>{
    const newnote = document.createElement("div");
    newnote.classList.add("notes_area");
    newnote.innerHTML = `<header>
    <input type="text" class="title" placeholder="Title ...">
    <div class="item">
        <i class="fa-solid fa-minus"></i>
        <i class="fa-solid fa-xmark"></i>
    </div>
    
    </header>
    <textarea name="content" class="content" cols="23" rows="7" placeholder = "type here...."></textarea>`

    document.body.append(newnote);
    EventMaker(newnote);
})

function EventMaker(notes_area){
    
    // Sticky Notes Events
    const minus = notes_area.firstElementChild.lastElementChild.firstElementChild;
    const close = minus.nextElementSibling;
    const content = notes_area.firstElementChild.nextElementSibling;
    minus.addEventListener("click", ()=>{
        let display = content.style.display;
        if(display === "none"){
            content.style.display = "block";
        }
        else content.style.display = "none";
    })

    close.addEventListener("click", ()=>{
        close.parentNode.parentNode.parentNode.remove();

    })


    // Sticky Notes Dragging
    let move_note = false, posx, posy;
    notes_area.addEventListener("mousedown", function(e){
        move_note = true;
        posx = e.clientX-this.offsetLeft;
        posy = e.clientY-this.offsetTop
        // console.log('down');
    })
    notes_area.addEventListener("touchstart", function(e){
        move_note = true;
        posx = e.changedTouches[0].clientX-this.offsetLeft;
        posy = e.changedTouches[0].clientY-this.offsetTop
        // console.log('down');
    })
    document.addEventListener("mousemove", function(e){
        if(move_note === true){
            notes_area.style.top = `${e.clientY-posy}px`;
            notes_area.style.left = `${e.clientX-posx}px`;
        }
        
    })
    document.addEventListener("touchmove", function(e){
        if(move_note === true){
            notes_area.style.top = `${e.changedTouches[0].clientY-posy}px`;
            notes_area.style.left = `${e.changedTouches[0].clientX-posx}px`;
        }
    })
    document.addEventListener("mouseup", ()=>{move_note = false})
    document.addEventListener("touchend", ()=>{move_note = false})

}


// ---------------------------------------------Creating Text-Box-------------------------------------------


text_box.addEventListener("click", ()=>{
    currdraw = "text";
    canvas.style.cursor = 'text';
})

canvas.addEventListener("click", (e)=>{
    if(currdraw == "text"){
        console.log(currdraw);
        const newtext = document.createElement('div');
        newtext.classList.add("text-content");
        newtext.innerHTML = `<i class="fa-solid fa-xmark"></i>
        <textarea name="" id="" cols="7" rows="1" ></textarea>`
        newtext.style.top = `${e.clientY-21}px`;
        newtext.style.left = `${e.clientX-30}px`;
        document.body.append(newtext);
        EventMakerText(newtext);
    }
})

function EventMakerText(newtext){
    const del = newtext.firstElementChild;
    const text = del.nextElementSibling;
    del.addEventListener("click", (e)=>{
        del.parentNode.remove();
    })
    text.addEventListener("dblclick", (e)=>{
        e.preventDefault();
        text.style.border = '1px dashed';
        text.style.resize = 'both';
        del.style.display = 'inline-block'
        text.removeAttribute('readonly');
    })
    canvas.addEventListener("click", ()=>{
        if(currdraw != "text"){
            if(text.value == null){
                text.parentNode.remove();
            }
            else{
                text.style.border = 'none';
                text.style.resize ='none';
                del.style.display = 'none';
                text.setAttribute('readonly', 'true');
            }
            

        }
    })
    let move = false, posx, posy;
    newtext.addEventListener("mousedown", (e)=>{

        move = true;
        posx = e.clientX-newtext.offsetLeft;
        posy = e.clientY-newtext.offsetTop;
    })
    newtext.addEventListener("touchstart", (e)=>{

        move = true;
        posx = e.changedTouches[0].clientX-newtext.offsetLeft;
        posy = e.changedTouches[0].clientY-newtext.offsetTop;
    })
    document.addEventListener("mousemove", (e)=>{
        if(move){
            text.style.cursor = 'grabbing';
            newtext.style.top = `${e.clientY-posy}px`
            newtext.style.left = `${e.clientX-posx}px`
        }
        
    })
    document.addEventListener("touchmove", (e)=>{
        if(move){
            text.style.cursor = 'grabbing';
            newtext.style.top = `${e.changedTouches[0].clientY-posy}px`
            newtext.style.left = `${e.changedTouches[0].clientX-posx}px`
        }
        
    })
    document.addEventListener("mouseup", (e)=>{
        move = false;
        text.style.cursor = 'default';
    })
    document.addEventListener("touchend", (e)=>{
        move = false;
        text.style.cursor = 'default';
    })


    text.addEventListener("mouseover", ()=>{move = false})

}


// ------------------------More Options-----------------------------
morebtn.addEventListener("click", function(e){
    if(more_box.classList.contains("collapse-options")){
        more_box.classList.remove("collapse-options");
    }
    else{
        more_box.classList.add("collapse-options");
    }
    
})
