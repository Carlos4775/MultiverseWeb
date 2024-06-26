import { Component, OnInit } from '@angular/core';
import { MobileDetectionService } from 'src/app/services/mobile.detection.service';
import * as THREE from 'three';

@Component({
  selector: 'app-canvas-box',
  templateUrl: './canvas-box.component.html'
})
export class CanvasBoxComponent implements OnInit {

  private isMobile: boolean = false;

  constructor(
    public mobileDetectionService: MobileDetectionService,
  ) { }

  ngOnInit(): void {
    this.isMobile = this.mobileDetectionService.isMobile();
    this.createThreeJsBox();
  }

  createThreeJsBox(): void {
    const canvas = document.getElementById('canvas-box');

    const scene = new THREE.Scene();

    const loader = new THREE.TextureLoader();
    const earthTexture = loader.load("../../../assets/textures/earth_texture.jpg");
    const material = new THREE.MeshBasicMaterial({ map: earthTexture });
    scene.background = loader.load("../../../assets/textures/space_stars_bg.jpg");

    const darkMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.5 });
    const planeGeometry = new THREE.PlaneGeometry(1000, 1000);
    const darkPlane = new THREE.Mesh(planeGeometry, darkMaterial);
    scene.add(darkPlane);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.x = 2;
    pointLight.position.y = 2;
    pointLight.position.z = 2;
    scene.add(pointLight);

    const box = new THREE.Mesh(
      new THREE.SphereGeometry(8, 32, 16, 0, 6.283185307179586, 0, 3.141592653589793),
      material
    );

    scene.add(box);

    const canvasSizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const frustumVertical = this.isMobile ? 100 : 75;
    const aspect = canvasSizes.width / canvasSizes.height;
    const near = 0.001;
    const far = 1000;

    const camera = new THREE.PerspectiveCamera(frustumVertical, aspect, near, far);
    camera.position.z = 30;
    scene.add(camera);

    if (!canvas) {
      return;
    }

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
    });
    renderer.setClearColor(0xe232222, 1);
    renderer.setSize(canvasSizes.width, canvasSizes.height);

    window.addEventListener('resize', () => {
      canvasSizes.width = window.innerWidth;
      canvasSizes.height = window.innerHeight;

      camera.aspect = canvasSizes.width / canvasSizes.height;
      camera.updateProjectionMatrix();

      renderer.setSize(canvasSizes.width, canvasSizes.height);
      renderer.render(scene, camera);
    });

    const animateGeometry = () => {
      // Update animation objects
      box.rotation.x += 0.002;
      box.rotation.y += 0.002;

      // Render
      renderer.render(scene, camera);

      // Call animateGeometry again on the next frame
      window.requestAnimationFrame(animateGeometry);
    };

    animateGeometry();
  }
}
