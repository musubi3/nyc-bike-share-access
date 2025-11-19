import { drawEquityMap } from "./chart-equity-map.js";
import { drawStationMap } from "./chart-station-map.js";
import { drawHeatmap } from "./heatmap.js";
import { drawDurationChart } from "./chart-duration.js";

document.addEventListener('DOMContentLoaded', async () => {
  drawStationMap();
  drawHeatmap();
  drawEquityMap();
  drawDurationChart();
});