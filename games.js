// Games functionality for Emoji Copy Website

class EmojiGames {
    constructor() {
        this.currentGame = null;
        this.gameData = {
            guess: {
                questions: [
                    { emoji: '🎭', options: ['연극', '가면', '드라마', '코미디'], correct: 0, hint: '연극이나 드라마를 의미합니다' },
                    { emoji: '🏠', options: ['집', '건물', '호텔', '상점'], correct: 0, hint: '사람이 사는 곳입니다' },
                    { emoji: '🚗', options: ['자동차', '버스', '기차', '비행기'], correct: 0, hint: '개인 교통수단입니다' },
                    { emoji: '📚', options: ['책', '노트', '잡지', '신문'], correct: 0, hint: '지식을 담고 있는 것입니다' },
                    { emoji: '☕', options: ['커피', '차', '우유', '주스'], correct: 0, hint: '아침에 마시는 뜨거운 음료입니다' },
                    { emoji: '🌙', options: ['달', '별', '태양', '지구'], correct: 0, hint: '밤하늘에 떠 있는 천체입니다' },
                    { emoji: '🎸', options: ['기타', '피아노', '드럼', '바이올린'], correct: 0, hint: '줄을 튕겨서 소리내는 악기입니다' },
                    { emoji: '🐱', options: ['고양이', '개', '토끼', '햄스터'], correct: 0, hint: '야옹하고 우는 동물입니다' },
                    { emoji: '🍕', options: ['피자', '햄버거', '핫도그', '샌드위치'], correct: 0, hint: '이탈리아에서 온 둥근 음식입니다' },
                    { emoji: '⚽', options: ['축구공', '농구공', '야구공', '테니스공'], correct: 0, hint: '발로 차는 스포츠에 사용됩니다' }
                ],
                currentQuestion: 0,
                score: 0
            },
            memory: {
                sequence: [],
                playerSequence: [],
                level: 1,
                showingSequence: false,
                gameActive: false
            },
            story: {
                prompts: [
                    ['🐸', '👑', '💋', '👸'],
                    ['🚀', '👽', '🌍', '⭐'],
                    ['🦸', '🏙️', '💥', '🦹'],
                    ['🐺', '🌙', '🌲', '🏰'],
                    ['🧙', '📚', '⚡', '🪄'],
                    ['🐉', '💎', '⚔️', '🏰'],
                    ['🤖', '🌆', '⚡', '🔧'],
                    ['🦄', '🌈', '✨', '🏔️']
                ],
                currentPrompt: 0,
                stories: []
            }
        };
    }

    initGuessGame() {
        this.currentGame = 'guess';
        this.gameData.guess.currentQuestion = 0;
        this.gameData.guess.score = 0;
        
        const content = document.getElementById('game-content');
        content.innerHTML = `
            <div class="guess-game">
                <h2>🤔 이모지 맞추기 게임</h2>
                <div class="game-progress">
                    <div class="score">점수: <span id="guess-score">0</span></div>
                    <div class="question-counter">문제: <span id="question-num">1</span> / 10</div>
                </div>
                
                <div class="game-emoji" id="game-emoji">🎭</div>
                <p id="guess-hint" class="game-hint">이 이모지가 표현하는 것은?</p>
                
                <div class="game-options" id="game-options">
                    <!-- Options will be populated here -->
                </div>
                
                <div id="game-result" class="game-result"></div>
                <button id="next-question" class="next-btn" style="display:none;">다음 문제</button>
                <button id="restart-guess" class="restart-btn" style="display:none;">다시 시작</button>
            </div>
        `;

        this.showGuessQuestion();
        this.bindGuessEvents();
    }

