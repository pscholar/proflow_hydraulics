/**
 * contains classes for computing flow characteristics for rectangular,
 * triangular and trapezoidal sections under rapid varied flow condition.
 */

class RectangularRVF extends UniformRectangular {
  answer = new Map();
  getAnswer() {
    return this.answer;
  }
  solverRVF(upstreamDepth, width, discharge) {
    let area = super.findAreaDW(upstreamDepth, width);
    let velocity = super.findVelocityQA(discharge, area);
    let topWidth1 = super.findTopWidth(upstreamDepth, width);

    let meanDepth1 = super.findMeanDepthAT(area, topWidth1);

    let froude1 = super.findFroudeVD(velocity, meanDepth1);
    if (froude1 < 1.0) {
      this.answer.set("Upstream Froude", froude1.toFixed(4) + "<1.0");
      this.answer.set("Error", "Hydraulic Jump cannot occur");
      return;
    }
    let jumpCategory = this.jumpClassifier(froude1);
    //let jumpLength =  this.jumpLength(upstreamDepth,froude1)
    let depthRatio = this.sequentDepthRatio(froude1);
    let downstreamDepth = upstreamDepth * depthRatio;
    let energyLoss = this.energyLoss(upstreamDepth, downstreamDepth);
    let area2 = super.findAreaDW(downstreamDepth, width);
    let velocity2 = super.findVelocityQA(discharge, area2);
    let topWidth2 = super.findTopWidth(downstreamDepth, width);
    let meanDepth2 = super.findMeanDepthAT(area2, topWidth2);
    let froude2 = super.findFroudeVD(velocity2, meanDepth2);
    this.answer.set("Upstream Velocity", velocity.toFixed(4));
    this.answer.set("DownStream Velocity", velocity2.toFixed(4));
    this.answer.set("Upstream Froude", froude1.toFixed(4));
    this.answer.set("Downstream Froude", froude2.toFixed(4));
    this.answer.set("DownStream Depth y2", downstreamDepth.toFixed(4));
    this.answer.set("depth ratio y2/y1", depthRatio.toFixed(4));
    this.answer.set("Head Loss", energyLoss.toFixed(4));
    this.answer.set("Jump Type", jumpCategory);
    //this.answer.set('Jump Length L',jumpLength.toFixed(4));
  }
  sequentDepthRatio(froude) {
    return 0.5 * (-1 + Math.sqrt(1 + 8 * froude * froude));
  }
  energyLoss(upstreamDepth, downstreamDepth) {
    return (
      Math.pow(downstreamDepth - upstreamDepth, 3) /
      (4 * upstreamDepth * downstreamDepth)
    );
  }
  fractEnerLoss() {
    return (
      Math.pow(-3 + Math.sqrt((1 + 8 * this.getFroude()) ^ 2), 3) /
      (8 *
        ((2 + this.getFroude()) ^ 2) *
        (-1 + Math.sqrt((1 + 8 * this.getFroude()) ^ 2)))
    );
  }
  jumpClassifier(froude) {
    if (froude > 1.0 && froude <= 1.7) return "UndularJump";
    if (froude > 1.7 && froude <= 2.5) return "WeakJump";
    if (froude > 2.5 && froude <= 4.5) return "Oscillating";
    if (froude > 4.5 && froude <= 9.0) return "SteadyJump";
    if (froude > 9.0) return "ChoppyJump";
  }

  jumpLength(upstreamDepth, froude) {
    return 220 * upstreamDepth * Math.tanh((froude - 1) / 22);
  }
  funcFroude(value) {
    let froude = this.getFroude();
    let estVal =
      Math.pow(-3 + Math.sqrt((1 + 8 * froude) ^ 2), 3) /
      (Math.pow(froude, 2 / 3) * (-1 + Math.sqrt((1 + 8 * froude) ^ 2)));
    while (estVal < value) {
      froude += 0.5;
      estVal =
        Math.pow(-3 + Math.sqrt((1 + 8 * froude) ^ 2), 3) /
        (Math.pow(froude, 2 / 3) * (-1 + Math.sqrt((1 + 8 * froude) ^ 2)));
    }
    let error = estVal - value;
    let absError = error;
    if (absError < 0) {
      absError *= -1;
    }

    while (absError > 0.05) {
      if (error < 0) {
        froude += 0.0002;
      } else {
        froude -= 0.0005;
      }
      estVal =
        Math.pow(-3 + Math.sqrt((1 + 8 * froude) ^ 2), 3) /
        (Math.pow(froude, 2 / 3) * (-1 + Math.sqrt((1 + 8 * froude) ^ 2)));
      error = estVal - value;
      absError = error;
      if (absError < 0) {
        absError *= -1;
      }
    }
    this.setFroude(froude);
  }
  calcInitialDepth(energyLoss, sequentRatio) {
    this.intialDepth =
      Math.pow(sequentRatio - 1, 3) / (4 * sequentRatio * energyLoss);
    return this.intialDepth;
  }

