import { Component, AfterViewInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Position {
  x: number;
  y: number;
}

@Component({
  selector: 'app-snake-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './snake-game.html',
  styleUrl: './snake-game.css'
})
export class SnakeGameComponent implements AfterViewInit {
  @Input() width: number = 400;
  @Input() height: number = 400;
  @Input() gridSize: number = 20;

  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private snake: Position[] = [];
  private food: Position = { x: 0, y: 0 };
  private direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' = 'RIGHT';
  private gameLoop: any;
  public score: number = 0;
  private gameStarted: boolean = false;
  private gameOver: boolean = false;

  ngAfterViewInit(): void {
    this.canvas = document.getElementById('snake-canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.initializeGame();
    this.setupEventListeners();
  }

  private initializeGame(): void {
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    // Initialize snake in the middle
    const startX = Math.floor(this.width / this.gridSize / 2) * this.gridSize;
    const startY = Math.floor(this.height / this.gridSize / 2) * this.gridSize;
    
    this.snake = [
      { x: startX, y: startY },
      { x: startX - this.gridSize, y: startY },
      { x: startX - this.gridSize * 2, y: startY }
    ];

    this.generateFood();
    this.draw();
  }

  private setupEventListeners(): void {
    document.addEventListener('keydown', (event) => {
      if (!this.gameStarted && !this.gameOver) {
        this.startGame();
      }

      switch(event.key) {
        case 'ArrowUp':
          if (this.direction !== 'DOWN') this.direction = 'UP';
          break;
        case 'ArrowDown':
          if (this.direction !== 'UP') this.direction = 'DOWN';
          break;
        case 'ArrowLeft':
          if (this.direction !== 'RIGHT') this.direction = 'LEFT';
          break;
        case 'ArrowRight':
          if (this.direction !== 'LEFT') this.direction = 'RIGHT';
          break;
      }
    });
  }

  startGame(): void {
    this.gameStarted = true;
    this.gameOver = false;
    this.score = 0;
    
    this.gameLoop = setInterval(() => {
      this.moveSnake();
      this.checkCollision();
      this.draw();
    }, 150);
  }

  private moveSnake(): void {
    const head = { ...this.snake[0] };

    switch(this.direction) {
      case 'UP': head.y -= this.gridSize; break;
      case 'DOWN': head.y += this.gridSize; break;
      case 'LEFT': head.x -= this.gridSize; break;
      case 'RIGHT': head.x += this.gridSize; break;
    }

    this.snake.unshift(head);

    // Check if snake ate food
    if (head.x === this.food.x && head.y === this.food.y) {
      this.score += 10;
      this.generateFood();
    } else {
      this.snake.pop();
    }
  }

  private checkCollision(): void {
    const head = this.snake[0];

    // Wall collision
    if (head.x < 0 || head.x >= this.width || head.y < 0 || head.y >= this.height) {
      this.endGame();
      return;
    }

    // Self collision
    for (let i = 1; i < this.snake.length; i++) {
      if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
        this.endGame();
        return;
      }
    }
  }

  private endGame(): void {
    this.gameOver = true;
    this.gameStarted = false;
    clearInterval(this.gameLoop);
  }

  private generateFood(): void {
    const maxX = Math.floor(this.width / this.gridSize) - 1;
    const maxY = Math.floor(this.height / this.gridSize) - 1;

    this.food = {
      x: Math.floor(Math.random() * maxX) * this.gridSize,
      y: Math.floor(Math.random() * maxY) * this.gridSize
    };

    // Make sure food doesn't spawn on snake
    for (const segment of this.snake) {
      if (segment.x === this.food.x && segment.y === this.food.y) {
        this.generateFood();
        break;
      }
    }
  }

  private draw(): void {
    // Clear canvas
    this.ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg-primary') || '#0d1117';
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Draw snake
    this.snake.forEach((segment, index) => {
      this.ctx.fillStyle = index === 0 ? '#238636' : '#58a6ff';
      this.ctx.fillRect(segment.x, segment.y, this.gridSize - 1, this.gridSize - 1);
    });

    // Draw food
    this.ctx.fillStyle = '#da3633';
    this.ctx.fillRect(this.food.x, this.food.y, this.gridSize - 1, this.gridSize - 1);

    // Draw score
    this.ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-primary') || '#f0f6fc';
    this.ctx.font = '16px Arial';
    this.ctx.fillText(`Pont: ${this.score}`, 10, 20);

    // Draw game over
    if (this.gameOver) {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
      this.ctx.fillRect(0, 0, this.width, this.height);
      
      this.ctx.fillStyle = '#ffffff';
      this.ctx.font = '24px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('Játék vége!', this.width / 2, this.height / 2 - 20);
      this.ctx.font = '16px Arial';
      this.ctx.fillText(`Végső pont: ${this.score}`, this.width / 2, this.height / 2 + 10);
      this.ctx.fillText('Nyomj egy gombot az újraindításhoz', this.width / 2, this.height / 2 + 40);
    } else if (!this.gameStarted) {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
      this.ctx.fillRect(0, 0, this.width, this.height);
      
      this.ctx.fillStyle = '#ffffff';
      this.ctx.font = '24px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('Snake Játék', this.width / 2, this.height / 2 - 40);
      this.ctx.font = '16px Arial';
      this.ctx.fillText('Használd a nyíl gombokat a mozgáshoz', this.width / 2, this.height / 2);
      this.ctx.fillText('Nyomj egy gombot a kezdéshez', this.width / 2, this.height / 2 + 30);
    }
  }

  restartGame(): void {
    clearInterval(this.gameLoop);
    this.initializeGame();
  }
}