/**
 * Canvas sphere module.
 *
 * @module CanvasSphere
 */

export default class CanvasSphere {
  constructor(canvasContainer) {
    let
      sphere, geometry, group,
      canvasWidth = 270,
      canvasHeight = 270,
      camera, scene, renderer, clock;

    init();
    render();

    function init() {
      let particle;

      clock = new THREE.Clock();

      camera = new THREE.PerspectiveCamera(75, canvasWidth / canvasHeight, 1, 615);
      camera.position.z = 600;

      scene = new THREE.Scene();
      renderer = new THREE.CanvasRenderer();
      renderer.setClearColor(0xffe900);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(canvasWidth, canvasHeight);
      canvasContainer.appendChild(renderer.domElement);

      // particles

      let PI2 = Math.PI * 2;

      let material = new THREE.SpriteCanvasMaterial({
        color: 0x0e060e,
        program: function (context) {
          context.beginPath();
          context.arc(0, 0, 0.3, 0, PI2, true);
          context.fill();
        }
      });

      geometry = new THREE.IcosahedronGeometry(360, 2);
      group = new THREE.Object3D();

      for (let i = 0; i < geometry.vertices.length; i++) {
        particle = new THREE.Sprite(material);
        particle.position.x = geometry.vertices[i].x;
        particle.position.y = geometry.vertices[i].y;
        particle.position.z = geometry.vertices[i].z;
        particle.scale.x = particle.scale.y = 4;
        group.add(particle);
      }

      sphere = THREE.SceneUtils.createMultiMaterialObject(geometry, [
        new THREE.MeshBasicMaterial({ color: 0x444444, opacity: 0.5, wireframe: true }),
        new THREE.MeshBasicMaterial({ color: 0xffe900 })
      ]);

      group.add(sphere);
      scene.add(group);

      window.addEventListener('resize', onWindowResize, false);
    }

    function onWindowResize() {
      camera.aspect = 1;
      camera.updateProjectionMatrix();

      renderer.setSize(canvasWidth, canvasHeight);
    }

    function render() {
      group.rotation.y -= 0.001;
      group.rotation.x += 0.001;

      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }

    window.startCanvasAnimate = function () {
      window.animationFrameId = requestAnimationFrame(window.startCanvasAnimate);
      render();
    };

    window.stopCanvasAnimate = function () {
      cancelAnimationFrame(window.animationFrameId);
    };
  }
}
