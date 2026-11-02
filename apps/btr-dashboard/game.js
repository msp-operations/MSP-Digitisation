// BTR Thesis Runner - Easter Egg Game
// A simple endless runner game

(function() {
    const canvas = document.getElementById('gameCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const overlay = document.getElementById('gameOverlay');
    const scoreEl = document.getElementById('gameScore');
    const highScoreEl = document.getElementById('highScore');

    let gameRunning = false;
    let score = 0;
    let highScore = parseInt(localStorage.getItem('btrHighScore') || '0');
    let animationId;

    // Player
    const player = {
        x: 80,
        y: 280,
        width: 40,
        height: 50,
        vy: 0,
        jumping: false,
        ducking: false,
        groundY: 280
    };

    // Game state
    let obstacles = [];
    let frameCount = 0;
    let speed = 5;
    const gravity = 0.6;
    const jumpForce = -13;

    if (highScoreEl) highScoreEl.textContent = highScore;

    function easterEggClick() {
        overlay.classList.add('active');
        startGame();
    }

    function startGame() {
        gameRunning = true;
        score = 0;
        speed = 5;
        frameCount = 0;
        obstacles = [];
        player.y = player.groundY;
        player.vy = 0;
        player.jumping = false;
        player.ducking = false;
        if (scoreEl) scoreEl.textContent = '0';
        gameLoop();
    }

    function gameLoop() {
        if (!gameRunning) return;
        update();
        draw();
        animationId = requestAnimationFrame(gameLoop);
    }

    function update() {
        frameCount++;
        score = Math.floor(frameCount / 6);
        if (scoreEl) scoreEl.textContent = score;

        // Speed increases over time
        speed = 5 + Math.floor(score / 100) * 0.5;

        // Player physics
        if (player.jumping) {
            player.vy += gravity;
            player.y += player.vy;
            if (player.y >= player.groundY) {
                player.y = player.groundY;
                player.jumping = false;
                player.vy = 0;
            }
        }

        // Duck height
        player.height = player.ducking ? 30 : 50;
        if (player.ducking) {
            player.y = player.groundY + 20;
        } else if (!player.jumping) {
            player.y = player.groundY;
        }

        // Spawn obstacles
        if (frameCount % Math.max(60, 120 - score) === 0) {
            const isHigh = Math.random() > 0.6;
            obstacles.push({
                x: canvas.width,
                y: isHigh ? 260 : 290,
                width: 25 + Math.random() * 20,
                height: isHigh ? 70 : 40,
                type: isHigh ? 'high' : 'low'
            });
        }

        // Move obstacles
        for (let i = obstacles.length - 1; i >= 0; i--) {
            obstacles[i].x -= speed;
            if (obstacles[i].x + obstacles[i].width < 0) {
                obstacles.splice(i, 1);
                continue;
            }

            // Collision detection
            const o = obstacles[i];
            const px = player.x;
            const py = player.y;
            const pw = player.width;
            const ph = player.height;

            if (px < o.x + o.width && px + pw > o.x &&
                py < o.y + o.height && py + ph > o.y) {
                gameOver();
                return;
            }
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Ground
        ctx.fillStyle = '#001C3D';
        ctx.fillRect(0, 330, canvas.width, 70);

        // Ground line
        ctx.strokeStyle = '#E84E10';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, 330);
        ctx.lineTo(canvas.width, 330);
        ctx.stroke();

        // Player (graduation cap shape)
        ctx.fillStyle = '#E84E10';
        ctx.fillRect(player.x, player.y, player.width, player.height);
        // Hat
        ctx.fillStyle = '#001C3D';
        ctx.fillRect(player.x - 5, player.y - 8, player.width + 10, 12);

        // Obstacles
        for (const o of obstacles) {
            ctx.fillStyle = o.type === 'high' ? '#00BCD4' : '#002D5A';
            ctx.fillRect(o.x, o.y, o.width, o.height);
            // Label
            ctx.fillStyle = '#fff';
            ctx.font = '10px Montserrat, sans-serif';
            ctx.textAlign = 'center';
            const labels = ['DEADLINE', 'THESIS', 'EXAM', 'RUBRIC', 'PROPOSAL'];
            ctx.fillText(labels[Math.floor(o.x) % labels.length], o.x + o.width / 2, o.y + o.height / 2 + 4);
        }

        // Score display on canvas
        ctx.fillStyle = '#001C3D';
        ctx.font = 'bold 20px Montserrat, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText('Score: ' + score, canvas.width - 20, 30);
    }

    function gameOver() {
        gameRunning = false;
        cancelAnimationFrame(animationId);

        if (score > highScore) {
            highScore = score;
            localStorage.setItem('btrHighScore', highScore.toString());
            if (highScoreEl) highScoreEl.textContent = highScore;
        }

        // Draw game over screen
        ctx.fillStyle = 'rgba(0, 28, 61, 0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 48px Montserrat, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over!', canvas.width / 2, 160);
        ctx.font = '24px Montserrat, sans-serif';
        ctx.fillText('Score: ' + score, canvas.width / 2, 210);
        ctx.font = '18px Open Sans, sans-serif';
        ctx.fillStyle = '#00BCD4';
        ctx.fillText('Press SPACE to play again', canvas.width / 2, 260);
    }

    function closeGame() {
        gameRunning = false;
        cancelAnimationFrame(animationId);
        overlay.classList.remove('active');
    }

    // Controls
    document.addEventListener('keydown', function(e) {
        if (!overlay.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeGame();
            return;
        }

        if ((e.key === ' ' || e.key === 'ArrowUp') && !gameRunning) {
            e.preventDefault();
            startGame();
            return;
        }

        if (!gameRunning) return;

        if ((e.key === ' ' || e.key === 'ArrowUp') && !player.jumping) {
            e.preventDefault();
            player.jumping = true;
            player.vy = jumpForce;
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            player.ducking = true;
        }
    });

    document.addEventListener('keyup', function(e) {
        if (e.key === 'ArrowDown') {
            player.ducking = false;
        }
    });

    // Expose easterEggClick globally
    window.easterEggClick = easterEggClick;
})();
