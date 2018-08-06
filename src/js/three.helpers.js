import {
  HemisphereLight,
  DirectionalLight,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  SphereGeometry,
  AmbientLight
} from 'three';

export function aLight() {
  const ALight = new AmbientLight(0x404040);
  return ALight;
}

// THREE hemisphere light
export function hLight() {
  const hemiLight = new HemisphereLight(0xffffff, 0xffffff, 1);
  hemiLight.position.set(0, 500, 0);
  return hemiLight;
}

export function bLight() {
  const dirLight = new DirectionalLight(0xffffff, 0.3);
  dirLight.position.set(-0.5, 0.75, -1);
  dirLight.position.multiplyScalar(50);
  return dirLight;
}

export function dLight() {
  const dirLight = new DirectionalLight(0xffffff, 0.3);
  dirLight.position.set(-1, 0.75, 1);
  dirLight.position.multiplyScalar(50);
  return dirLight;
}

export function makeCube() {
  return new Mesh(new BoxGeometry(1, 1, 1), new MeshBasicMaterial({
    wireframe: true,
    color: 0x000000 * Math.random()
  }));
}

export function makeSphere() {
  return new Mesh(new SphereGeometry(9, 14, 12, 0, Math.PI * 2, 0, Math.PI * 2),
    new MeshBasicMaterial({
      wireframe: true,
      color: 0x000000 * Math.random()
    }));
}
