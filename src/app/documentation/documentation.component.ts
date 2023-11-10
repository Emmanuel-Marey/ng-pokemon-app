import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';

@Component({
    selector: 'app-documentation',
    templateUrl: './documentation.component.html',
    styleUrls: ['./documentation.component.css']
})
export class DocumentationComponent implements OnInit, AfterViewInit {

    debugPosition: number = 0;
    activeHeadingIndex: number = 0;
    headingPositions: number[] = [];
    headingElements: Element[] = [];

    constructor() {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.getHeading();
    }

    @HostListener('window:scroll', ['$event'])
    scroll() {
        console.log("Scroll");
        this.getTableOfContents();
    }

    @HostListener('window:resize', ['$event'])
    resize() {
        console.log("Resize");
        this.getHeading();
    }

    scrollToHeading(event: any): boolean {
        console.log("Scroll to heading");
        const id = event.target.hash.replace('#', '');
        if (id !== '') {
            let htmlElement = document.getElementById(id);
            if (htmlElement) {
                const rectTop = htmlElement.getBoundingClientRect().top;
                const position = window.scrollY;
                const top = rectTop + position;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        }
        return false;
    }

    private getTableOfContents() {
        console.log("Get table of contents");
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
        console.log("Get heading");
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