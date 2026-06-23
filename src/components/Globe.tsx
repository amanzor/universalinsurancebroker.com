"use client";

import { useEffect, useRef } from "react";

export default function RotatingGlobe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let rotation = 0;

    const dpr = window.devicePixelRatio || 1;
    const parent = canvas.parentElement;
    const size = Math.max(parent?.clientWidth || 600, parent?.clientHeight || 600);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + "px";
    canvas.style.height = size + "px";
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const R = size * 0.48;

    // More detailed continent outlines [lon, lat]
    const continents: [number, number][][] = [
      // North America (detailed)
      [[-168,65],[-162,64],[-155,60],[-150,61],[-145,60],[-140,60],[-137,59],[-136,57],[-133,55],[-130,53],[-127,50],[-124,48],[-123,46],[-122,42],[-120,38],[-118,34],[-117,32],[-115,30],[-112,29],[-110,28],[-108,27],[-105,25],[-100,24],[-97,22],[-95,20],[-92,18],[-88,18],[-86,16],[-84,15],[-82,14],[-80,16],[-82,18],[-84,20],[-82,22],[-80,25],[-78,26],[-76,25],[-75,24],[-77,22],[-79,20],[-81,18],[-83,16],[-85,14],[-87,15],[-90,16],[-92,17],[-95,19],[-97,20],[-97,24],[-95,28],[-90,29],[-88,30],[-85,30],[-82,32],[-78,34],[-76,36],[-74,38],[-72,40],[-70,42],[-68,44],[-66,44],[-65,46],[-63,46],[-60,47],[-58,48],[-56,50],[-55,52],[-58,55],[-62,58],[-65,60],[-68,62],[-72,64],[-78,67],[-85,68],[-92,70],[-100,72],[-110,72],[-120,71],[-130,70],[-140,68],[-150,66],[-160,66],[-168,65]],
      // Central America & Caribbean connector
      [[-100,24],[-97,22],[-95,20],[-92,18],[-90,16],[-88,15],[-86,14],[-84,12],[-82,10],[-80,8],[-79,7],[-77,8],[-78,9],[-80,10],[-82,12],[-84,14],[-86,15],[-88,16],[-90,17],[-92,18],[-95,20],[-97,22],[-100,24]],
      // South America (detailed)
      [[-80,10],[-78,8],[-76,7],[-73,7],[-70,7],[-67,6],[-63,7],[-60,5],[-55,3],[-52,2],[-50,0],[-48,-2],[-46,-4],[-44,-7],[-42,-10],[-40,-13],[-38,-15],[-37,-18],[-38,-20],[-40,-22],[-42,-23],[-44,-23],[-46,-24],[-48,-26],[-50,-28],[-51,-30],[-52,-32],[-53,-33],[-52,-35],[-50,-38],[-48,-40],[-46,-42],[-44,-44],[-42,-46],[-44,-48],[-46,-50],[-50,-52],[-55,-53],[-60,-54],[-65,-55],[-68,-54],[-70,-52],[-72,-50],[-74,-48],[-74,-45],[-73,-42],[-72,-38],[-72,-35],[-71,-30],[-70,-26],[-70,-22],[-70,-18],[-72,-15],[-74,-12],[-76,-10],[-78,-5],[-80,0],[-80,5],[-80,8],[-80,10]],
      // Europe (detailed)
      [[-10,36],[-8,38],[-9,40],[-8,42],[-5,43],[-2,43],[0,44],[2,46],[3,48],[1,50],[3,52],[5,54],[7,55],[8,54],[10,55],[12,56],[13,55],[15,54],[18,55],[20,55],[22,56],[24,58],[26,60],[28,62],[30,65],[32,66],[35,68],[38,67],[40,66],[38,62],[35,58],[32,55],[30,52],[28,50],[26,48],[25,46],[24,44],[26,42],[28,40],[26,38],[24,36],[22,35],[20,36],[18,38],[15,39],[12,40],[10,42],[8,44],[5,46],[3,48],[0,48],[-2,46],[-5,44],[-8,43],[-10,40],[-10,36]],
      // British Isles
      [[-8,50],[-6,51],[-5,53],[-4,55],[-5,57],[-6,58],[-5,58],[-3,57],[-1,55],[0,53],[1,52],[0,51],[-2,50],[-5,50],[-8,50]],
      // Scandinavia
      [[5,58],[8,60],[10,62],[12,64],[14,66],[16,68],[18,70],[20,70],[22,68],[24,66],[26,64],[28,62],[26,60],[24,58],[20,56],[16,56],[12,56],[8,56],[5,58]],
      // Africa (detailed)
      [[-17,15],[-16,18],[-17,20],[-16,22],[-14,24],[-13,26],[-10,30],[-8,32],[-5,34],[-2,35],[2,36],[5,37],[8,37],[10,37],[12,35],[15,33],[18,32],[20,32],[22,32],[25,30],[28,30],[30,28],[32,30],[33,32],[35,30],[37,28],[40,25],[43,20],[45,15],[47,12],[48,10],[49,8],[48,5],[46,2],[43,0],[40,-2],[38,-5],[36,-8],[34,-10],[33,-13],[32,-16],[34,-20],[35,-24],[33,-28],[30,-30],[28,-32],[27,-33],[25,-34],[22,-34],[20,-33],[18,-30],[16,-26],[14,-22],[12,-18],[10,-14],[8,-10],[6,-6],[4,-2],[2,2],[0,5],[-2,6],[-5,8],[-8,10],[-10,12],[-12,13],[-15,14],[-17,15]],
      // Madagascar
      [[44,-13],[46,-15],[48,-18],[49,-20],[49,-23],[48,-25],[46,-26],[44,-24],[43,-22],[43,-18],[43,-15],[44,-13]],
      // Asia (detailed)
      [[28,42],[30,44],[32,46],[34,48],[36,50],[38,52],[40,54],[42,56],[44,58],[48,60],[52,62],[56,64],[60,66],[65,68],[70,70],[75,72],[80,73],[85,72],[90,70],[95,68],[100,66],[105,64],[110,62],[115,60],[120,58],[122,56],[124,54],[126,52],[128,50],[130,48],[132,46],[134,44],[132,42],[130,40],[128,38],[126,36],[124,34],[122,32],[120,30],[118,28],[116,26],[114,24],[112,22],[110,20],[108,18],[106,16],[104,14],[102,12],[100,10],[98,8],[96,10],[94,12],[92,14],[90,16],[88,18],[86,20],[84,22],[82,22],[80,20],[78,18],[76,16],[74,15],[72,16],[70,18],[68,20],[66,22],[64,24],[62,26],[60,28],[58,30],[55,32],[52,34],[50,36],[48,35],[46,34],[44,36],[42,38],[40,40],[38,42],[36,42],[34,40],[32,38],[30,40],[28,42]],
      // Japan
      [[130,32],[132,34],[134,36],[136,38],[138,40],[140,42],[142,44],[142,42],[140,40],[138,38],[136,36],[134,34],[132,32],[130,32]],
      // India subcontinent
      [[68,24],[70,22],[72,20],[74,18],[76,16],[78,14],[80,12],[80,8],[78,7],[76,8],[74,10],[72,12],[70,14],[68,16],[66,18],[65,20],[66,22],[68,24]],
      // Southeast Asia / Indonesia
      [[100,6],[102,4],[104,2],[106,0],[108,-2],[106,-4],[104,-6],[102,-8],[104,-8],[106,-6],[108,-4],[110,-6],[112,-8],[114,-8],[116,-6],[118,-8],[120,-6],[122,-4],[120,-2],[118,0],[116,2],[114,4],[112,4],[110,2],[108,0],[106,2],[104,4],[102,6],[100,6]],
      // Australia (detailed)
      [[114,-22],[115,-20],[116,-18],[118,-16],[120,-14],[123,-14],[126,-13],[129,-13],[132,-12],[135,-12],[137,-13],[139,-14],[141,-15],[143,-16],[145,-18],[147,-20],[149,-22],[151,-24],[153,-26],[153,-28],[152,-30],[150,-33],[148,-36],[146,-38],[144,-39],[142,-39],[140,-38],[138,-36],[136,-35],[134,-34],[132,-33],[130,-32],[128,-30],[126,-28],[124,-26],[122,-24],[120,-22],[118,-22],[116,-22],[114,-22]],
      // New Zealand
      [[166,-35],[168,-37],[170,-40],[172,-42],[174,-44],[174,-46],[172,-46],[170,-44],[168,-42],[166,-40],[165,-38],[166,-35]],
      // Greenland
      [[-55,60],[-50,62],[-45,64],[-40,66],[-35,68],[-30,72],[-25,76],[-20,80],[-25,82],[-30,83],[-35,82],[-40,80],[-45,78],[-50,75],[-52,72],[-55,68],[-55,64],[-55,60]],
      // Arabian Peninsula
      [[35,28],[38,26],[40,24],[44,22],[48,20],[50,18],[52,16],[54,14],[52,13],[50,14],[48,16],[46,18],[44,20],[42,22],[40,24],[38,26],[36,28],[35,28]],
    ];

    function lonLatTo3D(lon: number, lat: number, rot: number): [number, number, number] {
      const phi = (90 - lat) * Math.PI / 180;
      const theta = (lon + rot) * Math.PI / 180;
      const x = R * Math.sin(phi) * Math.cos(theta);
      const y = R * Math.cos(phi);
      const z = R * Math.sin(phi) * Math.sin(theta);
      return [x, y, z];
    }

    function project(lon: number, lat: number, rot: number): [number, number, number] {
      const [x, y, z] = lonLatTo3D(lon, lat, rot);
      return [cx + x, cy - y, z];
    }

    // Precompute cloud positions (static, rotate with globe)
    const clouds: { lon: number; lat: number; rx: number; ry: number; angle: number }[] = [];
    for (let i = 0; i < 40; i++) {
      clouds.push({
        lon: (Math.sin(i * 137.5) * 180),
        lat: (Math.cos(i * 73.1) * 70),
        rx: 15 + (Math.sin(i * 31.7) * 0.5 + 0.5) * 25,
        ry: 6 + (Math.cos(i * 47.3) * 0.5 + 0.5) * 10,
        angle: (i * 47) % 360,
      });
    }

    function drawGlobe() {
      ctx.clearRect(0, 0, size, size);

      // Outer atmosphere glow
      const outerGlow = ctx.createRadialGradient(cx, cy, R * 0.95, cx, cy, R * 1.25);
      outerGlow.addColorStop(0, "rgba(60,140,255,0)");
      outerGlow.addColorStop(0.4, "rgba(60,140,255,0.06)");
      outerGlow.addColorStop(0.7, "rgba(40,100,200,0.04)");
      outerGlow.addColorStop(1, "rgba(20,60,140,0)");
      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.25, 0, Math.PI * 2);
      ctx.fill();

      // Clip to globe circle
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      // Deep ocean base
      const oceanGrad = ctx.createRadialGradient(cx - R * 0.25, cy - R * 0.3, R * 0.05, cx + R * 0.1, cy + R * 0.1, R * 1.1);
      oceanGrad.addColorStop(0, "#1e5080");
      oceanGrad.addColorStop(0.3, "#163d65");
      oceanGrad.addColorStop(0.6, "#0e2d4d");
      oceanGrad.addColorStop(1, "#071a30");
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, 0, size, size);

      // Ocean depth variation using pixel dots
      ctx.globalAlpha = 0.04;
      for (let lat = -85; lat <= 85; lat += 8) {
        for (let lon = -180; lon < 180; lon += 8) {
          const [px, py, z] = project(lon, lat, rotation);
          if (z > 0) {
            const depth = 0.3 + 0.7 * (z / R);
            const r = 20 + depth * 30;
            const g = 80 + depth * 60;
            const b = 160 + depth * 40;
            ctx.fillStyle = `rgb(${r},${g},${b})`;
            ctx.fillRect(px - 2, py - 2, 4, 4);
          }
        }
      }
      ctx.globalAlpha = 1;

      // Draw continents with terrain shading
      continents.forEach(continent => {
        const projected = continent.map(([lon, lat]) => project(lon, lat, rotation));
        const visiblePoints = projected.filter(([, , z]) => z > 0);
        if (visiblePoints.length < 3) return;

        ctx.beginPath();
        let started = false;
        projected.forEach(([px, py, z]) => {
          if (z > 0) {
            if (!started) { ctx.moveTo(px, py); started = true; }
            else ctx.lineTo(px, py);
          }
        });
        ctx.closePath();

        // Terrain gradient based on average position (simulate sun lighting)
        const avgX = visiblePoints.reduce((s, p) => s + p[0], 0) / visiblePoints.length;
        const avgY = visiblePoints.reduce((s, p) => s + p[1], 0) / visiblePoints.length;
        const avgZ = visiblePoints.reduce((s, p) => s + p[2], 0) / visiblePoints.length;
        const sunFactor = 0.4 + 0.6 * (avgZ / R);

        const g1 = Math.round(60 + sunFactor * 50);
        const g2 = Math.round(100 + sunFactor * 60);
        const b1 = Math.round(40 + sunFactor * 20);

        ctx.fillStyle = `rgba(${g1},${g2},${b1},0.7)`;
        ctx.fill();

        // Subtle continent border
        ctx.strokeStyle = `rgba(${g1 + 30},${g2 + 30},${b1 + 20},0.5)`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Inner terrain texture
        ctx.save();
        ctx.clip();
        ctx.globalAlpha = 0.08;
        for (let i = 0; i < visiblePoints.length; i += 2) {
          const [px, py] = visiblePoints[i];
          ctx.fillStyle = i % 4 === 0 ? "#4a6b3a" : "#5c8045";
          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        ctx.restore();
      });

      // Clouds
      ctx.globalAlpha = 0.15;
      clouds.forEach(cloud => {
        const [px, py, z] = project(cloud.lon, cloud.lat, rotation);
        if (z > R * 0.15) {
          const fade = Math.min(1, (z / R));
          ctx.globalAlpha = 0.08 + fade * 0.12;
          ctx.fillStyle = "#ffffff";
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(cloud.angle * Math.PI / 180);
          ctx.beginPath();
          ctx.ellipse(0, 0, cloud.rx * fade, cloud.ry * fade, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });
      ctx.globalAlpha = 1;

      // Restore from clip
      ctx.restore();

      // Atmosphere rim
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(80,160,255,0.25)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      // Specular highlight (sun reflection upper-left)
      const specGrad = ctx.createRadialGradient(cx - R * 0.32, cy - R * 0.32, R * 0.02, cx - R * 0.15, cy - R * 0.15, R * 0.55);
      specGrad.addColorStop(0, "rgba(255,255,255,0.2)");
      specGrad.addColorStop(0.3, "rgba(255,255,255,0.08)");
      specGrad.addColorStop(0.7, "rgba(255,255,255,0.02)");
      specGrad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = specGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // Dark side shadow (right/bottom)
      const darkGrad = ctx.createRadialGradient(cx + R * 0.4, cy + R * 0.3, R * 0.1, cx + R * 0.2, cy + R * 0.15, R * 1.1);
      darkGrad.addColorStop(0, "rgba(0,0,0,0.35)");
      darkGrad.addColorStop(0.5, "rgba(0,0,0,0.15)");
      darkGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = darkGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      rotation += 0.12;
      animId = requestAnimationFrame(drawGlobe);
    }

    drawGlobe();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
    />
  );
}
