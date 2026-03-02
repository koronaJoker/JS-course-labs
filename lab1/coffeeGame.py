import pygame
import random

# Инициализация Pygame
pygame.init()

# Размеры окна
WIDTH, HEIGHT = 640, 480
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Собери все кофе!")

# Цвета
WHITE = (255, 255, 255)
BROWN = (139, 69, 19)
BLACK = (0, 0, 0)

# Игрок и кофе параметры
player_size = 40
coffee_size = 32
player_speed = 5

player = pygame.Rect(WIDTH // 2, HEIGHT // 2, player_size, player_size)

def random_coffee():
    return pygame.Rect(
        random.randint(0, WIDTH - coffee_size),
        random.randint(0, HEIGHT - coffee_size),
        coffee_size, coffee_size
    )

coffee = random_coffee()
score = 0

font = pygame.font.SysFont("monospace", 28)
clock = pygame.time.Clock()

running = True
while running:
    clock.tick(60)
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Движение игрока
    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT] or keys[pygame.K_a]:
        player.x -= player_speed
    if keys[pygame.K_RIGHT] or keys[pygame.K_d]:
        player.x += player_speed
    if keys[pygame.K_UP] or keys[pygame.K_w]:
        player.y -= player_speed
    if keys[pygame.K_DOWN] or keys[pygame.K_s]:
        player.y += player_speed

    # Ограничение выхода за пределы экрана
    player.x = max(0, min(WIDTH - player_size, player.x))
    player.y = max(0, min(HEIGHT - player_size, player.y))

    # Проверка столкновения с кофе
    if player.colliderect(coffee):
        score += 1
        coffee = random_coffee()

    # Рисование
    screen.fill(WHITE)
    pygame.draw.rect(screen, BLACK, player)
    pygame.draw.rect(screen, BROWN, coffee)
    score_surf = font.render(f"Очки: {score}", True, BLACK)
    screen.blit(score_surf, (10, 10))

    pygame.display.flip()

pygame.quit()