import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);
      
      setTimeout(() => {
        // بنشغل أنميشن الدخول للهيرو الأول
        this.initHeroEntrance();
        // بنشغل خاصية المغناطيس للصورة
        this.initMagneticPhoto();
        // بنشغل أنميشن السكرول لبقية الصفحة
        this.initSmartReveal();
      }, 300);
    }
  }

  // --- أنميشن دخول الهيرو (دمجنا فيه كل العناصر اللي في الـ HTML بتاعك) ---
  initHeroEntrance() {
    const tl = gsap.timeline();

    // تجهيز العناصر في حالة مخفية
    tl.set(".greeting, .name, .job-title, .description, .cta-buttons, .image-wrapper", { 
      opacity: 0, 
      y: 30 
    });

    // سيكوانس الظهور (Timeline)
    tl.to(".image-wrapper", { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" })
      .to(".greeting", { opacity: 1, y: 0, duration: 0.6 }, "-=0.8")
      .to(".name", { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=0.6")
      .to(".job-title, .description", { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 }, "-=0.5")
      .to(".cta-buttons", { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
      .fromTo(".logo-badge-integrated", 
        { scale: 0, rotation: -45 }, 
        { scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=0.3");

    // تأثير البارالاكس (Parallax) للصورة وأنت نازل بالسكرول
    gsap.to(".image-wrapper", {
      scrollTrigger: {
        trigger: ".hero-container",
        start: "top top",
        end: "bottom top",
        scrub: true
      },
      y: 80,
      overwrite: "auto"
    });
  }

  // --- أنميشن المغناطيس (Magnetic) للصورة ---
  initMagneticPhoto() {
    const photo = document.querySelector('.image-wrapper') as HTMLElement;
    if (!photo) return;

    const power = 40; 

    photo.addEventListener('mousemove', (e: MouseEvent) => {
      // بنوقف أي أنميشن شغال حالياً عشان الماوس يستلم القيادة
      gsap.killTweensOf(photo);

      const { left, top, width, height } = photo.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const moveX = (e.clientX - centerX) / (width / 2) * power;
      const moveY = (e.clientY - centerY) / (height / 2) * power;

      gsap.to(photo, {
        x: moveX,
        y: moveY,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto"
      });
    });

    photo.addEventListener('mouseleave', () => {
      // ردة الفعل المطاطية (Elastic)
      gsap.to(photo, {
        x: 0,
        y: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.3)",
        overwrite: "auto"
      });
    });
  }

  // --- أنميشن الظهور لبقية السكاشن (Reveal) ---
  initSmartReveal() {
    const revealSections = document.querySelectorAll('.reveal-effect');

    revealSections.forEach((section) => {
      const children = section.querySelectorAll(':scope > *'); 

      if (children.length > 0) {
        gsap.to(children, {
          scrollTrigger: {
            trigger: section,
            start: "top 75%", // خليتها 75% عشان تظهر بدري شوية والمستخدم ميشوفش فراغ
            toggleActions: "play none none none"
          },
          opacity: 1,
          y: 0,
          duration: 1.2, // قللت الـ 5 ثواني عشان تكون أسرع وأذكى
          stagger: 0.2,   // قللت الـ 0.8 عشان العناصر متتأخرش ورا بعضها أوي
          ease: "expo.out",
          overwrite: "auto"
        });
      }
    });
  }

  playVid(v: HTMLVideoElement) { if(v) v.play(); }
  pauseVid(v: HTMLVideoElement) { if(v) v.pause(); }
}