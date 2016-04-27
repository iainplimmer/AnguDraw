(function(){
    
    angular.module("AnguDraw", [])
        .controller("Main.Controller", function(){
            
            var self = this;
            
            //  Publically available functions
            self.DrawObjectOnCanvas = _drawObjectOnCanvas;
            self.AddNewRectangle = _addNewRectangle;
            self.AddNewCircle = _addNewCircle;
            
            // Let's make a reference to our canvas to refer to in this controller
            self.canvas = new fabric.Canvas('myCanvas');    
            
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
            function _addNewRectangle () {
                var rect = new fabric.Rect({
                    left: self.DropX,
                    top: self.DropY,
                    fill: self.CurrentSelectedColour,
                    width: 50,
                    height: 50,
                    lockScalingX: self,
                    lockScalingY: self,
                    lockRotation: self
                });
                self.DrawObjectOnCanvas(rect);
                
            };
            
            //  Function that allows a new circle to be drawn to the canvas
            function _addNewCircle () {
                var circle = new fabric.Circle({
                    radius: 25,
                    fill: self.CurrentSelectedColour,
                    left: self.DropX,
                    top: self.DropY
                });
                self.DrawObjectOnCanvas(circle);

            };
            
        });
})();


