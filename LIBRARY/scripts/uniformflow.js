/**
 * contains classes for computing flow characteristics of rectangular,
 * triangular and trapezoidal sections, for uniform flows condition.
 */

class UniformRectangular {
  acceleration = 9.81;
  extraAns = new Map();
  greetUser(text) {}
  getExtraAnswer() {
    return this.extraAns;
  }
  findTopWidth(depth, width) {
    return width;
  }
  findMeanDepthAT(area, topwidth) {
    return area / topwidth;
  }
  findDischrageVA(velocity, area) {
    let answer = velocity * area;
    return answer;
  }
  findDischargeVBY(velocity, width, depth) {
    let area = this.findAreaDW(depth, width);
    let perimeter = this.findPerimeterWD(width, depth);
    let answer = this.findDischrageVA(velocity, area);
    let topwidth = this.findTopWidth(depth, width);
    let meanDepth = this.findMeanDepthAT(area, topwidth);
    let radius = this.findRadiusAP(area, perimeter);
    let froude = this.findFroudeVD(velocity, meanDepth);
    let specEnergy = this.findSpecificEnergyVD(velocity, depth);
    let criticalDepth = this.findCriticalDepthQ(answer, width);
    this.extraAns.set("Specific Energy", specEnergy.toFixed(3));
    this.extraAns.set("Critical Depth", criticalDepth.toFixed(3));
    let criticalE = this.findCriticalSpecificEnergy(criticalDepth);
    this.extraAns.set("Critical Specific Energy", criticalE.toFixed(3));
    this.extraAns.set("Froude", froude.toFixed(3));
    this.classifyFlow(froude);
    this.extraAns.set("Area", area.toFixed(3));
    this.extraAns.set("Perimeter", perimeter.toFixed(3));
    this.extraAns.set("Hydraulic Radius", radius.toFixed(3));
    this.extraAns.set("Top Width", topwidth.toFixed(3));
    this.extraAns.set("Mean Depth", meanDepth.toFixed(3));
    return answer;
  }
  findDischargeSNBY(slope, manning, width, depth) {
    let area = this.findAreaDW(depth, width);
    let perimeter = this.findPerimeterWD(width, depth);
    let radius = this.findRadiusAP(area, perimeter);
    let velocity = this.findVelocityMRS(manning, radius, slope);
    let answer = this.findDischrageVA(velocity, area);
    let topwidth = this.findTopWidth(depth, width);
    let meanDepth = this.findMeanDepthAT(area, topwidth);
    let froude = this.findFroudeVD(velocity, meanDepth);
    let specEnergy = this.findSpecificEnergyVD(velocity, depth);
    let criticalDepth = this.findCriticalDepthQ(answer, width);
    this.extraAns.set("Specific Energy", specEnergy.toFixed(3));
    this.extraAns.set("Critical Depth", criticalDepth.toFixed(3));
    let criticalE = this.findCriticalSpecificEnergy(criticalDepth);
    this.extraAns.set("Critical Specific Energy", criticalE.toFixed(3));
    this.extraAns.set("Froude", froude.toFixed(3));
    this.classifyFlow(froude);
    this.extraAns.set("Area", area.toFixed(3));
    this.extraAns.set("Perimeter", perimeter.toFixed(3));
    this.extraAns.set("Hydraulic Radius", radius.toFixed(3));
    this.extraAns.set("Top Width", topwidth.toFixed(3));
    this.extraAns.set("Mean Depth", meanDepth.toFixed(3));
    this.extraAns.set("Velocity", velocity.toFixed(3));
    return answer;
  }
  findDischargeRSNA(radius, slope, manning, area) {
    let velocity = this.findVelocityMRS(manning, radius, slope);
    let answer = this.findDischrageVA(velocity, area);
    let perimeter = area / radius;
    this.extraAns.set("Perimeter", perimeter.toFixed(3));
    this.extraAns.set("Velocity", velocity.toFixed(3));
    return answer;
  }
  findFroudeVD(velocity, depth) {
    let froude = velocity / Math.sqrt(this.acceleration * depth);
    return froude;
  }
  findFroudeSNBY(slope, manning, width, depth) {
    this.findDischargeSNBY(slope, manning, width, depth);
    let area = this.findAreaDW(depth, width);
    let topwidth = this.findTopWidth(depth, width);
    let meanDepth = this.findMeanDepthAT(area, topwidth);
    let perimeter = this.findPerimeterWD(width, depth);
    let radius = this.findRadiusAP(area, perimeter);
    let velocity = this.findVelocityMRS(manning, radius, slope);
    let froude = velocity / Math.sqrt(this.acceleration * meanDepth);
    return froude;
  }
  findReynoldVRU(velocity, radius, mew) {
    return (velocity * radius) / mew;
  }
  findReynoldVYBU(velocity, depth, width, mew) {
    let area = this.findAreaDW(depth, width);
    let perimeter = this.findPerimeterWD(width, depth);
    let radius = this.findRadiusAP(area, perimeter);
    let discharge = this.findDischrageVA(velocity, area);
    let topwidth = this.findTopWidth(depth, width);
    let meanDepth = this.findMeanDepthAT(area, topwidth);
    let froude = this.findFroudeVD(velocity, meanDepth);
    let specEnergy = this.findSpecificEnergyVD(velocity, depth);
    let answer = (velocity * radius) / mew;
    let criticalDepth = this.findCriticalDepthQ(discharge, width);
    this.classifyReynold(answer);
    this.extraAns.set("Specific Energy", specEnergy.toFixed(3));
    this.extraAns.set("Critical Depth", criticalDepth.toFixed(3));
    let criticalE = this.findCriticalSpecificEnergy(criticalDepth);
    this.extraAns.set("Critical Specific Energy", criticalE.toFixed(3));
    this.extraAns.set("Froude", froude.toFixed(3));
    this.classifyFlow(froude);
    this.extraAns.set("discharge", discharge.toFixed(3));
    this.extraAns.set("Area", area.toFixed(3));
    this.extraAns.set("Perimeter", perimeter.toFixed(3));
    this.extraAns.set("Top Width", topwidth.toFixed(3));
    this.extraAns.set("Mean Depth", meanDepth.toFixed(3));
    this.extraAns.set("Hydraulic Radius", radius.toFixed(3));
    return answer;
  }
  classifyReynold(R) {
    if (R < 2000) {
      this.extraAns.set("Flow type", "Laminar");
    } else if (R > 4000) {
      this.extraAns.set("Flow type", "Turbulent");
    }
  }
  findVelocityMRS(manning, radius, slope) {
    let velocity =
      (1 / manning) * Math.pow(slope, 0.5) * Math.pow(radius, 2 / 3);
    return velocity;
  }
  findVelocityQA(discharge, area) {
    return discharge / area;
  }
  findVelocitySNBY(slope, manning, width, depth) {
    let area = this.findAreaDW(depth, width);
    let perimeter = this.findPerimeterWD(width, depth);
    let radius = this.findRadiusAP(area, perimeter);
    this.extraAns.set("Area", area.toFixed(3));
    this.extraAns.set("Perimeter", perimeter.toFixed(3));
    this.extraAns.set("Hydraulic Radius", radius.toFixed(3));
    let velocity = this.findVelocityMRS(manning, radius, slope);
    return velocity;
  }
  findVelocityFY(froude, depth) {
    let acceleration = 9.81;
    return froude * Math.sqrt(acceleration * depth);
  }
  findDepthFV(froude, velocity) {
    let acceleration = 9.81;
    return Math.pow(velocity / (froude * Math.sqrt(acceleration)), 2);
  }
  findDepthAB(area, width) {
    return area / width;
  }
  findDepthVBQ(velocity, width, discharge) {
    return discharge / (velocity * width);
  }
  findDepthQWNS(discharge, width, manning, slope) {
    let depth = 0;
    let area = this.findAreaDW(depth, width);

    let perimeter = this.findPerimeterWD(width, depth);

    let radius = this.findRadiusAP(area, perimeter);
    let velocity = this.findVelocityMRS(manning, radius, slope);
    let estDischarge = this.findDischrageVA(velocity, area);
    while (estDischarge < discharge) {
      depth += 1;
      area = this.findAreaDW(depth, width);
      perimeter = this.findPerimeterWD(width, depth);
      radius = this.findRadiusAP(area, perimeter);
      velocity = this.findVelocityMRS(manning, radius, slope);
      estDischarge = this.findDischrageVA(velocity, area);
    }

    let error = estDischarge - discharge;
    let absError = error;
    if (absError < 0) absError *= -1;

    while (absError > 0.005) {
      if (error < 0) depth += 0.0000015;
      if (error > 0) depth -= 0.0000025;
      area = this.findAreaDW(depth, width);
      perimeter = this.findPerimeterWD(width, depth);
      radius = this.findRadiusAP(area, perimeter);
      velocity = this.findVelocityMRS(manning, radius, slope);
      estDischarge = this.findDischrageVA(velocity, area);
      error = estDischarge - discharge;
      absError = error;
      if (absError < 0) absError *= -1;
    }
    let froude = this.findFroudeVD(velocity, depth);
    let specEnergy = this.findSpecificEnergyVD(velocity, depth);
    let criticalDepth = this.findCriticalDepthQ(discharge, width);
    this.extraAns.set("Specific Energy", specEnergy.toFixed(3));
    this.extraAns.set("Critical Depth", criticalDepth.toFixed(3));
    let criticalE = this.findCriticalSpecificEnergy(criticalDepth);
    this.extraAns.set("Critical Specific Energy", criticalE.toFixed(3));
    this.extraAns.set("Froude", froude.toFixed(3));
    this.classifyFlow(froude);
    this.extraAns.set("Area", area.toFixed(3));
    this.extraAns.set("Perimeter", perimeter.toFixed(3));
    this.extraAns.set("Hydraulic Radius", radius.toFixed(3));
    this.extraAns.set("Velocity", velocity.toFixed(3));
    return depth;
  }
  classifyFlow(froude) {
    if (froude === 1) {
      this.extraAns.set("Flow Regime", "critical");
    } else if (froude > 1) {
      this.extraAns.set("Flow Regime", "supercritical");
    } else {
      this.extraAns.set("Flow Regime", "subcritical");
    }
  }
  findAreaDW(depth, width) {
    return depth * width;
  }

