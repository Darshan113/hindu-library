import { Component } from '@angular/core';
import { TranslationService } from '../../../core/services/translation.service';
import { Router } from '@angular/router';
import { LanguageEnum } from '../../../core/constants/languages.constant';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../core/services/auth.service';
import { TokenService } from '../../../core/services/token.service';

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
  isLoggedIn = false;
  userName: string | null = null;

  constructor(
    private translationService: TranslationService,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit() {
    // Subscribe to token state changes
    this.tokenService.authState$.subscribe(authState => {
      this.isLoggedIn = !!authState.token;
      this.userName = authState.user ? authState.user.name : null;
      this.updateMenuItems();
    });

    this.translationService.translate.onLangChange.subscribe(() => this.updateMenuItems());
  }

  updateMenuItems() {
    const baseItems: MenuItem[] = [
      { label: this.translationService.translate.instant('home'), icon: 'pi pi-home', routerLink: ['/'] },
      { label: this.translationService.translate.instant('about'), icon: 'pi pi-info', command: () => this.scrollToFooter() },
      { label: this.translationService.translate.instant('contact'), icon: 'pi pi-envelope', command: () => alert(this.translationService.translate.instant('footer_contact')) }
    ];

    if (this.isLoggedIn) {
      baseItems.push({
        label: this.userName || 'User',
        icon: 'pi pi-user',
        items: [
          { label: this.translationService.translate.instant('dashboard'), icon: 'pi pi-th-large', routerLink: ['/dashboard'] },
          { label: this.translationService.translate.instant('logout'), icon: 'pi pi-sign-out', command: () => this.logout() }
        ]
      });
    }

    this.menuItems = baseItems;
  }

  changeLanguage(event: any) {
    this.translationService.switchLanguage(event.value);
    this.selectedLanguage = this.translationService.getCurrentLanguage();
  }

  logout() {
    this.authService.logout();
  }

  scrollToFooter() {
    document.querySelector('p-footer')?.scrollIntoView({ behavior: 'smooth' });
  }
}
