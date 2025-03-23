import { Component } from '@angular/core';
import { TranslationService } from '../../../core/services/translation.service';
import { Router } from '@angular/router';
import { LanguageEnum } from '../../../core/constants/languages.constant';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  menuItems: MenuItem[] = [];
  languages = [
    { label: 'English', value: LanguageEnum.ENGLISH },
    { label: 'हिन्दी', value: LanguageEnum.HINDI }
  ];
  selectedLanguage = this.translationService.getCurrentLanguage();

  constructor(
    private translationService: TranslationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateMenuItems();
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

  scrollToFooter() {
    document.querySelector('p-footer')?.scrollIntoView({ behavior: 'smooth' });
  }
}