  findMannningVRS(velocity, radius, slope) {
    let manning = (Math.pow(slope, 1 / 2) * Math.pow(radius, 2 / 3)) / velocity;
    return manning;
  }
  findRadiusAP(area, perimeter) {
    return area / perimeter;
  }
  findRadiusVNS(velocity, manning, slope) {
    return velocity * manning * (1 / Math.pow(slope, 1 / 2));
  }
  findPerimeterWD(width, depth) {
    return width + 2 * depth;
  }

  findbedSlopeVRM(velocity, radius, manning) {
    let slope = velocity * manning * (1 / Math.pow(radius, 2 / 3));
    this.setBedSlope(slope);
    return slope;
  }
  findSpecificEnergyVD(velocity, depth) {
    return depth + (velocity * velocity) / (2 * 9.81);
  }
  findCriticalDepthQ(discharge, width) {
    return Math.pow((discharge * discharge) / (9.81 * width * width), 1 / 3);
  }
  findCriticalSpecificEnergy(criticalDepth) {
    return (3 / 2) * criticalDepth;
  }
  findPlotEnergy(width, discharge, depth) {
    return (
      depth +
      (discharge * discharge) / (2 * 9.81 * width * width * depth * depth)
    );
  }
}
class UniformTriangular {
  acceleration = 9.81;
  extraAns = new Map();
  getExtraAnswer() {
    return this.extraAns;
  }

