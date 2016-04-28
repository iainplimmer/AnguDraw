(function(){
    
    angular.module("AnguDraw", [])
        .controller("Main.Controller", function(){
            
            var self = this;

            //  Publically available functions
            this.DrawObjectOnCanvas = _drawObjectOnCanvas;
            this.AddNewRectangle = _addNewRectangle;
            this.AddNewCircle = _addNewCircle;
            this.SaveItems = _saveItems;
            this.ClearAllItems = _clearAllItems;
            this.ReloadSavedItems = _reloadSavedItems;
            
            // Let's make a reference to our canvas to refer to in this controller
            self.canvas = new fabric.Canvas('myCanvas'); 
            self.ItemsOnCanvas = [];   
            
            //  And also set some properties that we can use locally    
            self.DropX = 1;
            self.DropY = 1;
            self.Width = 500;
            self.Height = 500;
            
            //  Manage the colours here
            self.CurrentSelectedColour = 'red';
            self.SetColour = function(colour){
                console.log('current selected colour:', colour)
                self.CurrentSelectedColour = colour;
            };
            
            function _saveItems () {
                var objs = this.canvas.getObjects();              
                self.ItemsOnCanvas = JSON.parse(JSON.stringify(objs))        
            }
            
            function _reloadSavedItems () {
               this.canvas.clear();
               self.ItemsOnCanvas.map(function(o) {
                    //  TO DO ! Each item we can redraw onto the canvas here :)
                    console.log(o);
                    if (o.type == 'rect'){
                        _addNewRectangle(o.left, o.top, o.fill, o.width, o.height);
                    }
                    else if (o.type == 'circle'){
                        _addNewCircle(o.radius, o.fill, o.left, o.top);
                    }
                    
               });
            }
            
            function _clearAllItems () {
                this.canvas.clear();
            }
            
            //  Mange adding to the canvas and the drop point, primitive but it works for this test!
            function _drawObjectOnCanvas (drawnObject) {              
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
                console.log(rect);
                self.DrawObjectOnCanvas(rect);             
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
                
                self.DrawObjectOnCanvas(circle);

            };
            
        });
})();