  specificForce(area, center, discharge) {
    return ((area * center + discharge) ^ 2) / (this.acceleration * area);
  }
  nonEnergyLoss(depthOne, depthTwo, discharge, areaOne, areaTwo) {
    return (
      depthOne -
      depthTwo +
      ((discharge ^ 2) / (this.acceleration * 2)) *
        (1 / (areaOne ^ 2) - 1 / (areaTwo ^ 2))
    );
  }
}

class TrapezoidRVF extends UniformTrapezoid {
  answer = new Map();
  getAnswer() {
    return this.answer;
  }
  constructor(con_1, con_2) {
    super(con_1, con_2);
  }

  solverRVF(bottomWidth, upstreamDepth, discharge) {
    let area1 = super.findAreaDW(upstreamDepth, bottomWidth);

    let top1 = super.findTopWidth(upstreamDepth, bottomWidth);

    let meanDepth1 = super.findMeanDepthAT(area1, top1);

    let velocity1 = super.findVelocityQA(discharge, area1);
    let froude1 = super.findFroudeVD(velocity1, meanDepth1);
    if (froude1 < 1.0) {
      this.answer.set("Upstream Froude", froude1.toFixed(4) + "<1.0");
      this.answer.set("Error", "Hydraulic Jump cannot occur");
      return;
    }
    let jumpCategory = this.jumpClassifier(froude1);
    let depthRatio = this.findDepthRatio(upstreamDepth, bottomWidth, discharge);
    let downstreamDepth = upstreamDepth * depthRatio;
    let area2 = super.findAreaDW(downstreamDepth, bottomWidth);
    let energyLoss = this.energyLoss(
      upstreamDepth,
      downstreamDepth,
      area1,
      area2,
      discharge
    );
    let velocity2 = super.findVelocityQA(discharge, area2);
    let topWidth2 = super.findTopWidth(downstreamDepth, bottomWidth);
    let meanDepth2 = super.findMeanDepthAT(area2, topWidth2);
    let froude2 = super.findFroudeVD(velocity2, meanDepth2);
    this.answer.set("Upstream Velocity", velocity1.toFixed(4));
    this.answer.set("Downstream Velocity", velocity2.toFixed(4));
    this.answer.set("Upstream Froude", froude1.toFixed(4));
    this.answer.set("Downstream Froude", froude2.toFixed(4));
    this.answer.set("DownStream Depth y2", downstreamDepth.toFixed(4));
    this.answer.set("depth ratio y2/y1", depthRatio.toFixed(4));
    this.answer.set("Head Loss", energyLoss.toFixed(4));
    this.answer.set("Jump Type", jumpCategory);
  }
  energyLoss(upstreamDepth, downstreamDepth, upArea, downArea, discharge) {
    let answer =
      upstreamDepth -
      downstreamDepth +
      ((discharge * discharge) / (2 * 9.81)) *
        (1 / (upArea * upArea) - 1 / (downArea * downArea));
    return answer;
  }
  findAYBar(width, depth) {
    return (
      ((depth * depth) / 6) *
      (3 * width + depth * Math.tan(this.con_1) + Math.tan(this.con_2))
    );
  }
  findYBar(width, depth) {
    let a =
      (1 / 6) *
      depth *
      depth *
      (3 * width + depth * (Math.tan(this.con_1) + Math.tan(this.con_2)));

    let b =
      0.5 * depth * depth * (Math.tan(this.con_1) + Math.tan(this.con_2)) +
      width * depth;
    return a / b;
  }
  findNF(width, depth, n) {
    let k = Math.tan(this.con_1) + Math.tan(this.con_2);
    let p1 =
      (n * n * (n * k + (3 * width) / depth)) / (k + (3 * width) / depth) - 1;
    let p2 =
      1 - (0.5 * k + width / depth) / (0.5 * n * n * k + (width * n) / depth);

    return p1 / p2;
  }
  findDepthRatio(upstreamDepth, width, discharge) {
    let topWidth1 = super.findTopWidth(upstreamDepth, width);
    let areaOne = super.findAreaDW(upstreamDepth, width);
    let velocityOne = super.findVelocityQA(discharge, areaOne);
    let meanDepth1 = super.findMeanDepthAT(areaOne, topWidth1);
    let froude1 = super.findFroudeVD(velocityOne, meanDepth1);
    let rhs =
      (froude1 * froude1 * (areaOne / topWidth1)) /
      this.findYBar(width, upstreamDepth);

    let n = 1.5;
    let estN = this.findNF(
      parseFloat(width),
      parseFloat(upstreamDepth),
      parseFloat(n)
    );
    while (estN < rhs) {
      n = n + 0.5;
      estN = this.findNF(width, upstreamDepth, n);
    }

    let error = estN - rhs;
    let absError = error;
    if (absError < 0) {
      absError *= -1;
    }
    while (absError > 0.0005) {
      if (error < 0) {
        n += Math.random();
      } else {
        n -= 0.000005;
      }
      estN = this.findNF(width, upstreamDepth, n);
      error = estN - rhs;
      absError = error;
      if (absError < 0) {
        absError *= -1;
      }
    }

    return n;
  }
  jumpClassifier(froude) {
    if (froude > 1.0 && froude <= 1.7) return "UndularJump";
    if (froude > 1.7 && froude <= 2.5) return "WeakJump";
    if (froude > 2.5 && froude <= 4.5) return "Oscillating";
    if (froude > 4.5 && froude <= 9.0) return "SteadyJump";
    if (froude > 9.0) return "ChoppyJump";
  }
  findSpecificForce(discharge, width, upstreamDepth) {
    let area = super.findAreaDW(upstreamDepth, width);
    let areaBar = this.findAYBar(width, depth);
    return (discharge * discharge) / (area * 9.81) + areaBar;
  }
}

