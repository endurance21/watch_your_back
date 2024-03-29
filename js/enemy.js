class Enemy extends Character {
    constructor(x = 0, y = 0, vx = 0, vy = 0, ax = 0, ay = 0) {
        
        super(x, y, vx, vy, ax, ay);

        this.normalPath = [];
        this.alertPath = [];
        this.isMoving = false;
        this.normalPathIndex = 1;
        this.alertIndex = 1;
        this.alerted = false;
        this.startEmiting();
    }

    displacement() {
        //console.log(this.alertIndex, this.alertPath);
        if (this.alerted) {
            
            if (this.alertIndex > (this.alertPath.length - 1)) {
                this.alertIndex = 1;
            }
            let dx = (this.alertPath[this.alertIndex][1] - this.alertPath[this.alertIndex - 1][1]);
            let dy = (this.alertPath[this.alertIndex][0] - this.alertPath[this.alertIndex - 1][0]);

            this.move(dx, dy);
            // console.log(dx, dy);
            this.alertIndex++;

        }
        else {
           
            if (this.normalPathIndex > (this.normalPath.length - 1)) {
                this.normalPathIndex = 1;
            }
            let dx = (this.normalPath[this.normalPathIndex][0] - this.normalPath[this.normalPathIndex - 1][0]);
            let dy = (this.normalPath[this.normalPathIndex][1] - this.normalPath[this.normalPathIndex - 1][1]);

            this.move(dx, dy);
            
            this.normalPathIndex++;``
        }



    }

    move(dx, dy) {



        this.x += dx * CELL_WIDTH;
        this.y += dy * CELL_WIDTH;
        this.upateCellPosition();


    }

    findNormalPath() {
        var x1 = this.normalPath[0];
        var y1 = this.normalPath[1];
        var x2 = this.normalPath[2];
        var y2 = this.normalPath[3];
        var x3 = x2;
        var y3 = y2;
        if (x1 < x2) {
            x3 = x1;
        }
        if (y1 < y2) {
            y3 = y1;
        }
       
        if (y1 == y2) {
            for (let index = 0; index < Math.abs(x2 - x1) + 1; index++) {
                this.normalPath[index] = [];
                
                this.normalPath[index][0] = x3;
                this.normalPath[index][1] = y1;
                x3++;
            }
            x3--;
            for (let index = Math.abs(x2 - x1) + 1; index < Math.abs(x2 - x1) * 2 + 1; index++) {
                this.normalPath[index] = [];
                
                x3--;
                this.normalPath[index][0] = x3;
                this.normalPath[index][1] = y1;
            }
        }

        if (x1 == x2) {
            for (let index = 0; index < Math.abs(y2 - y1) + 1; index++) {
                this.normalPath[index] = [];
                this.normalPath[index][0] = x1;
                this.normalPath[index][1] = y3;
                y3++;
            }
            y3--;
            for (let index = Math.abs(y2 - y1) + 1; index < Math.abs(y2 - y1) * 2 + 1; index++) {
                this.normalPath[index] = [];
                y3--;
                this.normalPath[index][0] = x1;
                this.normalPath[index][1] = y3;
            }
        }



    }
}