  con_1 = 0;
  con_2 = 0;
  constructor(con_1, con_2) {
    this.con_1 = con_1;
    this.con_2 = con_2;
  }
  findAreaDW(depth, width) {
    return (
      0.5 * (depth * depth) * (Math.tan(this.con_1) + Math.tan(this.con_2))
    );
  }
  findPerimeterWD(width, depth) {
    return (
      depth * (1 / Math.cos(this.con_1) + 1 / Math.cos(this.con_2)) + width
    );
  }
  findTopWidth(depth) {
    return depth * (Math.tan(this.con_1) + Math.tan(this.con_2));
  }
  findMeanDepthAT(area, topwidth) {
    return area / topwidth;
  }
  findDischrageVA(velocity, area) {
    let answer = velocity * area;
    return answer;
  }
  findDischargeVBY(velocity, width, depth) {
    let area = this.findAreaDW(depth, width);
    let perimeter = this.findPerimeterWD(width, depth);
    let radius = this.findRadiusAP(area, perimeter);
    let answer = this.findDischrageVA(velocity, area);
    let topwidth = this.findTopWidth(depth);
    let meanDepth = this.findMeanDepthAT(area, topwidth);
    let froude = this.findFroudeVD(velocity, meanDepth);
    let specEnergy = this.findSpecificEnergyVD(velocity, depth);
    let criticalDepth = this.findCriticalDepthQ(answer);
    this.extraAns.set("Specific Energy", specEnergy.toFixed(3));
    this.extraAns.set("Critical Depth", criticalDepth.toFixed(3));
    this.extraAns.set("Froude", froude.toFixed(3));
    this.classifyFlow(froude);
    this.extraAns.set("Area", area.toFixed(3));
    this.extraAns.set("Perimeter", perimeter.toFixed(3));
    this.extraAns.set("Hydraulic Radius", radius.toFixed(3));
    this.extraAns.set("Top Width", topwidth.toFixed(3));
    this.extraAns.set("Mean Depth", meanDepth.toFixed(3));
    return answer;
  }
  findDischargeSNBY(slope, manning, width, depth) {
    let area = this.findAreaDW(depth, width);
    let perimeter = this.findPerimeterWD(width, depth);
    let radius = this.findRadiusAP(area, perimeter);
    let velocity = this.findVelocityMRS(manning, radius, slope);
    let answer = this.findDischrageVA(velocity, area);
    let topwidth = this.findTopWidth(depth);
    let meanDepth = this.findMeanDepthAT(area, topwidth);
    let froude = this.findFroudeVD(velocity, meanDepth);
    let specEnergy = this.findSpecificEnergyVD(velocity, depth);
    let criticalDepth = this.findCriticalDepthQ(answer);
    this.extraAns.set("Specific Energy", specEnergy.toFixed(3));
    this.extraAns.set("Critical Depth", criticalDepth.toFixed(3));
    let criticalE = this.findCriticalSpecificEnergy(criticalDepth);
    this.extraAns.set("Critical Specific Energy", criticalE.toFixed(3));
    this.extraAns.set("Froude", froude.toFixed(3));
    this.classifyFlow(froude);
    this.extraAns.set("Area", area.toFixed(3));
    this.extraAns.set("Perimeter", perimeter.toFixed(3));
    this.extraAns.set("Top Width", topwidth.toFixed(3));
    this.extraAns.set("Mean Depth", meanDepth.toFixed(3));
    this.extraAns.set("Hydraulic Radius", radius.toFixed(3));
    this.extraAns.set("Velocity", velocity.toFixed(3));
    return answer;
  }
  findDischargeRSNA(radius, slope, manning, area) {
    let velocity = this.findVelocityMRS(manning, radius, slope);
    let answer = this.findDischrageVA(velocity, area);
    let perimeter = area / radius;
    let criticalDepth = this.findCriticalDepthQ(answer);
    this.extraAns.set("Critical Depth", criticalDepth.toFixed(3));
    let criticalE = this.findCriticalSpecificEnergy(criticalDepth);
    this.extraAns.set("Critical Specific Energy", criticalE.toFixed(3));
    this.extraAns.set("Perimeter", perimeter.toFixed(3));
    this.extraAns.set("Velocity", velocity.toFixed(3));

    return answer;
  }
  findFroudeVD2(velocity, depth) {
    let area = this.findAreaDW(depth, 0);
    let topwidth = this.findTopWidth(depth);
    let perimeter = this.findPerimeterWD(0, depth);
    let radius = this.findRadiusAP(area, perimeter);
    let discharge = velocity * area;
    let meanDepth = this.findMeanDepthAT(area, topwidth);
    let criticalDepth = this.findCriticalDepthQ(discharge);
    let specEnergy = this.findSpecificEnergyVD(velocity, depth);
    this.extraAns.set("Disharge", discharge.toFixed(3));
    this.extraAns.set("Specific Energy", specEnergy.toFixed(3));
    this.extraAns.set("Critical Depth", criticalDepth.toFixed(3));
    let criticalE = this.findCriticalSpecificEnergy(criticalDepth);
    this.extraAns.set("Critical Specific Energy", criticalE.toFixed(3));
    this.extraAns.set("Area", area.toFixed(3));
    this.extraAns.set("Perimeter", perimeter.toFixed(3));
    this.extraAns.set("Top Width", topwidth.toFixed(3));
    this.extraAns.set("Mean Depth", meanDepth.toFixed(3));
    this.extraAns.set("Hydraulic Radius", radius.toFixed(3));
    let froude = velocity / Math.sqrt(this.acceleration * meanDepth);
    return froude;
  }
  findFroudeVD(velocity, depth) {
    let froude = velocity / Math.sqrt(this.acceleration * depth);
    return froude;
  }
  findFroudeSNBY(slope, manning, width, depth) {
    this.findDischargeSNBY(slope, manning, width, depth);
    let area = this.findAreaDW(depth, width);
    let topwidth = this.findTopWidth(depth);
    let meanDepth = this.findMeanDepthAT(area, topwidth);
    let perimeter = this.findPerimeterWD(width, depth);
    let radius = this.findRadiusAP(area, perimeter);
    let velocity = this.findVelocityMRS(manning, radius, slope);
    let froude = velocity / Math.sqrt(this.acceleration * meanDepth);
    return froude;
  }
  findReynoldVRU(velocity, radius, mew) {
    let density = 1;
    return (density * velocity * radius) / mew;
  }
  findReynoldVYBU(velocity, depth, width, mew) {
    let area = this.findAreaDW(depth, width);
    let perimeter = this.findPerimeterWD(width, depth);
    let radius = this.findRadiusAP(area, perimeter);

    this.extraAns.set("Area", area.toFixed(3));
    this.extraAns.set("Perimeter", perimeter.toFixed(3));
    this.extraAns.set("Hydraulic Radius", radius.toFixed(3));
    let density = 1;
    return (density * velocity * radius) / mew;
  }
  findVelocityMRS(manning, radius, slope) {
    let velocity =
      (1 / manning) * Math.pow(slope, 0.5) * Math.pow(radius, 2 / 3);

    return velocity;
  }
  findVelocityQA(discharge, area) {
    return discharge / area;
  }
  findVelocitySNBY(slope, manning, width, depth) {
    let area = this.findAreaDW(depth, width);
    let perimeter = this.findPerimeterWD(width, depth);
    let radius = this.findRadiusAP(area, perimeter);
    this.extraAns.set("Area", area.toFixed(3));
    this.extraAns.set("Perimeter", perimeter.toFixed(3));
    this.extraAns.set("Hydraulic Radius", radius.toFixed(3));
    let velocity = this.findVelocityMRS(manning, radius, slope);
    return velocity;
  }
  findVelocityFY(froude, depth) {
    let acceleration = 9.81;
    let area = this.findAreaDW(depth, 0);
    let topwidth = this.findTopWidth(depth);
    let perimeter = this.findPerimeterWD(0, depth);
    let radius = this.findRadiusAP(area, perimeter);
    let meanDepth = this.findMeanDepthAT(area, topwidth);
    let velocity = froude * Math.sqrt(acceleration * meanDepth);
    let discharge = velocity * area;
    let criticalDepth = this.findCriticalDepthQ(discharge);
    let specEnergy = this.findSpecificEnergyVD(velocity, depth);
    this.extraAns.set("Disharge", discharge.toFixed(3));
    this.extraAns.set("Specific Energy", specEnergy.toFixed(3));
    this.extraAns.set("Critical Depth", criticalDepth.toFixed(3));
    let criticalE = this.findCriticalSpecificEnergy(criticalDepth);
    this.extraAns.set("Critical Specific Energy", criticalE.toFixed(3));
    this.extraAns.set("Area", area.toFixed(3));
    this.extraAns.set("Perimeter", perimeter.toFixed(3));
    this.extraAns.set("Top Width", topwidth.toFixed(3));
    this.extraAns.set("Mean Depth", meanDepth.toFixed(3));
    this.extraAns.set("Hydraulic Radius", radius.toFixed(3));

    return velocity;
  }
  findDepthFV(froude, velocity) {
    let acceleration = 9.81;
    return Math.pow(velocity / (froude * Math.sqrt(acceleration)), 2);
  }
  findDepthA(area) {
    return Math.sqrt(
      (area * 2) / (Math.tan(this.con_1) + Math.tan(this.con_2))
    );
  }
  findDepthVQ(velocity, discharge) {
    let area = discharge / velocity;
    this.extraAns.set("Area", area);
    let depth = Math.sqrt(
      (area * 2) / (Math.tan(this.con_1) + Math.tan(this.con_2))
    );
    let perimeter = this.findPerimeterWD(0, depth);
    let radius = this.findRadiusAP(area, perimeter);
    let topwidth = this.findTopWidth(depth);
    let meanDepth = this.findMeanDepthAT(area, topwidth);
    let froude = this.findFroudeVD(velocity, meanDepth);
    let specEnergy = this.findSpecificEnergyVD(velocity, depth);
    let criticalDepth = this.findCriticalDepthQ(discharge);
    this.extraAns.set("Specific Energy", specEnergy.toFixed(3));
    this.extraAns.set("Critical Depth", criticalDepth.toFixed(3));
    let criticalE = this.findCriticalSpecificEnergy(criticalDepth);
    this.extraAns.set("Critical Specific Energy", criticalE.toFixed(3));
    this.extraAns.set("Froude", froude.toFixed(3));
    this.classifyFlow(froude);
    this.extraAns.set("Area", area.toFixed(3));
    this.extraAns.set("Perimeter", perimeter.toFixed(3));
    this.extraAns.set("Top Width", topwidth.toFixed(3));
    this.extraAns.set("Mean Depth", meanDepth.toFixed(3));
    this.extraAns.set("Hydraulic Radius", radius.toFixed(3));
    return depth;
  }
  findDepthQWNS(discharge, width, manning, slope) {
    let depth = 0.000001;
    let area = this.findAreaDW(depth, width);

    let perimeter = this.findPerimeterWD(width, depth);

    let radius = this.findRadiusAP(area, perimeter);
    let velocity = this.findVelocityMRS(manning, radius, slope);
    let estDischarge = this.findDischrageVA(velocity, area);
    while (estDischarge < discharge) {
      depth += 1;
      area = this.findAreaDW(depth, width);
      perimeter = this.findPerimeterWD(width, depth);
      radius = this.findRadiusAP(area, perimeter);
      velocity = this.findVelocityMRS(manning, radius, slope);
      estDischarge = this.findDischrageVA(velocity, area);
    }

    let error = estDischarge - discharge;
    let absError = error;
    if (absError < 0) absError *= -1;

    while (absError > 0.005) {
      if (error < 0) depth += 0.0000015;
      if (error > 0) depth -= 0.0000025;
      area = this.findAreaDW(depth, width);
      perimeter = this.findPerimeterWD(width, depth);
      radius = this.findRadiusAP(area, perimeter);
      velocity = this.findVelocityMRS(manning, radius, slope);
      estDischarge = this.findDischrageVA(velocity, area);
      error = estDischarge - discharge;
      absError = error;
      if (absError < 0) absError *= -1;
    }
    let topwidth = this.findTopWidth(depth);
    let meanDepth = this.findMeanDepthAT(area, topwidth);
    let froude = this.findFroudeVD(velocity, meanDepth);
    let specEnergy = this.findSpecificEnergyVD(velocity, depth);
    let criticalDepth = this.findCriticalDepthQ(discharge);
    this.extraAns.set("Specific Energy", specEnergy.toFixed(3));
    this.extraAns.set("Critical Depth", criticalDepth.toFixed(3));
    let criticalE = this.findCriticalSpecificEnergy(criticalDepth);
    this.extraAns.set("Critical Specific Energy", criticalE.toFixed(3));
    this.extraAns.set("Froude", froude.toFixed(3));
    this.classifyFlow(froude);
    this.extraAns.set("Area", area.toFixed(3));
    this.extraAns.set("Perimeter", perimeter.toFixed(3));
    this.extraAns.set("Top Width", topwidth.toFixed(3));
    this.extraAns.set("Mean Depth", meanDepth.toFixed(3));
    this.extraAns.set("Hydraulic Radius", radius.toFixed(3));
    this.extraAns.set("Velocity", velocity.toFixed(3));
    return depth;
  }

