import { Component } from '@angular/core';
import { TranslationService } from '../core/services/translation.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { LanguageEnum } from '../core/constants/languages.constant';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  menuItems: MenuItem[] = [];
  languages = [
    { label: 'English', value: LanguageEnum.ENGLISH },
    { label: 'हिन्दी', value: LanguageEnum.HINDI }
  ];
  selectedLanguage = this.translationService.getCurrentLanguage();

  constructor(
    private router: Router,
    private translationService: TranslationService
  ) {}

  ngOnInit() {
    this.updateMenuItems();
    // Listen for language changes (if needed, depending on service implementation)
    this.translationService.translate.onLangChange.subscribe(() => this.updateMenuItems());
  }

  updateMenuItems() {
    this.menuItems = [
      { label: this.translationService.translate.instant('home'), icon: 'pi pi-home', routerLink: ['/'] },
      { label: this.translationService.translate.instant('about'), icon: 'pi pi-info', command: () => this.scrollToFooter() },
      { label: this.translationService.translate.instant('contact'), icon: 'pi pi-envelope', command: () => alert(this.translationService.translate.instant('footer_contact')) }
    ];
  }

  changeLanguage(event: any) {
    this.translationService.switchLanguage(event.value);
    this.selectedLanguage = this.translationService.getCurrentLanguage();
  }

  guestLogin() {
    this.router.navigate(['/dashboard']);
  }

  scrollToFooter() {
    document.querySelector('p-footer')?.scrollIntoView({ behavior: 'smooth' });
  }
}
