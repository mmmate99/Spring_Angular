import { Component, Input, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

declare var monaco: any;

@Component({
  selector: 'app-code-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './code-editor.html',
  styleUrl: './code-editor.css'
})
export class CodeEditorComponent implements AfterViewInit, OnDestroy {
  @Input() code: string = '';
  @Input() language: string = 'typescript';
  @Input() theme: string = 'vs-dark';
  @Input() readOnly: boolean = false;
  @Input() height: string = '400px';

  private editor: any;
  private monacoInitialized = false;

  constructor(private elementRef: ElementRef) {}

  async ngAfterViewInit(): Promise<void> {
    await this.loadMonacoEditor();
    this.initializeEditor();
  }

  ngOnDestroy(): void {
    if (this.editor) {
      this.editor.dispose();
    }
  }

  private async loadMonacoEditor(): Promise<void> {
    if (this.monacoInitialized) return;

    // Dynamically load Monaco editor
    const loaderScript = document.createElement('script');
    loaderScript.src = 'https://unpkg.com/monaco-editor@0.44.0/min/vs/loader.js';
    
    return new Promise((resolve, reject) => {
      loaderScript.onload = () => {
        (window as any).require.config({ paths: { vs: 'https://unpkg.com/monaco-editor@0.44.0/min/vs' } });
        (window as any).require(['vs/editor/editor.main'], () => {
          this.monacoInitialized = true;
          resolve();
        });
      };
      loaderScript.onerror = reject;
      document.head.appendChild(loaderScript);
    });
  }

  private initializeEditor(): void {
    const editorContainer = this.elementRef.nativeElement.querySelector('#editor-container');
    
    this.editor = monaco.editor.create(editorContainer, {
      value: this.code,
      language: this.language,
      theme: this.theme,
      readOnly: this.readOnly,
      automaticLayout: true,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      fontSize: 14,
      lineNumbers: 'on',
      roundedSelection: true,
      scrollbar: {
        vertical: 'visible',
        horizontal: 'visible',
        useShadows: false
      },
      lineHeight: 20,
      letterSpacing: 0.5,
    });

    // Adjust height
    editorContainer.style.height = this.height;
  }

  getCode(): string {
    return this.editor ? this.editor.getValue() : this.code;
  }

  setCode(code: string): void {
    if (this.editor) {
      this.editor.setValue(code);
    }
  }

  changeLanguage(language: string): void {
    if (this.editor) {
      monaco.editor.setModelLanguage(this.editor.getModel(), language);
    }
  }

  changeTheme(theme: string): void {
    if (this.editor) {
      monaco.editor.setTheme(theme);
    }
  }
}