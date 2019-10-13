export default class Grid {
    constructor(gridSize, maxGrid) {
        this.gridSize = gridSize;
        this.xMax = maxGrid.x;
        this.yMax = maxGrid.y;

        this.lineHalfWidth = 1;
    }

    draw(ctx) {
        ctx.fillStyle = "#03f";
        for (let x = 0; x <= this.xMax; x++) {
            ctx.fillRect(
                x * this.gridSize - this.lineHalfWidth,
                0 - this.lineHalfWidth,
                2 * this.lineHalfWidth,
                this.yMax * this.gridSize + 2 * this.lineHalfWidth
            );
        }

        for (let y = 0; y <= this.yMax; y++) {
            ctx.fillRect(
                0 - this.lineHalfWidth,
                y * this.gridSize - this.lineHalfWidth,
                this.xMax * this.gridSize + 2 * this.lineHalfWidth,
                2 * this.lineHalfWidth
            );
        }
    }
}
