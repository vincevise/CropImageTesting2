let drawingboard = document.getElementById('drawingboard') 
let editor = document.getElementById('editor')
let scale =1;
let colorPicker = document.getElementById('color-picker')

let navBar = document.getElementById('nav-bar') 
let isResizing = false;
let outerContainer = document.getElementById('outer-container')
let expandButton = document.getElementById('expand-button')

// add drag functionality to shapes

let selectedItem = null;
let shapes = Object.entries(document.getElementsByClassName('shape'))
addDragToShape()
 
/*Make resizable div by Hung Nguyen*/
// RESIZE Shape MOUSE EVENT
function makeResizableDiv(div) {
    const element = document.querySelector(div); 
    const resizers = document.querySelectorAll(div + ' .resizer')
    const minimum_size = 20;
    let original_width = 0;
    let original_height = 0;
    let original_x = 0;
    let original_y = 0;
    let original_mouse_x = 0;
    let original_mouse_y = 0;
    let imageSizeX, imageSizeY,image
    
    
    
    for (let i = 0;i < resizers.length; i++) {
      const currentResizer = resizers[i];
      currentResizer.addEventListener('mousedown', mousedown)
      function mousedown(e){
        e.preventDefault() 
        if(selectedItem.children[0].classList.contains('image')){
            image = element.children[0].children[0].children[0]
            imageSizeX = image.getBoundingClientRect().width
            imageSizeY = image.getBoundingClientRect().height
        }
           
       
        
        original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
        original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));

        original_x = element.getBoundingClientRect().left;
        original_y = element.getBoundingClientRect().top;
    
        original_mouse_x = e.pageX;
        original_mouse_y = e.pageY;
        window.addEventListener('mousemove', resize)
        window.addEventListener('mouseup', stopResize)
      }
      
      function resize(e) { 
        isResizing = true 
            if (currentResizer.classList.contains('bottom-right')) {
                const width = original_width + (e.pageX - original_mouse_x);
                const height = original_height + (e.pageX - original_mouse_x)

                ///// image  
                if(selectedItem.children[0].classList.contains('image') && !dblclickedItem){
                const newImageX = imageSizeX + (width - original_width)
                const newImageY = imageSizeY + (height -   original_height)
                
                    image.style.width = newImageX + 'px'
                    image.style.height = newImageY + 'px'
                }
                //// image

                //to ensure the boundary does not exceed the image size when it is edited (dblclickedItem)
                if(dblclickedItem){ 
                    if(width <= imageSizeX){
                        element.style.width = width + 'px'
                    }
                    if(height <= imageSizeY){
                        element.style.height = height + 'px'
                    }
                }else{
                    if (width > minimum_size) {
                        element.style.width = width + 'px'
                    }
                    if (height > minimum_size) {
                        element.style.height = height + 'px'
                    }   
                }
            }
            else if (currentResizer.classList.contains('bottom-left')) {
                const height = original_height - (e.pageX - original_mouse_x)
                const width = original_width - (e.pageX - original_mouse_x)

                ///// image  
                if(selectedItem.children[0].classList.contains('image') && !dblclickedItem){
                    const newImageX = imageSizeX + (width - original_width)
                    const newImageY = imageSizeY + (height -   original_height)
                    
                        image.style.width = newImageX + 'px'
                        image.style.height = newImageY + 'px'
                    }
                //// image

                 //to ensure the boundary does not exceed the image size when it is edited (dblclickedItem)
                 if(dblclickedItem){ 
                    if(width <= imageSizeX){
                        element.style.width = width + 'px'
                    }
                    if(height <= imageSizeY){
                        element.style.height = height + 'px'
                    }
                }else{
                    if (height > minimum_size) {
                        element.style.height = height + 'px'
                        }
                    if (width > minimum_size) {
                        element.style.width = width + 'px'
                        element.style.left = original_x + (e.pageX - original_mouse_x) -drawingboard.getBoundingClientRect().x + 'px'
                    }
                }

                
            }
            else if (currentResizer.classList.contains('top-right')) {
                const width = original_width - (e.pageY - original_mouse_y)
                const height = original_height - (e.pageY - original_mouse_y)

                   ///// image  
                   if(selectedItem.children[0].classList.contains('image') && !dblclickedItem){
                    const newImageX = imageSizeX + (width - original_width)
                    const newImageY = imageSizeY + (height -   original_height)
                    
                        image.style.width = newImageX + 'px'
                        image.style.height = newImageY + 'px'
                    }
                    //// image
                    if(dblclickedItem){ 
                        if(width <= imageSizeX){
                            element.style.width = width + 'px'
                        }
                        if(height <= imageSizeY){
                            element.style.height = height + 'px'
                        }
                    }else{
                        if (width > minimum_size) {
                            element.style.width = width + 'px'
                        }
                        if (height > minimum_size) {
                            element.style.height = height + 'px'
                            element.style.top = original_y + (e.pageY - original_mouse_y) - drawingboard.getBoundingClientRect().y  + 'px'
                        }
                    }

            }
            else {
                const width = original_width - (e.pageX - original_mouse_x)
                const height = original_height - (e.pageY - original_mouse_y)

                ///// image  
                if(selectedItem.children[0].classList.contains('image') && !dblclickedItem){
                    const newImageX = imageSizeX + (width - original_width)
                    const newImageY = imageSizeY + (height -   original_height)
                    
                        image.style.width = newImageX + 'px'
                        image.style.height = newImageY + 'px'
                    }
                //// image
                
                if(dblclickedItem){ 
                    if(width <= imageSizeX){
                        element.style.width = width + 'px'
                    }
                    if(height <= imageSizeY){
                        element.style.height = height + 'px'
                    }
                }else{
                    if (width > minimum_size) {
                        element.style.width = width + 'px'
                        element.style.left = original_x + (e.pageX - original_mouse_x) - drawingboard.getBoundingClientRect().x + 'px'
                    }
                    if (height > minimum_size) {
                        element.style.height = height + 'px'
                        element.style.top = original_y + (e.pageY - original_mouse_y) - drawingboard.getBoundingClientRect().y + 'px'
                    }
                }

              
            }
         
    } 
      function stopResize() {
        window.removeEventListener('mousemove', resize)
      }
    }
  }
  