  findMannningVRS(velocity, radius, slope) {
    let manning = (Math.pow(slope, 1 / 2) * Math.pow(radius, 2 / 3)) / velocity;
    return manning;
  }
  findRadiusAP(area, perimeter) {
    return area / perimeter;
  }
  findRadiusVNS(velocity, manning, slope) {
    return velocity * manning * (1 / Math.pow(slope, 1 / 2));
  }
  findbedSlopeVRM(velocity, radius, manning) {
    let slope = velocity * manning * (1 / Math.pow(radius, 2 / 3));
    this.setBedSlope(slope);
    return slope;
  }
  classifyFlow(froude) {
    if (froude === 1) {
      this.extraAns.set("Flow Regime", "critical");
    } else if (froude > 1) {
      this.extraAns.set("Flow Regime", "supercritical");
    } else {
      this.extraAns.set("Flow Regime", "subcritical");
    }
  }
  findSpecificEnergyVD(velocity, depth) {
    return depth + (velocity * velocity) / (2 * 9.81);
  }
  findCriticalDepthQ(discharge) {
    let answer = Math.pow(
      (8 * (discharge * discharge)) /
        (9.81 *
          (Math.tan(this.con_1) + Math.tan(this.con_2)) *
          (Math.tan(this.con_1) + Math.tan(this.con_2))),
      1 / 5
    );
    return answer;
  }
  findCriticalSpecificEnergy(criticalDepth) {
    return 1.25 * criticalDepth;
  }
}
class UniformTrapezoid {
  acceleration = 9.81;
  extraAns = new Map();
  getExtraAnswer() {
    return this.extraAns;
  }

