import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.html', // بدون .component
  styleUrls: ['./navbar.css']    // بدون .component
})
export class NavbarComponent {
  // دالة لجعل الشاشة تصعد للأعلى عند الضغط على اللوجو
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}