// MOVE shapes MOUSE EVENT 
function dragElement(elmnt) {
    
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.addEventListener('mousedown',dragMouseDown)
    // elmnt.onmousedown = dragMouseDown;
   
    function dragMouseDown(e) { 
        e.stopPropagation()
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) { 
        if(!isResizing){
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }
    }

    function closeDragElement() { 
        isResizing = false
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
     
}

// passing all the element in the resize and drag function
function addDragToShape(){
    for (let i = 0; i < drawingboard.children.length; i++) {
        makeResizableDiv('#' + drawingboard.children[i].getAttribute('id'));
        dragElement(drawingboard.children[i])
    }
    
    let shape = document.getElementsByClassName('shape') 
    for (let i = 0; i < drawingboard.children.length; i++) {
        touchMakeResizableDiv('#' + drawingboard.children[i].getAttribute('id'));
        touchDragMove(shape[i])
    }
}


let dblclickedItem =null
// give selected shape a blue boundary
function selected(){ 
    let shapes = Object.entries(document.getElementsByClassName('shape'))
    
    shapes.forEach((item)=>{
        item[1].addEventListener('click',(e)=>{ 
            e.stopPropagation()
            if(item[1]==dblclickedItem){
                return 
            }
            if(selectedItem){
                selectedItem.classList.remove('selected') 
                item[1].classList.add('selected')
                selectedItem = item[1]   
               
            }if(dblclickedItem && selectedItem!==dblclickedItem){  
                    dblclickedItem.classList.remove('dblclicked')
                    item[1].classList.add('selected')
                    selectedItem = item[1]      
                let image = dblclickedItem.children[0].children[0].children[0]
                // pointer events to none
                dblclickedItem.children[0].children[0].style.overflow = 'hidden'
                image.style.pointerEvents = 'none'
                image.style.zIndex = 'auto'
                dblclickedItem = null
            }
            else{ 
                item[1].classList.add('selected')
                selectedItem = item[1]
            } 
        })
 
            item[1].addEventListener('dblclick',(e)=>{  
                if(item[1].children[0].classList.contains('image')){
                    
                    dblclickedItem = item[1]
                    dblclickedItem.classList.add('dblclicked')
                    dblclickedItem.classList.remove('selected')
     
                    let image = item[1].children[0].children[0].children[0];
                     
                    item[1].children[0].children[0].style.overflow = 'visible'
                    
                    image.style.pointerEvents = 'auto' 
                    dragCropImage(image)
                    let sizes = image.getBoundingClientRect()
                    image.style.width = sizes.width + 'px'
                    image.style.height = sizes.height + 'px'  
                }   
            })
       
    })

    drawingboard.onclick = function(){
        if(selectedItem){
            selectedItem.classList.remove('selected')
            selectedItem = ''
        }
        if(dblclickedItem){
            dblclickedItem.classList.remove('dblclicked');
            dblclickedItem.children[0].children[0].removeEventListener('click', function(){
                dragElement(item[1].children[0].children[0].children[0]) 
            })   
            dblclickedItem.classList.remove('selected')
            let image = dblclickedItem.children[0].children[0].children[0]; 

            dblclickedItem.children[0].children[0].style.overflow = 'hidden'
            image.style.zIndex = 'auto'
            // pointer events to none
            image.style.pointerEvents = 'none'   
            dblclickedItem = null
        }
    }

  
}

selected()

// Touch Events

/*Make resizable div by Hung Nguyen*/
// Resize Shape
function touchDragMove(obj){
    let shiftX, shiftY
    obj.addEventListener('touchstart',touchStart)

    function touchStart(event){
        let item = event.target
        var touch = event.targetTouches[0];
        shiftX = touch.pageX - item.getBoundingClientRect().x
        shiftY = touch.pageY - item.getBoundingClientRect().y + drawingboard.getBoundingClientRect().y
        obj.addEventListener('touchmove', touchMove , false);
    }
    function touchMove(event){
        if(!isResizing){ 
            var touch = event.targetTouches[0];
            obj.style.left = touch.pageX - shiftX + 'px';
            obj.style.top = touch.pageY - shiftY + 'px'; 
        }
    }
    obj.addEventListener('touchend',function(){
        obj.removeEventListener('touchmove', touchMove , false);
        obj.addEventListener('touchmove', touchMove , false);
        isResizing = false
    })
    // drawingboardDrag(drawingboard)
}
 


function touchMakeResizableDiv(div) {
    const element = document.querySelector(div);
    const resizers = document.querySelectorAll(div + ' .resizer')
    const minimum_size = 20;
    let original_width = 0;
    let original_height = 0;
    let original_x = 0;
    let original_y = 0;
    let original_mouse_x = 0;
    let original_mouse_y = 0;
    for (let i = 0;i < resizers.length; i++) {
      const currentResizer = resizers[i];
      currentResizer.addEventListener('touchstart', mousedown)
      function mousedown(e){  
        original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
        original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
        original_x = element.getBoundingClientRect().left;
        original_y = element.getBoundingClientRect().top;
        original_mouse_x = e.touches[0].pageX;
        original_mouse_y = e.touches[0].pageY; 
        currentResizer.addEventListener('touchstart',function(){
            isResizing = true 
            window.addEventListener('touchmove', resize)
            window.addEventListener('touchend', stopResize)
        })
      }
      
      function resize(e) {
            if (currentResizer.classList.contains('bottom-right')) {
                const width = original_width + (e.touches[0].pageX - original_mouse_x);
                const height = original_height + (e.touches[0].pageY - original_mouse_y)
                if (width > minimum_size) {
                    element.style.width = width + 'px'
                }
                if (height > minimum_size) {
                    element.style.height = height + 'px'
                }
            }
            else if (currentResizer.classList.contains('bottom-left')) {
                const height = original_height + (e.touches[0].pageY - original_mouse_y)
                const width = original_width - (e.touches[0].pageX - original_mouse_x)
                if (height > minimum_size) {
                element.style.height = height + 'px'
                }
                if (width > minimum_size) {
                element.style.width = width + 'px'
                element.style.left = original_x + (e.touches[0].pageX - original_mouse_x) + 'px'
                }
            }
            else if (currentResizer.classList.contains('top-right')) {
                const width = original_width + (e.touches[0].pageX - original_mouse_x)
                const height = original_height - (e.touches[0].pageY - original_mouse_y)
                if (width > minimum_size) {
                    element.style.width = width + 'px'
                }
                if (height > minimum_size) {
                    element.style.height = height + 'px'
                    element.style.top = original_y + (e.touches[0].pageY - original_mouse_y) - drawingboard.getBoundingClientRect().y + 'px'
                }
            }
            else {
                const width = original_width - (e.touches[0].pageX - original_mouse_x)
                const height = original_height - (e.touches[0].pageY - original_mouse_y)
                if (width > minimum_size) {
                    element.style.width = width + 'px'
                    element.style.left = original_x + (e.touches[0].pageX - original_mouse_x) - drawingboard.getBoundingClientRect().x + 'px'
                }
                if (height > minimum_size) {
                    element.style.height = height + 'px'
                    element.style.top = original_y + (e.touches[0].pageY - original_mouse_y) - drawingboard.getBoundingClientRect().y +'px'
                }
        }
    } 
      function stopResize() {
        window.removeEventListener('touchmove', resize)
        isResizing = false
      }
    }
}


// ZOOM
// const zoomElement = document.querySelector(".drawingboard");
// let zoom = 1;
// const ZOOM_SPEED = 0.1;

// drawingboard.addEventListener("wheel", function (e) { 
//   if (e.deltaY > 0) {
//     zoomElement.style.transform = `scale(${(zoom += ZOOM_SPEED)})`;
//     scale = (zoom += ZOOM_SPEED).toFixed(1)
//     // console.log(scale);
//   } else {
//     zoomElement.style.transform = `scale(${(zoom -= ZOOM_SPEED)})`;
//     scale = (zoom -= ZOOM_SPEED).toFixed(1)
//   }
// });


 
// Drag DrawingBoard
function drawingboardDrag(obj)
{ 
		obj.adx = 0;
		obj.ady = 0;
	obj.onmousedown = function(e)
	{
		var rect = obj.getBoundingClientRect();
		obj.dx = rect.left - e.clientX;
		obj.dy = rect.top - e.clientY;
		obj.isDown = true; 
	}

	obj.onmouseup = function(e)
	{
		obj.isDown = false;
	}

	document.onmousemove = function(e)
	{
		if(obj && obj.isDown)
		{
            if(scale > 1){
                obj.style.left = (e.pageX)  - obj.adx + (obj.dx)*scale - outerContainer.offsetLeft    +"px" ; 
			    obj.style.top = (e.pageY) - obj.ady + obj.dy*scale - outerContainer.offsetTop    + "px";
            }else if(scale < 1){
                obj.style.left = e.pageX - (obj.adx - obj.dx + outerContainer.offsetLeft) + 12/scale   +"px";
			    obj.style.top = e.pageY - (obj.ady - obj.dy + outerContainer.offsetTop )  + 60/scale     + "px";
            }else{
                obj.style.left = e.pageX - (obj.adx - obj.dx + outerContainer.offsetLeft)  +"px";
			    obj.style.top = e.pageY - (obj.ady - obj.dy + outerContainer.offsetTop )    + "px";
            }
		}
	}
}


// drawingboard.addEventListener('mousedown',()=>drawingboardDrag(drawingboard))
 
dragElement(editor)
// ADD SHAPES
let addButton = document.querySelectorAll('.add-button')
addButton.forEach(element => {
    element.onclick=function(){
        let shapeName = element.getAttribute('id').slice(4);
        if(shapeName == 'circle' || shapeName == 'square'){
            addShapes(shapeName)
        } 
        addDragToShape()
    }
});



function addShapes(shapeName){
    let newShape = document.createElement('div')
    newShape.classList.add('shape')
    newShape.setAttribute('id',shapeName + new Date().getTime())
     
    let resizers = document.createElement('div');
    resizers.classList.add('resizers')
    resizers.classList.add(shapeName)
    
    let resizer1 = document.createElement('div');
    resizer1.classList.add('resizer')
    resizer1.classList.add('top-left')
    resizers.appendChild(resizer1)
    resizers.style.backgroundColor = colorPicker.value
    let resizer2 = document.createElement('div');
    resizer2.classList.add('resizer')
    resizer2.classList.add('top-right')
    resizers.appendChild(resizer2)

    let resizer3 = document.createElement('div');
    resizer3.classList.add('resizer')
    resizer3.classList.add('bottom-left')
    resizers.appendChild(resizer3)

    let resizer4 = document.createElement('div');
    resizer4.classList.add('resizer')
    resizer4.classList.add('bottom-right')
    resizers.appendChild(resizer4) 

    newShape.appendChild(resizers)
    drawingboard.appendChild(newShape)
    selected()
}

 
// let imgCrop = document.getElementById('img-Crop')
// imgCrop.onmousedown = function(){
//     imgCrop.style.position = 'absolute'
//     dragElement(imgCrop)
//     dragElement(imgCrop)
// }


 

// MOVE Images When it is edited
function dragCropImage(elmnt) {
    
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.addEventListener('mousedown',dragMouseDown)
    // elmnt.onmousedown = dragMouseDown;
   
    function dragMouseDown(e) { 
        e.stopPropagation()
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) { 
        if(!isResizing){
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            let parentPosition = dblclickedItem.getBoundingClientRect()

            let imagePosition = elmnt.getBoundingClientRect()
            
            if(parentPosition.width === imagePosition.width && parentPosition.height === imagePosition.height){
                return
            }else{
                 let dxWidth = imagePosition.width-  parentPosition.width 
                 let dxHeight = imagePosition.height - parentPosition.height
                //  console.log(elmnt.offsetLeft - pos1 ,dxWidth);
                //  console.log(dxWidth, dxHeight)
                //  console.log(elmnt.offsetLeft - pos1,elmnt.offsetTop - pos2);
                if((elmnt.offsetLeft - pos1) < 0 && (elmnt.offsetTop - pos2) < 0){
                    if( -dxWidth <= (elmnt.offsetLeft - pos1)){
                        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
                    }
                    if(-dxHeight <= (elmnt.offsetTop - pos2)){
                        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                    } 
                }else if(
                    (elmnt.offsetLeft - pos1) < 0 
                    && 
                    (elmnt.offsetTop - pos2) > 0
                    ){
                    if( dxWidth >= (elmnt.offsetLeft - pos1)){
                        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
                    }
                } 
                

            } 
            // elmnt.style.top = (elmnt.offsetTop - pos2) + "px";

            // elmnt.style.left = (elmnt.offsetLeft - pos1) + "px"; 

             
        }
    }

    function closeDragElement() { 
        isResizing = false
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
     
}