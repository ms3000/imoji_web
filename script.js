// Main JavaScript for Emoji Copy Website

class EmojiCopyApp {
    constructor() {
        this.currentLanguage = 'ko';
        this.copiedEmojis = JSON.parse(localStorage.getItem('copiedEmojis')) || {};
        this.recentEmojis = JSON.parse(localStorage.getItem('recentEmojis')) || [];
        this.selectedEmoji1 = '';
        this.selectedEmoji2 = '';
        this.currentResult = null;
        this.boundCopyResult = null;
        
        this.emojiData = this.initializeEmojiData();
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadPopularEmojis();
        this.loadKitchenEmojis();
        this.loadGalleryContent();
        this.updateLanguage(this.currentLanguage);
    }

    initializeEmojiData() {
        return {
            faces: [
                '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩',
                '😘', '😗', '☺️', '😚', '😙', '🥲', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔',
                '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😔', '😪', '🤤', '😴', '😷', '🤒',
                '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '🥸', '😎', '🤓', '🧐', '😕',
                '😟', '🙁', '☹️', '😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱',
                '😖', '😣', '😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠', '🤬', '😈', '👿', '💀', '☠️', '💩',
                '🤡', '👹', '👺', '👻', '👽', '👾', '🤖', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾'
            ],
            people: [
                '👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕',
                '👇', '☝️', '👍', '👎', '👊', '✊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✍️', '💅',
                '🤳', '💪', '🦾', '🦿', '🦵', '🦶', '👂', '🦻', '👃', '🧠', '🫀', '🫁', '🦷', '🦴', '👀', '👁️',
                '👅', '👄', '💋', '🩸', '👶', '🧒', '👦', '👧', '🧑', '👱', '👨', '🧔', '👩', '🧓', '👴', '👵',
                '🙍', '🙎', '🙅', '🙆', '💁', '🙋', '🧏', '🙇', '🤦', '🤷', '👮', '🕵️', '💂', '🥷', '👷', '🤴',
                '👸', '👳', '👲', '🧕', '🤵', '👰', '🤰', '🤱', '👼', '🎅', '🤶', '🦸', '🦹', '🧙', '🧚', '🧛',
                '🧜', '🧝', '🧞', '🧟', '💆', '💇', '🚶', '🧍', '🧎', '🏃', '💃', '🕺', '🕴️', '👯', '🧖', '🧗',
                '🤺', '🏇', '⛷️', '🏂', '🏌️', '🏄', '🚣', '🏊', '⛹️', '🏋️', '🚴', '🤸', '🤼', '🤽', '🤾', '🤹'
            ],
            animals: [
                '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐽', '🐸', '🐵',
                '🙈', '🙉', '🙊', '🐒', '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗',
                '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🦟', '🦗', '🕷️', '🕸️', '🦂', '🐢', '🐍', '🦎',
                '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅',
                '🐆', '🦓', '🦍', '🦧', '🐘', '🦛', '🦏', '🐪', '🐫', '🦒', '🦘', '🐃', '🐂', '🐄', '🐎', '🐖',
                '🐏', '🐑', '🦙', '🐐', '🦌', '🐕', '🐩', '🦮', '🐕‍🦺', '🐈', '🐈‍⬛', '🐓', '🦃', '🦚', '🦜', '🦢',
                '🦩', '🕊️', '🐇', '🦝', '🦨', '🦡', '🦫', '🦦', '🦥', '🐁', '🐀', '🐿️', '🦔'
            ],
            food: [
                '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝',
                '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌶️', '🫑', '🌽', '🥕', '🫒', '🧄', '🧅', '🥔', '🍠', '🥐',
                '🥖', '🍞', '🥨', '🥯', '🥞', '🧇', '🧀', '🍖', '🍗', '🥩', '🥓', '🍔', '🍟', '🍕', '🌭', '🥪',
                '🌮', '🌯', '🫔', '🥙', '🧆', '🥚', '🍳', '🥘', '🍲', '🫕', '🥣', '🥗', '🍿', '🧈', '🧂', '🥫',
                '🍱', '🍘', '🍙', '🍚', '🍛', '🍜', '🍝', '🍠', '🍢', '🍣', '🍤', '🍥', '🥮', '🍡', '🥟', '🥠',
                '🥡', '🦀', '🦞', '🦐', '🦑', '🦪', '🍦', '🍧', '🍨', '🍩', '🍪', '🎂', '🍰', '🧁', '🥧', '🍫',
                '🍬', '🍭', '🍮', '🍯', '🍼', '🥛', '☕', '🫖', '🍵', '🍶', '🍾', '🍷', '🍸', '🍹', '🍺', '🍻',
                '🥂', '🥃', '🥤', '🧋', '🧃', '🧉', '🧊'
            ],
            activities: [
                '⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🪀', '🏓', '🏸', '🏑', '🏒', '🥍',
                '🏏', '🪃', '🥅', '⛳', '🪁', '🏹', '🎣', '🤿', '🥊', '🥋', '🎽', '🛹', '🛷', '⛸️', '🥌', '🎿',
                '⛷️', '🏂', '🪂', '🏋️‍♀️', '🏋️', '🏋️‍♂️', '🤼‍♀️', '🤼', '🤼‍♂️', '🤸‍♀️', '🤸', '🤸‍♂️', '⛹️‍♀️', '⛹️', '⛹️‍♂️',
                '🤺', '🤾‍♀️', '🤾', '🤾‍♂️', '🏌️‍♀️', '🏌️', '🏌️‍♂️', '🏇', '🧘‍♀️', '🧘', '🧘‍♂️', '🏄‍♀️', '🏄', '🏄‍♂️',
                '🏊‍♀️', '🏊', '🏊‍♂️', '🤽‍♀️', '🤽', '🤽‍♂️', '🚣‍♀️', '🚣', '🚣‍♂️', '🧗‍♀️', '🧗', '🧗‍♂️', '🚵‍♀️', '🚵', '🚵‍♂️',
                '🚴‍♀️', '🚴', '🚴‍♂️', '🏆', '🥇', '🥈', '🥉', '🏅', '🎖️', '🏵️', '🎗️', '🎫', '🎟️', '🎪', '🤹‍♀️',
                '🤹', '🤹‍♂️', '🎭', '🩰', '🎨', '🎬', '🎤', '🎧', '🎼', '🎹', '🥁', '🪘', '🎷', '🎺', '🪗', '🎸',
                '🪕', '🎻', '🎲', '♠️', '♥️', '♦️', '♣️', '♟️', '🃏', '🀄', '🎴', '🎮', '🕹️', '🎰', '🧩'
            ],
            travel: [
                '🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐', '🛻', '🚚', '🚛', '🚜', '🏍️', '🛵',
                '🚲', '🛴', '🛹', '🛼', '🚁', '✈️', '🛩️', '🛫', '🛬', '🪂', '💺', '🚀', '🛰️', '🚉', '🚊', '🚝',
                '🚞', '🚋', '🚃', '🚋', '🚝', '🚄', '🚅', '🚈', '🚂', '🚆', '🚇', '🚊', '🚉', '🚁', '🚟', '🚠',
                '🚡', '🛺', '🚖', '🚘', '🚍', '🚔', '🚨', '🚥', '🚦', '🛑', '🚧', '⚓', '⛵', '🛶', '🚤', '🛥️',
                '🛳️', '⛴️', '🚢', '🏰', '🏯', '🗼', '🗽', '⛪', '🕌', '🛕', '🕍', '⛩️', '🕋', '⛲', '⛺', '🌁',
                '🌄', '🌅', '🌆', '🌇', '🌉', '♨️', '🎠', '🎡', '🎢', '💈', '🎪', '🚂', '🚆', '🚄', '🚅', '🚈',
                '🚇', '🚝', '🚞', '🚋', '🚃', '🚎', '🚐', '🚑', '🚒', '🚓', '🚔', '🚨', '🚜', '🏎️', '🏍️', '🛵',
                '🦽', '🦼', '🩼', '🛴', '🚲', '🛹', '🛼', '🚁', '🛩️', '✈️', '🛫', '🛬', '🪂'
            ],
            objects: [
                '⌚', '📱', '📲', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🖲️', '🕹️', '🗜️', '💽', '💾', '💿', '📀', '📼',
                '📷', '📸', '📹', '🎥', '📽️', '🎞️', '📞', '☎️', '📟', '📠', '📺', '📻', '🎙️', '🎚️', '🎛️', '🧭',
                '⏱️', '⏲️', '⏰', '🕰️', '⏳', '⌛', '📡', '🔋', '🔌', '💡', '🔦', '🕯️', '🪔', '🧯', '🛢️', '💸',
                '💵', '💴', '💶', '💷', '🪙', '💰', '💳', '💎', '⚖️', '🪜', '🧰', '🔧', '🔨', '⚒️', '🛠️', '⛏️',
                '🔩', '⚙️', '🪚', '🔫', '💣', '🧨', '🪓', '🔪', '🗡️', '⚔️', '🛡️', '🚬', '⚰️', '🪦', '⚱️', '🏺',
                '🔮', '📿', '🧿', '💈', '⚗️', '🔭', '🔬', '🕳️', '🩹', '🩺', '💊', '💉', '🩸', '🧬', '🦠', '🧫',
                '🧪', '🌡️', '🧹', '🪠', '🧺', '🧻', '🚽', '🚿', '🛁', '🪒', '🧴', '🧷', '🧹', '🧽', '🪣', '🧼',
                '🪥', '🪒', '🧻', '🧸', '🪆', '🖼️', '🪞', '🪟', '🛏️', '🛋️', '🪑', '🚪', '🪜', '🪞', '🖼️'
            ],
            symbols: [
                '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖',
                '💘', '💝', '💟', '☮️', '✝️', '☪️', '🕉️', '☸️', '✡️', '🔯', '🕎', '☯️', '☦️', '🛐', '⛎', '♈',
                '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓', '🆔', '⚛️', '🉑', '☢️', '☣️', '📴', '📳',
                '🈶', '🈚', '🈸', '🈺', '🈷️', '✴️', '🆚', '💮', '🉐', '㊙️', '㊗️', '🈴', '🈵', '🈹', '🈲', '🅰️',
                '🅱️', '🆎', '🆑', '🅾️', '🆘', '❌', '⭕', '🛑', '⛔', '📛', '🚫', '💯', '💢', '♨️', '🚷', '🚯',
                '🚳', '🚱', '🔞', '📵', '🚭', '❗', '❕', '❓', '❔', '‼️', '⁉️', '🔅', '🔆', '〽️', '⚠️', '🚸',
                '🔱', '⚜️', '🔰', '♻️', '✅', '🈯', '💹', '❇️', '✳️', '❎', '🌐', '💠', 'Ⓜ️', '🌀', '💤', '🏧',
                '🚾', '♿', '🅿️', '🈳', '🈂️', '🛂', '🛃', '🛄', '🛅', '🚹', '🚺', '🚼', '⚧️', '🚻', '🚮', '🎦'
            ],
            flags: [
                '🏁', '🚩', '🎌', '🏴', '🏳️', '🏳️‍🌈', '🏳️‍⚧️', '🏴‍☠️', '🇦🇨', '🇦🇩', '🇦🇪', '🇦🇫', '🇦🇬', '🇦🇮', '🇦🇱', '🇦🇲',
                '🇦🇴', '🇦🇶', '🇦🇷', '🇦🇸', '🇦🇹', '🇦🇺', '🇦🇼', '🇦🇽', '🇦🇿', '🇧🇦', '🇧🇧', '🇧🇩', '🇧🇪', '🇧🇫', '🇧🇬', '🇧🇭',
                '🇧🇮', '🇧🇯', '🇧🇱', '🇧🇲', '🇧🇳', '🇧🇴', '🇧🇶', '🇧🇷', '🇧🇸', '🇧🇹', '🇧🇻', '🇧🇼', '🇧🇾', '🇧🇿', '🇨🇦', '🇨🇨',
                '🇨🇩', '🇨🇫', '🇨🇬', '🇨🇭', '🇨🇮', '🇨🇰', '🇨🇱', '🇨🇲', '🇨🇳', '🇨🇴', '🇨🇵', '🇨🇷', '🇨🇺', '🇨🇻', '🇨🇼', '🇨🇽',
                '🇨🇾', '🇨🇿', '🇩🇪', '🇩🇬', '🇩🇯', '🇩🇰', '🇩🇲', '🇩🇴', '🇩🇿', '🇪🇦', '🇪🇨', '🇪🇪', '🇪🇬', '🇪🇭', '🇪🇷', '🇪🇸',
                '🇪🇹', '🇪🇺', '🇫🇮', '🇫🇯', '🇫🇰', '🇫🇲', '🇫🇴', '🇫🇷', '🇬🇦', '🇬🇧', '🇬🇩', '🇬🇪', '🇬🇫', '🇬🇬', '🇬🇭', '🇬🇮',
                '🇬🇱', '🇬🇲', '🇬🇳', '🇬🇵', '🇬🇶', '🇬🇷', '🇬🇸', '🇬🇹', '🇬🇺', '🇬🇼', '🇬🇾', '🇭🇰', '🇭🇲', '🇭🇳', '🇭🇷', '🇭🇹',
                '🇭🇺', '🇮🇨', '🇮🇩', '🇮🇪', '🇮🇱', '🇮🇲', '🇮🇳', '🇮🇴', '🇮🇶', '🇮🇷', '🇮🇸', '🇮🇹', '🇯🇪', '🇯🇲', '🇯🇴', '🇯🇵',
                '🇰🇪', '🇰🇬', '🇰🇭', '🇰🇮', '🇰🇲', '🇰🇳', '🇰🇵', '🇰🇷', '🇰🇼', '🇰🇾', '🇰🇿', '🇱🇦', '🇱🇧', '🇱🇨', '🇱🇮', '🇱🇰'
            ]
        };
    }

