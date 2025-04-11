import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/Addons.js';

@Component({
  selector: 'app-three',
  templateUrl: './three.component.html',
  styleUrls: ['./three.component.css'],
})
export class ThreeComponent implements AfterViewInit {
  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  // private scene!: THREE.Scene;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private animationId!: number;
  group!: THREE.Group;

  svg: string = 'home_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg';

  ngAfterViewInit(): void {
    this.initThree();
    this.animate();
  }
  private initThree(): void {
    const canvas = this.canvasRef.nativeElement;
    const aspectRatio = window.innerWidth / window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(new THREE.Color('black'), 1);

    this.scene = new THREE.Scene();

    const loader = new SVGLoader();
    loader.load(
      this.svg,
      (data) => {
        const paths = data.paths;
        const group = new THREE.Group();

        for (let i = 0; i < paths.length; i++) {
          const path = paths[i];
          console.log(path);

          const material = new THREE.MeshStandardMaterial({
            color: 'white',
            transparent: true,
            opacity: 0.4,
            roughness: 0.6,
            metalness: 0.5,
            side: THREE.DoubleSide,
          });

          const ambientLight = new THREE.AmbientLight(0xffffff, 1);
          this.scene.add(ambientLight);

          const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
          directionalLight.position.set(5, 5, 5);
          this.scene.add(directionalLight);

          const shapes = SVGLoader.createShapes(path);
          for (let j = 0; j < shapes.length; j++) {
            const shape = shapes[j];
            const geometry = new THREE.ExtrudeGeometry(shape, {
              depth: 5,
              bevelEnabled: true,
              bevelSize: 0,
              bevelThickness: 100,
            });
            const mesh = new THREE.Mesh(geometry, material);
            group.add(mesh);
          }
        }

        group.scale.set(0.0015, 0.0015, 0.0015);
        group.rotation.x = Math.PI;
        group.position.set(0, -0.5, 0);
        this.scene.add(group);

        this.group = group;
        console.log(group);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
        console.error('Erro ao carregar SVG:', error);
      }
    );
  }

  private animate = () => {
    this.animationId = requestAnimationFrame(this.animate);
    this.group.rotation.y += 0.015;

    this.renderer.render(this.scene, this.camera);
  };
}
