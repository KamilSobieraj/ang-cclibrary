import {Component, Input, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-book-details-element',
  templateUrl: './book-details-element.component.html',
  styleUrls: ['./book-details-element.component.scss']
})
export class BookDetailsElementComponent implements OnInit {
@Input() header: string;
@Input() content: string;
@Input() iconName: string;

  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon('book-available',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/icons/available.svg'));
    this.matIconRegistry.addSvgIcon('book-unavailable',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/icons/cross.svg'));
  }

  ngOnInit() {
  }

}
