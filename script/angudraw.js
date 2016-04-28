(function(){
    
    angular.module("AnguDraw", [])
        .controller("Main.Controller", function(){
            
            var self = this;

            //  Publically available functions           
            this.AddNewRectangle = _addNewRectangle;
            this.AddNewCircle = _addNewCircle;
            this.SaveItems = _saveItems;
            this.ClearAllItems = _clearAllItems;
            this.ReloadSavedItems = _reloadSavedItems;
            this.ToggleDrawingMode = _toggleFreeDrawing;
            
            // Let's make a reference to our canvas to refer to in this controller and set some default values
            self.canvas = new fabric.Canvas('myCanvas'); 
            self.ItemsOnCanvas = [];            
            self.canvas.freeDrawingBrush.color = 'red';
            self.canvas.isDrawingMode = true;
            
            //  And also set some properties that we can use locally    
            self.DropX = 1;
            self.DropY = 1;
            self.Width = 500;
            self.Height = 500;
                    
            //  Manage the colours here
            self.CurrentSelectedColour = 'red';
            self.SetColour = function(val){
                self.CurrentSelectedColour = val;
                self.canvas.freeDrawingBrush.color = val;
            };
            
            function _toggleFreeDrawing () {             
                self.canvas.isDrawingMode = !self.canvas.isDrawingMode;
            }
            
            function _saveItems () {
                var objs = self.canvas.getObjects();              
                self.ItemsOnCanvas = JSON.parse(JSON.stringify(objs))   
                console.log(self.ItemsOnCanvas);     
            }
            
            function _reloadSavedItems () {
               self.canvas.clear();
               self.canvas.isDrawingMode = true;
               self.ItemsOnCanvas.map(function(o) {
                    //  TO DO ! Each item we can redraw onto the canvas here :)
                    console.log(o);
                    if (o.type == 'rect') {
                        _addNewRectangle(o.left, o.top, o.fill, o.width, o.height);
                    }
                    else if (o.type == 'circle') {
                        _addNewCircle(o.radius, o.fill, o.left, o.top);
                    }
                    else if (o.type == 'path') {
                        _addFreeDraw(o.path, o.stroke);
                    }                  
               });
            }
            
            function _clearAllItems () {
                self.canvas.clear();
            }
            
            //  When reloading any free hand drawing to the cnavas, we use this
            function _addFreeDraw(path, stroke) {
                var path = new fabric.Path(path, {
                    stroke: stroke, 
                    fill: false
                });
                _drawObjectOnCanvas(path);    
            }
            
            //  Manage adding to the canvas and the drop point, primitive but it works for this test!
            function _drawObjectOnCanvas (drawnObject) { 
                self.canvas.isDrawingMode = false;             
                self.canvas.add(drawnObject);                 
                if ((self.DropX < self.Width/2) || (self.DropY < self.Height/2)){
                    self.DropX +=10;
                    self.DropY +=10;
                }
                else {
                    self.DropX = 1;
                    self.DropY = 1;
                }
            };
            
            //  Function that allows a new rectangle to be added to the canvas
            function _addNewRectangle (left, top, fill, width, height) {
                var rect = new fabric.Rect({
                    left: (left ? left : self.DropX),
                    top: (top ? top : self.DropY),
                    fill: (fill ? fill : self.CurrentSelectedColour),
                    width: (width ? width : 50),
                    height: (height ? height : 50),
                    lockScalingX: true,
                    lockScalingY: true,
                    lockRotation: true
                });
                _drawObjectOnCanvas(rect);             
            };
            
            //  Function that allows a new circle to be drawn to the canvas
            function _addNewCircle (radius, fill, left, top) {
                var circle = new fabric.Circle({
                    radius: (radius ? radius : 25),
                    fill: (fill ? fill : self.CurrentSelectedColour),
                    left: (left ? left : self.DropX),
                    top: (top ? top : self.DropY),
                    lockScalingX: true,
                    lockScalingY: true,
                    lockRotation: true
                });                
                _drawObjectOnCanvas(circle);

            };
            
        });
})();


