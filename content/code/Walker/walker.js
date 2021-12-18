function Walker(){
	this.pos = createVector(random(width), random(height));

	this.step = function(mode, dir){
		let oldDir;

		switch (dir) {
			case 0:
				if(oldDir == 2 && mode == 'noRetreat') break;
				this.pos.x++; //right
				break;
			case 1:
				if(oldDir == 3 && mode == 'noRetreat') break;
				this.pos.y++; //down
				break;
			case 2:
				if(oldDir == 0 && mode == 'noRetreat') break;
				this.pos.x--; //left
				break;
			case 3:
				if(oldDir == 1 && mode == 'noRetreat') break;
				this.pos.y--; //up
				break;
		}

		oldDir = dir;
	}

	this.edges = function(){
		if(this.pos.x > width) this.pos.x = 0;
		if(this.pos.y > height) this.pos.y = 0;
		if(this.pos.x < 0) this.pos.x = width;
		if(this.pos.y < 0) this.pos.y = height;
	}

	this.show = function(img){
		let pix = lightness(img.get(floor(this.pos.x), floor(this.pos.y)));
		
		strokeWeight(map(pix, 0, 255, 1, 20));
		stroke(pix + 50, pix);//map(pix, 0, 255, 10, 100));
		point(this.pos.x, this.pos.y);
	}
}