    showGuessQuestion() {
        const data = this.gameData.guess;
        const question = data.questions[data.currentQuestion];
        
        document.getElementById('game-emoji').textContent = question.emoji;
        document.getElementById('guess-hint').textContent = question.hint;
        document.getElementById('guess-score').textContent = data.score;
        document.getElementById('question-num').textContent = data.currentQuestion + 1;
        
        const optionsContainer = document.getElementById('game-options');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.onclick = () => this.checkGuessAnswer(index);
            optionsContainer.appendChild(button);
        });

        document.getElementById('game-result').innerHTML = '';
        document.getElementById('next-question').style.display = 'none';
        document.getElementById('restart-guess').style.display = 'none';
    }

    checkGuessAnswer(selectedIndex) {
        const data = this.gameData.guess;
        const question = data.questions[data.currentQuestion];
        const isCorrect = selectedIndex === question.correct;
        
        const options = document.querySelectorAll('.option-btn');
        options.forEach((btn, index) => {
            btn.disabled = true;
            if (index === question.correct) {
                btn.classList.add('correct');
            } else if (index === selectedIndex && !isCorrect) {
                btn.classList.add('wrong');
            }
        });

        const resultDiv = document.getElementById('game-result');
        if (isCorrect) {
            data.score += 10;
            resultDiv.innerHTML = '<p class="correct-answer">정답입니다! 🎉 (+10점)</p>';
        } else {
            resultDiv.innerHTML = '<p class="wrong-answer">틀렸습니다! 😅 정답: ' + question.options[question.correct] + '</p>';
        }

        document.getElementById('guess-score').textContent = data.score;
        
        if (data.currentQuestion < data.questions.length - 1) {
            document.getElementById('next-question').style.display = 'block';
        } else {
            this.endGuessGame();
        }
    }

    endGuessGame() {
        const data = this.gameData.guess;
        const resultDiv = document.getElementById('game-result');
        const percentage = Math.round((data.score / (data.questions.length * 10)) * 100);
        
        let message = '';
        if (percentage >= 80) {
            message = '🏆 훌륭합니다! 이모지 마스터네요!';
        } else if (percentage >= 60) {
            message = '👍 좋은 실력이에요! 조금만 더 연습하면 완벽해질 거예요!';
        } else if (percentage >= 40) {
            message = '😊 나쁘지 않아요! 다시 도전해보세요!';
        } else {
            message = '💪 포기하지 마세요! 연습하면 더 잘할 수 있어요!';
        }
        
        resultDiv.innerHTML = `
            <div class="game-final-result">
                <h3>게임 종료!</h3>
                <p>최종 점수: ${data.score} / ${data.questions.length * 10} (${percentage}%)</p>
                <p>${message}</p>
            </div>
        `;
        
        document.getElementById('restart-guess').style.display = 'block';
    }

    bindGuessEvents() {
        document.getElementById('next-question').onclick = () => {
            this.gameData.guess.currentQuestion++;
            this.showGuessQuestion();
        };
        
        document.getElementById('restart-guess').onclick = () => {
            this.initGuessGame();
        };
    }

    initMemoryGame() {
        this.currentGame = 'memory';
        this.gameData.memory = {
            sequence: [],
            playerSequence: [],
            level: 1,
            showingSequence: false,
            gameActive: false
        };
        
        const content = document.getElementById('game-content');
        content.innerHTML = `
            <div class="memory-game">
                <h2>🧠 이모지 기억하기 게임</h2>
                <div class="game-info">
                    <div class="level">레벨: <span id="memory-level">1</span></div>
                    <div class="sequence-length">시퀀스 길이: <span id="sequence-length">3</span></div>
                </div>
                
                <div id="memory-sequence" class="memory-display"></div>
                
                <div class="memory-controls">
                    <button id="start-memory" class="start-btn">시작하기</button>
                    <button id="show-sequence" class="show-btn" style="display:none;">시퀀스 다시 보기</button>
                </div>
                
                <div id="memory-input" class="memory-input" style="display:none;">
                    <p>순서대로 클릭하세요:</p>
                    <div class="emoji-buttons" id="emoji-buttons"></div>
                </div>
                
                <div id="memory-result" class="game-result"></div>
            </div>
        `;

        this.bindMemoryEvents();
    }

    startMemoryRound() {
        const data = this.gameData.memory;
        const emojis = ['😀', '😂', '❤️', '🔥', '⭐', '🎉', '👍', '✨', '💯', '🌟'];
        
        // Generate sequence
        const sequenceLength = 2 + data.level;
        data.sequence = [];
        for (let i = 0; i < sequenceLength; i++) {
            data.sequence.push(emojis[Math.floor(Math.random() * emojis.length)]);
        }
        
        data.playerSequence = [];
        data.showingSequence = true;
        
        document.getElementById('memory-level').textContent = data.level;
        document.getElementById('sequence-length').textContent = sequenceLength;
        document.getElementById('memory-result').innerHTML = '';
        document.getElementById('memory-input').style.display = 'none';
        document.getElementById('start-memory').style.display = 'none';
        document.getElementById('show-sequence').style.display = 'none';
        
        // Show sequence
        this.showMemorySequence();
    }

    showMemorySequence() {
        const data = this.gameData.memory;
        const display = document.getElementById('memory-sequence');
        display.innerHTML = '<p>순서를 기억하세요:</p>';
        
        const sequenceDiv = document.createElement('div');
        sequenceDiv.className = 'sequence-emojis';
        
        data.sequence.forEach((emoji, index) => {
            setTimeout(() => {
                const emojiSpan = document.createElement('span');
                emojiSpan.className = 'sequence-emoji highlight';
                emojiSpan.textContent = emoji;
                sequenceDiv.appendChild(emojiSpan);
                
                setTimeout(() => {
                    emojiSpan.classList.remove('highlight');
                }, 500);
                
                // After showing all emojis
                if (index === data.sequence.length - 1) {
                    setTimeout(() => {
                        this.startMemoryInput();
                    }, 1000);
                }
            }, index * 800);
        });
        
        display.appendChild(sequenceDiv);
    }

    startMemoryInput() {
        const data = this.gameData.memory;
        data.showingSequence = false;
        data.gameActive = true;
        
        document.getElementById('memory-sequence').innerHTML = '<p>이제 순서대로 클릭하세요!</p>';
        document.getElementById('memory-input').style.display = 'block';
        document.getElementById('show-sequence').style.display = 'block';
        
        // Create input buttons
        const buttonsContainer = document.getElementById('emoji-buttons');
        buttonsContainer.innerHTML = '';
        
        const allEmojis = ['😀', '😂', '❤️', '🔥', '⭐', '🎉', '👍', '✨', '💯', '🌟'];
        allEmojis.forEach(emoji => {
            const button = document.createElement('button');
            button.className = 'emoji-input-btn';
            button.textContent = emoji;
            button.onclick = () => this.handleMemoryInput(emoji);
            buttonsContainer.appendChild(button);
        });
    }

    handleMemoryInput(emoji) {
        const data = this.gameData.memory;
        if (!data.gameActive) return;
        
        data.playerSequence.push(emoji);
        const currentIndex = data.playerSequence.length - 1;
        
        // Check if correct so far
        if (data.playerSequence[currentIndex] === data.sequence[currentIndex]) {
            // Correct so far
            if (data.playerSequence.length === data.sequence.length) {
                // Complete sequence correct
                this.completeMemoryLevel();
            }
        } else {
            // Wrong answer
            this.endMemoryGame(false);
        }
    }

    completeMemoryLevel() {
        const data = this.gameData.memory;
        data.gameActive = false;
        data.level++;
        
        document.getElementById('memory-result').innerHTML = `
            <p class="correct-answer">정답입니다! 🎉 레벨 ${data.level}로 올라갑니다!</p>
        `;
        
        setTimeout(() => {
            if (data.level <= 10) {
                this.startMemoryRound();
            } else {
                this.endMemoryGame(true);
            }
        }, 2000);
    }

    endMemoryGame(completed) {
        const data = this.gameData.memory;
        data.gameActive = false;
        
        const resultDiv = document.getElementById('memory-result');
        if (completed) {
            resultDiv.innerHTML = `
                <div class="game-final-result">
                    <h3>🏆 축하합니다!</h3>
                    <p>모든 레벨을 완료했습니다!</p>
                    <p>최종 레벨: ${data.level - 1}</p>
                </div>
            `;
        } else {
            resultDiv.innerHTML = `
                <div class="game-final-result">
                    <h3>게임 오버!</h3>
                    <p>도달한 레벨: ${data.level}</p>
                    <p>다시 도전해보세요! 💪</p>
                </div>
            `;
        }
        
        document.getElementById('start-memory').style.display = 'block';
        document.getElementById('start-memory').textContent = '다시 시작';
        document.getElementById('memory-input').style.display = 'none';
        document.getElementById('show-sequence').style.display = 'none';
    }

    bindMemoryEvents() {
        document.getElementById('start-memory').onclick = () => {
            this.startMemoryRound();
        };
        
        document.getElementById('show-sequence').onclick = () => {
            if (!this.gameData.memory.gameActive) {
                this.showMemorySequence();
            }
        };
    }

    initStoryGame() {
        this.currentGame = 'story';
        const data = this.gameData.story;
        
        const content = document.getElementById('game-content');
        content.innerHTML = `
            <div class="story-game">
                <h2>📚 이모지 스토리 게임</h2>
                
                <div class="story-prompt">
                    <h3>이 이모지들로 스토리를 만들어보세요:</h3>
                    <div class="story-emojis" id="story-emojis">
                        <!-- Emojis will be populated here -->
                    </div>
                    <button id="new-prompt" class="new-prompt-btn">새로운 프롬프트</button>
                </div>
                
                <div class="story-input">
                    <textarea id="user-story" placeholder="여기에 창의적인 스토리를 작성해주세요..." rows="6"></textarea>
                    <div class="story-controls">
                        <button id="save-story" class="save-btn">스토리 저장</button>
                        <button id="share-story" class="share-btn">스토리 공유</button>
                        <button id="clear-story" class="clear-btn">지우기</button>
                    </div>
                </div>
                
                <div id="story-result" class="game-result"></div>
                
                <div class="story-gallery" id="story-gallery">
                    <h3>저장된 스토리들:</h3>
                    <div class="saved-stories" id="saved-stories">
                        <!-- Saved stories will appear here -->
                    </div>
                </div>
            </div>
        `;

        this.showNewStoryPrompt();
        this.bindStoryEvents();
        this.loadSavedStories();
    }

    showNewStoryPrompt() {
        const data = this.gameData.story;
        const currentPrompt = data.prompts[data.currentPrompt % data.prompts.length];
        
        const emojiContainer = document.getElementById('story-emojis');
        emojiContainer.innerHTML = '';
        
        currentPrompt.forEach(emoji => {
            const span = document.createElement('span');
            span.className = 'story-emoji';
            span.textContent = emoji;
            emojiContainer.appendChild(span);
        });
        
        data.currentPrompt++;
    }

    bindStoryEvents() {
        document.getElementById('new-prompt').onclick = () => {
            this.showNewStoryPrompt();
            document.getElementById('user-story').value = '';
            document.getElementById('story-result').innerHTML = '';
        };
        
        document.getElementById('save-story').onclick = () => {
            this.saveStory();
        };
        
        document.getElementById('share-story').onclick = () => {
            this.shareStory();
        };
        
        document.getElementById('clear-story').onclick = () => {
            document.getElementById('user-story').value = '';
            document.getElementById('story-result').innerHTML = '';
        };
    }

    saveStory() {
        const story = document.getElementById('user-story').value.trim();
        if (!story) {
            document.getElementById('story-result').innerHTML = 
                '<p class="error">스토리를 먼저 작성해주세요!</p>';
            return;
        }
        
        const emojis = Array.from(document.querySelectorAll('.story-emoji')).map(el => el.textContent);
        const storyData = {
            emojis: emojis,
            story: story,
            date: new Date().toLocaleDateString(),
            id: Date.now()
        };
        
        this.gameData.story.stories.push(storyData);
        localStorage.setItem('emojiStories', JSON.stringify(this.gameData.story.stories));
        
        document.getElementById('story-result').innerHTML = 
            '<p class="success">스토리가 저장되었습니다! 🎉</p>';
        
        this.loadSavedStories();
    }

    shareStory() {
        const story = document.getElementById('user-story').value.trim();
        if (!story) {
            document.getElementById('story-result').innerHTML = 
                '<p class="error">스토리를 먼저 작성해주세요!</p>';
            return;
        }
        
        const emojis = Array.from(document.querySelectorAll('.story-emoji')).map(el => el.textContent).join(' ');
        const shareText = `${emojis}\n\n${story}\n\n#EmojiStory #EmojiCopy`;
        
        if (navigator.share) {
            navigator.share({
                title: 'My Emoji Story',
                text: shareText
            });
        } else if (navigator.clipboard) {
            navigator.clipboard.writeText(shareText).then(() => {
                document.getElementById('story-result').innerHTML = 
                    '<p class="success">스토리가 클립보드에 복사되었습니다! 📋</p>';
            });
        } else {
            document.getElementById('story-result').innerHTML = 
                '<p class="info">스토리: ' + shareText + '</p>';
        }
    }

    loadSavedStories() {
        const saved = localStorage.getItem('emojiStories');
        if (saved) {
            this.gameData.story.stories = JSON.parse(saved);
        }
        
        const container = document.getElementById('saved-stories');
        container.innerHTML = '';
        
        if (this.gameData.story.stories.length === 0) {
            container.innerHTML = '<p class="no-stories">아직 저장된 스토리가 없습니다.</p>';
            return;
        }
        
        this.gameData.story.stories.slice(-5).reverse().forEach(storyData => {
            const div = document.createElement('div');
            div.className = 'saved-story';
            div.innerHTML = `
                <div class="story-header">
                    <span class="story-emojis">${storyData.emojis.join(' ')}</span>
                    <span class="story-date">${storyData.date}</span>
                </div>
                <div class="story-content">${storyData.story}</div>
                <button class="delete-story" onclick="window.emojiGames.deleteStory(${storyData.id})">삭제</button>
            `;
            container.appendChild(div);
        });
    }

    deleteStory(id) {
        this.gameData.story.stories = this.gameData.story.stories.filter(story => story.id !== id);
        localStorage.setItem('emojiStories', JSON.stringify(this.gameData.story.stories));
        this.loadSavedStories();
    }
}