  con_1 = 0;
  con_2 = 0;
  constructor(con_1, con_2) {
    this.con_1 = con_1;
    this.con_2 = con_2;
  }
  findAreaDW(depth, width) {
    return (
      0.5 * (depth * depth) * (Math.tan(this.con_1) + Math.tan(this.con_2)) +
      width * depth
    );
  }
  findPerimeterWD(width, depth) {
    return (
      depth * (1 / Math.cos(this.con_1) + 1 / Math.cos(this.con_2)) + width
    );
  }
  findTopWidth(depth, width) {
    return depth * (Math.tan(this.con_1) + Math.tan(this.con_2)) + width;
  }
  findMeanDepthAT(area, topwidth) {
    return area / topwidth;
  }
  findDischrageVA(velocity, area) {
    let answer = velocity * area;
    return answer;
  }
  findDischargeVBY(velocity, width, depth) {
    let area = this.findAreaDW(depth, width);
    let perimeter = this.findPerimeterWD(width, depth);
    let radius = this.findRadiusAP(area, perimeter);
    let answer = this.findDischrageVA(velocity, area);
    let topwidth = this.findTopWidth(depth, width);
    let meanDepth = this.findMeanDepthAT(area, topwidth);
    let froude = this.findFroudeVD(velocity, meanDepth);
    let specEnergy = this.findSpecificEnergyVD(velocity, depth);
    let criticalDepth = this.findCriticalDepthQ(answer, width);
    this.extraAns.set("Specific Energy", specEnergy.toFixed(3));
    this.extraAns.set("Critical Depth", criticalDepth.toFixed(3));
    let specCE = this.findCriticalSpecificEnergy(criticalDepth, width);
    this.extraAns.set("Specific Critical Energy", specCE.toFixed(3));
    this.extraAns.set("Froude", froude.toFixed(3));
    this.classifyFlow(froude);
    this.extraAns.set("Area", area.toFixed(3));
    this.extraAns.set("Perimeter", perimeter.toFixed(3));
    this.extraAns.set("Hydraulic Radius", radius.toFixed(3));
    this.extraAns.set("Top Width", topwidth.toFixed(3));
    this.extraAns.set("Mean Depth", meanDepth.toFixed(3));
    return answer;
  }
  findDischargeSNBY(slope, manning, width, depth) {
    let area = this.findAreaDW(depth, width);
    let perimeter = this.findPerimeterWD(width, depth);
    let radius = this.findRadiusAP(area, perimeter);
    let velocity = this.findVelocityMRS(manning, radius, slope);
    let answer = this.findDischrageVA(velocity, area);
    let topwidth = this.findTopWidth(depth, width);
    let meanDepth = this.findMeanDepthAT(area, topwidth);
    let froude = this.findFroudeVD(velocity, meanDepth);
    let specEnergy = this.findSpecificEnergyVD(velocity, depth);
    let criticalDepth = this.findCriticalDepthQ(answer, width);
    this.extraAns.set("Specific Energy", specEnergy.toFixed(3));
    this.extraAns.set("Critical Depth", criticalDepth.toFixed(3));
    let specCE = this.findCriticalSpecificEnergy(criticalDepth, width);
    this.extraAns.set("Specific Critical Energy", specCE.toFixed(3));
    this.extraAns.set("Froude", froude.toFixed(3));
    this.classifyFlow(froude);
    this.extraAns.set("Area", area.toFixed(3));
    this.extraAns.set("Perimeter", perimeter.toFixed(3));
    this.extraAns.set("Top Width", topwidth.toFixed(3));
    this.extraAns.set("Mean Depth", meanDepth.toFixed(3));
    this.extraAns.set("Hydraulic Radius", radius.toFixed(3));
    this.extraAns.set("Velocity", velocity.toFixed(3));
    return answer;
  }
  findDischargeRSNA(radius, slope, manning, area) {
    let velocity = this.findVelocityMRS(manning, radius, slope);
    let answer = this.findDischrageVA(velocity, area);
    let perimeter = area / radius;
    this.extraAns.set("Perimeter", perimeter.toFixed(3));
    this.extraAns.set("Velocity", velocity.toFixed(3));

    return answer;
  }
  findFroudeVD2(velocity, depth, width) {
    let area = this.findAreaDW(depth, width);
    let topwidth = this.findTopWidth(depth, width);
    let perimeter = this.findPerimeterWD(width, depth);
    let radius = this.findRadiusAP(area, perimeter);
    let discharge = velocity * area;
    let meanDepth = this.findMeanDepthAT(area, topwidth);
    let criticalDepth = this.findCriticalDepthQ(discharge, width);
    let specEnergy = this.findSpecificEnergyVD(velocity, depth);
    this.extraAns.set("Disharge", discharge.toFixed(3));
    this.extraAns.set("Specific Energy", specEnergy.toFixed(3));
    this.extraAns.set("Critical Depth", criticalDepth.toFixed(3));
    let specCE = this.findCriticalSpecificEnergy(criticalDepth, width);
    this.extraAns.set("Specific Critical Energy", specCE.toFixed(3));
    this.extraAns.set("Area", area.toFixed(3));
    this.extraAns.set("Perimeter", perimeter.toFixed(3));
    this.extraAns.set("Top Width", topwidth.toFixed(3));
    this.extraAns.set("Mean Depth", meanDepth.toFixed(3));
    this.extraAns.set("Hydraulic Radius", radius.toFixed(3));
    let froude = velocity / Math.sqrt(this.acceleration * meanDepth);
    return froude;
  }
  findFroudeVD(velocity, depth) {
    let froude = velocity / Math.sqrt(this.acceleration * depth);
    return froude;
  }
  findFroudeSNBY(slope, manning, width, depth) {
    this.findDischargeSNBY(slope, manning, width, depth);
    let area = this.findAreaDW(depth, width);
    let topwidth = this.findTopWidth(depth, width);
    let meanDepth = this.findMeanDepthAT(area, topwidth);
    let perimeter = this.findPerimeterWD(width, depth);
    let radius = this.findRadiusAP(area, perimeter);
    let velocity = this.findVelocityMRS(manning, radius, slope);
    let froude = velocity / Math.sqrt(this.acceleration * meanDepth);
    return froude;
  }
  findReynoldVRU(velocity, radius, mew) {
    let density = 1;
    return (density * velocity * radius) / mew;
  }
  findReynoldVYBU(velocity, depth, width, mew) {
    let area = this.findAreaDW(depth, width);
    let perimeter = this.findPerimeterWD(width, depth);
    let radius = this.findRadiusAP(area, perimeter);
    let discharge = this.findDischrageVA(velocity, area);
    let topwidth = this.findTopWidth(depth, width);
    let meanDepth = this.findMeanDepthAT(area, topwidth);
    let froude = this.findFroudeVD(velocity, meanDepth);
    let specEnergy = this.findSpecificEnergyVD(velocity, depth);
    let answer = (velocity * radius) / mew;
    let criticalDepth = this.findCriticalDepthQ(discharge, width);
    this.classifyReynold(answer);
    this.extraAns.set("Specific Energy", specEnergy.toFixed(3));
    this.extraAns.set("Critical Depth", criticalDepth.toFixed(3));
    let specCE = this.findCriticalSpecificEnergy(criticalDepth, width);
    this.extraAns.set("Specific Critical Energy", specCE.toFixed(3));
    this.extraAns.set("Froude", froude.toFixed(3));
    this.classifyFlow(froude);
    this.extraAns.set("discharge", discharge.toFixed(3));
    this.extraAns.set("Area", area.toFixed(3));
    this.extraAns.set("Perimeter", perimeter.toFixed(3));
    this.extraAns.set("Top Width", topwidth.toFixed(3));
    this.extraAns.set("Mean Depth", meanDepth.toFixed(3));
    this.extraAns.set("Hydraulic Radius", radius.toFixed(3));
    let density = 1;
    return (density * velocity * radius) / mew;
  }
  findVelocityMRS(manning, radius, slope) {
    let velocity =
      (1 / manning) * Math.pow(slope, 0.5) * Math.pow(radius, 2 / 3);

    return velocity;
  }
  findVelocityQA(discharge, area) {
    return discharge / area;
  }
  findVelocitySNBY(slope, manning, width, depth) {
    let area = this.findAreaDW(depth, width);
    let perimeter = this.findPerimeterWD(width, depth);
    let radius = this.findRadiusAP(area, perimeter);
    this.extraAns.set("Area", area.toFixed(3));
    this.extraAns.set("Perimeter", perimeter.toFixed(3));
    this.extraAns.set("Hydraulic Radius", radius.toFixed(3));
    let velocity = this.findVelocityMRS(manning, radius, slope);
    return velocity;
  }
  findVelocityFY(froude, depth, width) {
    let acceleration = 9.81;
    let area = this.findAreaDW(depth, width);
    let topwidth = this.findTopWidth(depth, width);
    let perimeter = this.findPerimeterWD(width, depth);
    let radius = this.findRadiusAP(area, perimeter);
    let meanDepth = this.findMeanDepthAT(area, topwidth);
    let velocity = froude * Math.sqrt(acceleration * meanDepth);
    let discharge = velocity * area;
    let criticalDepth = this.findCriticalDepthQ(discharge, width);
    let specEnergy = this.findSpecificEnergyVD(velocity, depth);
    this.extraAns.set("Disharge", discharge.toFixed(3));
    this.extraAns.set("Specific Energy", specEnergy.toFixed(3));
    this.extraAns.set("Critical Depth", criticalDepth.toFixed(3));
    let specCE = this.findCriticalSpecificEnergy(criticalDepth, width);
    this.extraAns.set("Specific Critical Energy", specCE.toFixed(3));
    this.extraAns.set("Area", area.toFixed(3));
    this.extraAns.set("Perimeter", perimeter.toFixed(3));
    this.extraAns.set("Top Width", topwidth.toFixed(3));
    this.extraAns.set("Mean Depth", meanDepth.toFixed(3));
    this.extraAns.set("Hydraulic Radius", radius.toFixed(3));
    return velocity;
  }
  findDepthFV(froude, velocity) {
    let acceleration = 9.81;
    return Math.pow(velocity / (froude * Math.sqrt(acceleration)), 2);
  }
  findDepthA(area) {
    return Math.sqrt(
      (area * 2) / (Math.tan(this.con_1) + Math.tan(this.con_2))
    );
  }
  findDepthVQ(velocity, discharge) {
    let area = discharge / velocity;
    this.extraAns.set("Area", area);
    let depth = Math.sqrt(
      (area * 2) / (Math.tan(this.con_1) + Math.tan(this.con_2))
    );
    return depth;
  }
  findDepthQWNS(discharge, width, manning, slope) {
    let depth = 0.000001;
    let area = this.findAreaDW(depth, width);

    let perimeter = this.findPerimeterWD(width, depth);

    let radius = this.findRadiusAP(area, perimeter);
    let velocity = this.findVelocityMRS(manning, radius, slope);
    let estDischarge = this.findDischrageVA(velocity, area);
    while (estDischarge < discharge) {
      depth += 1;
      area = this.findAreaDW(depth, width);
      perimeter = this.findPerimeterWD(width, depth);
      radius = this.findRadiusAP(area, perimeter);
      velocity = this.findVelocityMRS(manning, radius, slope);
      estDischarge = this.findDischrageVA(velocity, area);
    }

    let error = estDischarge - discharge;
    let absError = error;
    if (absError < 0) absError *= -1;

    while (absError > 0.005) {
      if (error < 0) depth += 0.0000015;
      if (error > 0) depth -= 0.0000025;
      area = this.findAreaDW(depth, width);
      perimeter = this.findPerimeterWD(width, depth);
      radius = this.findRadiusAP(area, perimeter);
      velocity = this.findVelocityMRS(manning, radius, slope);
      estDischarge = this.findDischrageVA(velocity, area);
      error = estDischarge - discharge;
      absError = error;
      if (absError < 0) absError *= -1;
    }
    let topwidth = this.findTopWidth(depth, width);
    let meanDepth = this.findMeanDepthAT(area, topwidth);
    let froude = this.findFroudeVD(velocity, meanDepth);
    let specEnergy = this.findSpecificEnergyVD(velocity, depth);
    let criticalDepth = this.findCriticalDepthQ(discharge, width);
    this.extraAns.set("Specific Energy", specEnergy.toFixed(3));
    this.extraAns.set("Critical Depth", criticalDepth.toFixed(3));
    let specCE = this.findCriticalSpecificEnergy(criticalDepth, width);
    this.extraAns.set("Specific Critical Energy", specCE.toFixed(3));
    this.extraAns.set("Froude", froude.toFixed(3));
    this.classifyFlow(froude);
    this.extraAns.set("Area", area.toFixed(3));
    this.extraAns.set("Perimeter", perimeter.toFixed(3));
    this.extraAns.set("Top Width", topwidth.toFixed(3));
    this.extraAns.set("Mean Depth", meanDepth.toFixed(3));
    this.extraAns.set("Hydraulic Radius", radius.toFixed(3));
    this.extraAns.set("Velocity", velocity.toFixed(3));
    return depth;
  }
  findMannningVRS(velocity, radius, slope) {
    let manning = (Math.pow(slope, 1 / 2) * Math.pow(radius, 2 / 3)) / velocity;
    return manning;
  }
  findRadiusAP(area, perimeter) {
    return area / perimeter;
  }
  findRadiusVNS(velocity, manning, slope) {
    return velocity * manning * (1 / Math.pow(slope, 1 / 2));
  }
  findbedSlopeVRM(velocity, radius, manning) {
    let slope = velocity * manning * (1 / Math.pow(radius, 2 / 3));
    this.setBedSlope(slope);
    return slope;
  }
  classifyFlow(froude) {
    if (froude === 1) {
      this.extraAns.set("Flow Regime", "critical");
    } else if (froude > 1) {
      this.extraAns.set("Flow Regime", "supercritical");
    } else {
      this.extraAns.set("Flow Regime", "subcritical");
    }
  }
  findSpecificEnergyVD(velocity, depth) {
    return depth + (velocity * velocity) / (2 * 9.81);
  }
  findCriticalDepthQ(charge, width) {
    let discharge = charge;
    let y = 0.001;
    let estD = Math.sqrt(
      (9.81 * Math.pow(this.findAreaDW(y, width), 3)) /
        this.findTopWidth(y, width)
    );
    while (estD < discharge) {
      y += 0.05;
      estD = Math.sqrt(
        (9.81 * Math.pow(this.findAreaDW(y, width), 3)) /
          this.findTopWidth(y, width)
      );
    }
    let error = estD - discharge;
    let absError = error;
    if (absError < 0) absError *= -1;

    while (absError > 0.005) {
      if (error < 0) y += Math.random();
      if (error > 0) y -= 0.000005;
      estD = Math.sqrt(
        (9.81 * Math.pow(this.findAreaDW(y, width), 3)) /
          this.findTopWidth(y, width)
      );
      error = estD - discharge;
      absError = error;
      if (absError < 0) absError *= -1;
    }
    return y;
  }

