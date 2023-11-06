import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface Article {
  id: string,
  content: SafeHtml
}

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.css']
})
export class DocumentationComponent implements OnInit, AfterViewInit {
  article$!: Observable<Article>;

  debugPosition: number = 0;
  activeHeadingIndex: number = 0;
  headingPositions: number[] = [];
  headingElements: Element[] = [];

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.http.get("/assets/documentation/regles-jeu.html", { responseType: 'text' }).subscribe(
      data => {
        this.article$ = of(
          {
            id: 'regles-jeu',
            content: this.sanitizer.bypassSecurityTrustHtml(data)
          }
      );
      this.getHeading();
    });
  }

  @HostListener('window:scroll', ['$event'])
  scroll() {
    console.log("Scroll");
    this.getTableOfContents();
  }

  @HostListener('window:resize', ['$event'])
  resize() {
    console.log("Resizing");
    this.getHeading();
  }

  scrollToHeading(event: any): boolean {
    const id = event.target.hash.replace('#', '');
    if (id !== '') {
      let doc = document.getElementById(id);
      if (doc) {
        const rectTop = doc.getBoundingClientRect().top;
        const position = window.scrollY;
        const top = rectTop + position;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
    return false;
  }

  private getTableOfContents() {
    if (this.headingPositions.length) {
      const position = window.scrollY;
      this.debugPosition = Math.round(position);

      this.headingPositions.forEach((headingPositon, index) => {
        if (headingPositon < position) {
          this.activeHeadingIndex = index;
          console.log("Position: " + position + " => Active heading index: " + index);
        }
      });
    }    
  }
  
  private getHeading() {
    setTimeout(() => {
      const headingTagElements = document.querySelectorAll(
        '.main_content h2, .main_content h3, .main_content h4'
      );

      this.headingElements = [];
      headingTagElements.forEach((headingTagElement, index) => {
        headingTagElement.id = 'heading' + index;
        this.headingElements.push(headingTagElement);

        let top = Math.round(headingTagElement.getBoundingClientRect().top) - 1;
        this.headingPositions.push(top);
        console.log("Heading tag element: " + headingTagElement.id + " / " + headingTagElement.tagName + " / " + headingTagElement.textContent + ", position: " + top);
      });
    }, 100);
  }
}