// Initialize games when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.emojiGames = new EmojiGames();
    
    // Override the game initialization methods in the main app
    if (window.emojiApp) {
        window.emojiApp.startGame = function(gameType) {
            const modal = document.getElementById('game-modal');
            
            switch (gameType) {
                case 'guess':
                    window.emojiGames.initGuessGame();
                    break;
                case 'memory':
                    window.emojiGames.initMemoryGame();
                    break;
                case 'story':
                    window.emojiGames.initStoryGame();
                    break;
            }
            
            modal.style.display = 'block';
        };
    }
});

// Additional CSS styles for games (to be added to the main CSS)
const gameStyles = `
.guess-game, .memory-game, .story-game {
    text-align: center;
    max-width: 500px;
    margin: 0 auto;
}

.game-progress, .game-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 10px;
}

.game-emoji {
    font-size: 4rem;
    margin: 30px 0;
    padding: 20px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 20px;
    display: inline-block;
}

.game-hint {
    font-size: 1.1rem;
    margin-bottom: 25px;
    color: #666;
}

.game-options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    margin-bottom: 25px;
}

.option-btn, .emoji-input-btn {
    padding: 15px 20px;
    border: 2px solid #e1e5e9;
    background: white;
    border-radius: 10px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.option-btn:hover, .emoji-input-btn:hover {
    border-color: #667eea;
    background: #f8f9ff;
}

.option-btn.correct {
    background: #4CAF50;
    color: white;
    border-color: #4CAF50;
}

.option-btn.wrong {
    background: #f44336;
    color: white;
    border-color: #f44336;
}

.game-result {
    margin: 20px 0;
}

.correct-answer {
    color: #4CAF50;
    font-weight: bold;
}

.wrong-answer {
    color: #f44336;
    font-weight: bold;
}

.game-final-result {
    padding: 25px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border-radius: 15px;
    margin: 20px 0;
}

.next-btn, .restart-btn, .start-btn, .show-btn {
    padding: 12px 25px;
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    margin: 10px 5px;
    font-weight: 600;
}

.memory-display {
    margin: 25px 0;
    min-height: 100px;
}

.sequence-emojis {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin: 20px 0;
}

.sequence-emoji {
    font-size: 2.5rem;
    padding: 10px;
    border-radius: 10px;
    transition: all 0.3s ease;
}

.sequence-emoji.highlight {
    background: #FFD700;
    transform: scale(1.2);
}

.emoji-buttons {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    margin-top: 20px;
}

.emoji-input-btn {
    font-size: 1.5rem;
    padding: 10px;
    aspect-ratio: 1;
}

.story-prompt {
    margin-bottom: 30px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 15px;
}

.story-emojis {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin: 20px 0;
}

.story-emoji {
    font-size: 2.5rem;
    padding: 10px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.new-prompt-btn {
    padding: 10px 20px;
    background: #28a745;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
}

.story-input textarea {
    width: 100%;
    padding: 15px;
    border: 2px solid #e1e5e9;
    border-radius: 10px;
    font-size: 1rem;
    line-height: 1.6;
    resize: vertical;
}

.story-controls {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 15px;
}

.save-btn {
    background: #28a745;
}

.share-btn {
    background: #007bff;
}

.clear-btn {
    background: #6c757d;
}

.save-btn, .share-btn, .clear-btn {
    padding: 10px 20px;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
}

.story-gallery {
    margin-top: 30px;
    text-align: left;
}

.saved-story {
    background: white;
    padding: 15px;
    margin: 10px 0;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    position: relative;
}

.story-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    font-weight: bold;
}

.story-content {
    line-height: 1.6;
    color: #333;
}

.delete-story {
    position: absolute;
    top: 10px;
    right: 10px;
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 15px;
    padding: 5px 10px;
    font-size: 0.8rem;
    cursor: pointer;
}

.no-stories {
    text-align: center;
    color: #666;
    font-style: italic;
    padding: 20px;
}

.success {
    color: #28a745;
    font-weight: bold;
}

.error {
    color: #dc3545;
    font-weight: bold;
}

.info {
    color: #17a2b8;
    font-weight: bold;
    word-break: break-all;
    white-space: pre-wrap;
    background: #f8f9fa;
    padding: 15px;
    border-radius: 10px;
    margin: 15px 0;
}

@media (max-width: 768px) {
    .game-options {
        grid-template-columns: 1fr;
    }
    
    .emoji-buttons {
        grid-template-columns: repeat(3, 1fr);
    }
    
    .story-controls {
        flex-direction: column;
        align-items: center;
    }
    
    .story-emojis {
        flex-wrap: wrap;
    }
}
`;

// Inject additional styles
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = gameStyles;
    document.head.appendChild(styleSheet);
}