import { Component, AfterViewInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About implements AfterViewInit, OnDestroy {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);

      // تنظيف أي بقايا من صفحات أخرى
      ScrollTrigger.getAll().forEach(t => t.kill());

      setTimeout(() => {
        // بننادي على الدالة السحرية مرة واحدة فقط
        this.initGlobalReveal();
        
        // لو عندك صورة محددة عايز فيها تأثير المغناطيس (اختياري)
        this.initAboutMagnetic();
      }, 400);
    }
  }

  /**
   * دالة المراقبة الشاملة:
   * أي عنصر في صفحة الـ About واخد كلاس .reveal-effect 
   * هيتم تحريكه تلقائياً هو وعناصره الداخلية
   */
  initGlobalReveal() {
    const sections = document.querySelectorAll('.reveal-effect');

    sections.forEach((section) => {
      // بنمسك العناصر اللي عايزين نحركها جوه السكشن (العناوين، الـ items، الصور)
      // دي بتخلي الأنميشن يمسك الـ exp-item والـ skill-item وأي ابن مباشر
      const children = section.querySelectorAll(':scope > *, .exp-item, .skill-item');

      if (children.length > 0) {
        gsap.to(children, {
          scrollTrigger: {
            trigger: section,
            start: "top 85%", // يبدأ لما السكشن يظهر منه 15% في الشاشة
            toggleActions: "play none none none"
          },
          opacity: 1,
          y: 0,
          duration: 2,
          stagger: 0.3, // سرعة التتابع بين العناصر
          ease: "power2.out",
          overwrite: "auto"
        });
      }
    });
  }

  initAboutMagnetic() {
    const frame = document.querySelector('.frame-wrapper') as HTMLElement;
    if (!frame) return;

    // عند تحريك الماوس داخل نطاق البرواز
    frame.addEventListener('mousemove', (e: MouseEvent) => {
      const { left, top, width, height } = frame.getBoundingClientRect();
      
      // حساب مسافة الماوس عن مركز العنصر
      const moveX = (e.clientX - (left + width / 2)) / (width / 2) * 20;
      const moveY = (e.clientY - (top + height / 2)) / (height / 2) * 20;

      gsap.to(frame, {
        x: moveX,
        y: moveY,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto"
      });
    });

    // عند خروج الماوس يرجع العنصر لمكانه الأصلي بنعومة
    frame.addEventListener('mouseleave', () => {
      gsap.to(frame, {
        x: 0,
        y: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.4)", // تأثير السوستة الفخم
        overwrite: "auto"
      });
    });
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      ScrollTrigger.getAll().forEach(t => t.kill());
    }
  }
}