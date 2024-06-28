// src/Compass.tsx
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Compass: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Create Compass

    // Compass Base
    const baseGeometry = new THREE.CylinderGeometry(2, 2, 0.5, 32);
    const baseMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    scene.add(base);

    // Compass Needle
    const needleGeometry = new THREE.BoxGeometry(0.1, 3, 0.1);
    const needleMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const needle = new THREE.Mesh(needleGeometry, needleMaterial);
    needle.position.y = 1.5;
    scene.add(needle);

    // Light
    const light = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(light);

    const animate = () => {
      requestAnimationFrame(animate);
      needle.rotation.z += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      currentMount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default Compass;