    bindEvents() {
        // Language selector
        document.getElementById('language-select').addEventListener('change', (e) => {
            this.updateLanguage(e.target.value);
        });

        // Search functionality
        document.getElementById('search-btn').addEventListener('click', () => {
            this.searchEmojis();
        });

        document.getElementById('emoji-search').addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                this.searchEmojis();
            } else {
                this.debounceSearch(e.target.value);
            }
        });

        // Category cards
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                this.showCategoryEmojis(category);
            });
        });

        // Popular tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchPopularTab(e.target.dataset.tab);
            });
        });

        // Gallery tabs
        document.querySelectorAll('.gallery-tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchGalleryTab(e.target.dataset.galleryTab);
            });
        });

        // Emoji copying
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('emoji-item') || e.target.closest('.emoji-item')) {
                const emoji = e.target.dataset.emoji || e.target.closest('.emoji-item').dataset.emoji;
                if (emoji) {
                    this.copyEmoji(emoji);
                }
            }
        });

        // Kitchen functionality
        document.getElementById('generate-btn').addEventListener('click', () => {
            this.generateCombinedEmoji();
        });

        // Clear selection button
        document.getElementById('clear-selection').addEventListener('click', () => {
            this.clearKitchenSelection();
        });

        // Kitchen tabs
        document.querySelectorAll('.kitchen-tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchKitchenTab(e.target.dataset.kitchenTab);
            });
        });

        // Combo suggestions
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('combo-suggestion')) {
                const [emoji1, emoji2] = e.target.dataset.combo.split(',');
                this.loadCombination(emoji1, emoji2);
            }
        });

        // Game buttons
        document.querySelectorAll('.play-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const gameType = e.target.closest('.game-card').dataset.game;
                this.startGame(gameType);
            });
        });

        // Modal close
        document.querySelector('.close').addEventListener('click', () => {
            this.closeModal();
        });

        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal();
            }
        });

        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    updateLanguage(lang) {
        this.currentLanguage = lang;
        if (window.translations && window.translations[lang]) {
            const translations = window.translations[lang];
            
            document.querySelectorAll('[data-lang]').forEach(element => {
                const key = element.dataset.lang;
                if (translations[key]) {
                    element.textContent = translations[key];
                }
            });

            document.querySelectorAll('[data-lang-placeholder]').forEach(element => {
                const key = element.dataset.langPlaceholder;
                if (translations[key]) {
                    element.placeholder = translations[key];
                }
            });

            document.documentElement.lang = lang;
        }
    }

    searchEmojis() {
        const query = document.getElementById('emoji-search').value.toLowerCase().trim();
        if (!query) return;

        const results = [];
        const keywords = {
            'smile': ['😀', '😃', '😄', '😁', '😆', '😊'],
            'heart': ['❤️', '💛', '💚', '💙', '💜', '🖤'],
            'food': this.emojiData.food.slice(0, 20),
            'animal': this.emojiData.animals.slice(0, 20),
            'travel': this.emojiData.travel.slice(0, 20)
        };

        // Search by keywords
        for (const [keyword, emojis] of Object.entries(keywords)) {
            if (keyword.includes(query)) {
                results.push(...emojis);
            }
        }

        // Search by category names
        const categoryMap = {
            'face': 'faces',
            'people': 'people',
            'animal': 'animals',
            'food': 'food',
            'activity': 'activities',
            'travel': 'travel',
            'object': 'objects',
            'symbol': 'symbols',
            'flag': 'flags'
        };

        for (const [searchTerm, category] of Object.entries(categoryMap)) {
            if (searchTerm.includes(query) || query.includes(searchTerm)) {
                results.push(...this.emojiData[category].slice(0, 15));
            }
        }

        this.displaySearchResults(results.slice(0, 50));
    }

    debounceSearch = this.debounce((query) => {
        if (query.length > 1) {
            this.searchEmojis();
        }
    }, 300);

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    displaySearchResults(emojis) {
        const container = document.getElementById('popular-emojis');
        container.innerHTML = '';
        
        emojis.forEach(emoji => {
            const emojiElement = document.createElement('span');
            emojiElement.className = 'emoji-item';
            emojiElement.dataset.emoji = emoji;
            emojiElement.textContent = emoji;
            container.appendChild(emojiElement);
        });

        // Scroll to results
        document.getElementById('popular').scrollIntoView({ behavior: 'smooth' });
    }

    showCategoryEmojis(category) {
        const emojis = this.emojiData[category] || [];
        const container = document.getElementById('popular-emojis');
        container.innerHTML = '';
        
        emojis.forEach(emoji => {
            const emojiElement = document.createElement('span');
            emojiElement.className = 'emoji-item';
            emojiElement.dataset.emoji = emoji;
            emojiElement.textContent = emoji;
            container.appendChild(emojiElement);
        });

        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        
        // Scroll to results
        document.getElementById('popular').scrollIntoView({ behavior: 'smooth' });
    }

    switchPopularTab(tab) {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

        this.loadPopularEmojis(tab);
    }

    loadPopularEmojis(tab = 'trending') {
        const container = document.getElementById('popular-emojis');
        let emojis = [];

        switch (tab) {
            case 'trending':
                emojis = ['🔥', '💯', '✨', '🎉', '❤️', '😍', '🥳', '👏', '💪', '🙌', '⚡', '🌟', '💖', '🎊', '🤩', '🎈', '🌈', '💝', '🎯', '🏆'];
                break;
            case 'most-copied':
                const sorted = Object.entries(this.copiedEmojis).sort(([,a], [,b]) => b - a);
                emojis = sorted.slice(0, 20).map(([emoji]) => emoji);
                if (emojis.length < 10) {
                    emojis = [...emojis, '😀', '😂', '❤️', '👍', '🔥', '💯', '🎉', '✨', '😍', '🥰'].slice(0, 20);
                }
                break;
            case 'recent':
                emojis = this.recentEmojis.slice(0, 20);
                if (emojis.length < 5) {
                    emojis = [...emojis, '😊', '👋', '🌟', '💫', '🎨'].slice(0, 20);
                }
                break;
        }

        container.innerHTML = '';
        emojis.forEach(emoji => {
            const emojiElement = document.createElement('span');
            emojiElement.className = 'emoji-item';
            emojiElement.dataset.emoji = emoji;
            emojiElement.textContent = emoji;
            container.appendChild(emojiElement);
        });
    }

    loadKitchenEmojis() {
        const container = document.getElementById('kitchen-emoji-grid');
        const commonEmojis = [
            '😀', '😂', '❤️', '😍', '🔥', '👍', '🎉', '✨', '💯', '🥳',
            '😎', '🤔', '😮', '🤗', '😜', '🤣', '😇', '🥰', '😘', '🤩',
            '🐶', '🐱', '🦊', '🐻', '🐸', '🐵', '🦄', '🐧', '🦋', '🌺',
            '🍕', '🍔', '🍟', '🍎', '🍌', '🍓', '🍉', '🍪', '🎂', '🍦'
        ];

        container.innerHTML = '';
        commonEmojis.forEach(emoji => {
            const emojiElement = document.createElement('span');
            emojiElement.className = 'emoji-item kitchen-emoji';
            emojiElement.dataset.emoji = emoji;
            emojiElement.textContent = emoji;
            emojiElement.addEventListener('click', () => this.selectKitchenEmoji(emoji));
            container.appendChild(emojiElement);
        });
    }

    selectKitchenEmoji(emoji) {
        if (!this.selectedEmoji1) {
            this.selectedEmoji1 = emoji;
            document.getElementById('emoji1').innerHTML = emoji;
            document.getElementById('emoji1').dataset.emoji = emoji;
        } else if (!this.selectedEmoji2) {
            this.selectedEmoji2 = emoji;
            document.getElementById('emoji2').innerHTML = emoji;
            document.getElementById('emoji2').dataset.emoji = emoji;
        } else {
            // Reset and select first
            this.selectedEmoji1 = emoji;
            this.selectedEmoji2 = '';
            document.getElementById('emoji1').innerHTML = emoji;
            document.getElementById('emoji1').dataset.emoji = emoji;
            document.getElementById('emoji2').innerHTML = '<span class="placeholder">+</span>';
            document.getElementById('emoji2').dataset.emoji = '';
            document.getElementById('result-emoji').innerHTML = '<span class="placeholder">?</span>';
        }
    }

    async generateCombinedEmoji() {
        if (!this.selectedEmoji1 || !this.selectedEmoji2) {
            this.showToast('두 개의 이모지를 선택해주세요!');
            return;
        }

        // Show loading state
        const resultElement = document.getElementById('result-emoji');
        const generateBtn = document.getElementById('generate-btn');
        
        resultElement.innerHTML = '<div class="loading-spinner">⏳</div>';
        generateBtn.disabled = true;
        generateBtn.textContent = '생성 중...';

        try {
            // Get Unicode codepoints for the emojis
            const emoji1Code = this.getEmojiCodepoint(this.selectedEmoji1);
            const emoji2Code = this.getEmojiCodepoint(this.selectedEmoji2);
            
            // Try to get combination from Google's Emoji Kitchen
            const combination = await this.fetchEmojiCombination(emoji1Code, emoji2Code);
            
            if (combination) {
                // Display the combination result
                resultElement.innerHTML = `<img src="${combination.url}" alt="Combined emoji" class="combined-emoji-img">`;
                this.showToast(`${this.selectedEmoji1} + ${this.selectedEmoji2} = 조합 완성! 🎉`);
                
                // Show copy button and store result for copying
                this.showCopyButton(combination.url);
                
                // Add to recent combinations
                this.addToRecentCombinations(this.selectedEmoji1, this.selectedEmoji2, combination.url);
            } else {
                // Show informative message about unsupported combination
                this.showToast(`${this.selectedEmoji1} + ${this.selectedEmoji2} 조합을 찾을 수 없어서 유사한 조합을 만들어드려요! 💡`, 'warning');
                // Fallback to predefined combinations
                this.generateFallbackCombination();
            }
        } catch (error) {
            console.warn('Emoji combination failed, using fallback:', error);
            this.showToast(`네트워크 문제로 인해 대체 조합을 생성합니다 🔄`, 'info');
            this.generateFallbackCombination();
        } finally {
            generateBtn.disabled = false;
            generateBtn.textContent = '생성';
        }
    }

    getEmojiCodepoint(emoji) {
        // Convert emoji to Unicode codepoint
        return Array.from(emoji).map(char => 
            char.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')
        ).join('-');
    }

    async fetchEmojiCombination(code1, code2) {
        // Use modern Emoji Kitchen API instead of hardcoded dated URLs
        const attempts = [
            // Primary API - use codepoints
            `https://emojik.vercel.app/s/${code1.toLowerCase()}_${code2.toLowerCase()}?size=128`,
            // Fallback - try reversed order
            `https://emojik.vercel.app/s/${code2.toLowerCase()}_${code1.toLowerCase()}?size=128`
        ];

        for (const url of attempts) {
            try {
                const response = await fetch(url, { method: 'HEAD' });
                if (response.ok) {
                    return { url, valid: true };
                }
            } catch (e) {
                // Continue to next attempt
            }
        }

        // Final fallback - try with actual emoji characters
        const emoji1 = String.fromCodePoint(parseInt(code1, 16));
        const emoji2 = String.fromCodePoint(parseInt(code2, 16));
        const emojiAttempts = [
            `https://emojik.vercel.app/s/${emoji1}_${emoji2}?size=128`,
            `https://emojik.vercel.app/s/${emoji2}_${emoji1}?size=128`
        ];

        for (const url of emojiAttempts) {
            try {
                const response = await fetch(url, { method: 'HEAD' });
                if (response.ok) {
                    return { url, valid: true };
                }
            } catch (e) {
                // Continue to next attempt
            }
        }

        return null;
    }

    generateFallbackCombination() {
        // Enhanced fallback combinations with more possibilities
        const combinations = {
            // Popular combinations
            '😀🔥': '🤩', '😀❤️': '🥰', '😀🎉': '🥳', '😀⭐': '🤩',
            '❤️🔥': '💖', '❤️✨': '💕', '❤️🌟': '💖', '❤️🎉': '💝',
            '🔥💯': '🚀', '🔥⭐': '✨', '🔥🎉': '💥', '🔥💥': '💫',
            '🐶❤️': '🥰', '🐶🎉': '🎊', '🐶🔥': '🔥', '🐶⭐': '🌟',
            '🐱❤️': '😻', '🐱🎉': '🎊', '🐱🔥': '😸', '🐱⭐': '✨',
            '🍕❤️': '😋', '🍕🔥': '🌶️', '🍕⭐': '⭐', '🍕🎉': '🍾',
            '🎵❤️': '💖', '🎵🔥': '🎸', '🎵⭐': '🌟', '🎵🎉': '🎊',
            '🌙⭐': '✨', '🌙❤️': '💕', '🌙🔥': '🌟', '🌙🎉': '🎆',
            '☀️❤️': '🌹', '☀️🔥': '🔥', '☀️⭐': '✨', '☀️🎉': '🌈'
        };

        const key1 = this.selectedEmoji1 + this.selectedEmoji2;
        const key2 = this.selectedEmoji2 + this.selectedEmoji1;
        let result = combinations[key1] || combinations[key2];

        if (!result) {
            // Generate contextual combination based on emoji categories
            result = this.generateContextualCombination();
        }

        const resultElement = document.getElementById('result-emoji');
        resultElement.innerHTML = result;
        this.showToast(`${this.selectedEmoji1} + ${this.selectedEmoji2} = ${result}`);
        
        // Show copy button for fallback result
        this.showCopyButton(null, result);
        
        // Add animation effect
        resultElement.classList.add('combination-reveal');
        setTimeout(() => resultElement.classList.remove('combination-reveal'), 600);
    }

    generateContextualCombination() {
        // Analyze emoji types and generate appropriate combinations
        const emojiCategories = {
            faces: ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊'],
            hearts: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕'],
            fire: ['🔥', '💥', '⚡', '✨', '🌟', '⭐', '💫', '🌠'],
            celebration: ['🎉', '🎊', '🥳', '🎈', '🎁', '🏆', '🥇', '👏'],
            animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼']
        };

        // Determine categories
        let category1 = 'other', category2 = 'other';
        
        for (const [cat, emojis] of Object.entries(emojiCategories)) {
            if (emojis.includes(this.selectedEmoji1)) category1 = cat;
            if (emojis.includes(this.selectedEmoji2)) category2 = cat;
        }

        // Generate combination based on categories
        const categoryResults = {
            'faces-hearts': ['🥰', '😍', '🤩', '😘'],
            'faces-fire': ['🤩', '😎', '🔥', '✨'],
            'faces-celebration': ['🥳', '🤩', '🎉', '🎊'],
            'hearts-fire': ['💖', '💕', '💗', '✨'],
            'hearts-celebration': ['💝', '💖', '🎁', '🎉'],
            'fire-celebration': ['🎆', '💥', '🚀', '✨'],
            'animals-hearts': ['🥰', '💕', '😻', '❤️'],
            'animals-fire': ['🔥', '⚡', '✨', '🌟']
        };

        const comboKey = `${category1}-${category2}`;
        const reverseKey = `${category2}-${category1}`;
        const possibleResults = categoryResults[comboKey] || categoryResults[reverseKey];

        if (possibleResults) {
            return possibleResults[Math.floor(Math.random() * possibleResults.length)];
        }

        // Final fallback - return a random celebratory emoji
        const fallbacks = ['✨', '🌟', '⭐', '💫', '🎉', '🎊', '💥', '🔥'];
        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }

    addToRecentCombinations(emoji1, emoji2, resultUrl) {
        let recentCombinations = JSON.parse(localStorage.getItem('recentCombinations') || '[]');
        
        const combination = {
            emoji1,
            emoji2,
            result: resultUrl,
            timestamp: Date.now()
        };
        
        // Add to beginning of array and limit to 10 recent combinations
        recentCombinations.unshift(combination);
        recentCombinations = recentCombinations.slice(0, 10);
        
        localStorage.setItem('recentCombinations', JSON.stringify(recentCombinations));
        
        // Update UI if recent combinations section exists
        this.updateRecentCombinations();
    }

    updateRecentCombinations() {
        const recentSection = document.getElementById('recent-combinations');
        if (!recentSection) return;

        const recentCombinations = JSON.parse(localStorage.getItem('recentCombinations') || '[]');
        
        if (recentCombinations.length === 0) {
            recentSection.innerHTML = '<p>아직 조합한 이모지가 없습니다.</p>';
            return;
        }

        recentSection.innerHTML = recentCombinations.map(combo => `
            <div class="recent-combo" onclick="window.emojiApp.loadCombination('${combo.emoji1}', '${combo.emoji2}')">
                <span class="combo-input">${combo.emoji1} + ${combo.emoji2}</span>
                <span class="combo-arrow">→</span>
                <span class="combo-result">${combo.result.includes('http') ? 
                    `<img src="${combo.result}" class="mini-combo-img">` : combo.result}</span>
            </div>
        `).join('');
    }

    loadCombination(emoji1, emoji2) {
        this.selectedEmoji1 = emoji1;
        this.selectedEmoji2 = emoji2;
        document.getElementById('emoji1').innerHTML = emoji1;
        document.getElementById('emoji1').dataset.emoji = emoji1;
        document.getElementById('emoji2').innerHTML = emoji2;
        document.getElementById('emoji2').dataset.emoji = emoji2;
        
        // Clear result
        document.getElementById('result-emoji').innerHTML = '<span class="placeholder">?</span>';
        
        // Hide copy button
        this.hideCopyButton();
    }

    clearKitchenSelection() {
        this.selectedEmoji1 = '';
        this.selectedEmoji2 = '';
        document.getElementById('emoji1').innerHTML = '<span class="placeholder">+</span>';
        document.getElementById('emoji1').dataset.emoji = '';
        document.getElementById('emoji2').innerHTML = '<span class="placeholder">+</span>';
        document.getElementById('emoji2').dataset.emoji = '';
        document.getElementById('result-emoji').innerHTML = '<span class="placeholder">?</span>';
        
        // Hide copy button
        this.hideCopyButton();
    }

    switchKitchenTab(tab) {
        // Update tab buttons
        document.querySelectorAll('.kitchen-tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-kitchen-tab="${tab}"]`).classList.add('active');

        // Show/hide sections
        document.querySelectorAll('.kitchen-section').forEach(section => {
            section.style.display = 'none';
        });

        switch (tab) {
            case 'popular':
                document.getElementById('popular-combinations').style.display = 'block';
                break;
            case 'recent':
                document.getElementById('recent-combinations').style.display = 'block';
                this.loadRecentCombinations();
                break;
            case 'all':
                document.getElementById('all-emojis').style.display = 'block';
                this.loadKitchenEmojis();
                break;
        }
    }

    loadRecentCombinations() {
        const recentCombinations = JSON.parse(localStorage.getItem('recentCombinations') || '[]');
        const container = document.querySelector('.recent-combinations-list');
        
        if (recentCombinations.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #666; padding: 40px;">아직 조합한 이모지가 없습니다.<br>위의 추천 조합을 시도해보세요!</p>';
            return;
        }

        container.innerHTML = recentCombinations.map(combo => `
            <div class="recent-combo" onclick="window.emojiApp.loadCombination('${combo.emoji1}', '${combo.emoji2}')">
                <span class="combo-input">${combo.emoji1} + ${combo.emoji2}</span>
                <span class="combo-arrow">→</span>
                <span class="combo-result">${combo.result.includes('http') ? 
                    `<img src="${combo.result}" class="mini-combo-img" alt="Combined emoji">` : combo.result}</span>
            </div>
        `).join('');
    }

    switchGalleryTab(tab) {
        document.querySelectorAll('.gallery-tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-gallery-tab="${tab}"]`).classList.add('active');

        this.loadGalleryContent(tab);
    }

    loadGalleryContent(tab = 'combos') {
        const container = document.getElementById('gallery-grid');
        container.innerHTML = '';

        switch (tab) {
            case 'combos':
                this.loadEmojiCombos(container);
                break;
            case 'ascii':
                this.loadAsciiArt(container);
                break;
            case 'patterns':
                this.loadEmojiPatterns(container);
                break;
        }
    }

    loadEmojiCombos(container) {
        const combos = [
            { title: '사랑 표현', combo: '❤️💕💖💗💓💞', description: '다양한 하트 이모지' },
            { title: '축하 파티', combo: '🎉🎊🥳🎈🎂✨', description: '파티와 축하를 위한 이모지' },
            { title: '날씨 표현', combo: '☀️🌤️⛅🌦️⛈️🌧️', description: '다양한 날씨 상황' },
            { title: '음식 조합', combo: '🍕🍔🍟🌭🥪🌮', description: '맛있는 패스트푸드' },
            { title: '동물 친구들', combo: '🐶🐱🐭🐹🐰🦊', description: '귀여운 동물들' },
            { title: '스포츠 활동', combo: '⚽🏀🏈⚾🎾🏐', description: '인기 스포츠' }
        ];

        combos.forEach(item => {
            const div = document.createElement('div');
            div.className = 'gallery-item';
            div.innerHTML = `
                <h4>${item.title}</h4>
                <div class="emoji-combo">${item.combo}</div>
                <p>${item.description}</p>
            `;
            div.addEventListener('click', () => this.copyEmoji(item.combo));
            container.appendChild(div);
        });
    }

    loadAsciiArt(container) {
        const asciiArts = [
            {
                title: '하트',
                art: `  ♥♥    ♥♥  
♥    ♥♥    ♥
♥           ♥
 ♥         ♥ 
  ♥       ♥  
   ♥     ♥   
    ♥   ♥    
     ♥ ♥     
      ♥      `
            },
            {
                title: '별',
                art: `    ★    
   ★★★   
  ★★★★★  
 ★★★★★★★ 
★★★★★★★★★
 ★★★★★★★ 
  ★★★★★  
   ★★★   
    ★    `
            },
            {
                title: '웃는 얼굴',
                art: `  ◉     ◉  
            
      ◡     
            
 ◡         ◡ `
            }
        ];

        asciiArts.forEach(item => {
            const div = document.createElement('div');
            div.className = 'gallery-item';
            div.innerHTML = `
                <h4>${item.title}</h4>
                <div class="ascii-art">${item.art}</div>
            `;
            div.addEventListener('click', () => this.copyEmoji(item.art));
            container.appendChild(div);
        });
    }

    loadEmojiPatterns(container) {
        const patterns = [
            { title: '무지개 라인', pattern: '🌈🌈🌈🌈🌈🌈🌈🌈', description: '무지개 패턴' },
            { title: '별빛 라인', pattern: '✨⭐✨⭐✨⭐✨⭐', description: '반짝이는 별들' },
            { title: '하트 라인', pattern: '💖💕💖💕💖💕💖💕', description: '사랑스러운 하트' },
            { title: '꽃 가든', pattern: '🌸🌺🌻🌷🌹🥀💐🌼', description: '아름다운 꽃들' },
            { title: '과일 바구니', pattern: '🍎🍊🍌🍇🍓🥝🍑🍒', description: '신선한 과일' },
            { title: '우주 여행', pattern: '🚀🌙⭐🪐☄️🛸👽🌌', description: '우주 탐험' }
        ];

        patterns.forEach(item => {
            const div = document.createElement('div');
            div.className = 'gallery-item';
            div.innerHTML = `
                <h4>${item.title}</h4>
                <div class="pattern">${item.pattern}</div>
                <p>${item.description}</p>
            `;
            div.addEventListener('click', () => this.copyEmoji(item.pattern));
            container.appendChild(div);
        });
    }

    copyEmoji(emoji) {
        navigator.clipboard.writeText(emoji).then(() => {
            // Update statistics
            this.copiedEmojis[emoji] = (this.copiedEmojis[emoji] || 0) + 1;
            
            // Update recent emojis
            this.recentEmojis = this.recentEmojis.filter(e => e !== emoji);
            this.recentEmojis.unshift(emoji);
            if (this.recentEmojis.length > 20) {
                this.recentEmojis = this.recentEmojis.slice(0, 20);
            }
            
            // Save to localStorage
            localStorage.setItem('copiedEmojis', JSON.stringify(this.copiedEmojis));
            localStorage.setItem('recentEmojis', JSON.stringify(this.recentEmojis));
            
            // Show success animation and toast
            this.showToast(`${emoji} 복사되었습니다!`);
            
            // Add copy animation to the emoji
            const emojiElements = document.querySelectorAll(`[data-emoji="${emoji}"]`);
            emojiElements.forEach(el => {
                el.classList.add('copy-success');
                setTimeout(() => el.classList.remove('copy-success'), 300);
            });
        }).catch(err => {
            console.error('복사 실패:', err);
            this.showToast('복사 실패. 다시 시도해주세요.');
        });
    }

    showToast(message) {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toast-message');
        toastMessage.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    startGame(gameType) {
        const modal = document.getElementById('game-modal');
        const content = document.getElementById('game-content');
        
        switch (gameType) {
            case 'guess':
                content.innerHTML = this.getGuessGameHTML();
                this.initGuessGame();
                break;
            case 'memory':
                content.innerHTML = this.getMemoryGameHTML();
                this.initMemoryGame();
                break;
            case 'story':
                content.innerHTML = this.getStoryGameHTML();
                this.initStoryGame();
                break;
        }
        
        modal.style.display = 'block';
    }

    getGuessGameHTML() {
        return `
            <h2>🤔 이모지 맞추기 게임</h2>
            <div id="guess-game">
                <div class="game-emoji" id="game-emoji">🎭</div>
                <p id="guess-hint">이 이모지가 표현하는 것은?</p>
                <div class="game-options">
                    <button class="option-btn" data-answer="theater">연극</button>
                    <button class="option-btn" data-answer="mask">가면</button>
                    <button class="option-btn" data-answer="drama">드라마</button>
                    <button class="option-btn" data-answer="comedy">코미디</button>
                </div>
                <div id="game-result"></div>
                <button id="next-question" style="display:none;">다음 문제</button>
            </div>
        `;
    }

    getMemoryGameHTML() {
        return `
            <h2>🧠 이모지 기억하기 게임</h2>
            <div id="memory-game">
                <div id="memory-sequence" class="memory-display"></div>
                <button id="start-memory">시작하기</button>
                <div id="memory-input" class="memory-input" style="display:none;"></div>
                <div id="memory-result"></div>
            </div>
        `;
    }

    getStoryGameHTML() {
        return `
            <h2>📚 이모지 스토리 게임</h2>
            <div id="story-game">
                <div class="story-emojis" id="story-emojis">
                    <span class="story-emoji">🐸</span>
                    <span class="story-emoji">👑</span>
                    <span class="story-emoji">💋</span>
                    <span class="story-emoji">👸</span>
                </div>
                <p>위 이모지들로 스토리를 만들어보세요!</p>
                <textarea id="user-story" placeholder="여기에 스토리를 작성해주세요..." rows="5"></textarea>
                <button id="share-story">스토리 공유하기</button>
                <div id="story-result"></div>
            </div>
        `;
    }

    initGuessGame() {
        // Simple guess game implementation
        const questions = [
            { emoji: '🎭', answers: ['theater', 'drama'], correct: 'theater', hint: '연극이나 드라마를 의미합니다' },
            { emoji: '🏠', answers: ['house', 'home'], correct: 'house', hint: '사람이 사는 곳입니다' },
            { emoji: '🚗', answers: ['car', 'vehicle'], correct: 'car', hint: '교통수단입니다' }
        ];
        
        let currentQuestion = 0;
        let score = 0;
        
        const showQuestion = () => {
            const q = questions[currentQuestion];
            document.getElementById('game-emoji').textContent = q.emoji;
            document.getElementById('guess-hint').textContent = q.hint;
            
            const options = document.querySelectorAll('.option-btn');
            options.forEach((btn, index) => {
                btn.textContent = ['연극', '가면', '드라마', '코미디'][index];
                btn.onclick = () => this.checkGuess(q.correct, btn.dataset.answer);
            });
        };
        
        showQuestion();
    }

    checkGuess(correct, answer) {
        const result = document.getElementById('game-result');
        if (answer === correct) {
            result.innerHTML = '<p style="color: green;">정답입니다! 🎉</p>';
        } else {
            result.innerHTML = '<p style="color: red;">틀렸습니다. 다시 시도해보세요! 😅</p>';
        }
    }

    initMemoryGame() {
        // Simple memory game implementation
        let sequence = [];
        let playerSequence = [];
        let level = 1;
        
        document.getElementById('start-memory').onclick = () => {
            this.startMemoryRound();
        };
    }

    startMemoryRound() {
        // Memory game logic here
        const emojis = ['😀', '😂', '❤️', '🔥', '⭐', '🎉'];
        // Implementation would continue here...
    }

    initStoryGame() {
        document.getElementById('share-story').onclick = () => {
            const story = document.getElementById('user-story').value;
            if (story.trim()) {
                document.getElementById('story-result').innerHTML = 
                    '<p style="color: green;">멋진 스토리네요! 창의적입니다! ✨</p>';
            }
        };
    }

    closeModal() {
        document.getElementById('game-modal').style.display = 'none';
    }

    showCopyButton(imageUrl = null, emoji = null) {
        const copyButton = document.getElementById('copy-result-btn');
        if (!copyButton) {
            console.error('Copy button not found');
            return;
        }
        
        copyButton.style.display = 'inline-block';
        
        // Store the current result for copying
        this.currentResult = { imageUrl, emoji };
        
        // Remove existing event listener and add new one
        if (this.boundCopyResult) {
            copyButton.removeEventListener('click', this.boundCopyResult);
        }
        this.boundCopyResult = () => this.copyResult();
        copyButton.addEventListener('click', this.boundCopyResult);
    }

    hideCopyButton() {
        const copyButton = document.getElementById('copy-result-btn');
        if (copyButton) {
            copyButton.style.display = 'none';
        }
        this.currentResult = null;
    }

    async copyResult() {
        console.log('copyResult called with:', this.currentResult);
        
        if (!this.currentResult) {
            console.warn('No result to copy');
            this.showToast('복사할 결과가 없습니다 ❌', 'error');
            return;
        }

        try {
            // Check if clipboard API is available
            if (!navigator.clipboard) {
                console.warn('Clipboard API not available, using fallback');
                this.fallbackCopy();
                return;
            }

            // Check if we're in a secure context (required for clipboard API)
            if (!window.isSecureContext) {
                console.warn('Not in secure context, clipboard API may not work');
                this.fallbackCopy();
                return;
            }

            if (this.currentResult.imageUrl) {
                // For image results, try to copy image first, fallback to URL
                try {
                    await this.copyImageAsBlob(this.currentResult.imageUrl);
                    this.showToast('이미지가 복사되었습니다! 📋', 'success');
                } catch (imageError) {
                    console.warn('Image copy failed, copying URL instead:', imageError);
                    await navigator.clipboard.writeText(this.currentResult.imageUrl);
                    this.showToast('이미지 URL이 복사되었습니다! 📋', 'success');
                }
            } else if (this.currentResult.emoji) {
                // For emoji results, copy the emoji text
                await navigator.clipboard.writeText(this.currentResult.emoji);
                this.showToast(`${this.currentResult.emoji} 복사 완료! 📋`, 'success');
            }
            
            // Visual feedback on copy button
            this.animateCopyButton();
            
        } catch (error) {
            console.warn('Clipboard API failed:', error);
            // Fallback for older browsers or permission issues
            this.fallbackCopy();
        }
    }

    async copyImageAsBlob(imageUrl) {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            
            if (navigator.clipboard && navigator.clipboard.write) {
                const clipboardItem = new ClipboardItem({ [blob.type]: blob });
                await navigator.clipboard.write([clipboardItem]);
            } else {
                // Fallback: copy the URL instead
                await navigator.clipboard.writeText(imageUrl);
            }
        } catch (error) {
            // If image copy fails, copy the URL instead
            await navigator.clipboard.writeText(imageUrl);
        }
    }

    fallbackCopy() {
        const textToCopy = this.currentResult.emoji || this.currentResult.imageUrl;
        if (!textToCopy) return;

        // Create temporary textarea for copy
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            document.execCommand('copy');
            this.showToast('복사 완료! 📋', 'success');
            this.animateCopyButton();
        } catch (error) {
            this.showToast('복사에 실패했습니다 ❌', 'error');
        } finally {
            document.body.removeChild(textarea);
        }
    }

    animateCopyButton() {
        const copyButton = document.getElementById('copy-result-btn');
        if (!copyButton) return;
        
        copyButton.style.transform = 'scale(1.2)';
        copyButton.style.background = '#4CAF50';
        
        setTimeout(() => {
            if (copyButton) {
                copyButton.style.transform = 'scale(1)';
                copyButton.style.background = '';
            }
        }, 200);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.emojiApp = new EmojiCopyApp();
});

// Service Worker registration for PWA (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(() => console.log('SW registered'))
            .catch(() => console.log('SW registration failed'));
    });
}