import React, { Component } from 'react';
import * as THREE from 'three';
import 'three/examples/js/loaders/OBJLoader';
import 'three/examples/js/modifiers/SubdivisionModifier';
import { $on } from '../../js/helpers';
import SceneManager from '../../js/sceneManager';
import { animateVector3, fade } from '../../js/three.animation';
import { loadModel, getModel } from '../../js/three.loader';
import { hLight, bLight, dLight, makeCube, makeSphere } from '../../js/three.helpers';

import './styles.scss';

var loader = new THREE.TextureLoader();
// var texture1 = loader.load("https://pbs.twimg.com/profile_images/875464015337730048/Cta3L18Q_400x400.jpg");

class Three extends Component {

  componentDidMount() {

    $on(window, 'load', () => {

      const sceneManager = new SceneManager();

      this.sceneManager = sceneManager;

      sceneManager.create();

      sceneManager.add(hLight());
      sceneManager.add(bLight());
      sceneManager.add(dLight());


      var axesHelper = new THREE.AxesHelper(200);
      sceneManager.add(axesHelper);


      var curve = new THREE.EllipseCurve(
        0, 0,
        0.05, 3,
      );

      // var points = curve.getPoints(50);
      // console.log('points', points);
      // var geometry = new THREE.BufferGeometry().setFromPoints(points);


      // // var material = new THREE.MeshPhongMaterial({
      // //   color: 0xffffff,
      // //   map: texture1
      // // });
      // // var material = new THREE.LineBasicMaterial({ color: 0x000000 });
      // // var material = new THREE.MeshLambertMaterial(0x000000);


      var materialFront = new THREE.MeshStandardMaterial({ color: 0xf0f000 });
      var materialBack = new THREE.MeshStandardMaterial({ color: 0xf000ff });
      var material1 = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
      var material2 = new THREE.MeshStandardMaterial({ color: 0xf0fff0 });

      var materials = [
        materialFront,
        materialBack,
        material1,
        material2
      ]
      // console.log('geometry', geometry);

      // var ellipse = new THREE.Line(geometry, material);


      // var ellipse = new THREE.PolyhedronGeometry(geometry, material);

      var roundedRectShape = new THREE.Shape();
      (function roundedRect(ctx, width, height, radius) {
        const x = -width / 2;
        const y = -height / 2;
        // const x = 20;
        // const y = 20;
        ctx.moveTo(x, y + radius);
        ctx.lineTo(x, y + height - radius);
        ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
        ctx.lineTo(x + width - radius, y + height);
        ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
        ctx.lineTo(x + width, y + radius);
        ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
        ctx.lineTo(x + radius, y);
        ctx.quadraticCurveTo(x, y, x, y + radius);
      })(roundedRectShape, 50, 140, 1);

      // var geometry = new THREE.ShapeGeometry(squareShape);

      var extrudeSettings = { depth: 0, bevelEnabled: true, bevelSegments: 10, steps: 50, bevelSize: 20, bevelThickness: 3 };

      var geometry = new THREE.ExtrudeGeometry(roundedRectShape, extrudeSettings);

      var modifier = new THREE.SubdivisionModifier(3);
      var smooth = modifier.modify(geometry);

      console.log('mesh roundedRectShape', materialBack);
      console.log('mesh geometry', smooth);
      console.log('mesh', mesh);

      var minus = [];
      var axisY = new THREE.Vector3(0, 1, 0);

      for (var i = 0; i < smooth.vertices.length; i++) {
        if (smooth.vertices[i].z < 0) {
          minus.push(i);
        }
        const angle = ((Math.PI / 180) * smooth.vertices[i].y) + (Math.PI / 2);
        // console.log('smooth.vertices[i].y', smooth.vertices[i].y);
        smooth.vertices[i].applyAxisAngle(axisY, angle);
      }

      for (var i = 0; i < smooth.faces.length; i++) {
        if (minus.indexOf(smooth.faces[i].a) >= 0 ||
            minus.indexOf(smooth.faces[i].b) >= 0 ||
            minus.indexOf(smooth.faces[i].c) >= 0) {
          smooth.faces[i].color.set(0x8080ff);
        } else {
          smooth.faces[i].color.set(0xff8080);
        }
      }

      var material = new THREE.MeshStandardMaterial({ vertexColors: THREE.FaceColors });

      var mesh = new THREE.Mesh(smooth, material);

      // var edges = new THREE.EdgesGeometry(smooth);
      // var line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xff0000 }));

      // mesh.rotation.y = 2 * Math.PI;

      sceneManager.add(mesh);
      // sceneManager.add(line);
      // sceneManager.add(ellipse);

      // var manager = new THREE.LoadingManager();
      // var loader = new THREE.OBJLoader(manager);

      // console.log('loader 1', loader);

      // loader.load(
      //   './OBJ.obj',
      //   (object) => {
      //     sceneManager.add(object);
      //   }
      // );


      // var geometry = new THREE.CubeGeometry(60, 150, 5, 1, 1, 2);
      // console.log('geometry', geometry);

      // var modifier = new THREE.SubdivisionModifier(4);
      // var smooth = modifier.modify(geometry);
      // console.log('geometry', smooth);

      // var minus = [];

      // for (var i = 0; i < smooth.vertices.length; i++) {
      //   if (smooth.vertices[i].z < 0) {
      //     minus.push(i);
      //   }
      // }

      // console.log('minus', minus)

      // for (var i = 0; i < smooth.faces.length; i++) {
      //   console.log('smooth index', minus.indexOf(smooth.faces[i].a), minus.indexOf(smooth.faces[i].b), minus.indexOf(smooth.faces[i].c));
      //   console.log('smooth abc', smooth.faces[i].a, smooth.faces[i].b, smooth.faces[i].c);
      //   if (minus.indexOf(smooth.faces[i].a) >= 0 || minus.indexOf(smooth.faces[i].b) >= 0 || minus.indexOf(smooth.faces[i].c) >= 0) {
      //     smooth.faces[i].color.set(0x8080ff);
      //   } else {
      //     smooth.faces[i].color.set(0xff8080);
      //   }
      // }

      // var material = new THREE.MeshStandardMaterial({ vertexColors: THREE.FaceColors });

      // var mesh = new THREE.Mesh(smooth, material);

      // sceneManager.add(mesh);

    });

  }

  render() {
    return <div id="ThreeJS" className="three-container" />;
  }
}

export default Three;
