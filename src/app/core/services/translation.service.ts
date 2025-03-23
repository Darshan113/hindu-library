import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from '../constants/languages.constant';

@Injectable({
    providedIn: 'root'
})
export class TranslationService {
    private defaultLanguage: LanguageEnum = LanguageEnum.ENGLISH;

    constructor(public translate: TranslateService) {
        this.initLanguage();
    }

    // Initialize Language (Set Default Only)
    private initLanguage() {
        this.translate.setDefaultLang(this.defaultLanguage);
        this.translate.use(this.defaultLanguage);
    }

    // Get Current Language
    getCurrentLanguage(): LanguageEnum {
        return (this.translate.currentLang as LanguageEnum) || this.defaultLanguage;
    }

    // Switch Language (Only If Available)
    switchLanguage(lang: LanguageEnum) {
        if (Object.values(LanguageEnum).includes(lang)) {
            this.translate.use(lang);
        } else {
            console.warn(`Language "${lang}" is not supported`);
        }
    }
}
