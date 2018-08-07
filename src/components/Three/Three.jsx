import React, { Component } from 'react';
import 'three/examples/js/loaders/OBJLoader';
import 'three/examples/js/modifiers/SubdivisionModifier';
import { $on } from '../../js/helpers';
import SceneManager from '../../js/sceneManager';
import { animateVector3 } from '../../js/three.animation';
import { aLight, hLight, bLight, dLight } from '../../js/three.helpers';

import './styles.scss';

class Three extends Component {

  componentDidMount() {

    $on(window, 'load', () => {

      const sceneManager = new SceneManager();

      this.sceneManager = sceneManager;

      sceneManager.create();

      sceneManager.add(aLight());
      sceneManager.add(hLight());
      // sceneManager.add(bLight());
      sceneManager.add(dLight());

      var axesHelper = new THREE.AxesHelper(200);
      sceneManager.add(axesHelper);

      var roundedRectShape = new THREE.Shape();

      roundedRect(roundedRectShape, 70, 140, 1);

      function roundedRect(ctx, width, height, radius) {
        const x = -width / 2;
        const y = -height / 2;
        ctx.moveTo(x, y + radius);
        ctx.lineTo(x, (y + height) - radius);
        ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
        ctx.lineTo((x + width) - radius, y + height);
        ctx.quadraticCurveTo(x + width, y + height, x + width, (y + height) - radius);
        ctx.lineTo(x + width, y + radius);
        ctx.quadraticCurveTo(x + width, y, (x + width) - radius, y);
        ctx.lineTo(x + radius, y);
        ctx.quadraticCurveTo(x, y, x, y + radius);
      }

      var extrudeSettings = {
        depth: 0,
        bevelEnabled: true,
        bevelSegments: 10,
        steps: 50,
        bevelSize: 20,
        bevelThickness: 7
      };

      var geometry = new THREE.ExtrudeGeometry(roundedRectShape, extrudeSettings);

      var modifier = new THREE.SubdivisionModifier(3);
      var smooth = modifier.modify(geometry);

      console.log('mesh geometry', smooth);
      console.log('количество полигонов', smooth.faces.length);

      var minus = [];
      var axisY = new THREE.Vector3(0, 1, 0);

      var time = performance.now();
      var i;

      for (i = 0; i < smooth.vertices.length; i += 1) {
        if (smooth.vertices[i].z < 0) {
          minus.push(i);
        }
        const qwer = (Math.cos(((smooth.vertices[i].y + 90) * Math.PI) / 180) + 1) * (Math.PI / 2);
        smooth.vertices[i].applyAxisAngle(axisY, qwer);
      }

      time = performance.now() - time;
      console.log('Время просчета формы =', time, 'мс');

      for (i = 0; i < smooth.faces.length; i += 1) {
        if (minus.indexOf(smooth.faces[i].a) >= 0 ||
          minus.indexOf(smooth.faces[i].b) >= 0 ||
          minus.indexOf(smooth.faces[i].c) >= 0) {
          smooth.faces[i].color.set(0x8080ff);
        } else {
          smooth.faces[i].color.set(0xff8080);
        }
      }

      time = performance.now() - time;
      console.log('Время просчета материала =', time, 'мс');

      var material = new THREE.MeshStandardMaterial({ vertexColors: THREE.FaceColors });
      var mesh = new THREE.Mesh(smooth, material);
      sceneManager.add(mesh);

      animate(mesh, 1500);

      function animate(obj, dur) {
        animateVector3(obj.rotation, {
          duration: dur,
          yoyo: false,
          delay: 500,
          repeatDelay: 1500,
          repeat: Infinity,
        });
      }

    });

  }

  render() {
    return <div id="ThreeJS" className="three-container" />;
  }
}

export default Three;
