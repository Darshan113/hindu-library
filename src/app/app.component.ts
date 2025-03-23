import { Component } from '@angular/core';
import { TranslationService } from './core/services/translation.service';
import { LanguageEnum } from './core/constants/languages.constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  LanguageEnum = LanguageEnum;

  constructor(private translationService: TranslationService) {}

  switchLanguage(lang: LanguageEnum) {
    this.translationService.switchLanguage(lang);
  }
}
