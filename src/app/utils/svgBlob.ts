export interface BlobStyles {
  color: string;
}

export class SVGBlob {
  public pathD: string;
  private pathCoordinates: Array<{ x: number; y: number }>;
  private styles;
  private vertixCountFactor = 1;
  private radius;
  private angle = 0;
  private centerX;
  private centerY;

  constructor(width: number, height: number, styles: BlobStyles) {
    this.styles = styles;
    this.centerX = width / 2;
    this.centerY = height / 2;
    this.radius = (width > height ? height / 2 : width / 2) - 10;
  }

  private generateCoords = () => {
    for (let i = 0; i < 2 * Math.PI; i += this.vertixCountFactor) {
      let x =
        this.radius * Math.cos(i) +
        this.centerX +
        this.getRandomRadiusModifier();
      let y =
        this.radius * Math.sin(i) +
        this.centerY +
        this.getRandomRadiusModifier();
      this.pathCoordinates.push({ x, y });
      if (i + this.vertixCountFactor >= 2 * Math.PI) {
        this.pathCoordinates.push(this.pathCoordinates[0]);
      }
    }
  };

  private drawLinearShape = () => {
    this.pathD = "M";
    this.pathCoordinates.forEach((coord) => {
      this.pathD += `${coord.x},${coord.y} `;
    });
  };

  private generateLinearShape = () => {
    this.resetPathData();
    this.generateCoords();
    this.drawLinearShape();
  };

  private getRandomRadiusModifier = () => {
    let num = Math.floor(Math.random() * 10) + 1;
    num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    return num;
  };

  private resetPathData = () => {
    this.pathD = "";
    this.pathCoordinates = [];
  };

  private catmullRom2bezier() {
    let d = "";
    this.pathCoordinates.forEach((coord, index, array) => {
      let p = [];
      if (index === 0) {
        d += `M${coord.x},${coord.y} `;
        p.push(array[array.length - 3]);
        p.push(array[index]);
        p.push(array[index + 1]);
        p.push(array[index + 2]);
      } else if (index === array.length - 2) {
        p.push(array[index - 1]);
        p.push(array[index]);
        p.push(array[index + 1]);
        p.push(array[0]);
      } else if (index === array.length - 1) {
        return;
      } else {
        p.push(array[index - 1]);
        p.push(array[index]);
        p.push(array[index + 1]);
        p.push(array[index + 2]);
      }
      let bp = [];
      bp.push({ x: p[1].x, y: p[1].y });
      bp.push({
        x: (-p[0].x + 6 * p[1].x + p[2].x) / 6,
        y: (-p[0].y + 6 * p[1].y + p[2].y) / 6,
      });
      bp.push({
        x: (p[1].x + 6 * p[2].x - p[3].x) / 6,
        y: (p[1].y + 6 * p[2].y - p[3].y) / 6,
      });
      bp.push({ x: p[2].x, y: p[2].y });
      d +=
        "C" +
        bp[1].x +
        "," +
        bp[1].y +
        " " +
        bp[2].x +
        "," +
        bp[2].y +
        " " +
        bp[3].x +
        "," +
        bp[3].y +
        " ";
    });

    return d;
  }

  private drawCurvyShape() {
    this.pathD = this.catmullRom2bezier();
  }

  public generateCurvyShape() {
    this.resetPathData();
    this.generateCoords();
    this.drawCurvyShape();
  }
}