  findECritical(y) {
    return y + ((2 + y) * y) / (2 * (2 + 2 * y));
  }
  classifyReynold(R) {
    if (R < 2000) {
      this.extraAns.set("Flow type", "Laminar");
    } else if (R > 4000) {
      this.extraAns.set("Flow type", "Turbulent");
    }
  }
  findCriticalSpecificEnergy(criticalDepth, width) {
    let area = this.findAreaDW(criticalDepth, width);
    let topwidth = this.findTopWidth(criticalDepth, width);
    let energy = criticalDepth + area / (2 * topwidth);
    return energy;
  }
}

// class GVFRectangular extends UniformRectangular {
//   findEnergySlopeLineVMR(velocity, manning, radius) {
//     return (
//       (manning * manning * (velocity * velocity)) / Math.pow(radius, 4 / 3)
//     );
//   }
//   findEnergyChangeEE(E1, E2) {
//     return E1 - E2;
//   }
//   categorizeChannel(normaldepth, criticaldepth) {
//     let category = "";
//     if (normaldepth > criticaldepth) {
//       category = "mild slope" + "subcritical flow at normal depth";
//     } else if (normaldepth < criticaldepth) {
//       category = "steep slope" + "supercritical flow at normal depth";
//     } else if (normaldepth == criticaldepth) {
//       category = "critical slope" + "critical flow at normal depth";
//     }
//   }
//   findChangeInDepth(bedSlope, energySlope, froude) {
//     return (bedSlope - energySlope) / (1 - froude * froude);
//   }
//   findChangeInEnergySS(frictionSlope, bedSlope) {
//     return bedSlope - frictionSlope;
//   }
// }