class TriangularRVF extends UniformTriangular {
  constructor(con_1, con_2) {
    super(con_1, con_2);
  }
  energyLoss(upstreamDepth, downstreamDepth, upArea, downArea, discharge) {
    let answer =
      upstreamDepth -
      downstreamDepth +
      ((discharge * discharge) / (2 * 9.81)) *
        (1 / (upArea * upArea) - 1 / (downArea * downArea));
    return answer;
  }
  findAYBar(topwidth, depth) {
    return (
      ((depth * depth) / 6) *
      (3 * topwidth + depth * Math.tan(this.con_1) + Math.tan(this.con_2))
    );
  }
  findSpecificForce(discharge, width, upstreamDepth) {
    let area = super.findAreaDW(upstreamDepth, width);
    let areaBar = this.findAYBar(width, depth);
    return (discharge * discharge) / (area * 9.81) + areaBar;
  }
  findNF(n) {
    return ((n * n * n - 1) * (n * n)) / (n * n - 1);
  }
  findDepthRatio(discharge, upstreamDepth) {
    let m1 = Math.tan(this.con_1);
    let m2 = Math.tan(this.con_2);
    let y = Math.pow(upstreamDepth, 5);

    let rhs = (12 * discharge * discharge) / (9.81 * (m1 + m2) * (m1 + m2) * y);

    let n = 1.00001;
    let estN = this.findNF(n);
    while (estN < rhs) {
      n = n + 0.5;
      estN = this.findNF(n);
    }

    let error = estN - rhs;
    let absError = error;
    if (absError < 0) {
      absError *= -1;
    }
    while (absError > 0.0005) {
      if (error < 0) {
        n += Math.random();
      } else {
        n -= 0.000005;
      }
      estN = this.findNF(n);
      error = estN - rhs;
      absError = error;
      if (absError < 0) {
        absError *= -1;
      }
    }

    return n;
  }
  jumpClassifier(froude) {
    if (froude > 1.0 && froude <= 1.7) return "UndularJump";
    if (froude > 1.7 && froude <= 2.5) return "WeakJump";
    if (froude > 2.5 && froude <= 4.5) return "Oscillating";
    if (froude > 4.5 && froude <= 9.0) return "SteadyJump";
    if (froude > 9.0) return "ChoppyJump";
  }
  answer = new Map();
  getAnswer() {
    return this.answer;
  }
  solverRVF(upstreamDepth, width, discharge) {
    let area = super.findAreaDW(upstreamDepth, width);
    let velocity = super.findVelocityQA(discharge, area);
    let topWidth1 = super.findTopWidth(upstreamDepth, width);

    let meanDepth1 = super.findMeanDepthAT(area, topWidth1);

    let froude1 = super.findFroudeVD(velocity, meanDepth1);
    if (froude1 < 1.0) {
      this.answer.set("Upstream Froude", froude1.toFixed(4) + "<1.0");
      this.answer.set("Error", "Hydraulic Jump cannot occur");
      return;
    }
    let jumpCategory = this.jumpClassifier(froude1);
    let depthRatio = this.findDepthRatio(discharge, upstreamDepth);
    let downstreamDepth = upstreamDepth * depthRatio;
    let area2 = super.findAreaDW(downstreamDepth, width);
    let energyLoss = this.energyLoss(
      upstreamDepth,
      downstreamDepth,
      area,
      area2,
      discharge
    );
    let velocity2 = super.findVelocityQA(discharge, area2);
    let topWidth2 = super.findTopWidth(downstreamDepth, width);
    let meanDepth2 = super.findMeanDepthAT(area2, topWidth2);
    let froude2 = super.findFroudeVD(velocity2, meanDepth2);
    this.answer.set("Upstream Velocity", velocity.toFixed(4));
    this.answer.set("DownStream Velocity", velocity2.toFixed(4));
    this.answer.set("Upstream Froude", froude1.toFixed(4));
    this.answer.set("Downstream Froude", froude2.toFixed(4));
    this.answer.set("DownStream Depth y2", downstreamDepth.toFixed(4));
    this.answer.set("depth ratio y2/y1", depthRatio.toFixed(4));
    this.answer.set("Head Loss", energyLoss.toFixed(4));
    this.answer.set("Jump Type", jumpCategory);
  }
}
