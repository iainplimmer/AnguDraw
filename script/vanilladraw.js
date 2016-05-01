            var VanillaDraw = (function(){   
                 
                //  Setup some default values that we can use in the module
                var self = this.
                self.canvas = {};           
                self.DropDefault_X = 1;
                self.DropDefault_Y = 1;   
                self.CurrentSelectedColour = 'red';
                
                //  When the document has loaded, let's new up our canvas object
                function Init(name, height, width) {        
                    
                    if(name == undefined || width == null || height == null ){
                        console.error('invalid config on the canvas')
                    }
                    else {
                        self.canvas = new fabric.Canvas(name);   
                        self.canvas.isDrawingMode = true;          
                        self.canvas.setHeight(height);
                        self.canvas.setWidth(width);  
                    }
    
                };
                
                //  Function that is used to create a square
                function MakeSquare(left,top,fill,width,height) {
                     var rect = new fabric.Rect({
                        left: (left ? left : self.DropDefault_X),
                        top: (top ? top : self.DropDefault_Y),
                        fill: (fill ? fill : self.CurrentSelectedColour),
                        width: (width ? width : 50),
                        height: (height ? height : 50),
                        lockScalingX: true,
                        lockScalingY: true,
                        lockRotation: true
                    });
                    AddShapeToCanvas(rect);
                };
                
                //  Function that is used to create a circle
                function MakeCircle (radius, fill, left, top) {
                var circle = new fabric.Circle({
                        radius: (radius ? radius : 25),
                        fill: (fill ? fill : self.CurrentSelectedColour),
                        left: (left ? left : self.DropDefault_X),
                        top: (top ? top : self.DropDefault_Y),
                        lockScalingX: true,
                        lockScalingY: true,
                        lockRotation: true
                    });                
                    AddShapeToCanvas(circle);
                };
                
                //  Adds any shape to the canvas
                function AddShapeToCanvas(shape){
                    self.canvas.add(shape);
                    self.DropDefault_X +=10;
                    self.DropDefault_Y +=10;   
                    self.canvas.isDrawingMode = false;      
                };
                
                //  Turn on and off the drawing mode
                function ToggleDraw(){
                    self.canvas.isDrawingMode = !self.canvas.isDrawingMode;
                };
                
                //  Clear the canvas
                function ClearCanvas () {
                    self.canvas.clear();
                }
                
                //  Revealing module pattern reveals the functions that are available on the module
                return {
                    MakeSquare:MakeSquare,
                    MakeCircle:MakeCircle,
                    ToggleDraw:ToggleDraw,
                    ClearCanvas:ClearCanvas,
                    Init:Init
                }             
            })();